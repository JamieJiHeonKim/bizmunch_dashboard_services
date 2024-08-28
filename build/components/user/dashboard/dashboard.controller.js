"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardCompanyDetails = exports.getPopularProducts = exports.getTransaction = exports.createTransaction = exports.getAllTransactions = exports.getAllCompanyNotifications = exports.deleteEmployee = exports.updateEmployee = exports.getEmployee = exports.createEmployee = exports.getAllEmployees = exports.deleteNotification = exports.updateNotification = exports.getNotification = exports.createNotification = exports.getAllNotifications = exports.deleteUser = exports.editUser = exports.getUser = exports.createManager = exports.searchUsers = exports.getAllUsers = exports.getCompanyPopularProducts = exports.getCompanyTransaction = exports.createMenu = exports.deleteRestaurant = exports.deleteCompany = exports.editRestaurant = exports.editCompany = exports.getRestaurant = exports.getCompany = exports.createRestaurant = exports.createCompany = exports.getAllRestaurants = exports.getAllCompanies = exports.getRestaurantNames = exports.getCompanyNames = exports.getImage = exports.getRestaurantDetails = void 0;
const Company_1 = require("../../../models/Company");
const Restaurant_1 = require("../../../models/Restaurant");
const Menu_1 = require("../../../models/Menu");
const mongo_1 = require("../../../middleware/mongo");
const { GridFSBucket, ObjectId } = require('mongodb');
const log4_1 = require("../../../middleware/log4");
const models_1 = require("../../../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getRestaurantDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Fetch the restaurant details
        const restaurant = yield Restaurant_1.Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        console.log(restaurant);
        // Fetch the corresponding menu using the string version of the restaurant's _id
        const menu = yield Menu_1.Menu.findOne({ restaurantId: restaurant._id.toString() });
        if (!menu) {
            console.log(`No menu found for restaurant ID: ${restaurant._id.toString()}`);
            return res.status(404).json({ message: 'Menu not found for this restaurant' });
        }
        // Combine restaurant and menu data
        const restaurantDetails = Object.assign(Object.assign({}, restaurant.toObject()), { menu: menu.menu // Directly access the menu object
         });
        res.status(200).json(restaurantDetails);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getRestaurantDetails = getRestaurantDetails;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageId = req.params.imageId;
        if (!imageId) {
            throw new Error('Image ID is required');
        }
        const imageStream = yield (0, mongo_1.getImageFromGridFS)(imageId);
        res.setHeader('Content-Type', 'image/png');
        imageStream.pipe(res);
    }
    catch (error) {
        console.error('Failed to retrieve image:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getImage = getImage;
const getCompanyNames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Fetch all companies
        const companies = yield models_1.COMPANY.find();
        // Step 4: Respond with the enhanced company objects
        res.status(200).json(companies);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getCompanyNames = getCompanyNames;
const getRestaurantNames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Fetch all restaurants
        const restaurants = yield models_1.RESTAURANT.find();
        res.status(200).json(restaurants);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getRestaurantNames = getRestaurantNames;
const getAllCompanies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        // Step 1: Fetch all companies
        const companies = yield models_1.COMPANY.find();
        console.log(companies);
        // Step 2: Get all users
        const users = yield models_1.DASHBOARDUSER.find();
        // Step 3: Add manager and employee counts to each company
        const companiesWithUserCounts = companies.map(company => {
            const companyUsers = users.filter(user => {
                try {
                    const userCompanyId = ObjectId(`${user.companyId}`); // Convert user.companyId to ObjectId
                    return userCompanyId.equals(company._id);
                }
                catch (err) {
                    // If conversion fails, the user.companyId is not valid
                    return false;
                }
            });
            const managersCount = companyUsers.filter(user => user.status === 'manager').length;
            const employeesCount = companyUsers.filter(user => user.status === 'employee').length;
            // Add counts to company object
            return Object.assign(Object.assign({}, company.toObject()), { // Convert Mongoose document to plain JavaScript object
                managersCount,
                employeesCount });
        });
        // Step 4: Respond with the enhanced company objects
        res.status(200).json(companiesWithUserCounts);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getAllCompanies = getAllCompanies;
// Task 6 - user table should be updated; users need pool of restaurants
const getAllRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const restaurants = yield Restaurant_1.Restaurant.find();
        res.status(200).json(restaurants);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getAllRestaurants = getAllRestaurants;
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, domain, location, managerName, managerEmail, numberOfEmployees, billingCycle, monthlyCost, invitationCode, status } = req.body;
    try {
        const company = new Company_1.Company({
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
        const newCompany = yield company.save();
        res.status(201).json(newCompany);
    }
    catch (error) {
        console.error('Failed to create company:', error);
        res.status(500).json({ message: "Failed to create company", error: error });
    }
});
exports.createCompany = createCompany;
const createRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("show me req.files:", req.files);
    if (!req.files || !req.files.logo || !req.files.barcode) {
        return res.status(400).json({ message: "Both logo and barcode files are required." });
    }
    const { name, location, managerName, managerEmail, category } = req.body;
    let logoId, barcodeId;
    try {
        if (req.files.logo) {
            logoId = yield (0, mongo_1.saveImageToGridFS)(req.files.logo[0].buffer, req.files.logo[0].originalname, req.files.logo[0].mimetype);
        }
        if (req.files.barcode) {
            barcodeId = yield (0, mongo_1.saveImageToGridFS)(req.files.barcode[0].buffer, req.files.barcode[0].originalname, req.files.barcode[0].mimetype);
        }
        if (!logoId || !barcodeId) {
            throw new Error("Failed to save images");
        }
        const restaurant = new Restaurant_1.Restaurant({
            name,
            location,
            managerName,
            managerEmail,
            category,
            logo: logoId,
            barcode: barcodeId
        });
        const newRestaurant = yield restaurant.save();
        res.status(201).json(newRestaurant);
    }
    catch (error) {
        console.error('Failed to create restaurant:', error);
        res.status(500).json({ message: "Failed to create restaurant", error: error });
    }
});
exports.createRestaurant = createRestaurant;
// Get individual company
const getCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const company = yield Company_1.Company.findById(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getCompany = getCompany;
const getRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const restaurant = yield Restaurant_1.Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getRestaurant = getRestaurant;
// Edit company
const editCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedCompany = yield Company_1.Company.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(updatedCompany);
    }
    catch (err) {
        console.error('Failed to update company:', err);
        res.status(500).json({ message: "Failed to update company", error: err });
    }
});
exports.editCompany = editCompany;
const editRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const { name, location, managerName, managerEmail, category } = req.body;
        let logoId, barcodeId;
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.logo) {
            const logoFile = req.files.logo[0];
            logoId = yield (0, mongo_1.saveImageToGridFS)(logoFile.buffer, logoFile.originalname, logoFile.mimetype);
        }
        if ((_b = req.files) === null || _b === void 0 ? void 0 : _b.barcode) {
            const barcodeFile = req.files.barcode[0];
            barcodeId = yield (0, mongo_1.saveImageToGridFS)(barcodeFile.buffer, barcodeFile.originalname, barcodeFile.mimetype);
        }
        const updateData = Object.assign(Object.assign({ name,
            location,
            managerName,
            managerEmail,
            category }, (logoId && { logo: logoId })), (barcodeId && { barcode: barcodeId }));
        const updatedRestaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(updatedRestaurant);
    }
    catch (err) {
        console.error('Failed to update restaurant:', err);
        res.status(500).json({ message: "Failed to update restaurant", error: err });
    }
});
exports.editRestaurant = editRestaurant;
// Delete company
const deleteCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const deletedCompany = yield Company_1.Company.findByIdAndDelete(id);
        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.deleteCompany = deleteCompany;
const deleteRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const deletedRestaurant = yield Restaurant_1.Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.deleteRestaurant = deleteRestaurant;
const createMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId, restaurantName, type, name, price, calories, ingredients } = req.body;
        if (!type || !name || !price || !calories || !restaurantName) {
            return res.status(400).json({ message: "Menu type, item name, price, calories, and restaurant name are required." });
        }
        const newItem = {
            price,
            calories,
            ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        };
        let menu = yield Menu_1.Menu.findOne({ restaurantId });
        if (!menu) {
            const newMenu = new Menu_1.Menu({
                restaurantId,
                restaurantName,
                menu: { [type]: { [name]: newItem } },
            });
            const savedMenu = yield newMenu.save();
            console.log("New menu created and saved:", savedMenu);
            return res.status(201).json({ message: "Menu created successfully.", menu: savedMenu });
        }
        else {
            // Ensure the menu type exists
            if (!menu.menu[type]) {
                menu.menu[type] = {};
            }
            console.log("Existing menu before adding new item:", JSON.stringify(menu.menu, null, 2));
            // Add or update the specific item in the menu
            menu.menu[type][name] = newItem;
            // Another debugging log to ensure the item is added
            console.log("Updated menu with new item added:", JSON.stringify(menu.menu, null, 2));
            // Force the update using updateOne
            const result = yield Menu_1.Menu.updateOne({ restaurantId }, { $set: { [`menu.${type}`]: menu.menu[type] } });
            console.log("Result of the update operation:", result);
            // Re-fetch the updated menu to confirm the changes
            const updatedMenu = yield Menu_1.Menu.findOne({ restaurantId });
            return res.status(200).json({ message: "Menu item added successfully.", menu: updatedMenu });
        }
    }
    catch (err) {
        console.error("Error creating/updating menu:", err);
        next(err);
    }
});
exports.createMenu = createMenu;
const getCompanyTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const transactions = yield models_1.TRANSACTION.find({ companyId: id });
        res.status(200).json(transactions);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getCompanyTransaction = getCompanyTransaction;
const getCompanyPopularProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        const { id } = req.params;
        const popularProducts = yield models_1.TRANSACTION.aggregate([
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getCompanyPopularProducts = getCompanyPopularProducts;
// Get all users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const users = yield models_1.DASHBOARDUSER.find({ status: { $ne: 'admin' } });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        // Fetch company details for each user
        const usersWithCompany = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const companyDetails = yield models_1.COMPANY.findById(user.companyId);
                return Object.assign(Object.assign({}, user.toObject()), { companyDetails: companyDetails ? companyDetails.toObject() : null });
            }
            catch (error) {
                log4_1.Logger.error(`Error fetching company details for user ${user._id}:`);
                return null;
            }
        })));
        res.status(200).json(usersWithCompany.filter(Boolean)); // Filter out null entries
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
const searchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUser = req === null || req === void 0 ? void 0 : req.user;
        if (authUser.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        console.log("status", req.query);
        const { status } = req === null || req === void 0 ? void 0 : req.query;
        const users = yield models_1.DASHBOARDUSER.find({ status });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        // Fetch company details for each user
        const usersWithCompany = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const companyDetails = yield models_1.COMPANY.findById(user.companyId);
                return Object.assign(Object.assign({}, user.toObject()), { companyDetails: companyDetails ? companyDetails.toObject() : null });
            }
            catch (error) {
                log4_1.Logger.error(`Error fetching company details for user ${user._id}:`);
                return null;
            }
        })));
        res.status(200).json(usersWithCompany.filter(Boolean)); // Filter out null entries
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.searchUsers = searchUsers;
// Create a new user
const createManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { email, password, name, companyId } = req.body;
        const manager = new models_1.DASHBOARDUSER({ email, password, name, status: 'manager', companyId });
        const newManager = yield manager.save();
        res.status(201).json(newManager);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.createManager = createManager;
// Get individual user by ID
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUser = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (authUser.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const user = yield models_1.DASHBOARDUSER.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const companyDetails = yield models_1.COMPANY.findById(user.companyId);
        if (!companyDetails) {
            return res.status(404).json({ message: 'Company details not found for the notification' });
        }
        // Include company details within the notification object
        const userWithCompany = Object.assign(Object.assign({}, user.toObject()), { companyDetails: companyDetails.toObject() });
        res.status(200).json(userWithCompany);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getUser = getUser;
// Update user by ID
const editUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUser = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (authUser.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const { email, password, name } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const updatedUser = yield models_1.DASHBOARDUSER.findByIdAndUpdate(id, { email, password: hashedPassword, name }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.editUser = editUser;
// Delete user by ID
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const deletedUser = yield models_1.DASHBOARDUSER.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.deleteUser = deleteUser;
// Get all notifications
const getAllNotifications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const notifications = yield models_1.NOTIFICATION.find();
        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found' });
        }
        // Fetch company details for each notification
        const notificationsWithCompany = yield Promise.all(notifications.map((notification) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const companyDetails = yield models_1.COMPANY.findById(notification.company);
                return Object.assign(Object.assign({}, notification.toObject()), { companyDetails: companyDetails ? companyDetails.toObject() : null });
            }
            catch (error) {
                log4_1.Logger.error(`Error fetching company details for notification ${notification._id}:`);
                return null;
            }
        })));
        res.status(200).json(notificationsWithCompany.filter(Boolean)); // Filter out null entries
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getAllNotifications = getAllNotifications;
// Create a new notification
const createNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { company, text } = req.body;
        const notification = new models_1.NOTIFICATION({ company, text });
        const newNotification = yield notification.save();
        res.status(201).json(newNotification);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.createNotification = createNotification;
// Get individual notification by ID
const getNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const notification = yield models_1.NOTIFICATION.findById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        const companyDetails = yield models_1.COMPANY.findById(notification.company);
        if (!companyDetails) {
            return res.status(404).json({ message: 'Company details not found for the notification' });
        }
        // Include company details within the notification object
        const notificationWithCompany = Object.assign(Object.assign({}, notification.toObject()), { companyDetails: companyDetails.toObject() });
        res.status(200).json(notificationWithCompany);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getNotification = getNotification;
// Update notification by ID
const updateNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const { text } = req.body;
        const updatedNotification = yield models_1.NOTIFICATION.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(updatedNotification);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.updateNotification = updateNotification;
// Delete notification by ID
const deleteNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can access this endpoint' });
        }
        const { id } = req.params;
        const deletedNotification = yield models_1.NOTIFICATION.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.deleteNotification = deleteNotification;
// Get all employees
const getAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'manager') {
            return res.status(403).json({ message: 'Only manger users can access this endpoint' });
        }
        const companyId = user.companyId;
        console.log(companyId);
        const employees = yield models_1.DASHBOARDUSER.find({ status: 'employee', companyId: companyId });
        res.status(200).json(employees);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getAllEmployees = getAllEmployees;
// Create an employee
const createEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'manager') {
            return res.status(403).json({ message: 'Only manger users can access this endpoint' });
        }
        const { name, email } = req.body;
        const employee = new models_1.DASHBOARDUSER({ name, email, status: 'employee' });
        const newEmployee = yield employee.save();
        res.status(201).json(newEmployee);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.createEmployee = createEmployee;
// Get individual employee by ID
const getEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'manager') {
            return res.status(403).json({ message: 'Only manger users can access this endpoint' });
        }
        const { id } = req.params;
        const employee = yield models_1.DASHBOARDUSER.findById(id);
        if (!employee || employee.status !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getEmployee = getEmployee;
// Update employee by ID
const updateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'manager') {
            return res.status(403).json({ message: 'Only manger users can access this endpoint' });
        }
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedEmployee = yield models_1.DASHBOARDUSER.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!updatedEmployee || updatedEmployee.status !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.updateEmployee = updateEmployee;
// Delete employee by ID
const deleteEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'manager') {
            return res.status(403).json({ message: 'Only manger users can access this endpoint' });
        }
        const { id } = req.params;
        const deletedEmployee = yield models_1.DASHBOARDUSER.findByIdAndDelete(id);
        if (!deletedEmployee || deletedEmployee.status !== 'employee') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.deleteEmployee = deleteEmployee;
const getAllCompanyNotifications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        // Get companyId from user
        const companyId = user.companyId;
        if (!companyId) {
            return res.status(400).json({ message: 'User does not belong to any company' });
        }
        // Fetch notifications for the company
        const notifications = yield models_1.NOTIFICATION.find({ company: companyId });
        // Return an empty array if no notifications are found
        if (!notifications) {
            return res.status(200).json([]);
        }
        res.status(200).json(notifications);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getAllCompanyNotifications = getAllCompanyNotifications;
// Get all transactions
const getAllTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        const transactions = yield models_1.TRANSACTION.find({ companyId: user.companyId });
        res.status(200).json(transactions);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getAllTransactions = getAllTransactions;
// Create a new transaction
const createTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        if (user.status !== 'manager') {
            return res.status(403).json({ message: 'Only manger users can access this endpoint' });
        }
        const { productName, quantity, profit, productCost, discount, date } = req.body;
        const transaction = new models_1.TRANSACTION({ companyId: user.companyId, userId: user._id, productName, quantity, profit, productCost, discount, date });
        const newTransaction = yield transaction.save();
        res.status(201).json(newTransaction);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.createTransaction = createTransaction;
// Get a transaction by ID
const getTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        const { id } = req.params;
        const transaction = yield models_1.TRANSACTION.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getTransaction = getTransaction;
const getPopularProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user; // Assuming you have a middleware to populate req.user with the user document
        // Aggregate data to calculate total quantity sold for each product of the specific company
        const popularProducts = yield models_1.TRANSACTION.aggregate([
            { $match: { companyId: user.companyId } },
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getPopularProducts = getPopularProducts;
const getDashboardCompanyDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.params.companyId; // Assuming companyId is provided in the path
        // Fetch all transactions for the company
        const transactions = yield models_1.TRANSACTION.find({ companyId });
        // Aggregate data to calculate total quantity sold for each product of the specific company
        const popularProducts = yield models_1.TRANSACTION.aggregate([
            { $match: { companyId } },
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
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.getDashboardCompanyDetails = getDashboardCompanyDetails;
//# sourceMappingURL=dashboard.controller.js.map