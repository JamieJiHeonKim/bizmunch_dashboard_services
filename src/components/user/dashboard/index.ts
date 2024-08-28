import * as express from 'express';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { checkSchema } from 'express-validator';
import { authUser } from '../../../middleware/authUser';
import { checkValidation } from '../../utils/validation';
import * as controller from './dashboard.controller';
import {
  REGISTERATION_SCHEMA,
  LOGIN_SCHEMA,
  VERIFYEMAIL_SCHEMA,
  CHANGE_PASSWORD_SCHEMA
} from './dashboard.validation';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).fields([{ name: 'logo', maxCount: 1 }, { name: 'barcode', maxCount: 1 }]);

// const uploadMenu = multer({
//   storage: multer.memoryStorage(),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// }).single('image');


router.get('/companyNames', controller.getCompanyNames)
router.get('/restaurantNames', controller.getRestaurantNames);

// Get all companies
router.get('/companies', authUser, controller.getAllCompanies);
router.get('/restaurants', authUser, controller.getAllRestaurants);

// Get restaurant details
router.get('/restaurant/:id/details', controller.getRestaurantDetails);

// create a company
router.post('/companies', authUser, controller.createCompany);
router.post('/restaurants', authUser, upload, controller.createRestaurant as any);
router.post('/menu/:restaurantId', authUser, controller.createMenu);

// Get individual company
router.get('/companies/:id',authUser, controller.getCompany);
router.get('/restaurants/:id', authUser, controller.getRestaurant);

// Edit company
router.put('/companies/:id', authUser, upload, controller.editCompany);
router.put('/restaurants/:id', authUser, upload, controller.editRestaurant as any);

// Delete company
router.delete('/companies/:id', authUser, controller.deleteCompany);
router.delete('/restaurants/:id', authUser, controller.deleteRestaurant);

router.get('/companies/:id/transaction' , authUser, controller.getCompanyTransaction)
router.get('/companies/:id/getCompanyPopularProduct' , authUser, controller.getCompanyPopularProducts)




// Get all users
router.get('/users', authUser, controller.getAllUsers);

router.get('/user/search',authUser, controller.searchUsers);

// Create a new manager
router.post('/managers', authUser, controller.createManager);

// Get individual user by ID
router.get('/user/:id',authUser, controller.getUser);

// Update user by ID
router.put('/user/:id',authUser, controller.editUser);

// Delete user by ID
router.delete('/user/:id', authUser, controller.deleteUser);



// Get all notifications
router.get('/notifications',authUser, controller.getAllNotifications);

// Create a new notification
router.post('/notifications',authUser, controller.createNotification);

// Get individual notification by ID
router.get('/notifications/:id',authUser, controller.getNotification);

// Update notification by ID
router.put('/notifications/:id',authUser, controller.updateNotification);

// Delete notification by ID
router.delete('/notifications/:id',authUser, controller.deleteNotification);
  



// Get all employees
router.get('/employees',authUser, controller.getAllEmployees);

// Get individual employee
router.get('/employees/:id',authUser, controller.getEmployee);

// Update employee
router.put('/employees/:id',authUser, controller.updateEmployee);

// Delete employee
router.delete('/employees/:id', authUser, controller.deleteEmployee);



router.get('/companyNotifications', authUser, controller.getAllCompanyNotifications);



// Get all transactions
router.get('/transactions', authUser, controller.getAllTransactions);

// Create a new transaction
router.post('/transactions', authUser, controller.createTransaction);

// Get a transaction by ID
router.get('/transactions/:id', authUser, controller.getTransaction);

router.get('/popularProducts', authUser, controller.getPopularProducts);

router.get('/dashboardCompanyDetails/:companyId', authUser , controller.getDashboardCompanyDetails)

// Image retrieval endpoint
router.get('/images/:imageId', authUser, controller.getImage);

export default router;
