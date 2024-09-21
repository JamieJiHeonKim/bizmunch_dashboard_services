import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from 'multer';
import { Company } from '../../../models/Company';
import { Restaurant } from '../../../models/Restaurant';
import { Menu } from '../../../models/Menu';
import { notificationDocument, dashboardUserDocument, restaurantDocument, menuDocument } from '../../../@types/models';
import { saveImageToGridFS, getImageFromGridFS } from "../../../middleware/mongo";
import * as service from "./dashboard.service";
import {
  HttpException,
  badImplementationException,
} from "../../utils/apiErrorHandler";
const { GridFSBucket, ObjectId } = require('mongodb');
import { Logger } from "../../../middleware/log4";
import { COMPANY, NOTIFICATION, TRANSACTION, DASHBOARDUSER, RESTAURANT, MENU } from "../../../models";
import bcrypt from 'bcryptjs';

export interface MulterReq extends Request {
  files?: {
      [fieldname: string]: Express.Multer.File[];
  };
}

interface MenuItem {
  name: string;
  price: string;
  calories: string;
  description: string;
}

export const getRestaurantDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Fetch the restaurant details
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    console.log(restaurant);

    // Fetch the corresponding menu using the string version of the restaurant's _id
    const menu = await Menu.findOne({ restaurantId: restaurant._id.toString() });
    if (!menu) {
      console.log(`No menu found for restaurant ID: ${restaurant._id.toString()}`);
      return res.status(404).json({ message: 'Menu not found for this restaurant' });
    }

    // Combine restaurant and menu data
    const restaurantDetails = {
      ...restaurant.toObject(),
      menu: menu.menu // Directly access the menu object
    };

    res.status(200).json(restaurantDetails);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
      const imageId = req.params.imageId;
      if (!imageId) {
          throw new Error('Image ID is required');
      }

      const imageStream = await getImageFromGridFS(imageId);
      res.setHeader('Content-Type', 'image/png');
      imageStream.pipe(res);
  } catch (error) {
      console.error('Failed to retrieve image:', error);
      res.status(500).send('Internal Server Error');
  }
};

export const getCompanyNames = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // Step 1: Fetch all companies
    const companies = await COMPANY.find();

    // Step 4: Respond with the enhanced company objects
    res.status(200).json(companies);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const getRestaurantNames = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const restaurants = await RESTAURANT.find();

    res.status(200).json(restaurants);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
}

export const getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }

    // Step 1: Fetch all companies
    const companies = await COMPANY.find();

    console.log(companies);

    // Step 2: Get all users
    const users = await DASHBOARDUSER.find();

    // Step 3: Add manager and employee counts to each company
    const companiesWithUserCounts = companies.map(company => {
      const companyUsers = users.filter(user => {
        try {
          const userCompanyId = ObjectId(`${user.companyId}`) // Convert user.companyId to ObjectId
          return userCompanyId.equals(company._id);
        } catch (err) {
          // If conversion fails, the user.companyId is not valid
          return false;
        }
      });
      const managersCount = companyUsers.filter(user => user.status === 'manager').length;
      const employeesCount = companyUsers.filter(user => user.status === 'employee').length;

      // Add counts to company object
      return {
        ...company.toObject(), // Convert Mongoose document to plain JavaScript object
        managersCount,
        employeesCount,
      };
    });

    // Step 4: Respond with the enhanced company objects
    res.status(200).json(companiesWithUserCounts);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Task 6 - user table should be updated; users need pool of restaurants

export const getAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }

    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
  const { name, domain, location, managerName, managerEmail, numberOfEmployees, billingCycle, monthlyCost, invitationCode, status } = req.body;
  try {
    const company = new Company({
      name,
      domain,
      location,
      managerName,
      managerEmail,
      numberOfEmployees,
      billingCycle,
      monthlyCost,
      invitationCode,
      status,
    });

    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Failed to create company:', error);
    res.status(500).json({ message: "Failed to create company", error: error });
  }
};

export const createRestaurant = async (req: MulterReq, res: Response, next: NextFunction) => {
  console.log("show me req.files:", req.files);

  if (!req.files || !req.files.logo) {
    return res.status(400).json({ message: "Logo file is required." });
  }

  const { name, location, managerName, managerEmail, category } = req.body;

  let logoId;

  try {
    if (req.files.logo) {
      logoId = await saveImageToGridFS(req.files.logo[0].buffer, req.files.logo[0].originalname, req.files.logo[0].mimetype);
    }

    if (!logoId) {
      throw new Error("Failed to save images");
    }

    const restaurant = new Restaurant({
      name,
      location,
      managerName,
      managerEmail,
      category,
      logo: logoId
    });

    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    res.status(500).json({ message: "Failed to create restaurant", error: error });
  }
};

// Get individual company
export const getCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Edit company
export const editCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, domain, location, managerName, managerEmail, numberOfEmployees, billingCycle, monthlyCost, status } = req.body;

    const updateData = {
        name,
        domain,
        location,
        managerName,
        managerEmail,
        numberOfEmployees,
        billingCycle,
        monthlyCost,
        status,
    };

    const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCompany) {
        return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(updatedCompany);
  } catch (err) {
      console.error('Failed to update company:', err);
      res.status(500).json({ message: "Failed to update company", error: err });
  }
};

export const editRestaurant = async (req: MulterReq, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, location, managerName, managerEmail, category } = req.body;

    let logoId: string | undefined;
    if (req.files?.logo) {
      const logoFile = req.files.logo[0];
      logoId = await saveImageToGridFS(logoFile.buffer, logoFile.originalname, logoFile.mimetype);
    }
    const updateData = {
      name,
      location,
      managerName,
      managerEmail,
      category,
      ...(logoId && { logo: logoId })
    };

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(updatedRestaurant);
  } catch (err) {
    console.error('Failed to update restaurant:', err);
    res.status(500).json({ message: "Failed to update restaurant", error: err });
  }
};

// Delete company
export const deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const createMenu = async (req: MulterReq, res: Response, next: NextFunction) => {
  console.log("show me req.files:", req.files);
  try {
    const { restaurantId, restaurantName, type, name, price, calories, description, discount } = req.body;

    let barcodeId;
    let imageId;

    if (discount === 'true') {
      if (!req.files || !req.files.barcode) {
        return res.status(400).json({ message: "Barcode file is required when discount is true." });
      }

      barcodeId = await saveImageToGridFS(req.files.barcode[0].buffer, req.files.barcode[0].originalname, req.files.barcode[0].mimetype);
    }

    if (req.files?.image) {
      imageId = await saveImageToGridFS(req.files.image[0].buffer, req.files.image[0].originalname, req.files.image[0].mimetype);
    }

    const newItem = {
      price,
      calories,
      description,
      discount: discount === 'true',
      barcode: barcodeId || null,
      image: imageId || null
    };

    let menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      const newMenu = new Menu({
        restaurantId,
        restaurantName,
        menu: { [type]: { [name]: newItem } },
      });

      const savedMenu = await newMenu.save();
      return res.status(201).json({ message: "Menu created successfully.", menu: savedMenu });
    } else {
      if (!menu.menu[type]) {
        menu.menu[type] = {};
      }

      menu.menu[type][name] = newItem;

      const updatedMenu = await Menu.updateOne(
        { restaurantId },
        { $set: { [`menu.${type}`]: menu.menu[type] } }
      );

      return res.status(200).json({ message: "Menu item added successfully.", menu: updatedMenu });
    }
  } catch (err) {
    console.error("Error creating/updating menu:", err);
    next(err);
  }
};

export const getCompanyTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const transactions = await TRANSACTION.find({ companyId: id });
    res.status(200).json(transactions);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const getCompanyPopularProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req?.user as dashboardUserDocument;
        const { id } = req.params;
        const popularProducts = await TRANSACTION.aggregate([
            { $match: { companyId: id } },
            {
                $group: {
                    _id: '$productName',
                    totalQuantitySold: { $sum: '$quantity' }
                }
            },
            { $sort: { totalQuantitySold: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json(popularProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};






// Get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }

    const users = await DASHBOARDUSER.find({ status: { $ne: 'admin' } });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }


    // Fetch company details for each user
    const usersWithCompany = await Promise.all(
      users.map(async (user: dashboardUserDocument) => {
        try {
          const companyDetails = await COMPANY.findById(user.companyId);
          return {
            ...user.toObject(),
            companyDetails: companyDetails ? companyDetails.toObject() : null
          };
        } catch (error) {
          Logger.error(`Error fetching company details for user ${user._id}:`);
          return null;
        }
      })
    );

    res.status(200).json(usersWithCompany.filter(Boolean)); // Filter out null entries
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const authUser = req?.user as dashboardUserDocument;
    if (authUser.status !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }

    console.log("status",req.query)
    const { status } = req?.query;

    const users = await DASHBOARDUSER.find({status});
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Fetch company details for each user
    const usersWithCompany = await Promise.all(
      users.map(async (user: dashboardUserDocument) => {
        try {
          const companyDetails = await COMPANY.findById(user.companyId);
          return {
            ...user.toObject(),
            companyDetails: companyDetails ? companyDetails.toObject() : null
          };
        } catch (error) {
          Logger.error(`Error fetching company details for user ${user._id}:`);
          return null;
        }
      })
    );

    res.status(200).json(usersWithCompany.filter(Boolean)); // Filter out null entries
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Create a new user
export const createManager = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { email, password, name , companyId } = req.body;
    const manager = new DASHBOARDUSER({ email, password , name , status:'manager', companyId });
    const newManager = await manager.save();
    res.status(201).json(newManager);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Get individual user by ID
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (authUser.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const user = await DASHBOARDUSER.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const companyDetails = await COMPANY.findById(user.companyId);
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found for the notification' });
    }

    // Include company details within the notification object
    const userWithCompany = {
      ...user.toObject(),
      companyDetails: companyDetails.toObject()
    };

    res.status(200).json(userWithCompany);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Update user by ID
export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (authUser.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await DASHBOARDUSER.findByIdAndUpdate(id, { email, password: hashedPassword, name }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const deletedUser = await DASHBOARDUSER.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};






// Get all notifications
export const getAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const notifications = await NOTIFICATION.find();
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    // Fetch company details for each notification
    const notificationsWithCompany = await Promise.all(
      notifications.map(async (notification: notificationDocument) => {
        try {
          const companyDetails = await COMPANY.findById(notification.company);
          return {
            ...notification.toObject(),
            companyDetails: companyDetails ? companyDetails.toObject() : null
          };
        } catch (error) {
          Logger.error(`Error fetching company details for notification ${notification._id}:`);
          return null;
        }
      })
    );

    res.status(200).json(notificationsWithCompany.filter(Boolean)); // Filter out null entries
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Create a new notification
export const createNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { company, text } = req.body;
    const notification = new NOTIFICATION({ company, text });
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Get individual notification by ID
export const getNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const notification = await NOTIFICATION.findById(id)
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    const companyDetails = await COMPANY.findById(notification.company);
    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found for the notification' });
    }

    // Include company details within the notification object
    const notificationWithCompany = {
      ...notification.toObject(),
      companyDetails: companyDetails.toObject()
    };

    res.status(200).json(notificationWithCompany);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Update notification by ID
export const updateNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const { text } = req.body;
    const updatedNotification = await NOTIFICATION.findByIdAndUpdate(id, { text }, { new: true });
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(updatedNotification);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Delete notification by ID
export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'admin') {
    return res.status(403).json({ message: 'Only admin users can access this endpoint' });
    }
    const { id } = req.params;
    const deletedNotification = await NOTIFICATION.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};



// Get all employees
export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'manager') {
    return res.status(403).json({ message: 'Only manger users can access this endpoint' });
    }

    const companyId = user.companyId

    console.log(companyId)
    const employees = await DASHBOARDUSER.find({ status: 'employee', companyId: companyId });
    res.status(200).json(employees);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Create an employee
export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'manager') {
    return res.status(403).json({ message: 'Only manger users can access this endpoint' });
    }
    const { name, email } = req.body;
    const employee = new DASHBOARDUSER({ name, email, status: 'employee' });
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Get individual employee by ID
export const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'manager') {
    return res.status(403).json({ message: 'Only manger users can access this endpoint' });
    }
    const { id } = req.params;
    const employee = await DASHBOARDUSER.findById(id);
    if (!employee || employee.status !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Update employee by ID
export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'manager') {
    return res.status(403).json({ message: 'Only manger users can access this endpoint' });
    }
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedEmployee = await DASHBOARDUSER.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!updatedEmployee || updatedEmployee.status !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Delete employee by ID
export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'manager') {
    return res.status(403).json({ message: 'Only manger users can access this endpoint' });
    }
    const { id } = req.params;
    const deletedEmployee = await DASHBOARDUSER.findByIdAndDelete(id);
    if (!deletedEmployee || deletedEmployee.status !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const getAllCompanyNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument;

    // Get companyId from user
    const companyId = user.companyId;
    if (!companyId) {
      return res.status(400).json({ message: 'User does not belong to any company' });
    }

    // Fetch notifications for the company
    const notifications = await NOTIFICATION.find({ company: companyId });

    // Return an empty array if no notifications are found
    if (!notifications) {
      return res.status(200).json([]);
    }

    res.status(200).json(notifications);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Get all transactions
export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    
    const transactions = await TRANSACTION.find({ companyId: user.companyId });
    res.status(200).json(transactions);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Create a new transaction
export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    if (user.status !== 'manager') {
    return res.status(403).json({ message: 'Only manger users can access this endpoint' });
    }
    const { productName, quantity, profit,productCost, discount , date } = req.body;
    const transaction = new TRANSACTION({ companyId:user.companyId,userId:user._id, productName, quantity, profit,productCost, discount , date});
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

// Get a transaction by ID
export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
    const { id } = req.params;
    const transaction = await TRANSACTION.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

export const getPopularProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req?.user as dashboardUserDocument; // Assuming you have a middleware to populate req.user with the user document
        
        // Aggregate data to calculate total quantity sold for each product of the specific company
        const popularProducts = await TRANSACTION.aggregate([
            { $match: { companyId: user.companyId } }, // Match transactions for the specific company
            {
                $group: {
                    _id: '$productName',
                    totalQuantitySold: { $sum: '$quantity' }
                }
            },
            // Sort by total quantity sold in descending order
            { $sort: { totalQuantitySold: -1 } },
            // Limit to top 5 products
            { $limit: 5 }
        ]);

        res.status(200).json(popularProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getDashboardCompanyDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.params.companyId; // Assuming companyId is provided in the path

    // Fetch all transactions for the company
    const transactions = await TRANSACTION.find({ companyId });

    // Aggregate data to calculate total quantity sold for each product of the specific company
    const popularProducts = await TRANSACTION.aggregate([
      { $match: { companyId } }, // Match transactions for the specific company
      {
        $group: {
          _id: '$productName',
          totalQuantitySold: { $sum: '$quantity' }
        }
      },
      // Sort by total quantity sold in descending order
      { $sort: { totalQuantitySold: -1 } },
      // Limit to top 5 products
      { $limit: 5 }
    ]);

    res.status(200).json({ transactions, popularProducts });
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};