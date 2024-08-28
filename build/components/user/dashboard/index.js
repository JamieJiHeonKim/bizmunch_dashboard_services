"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const authUser_1 = require("../../../middleware/authUser");
const controller = __importStar(require("./dashboard.controller"));
const router = express.Router();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
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
router.get('/companyNames', controller.getCompanyNames);
router.get('/restaurantNames', controller.getRestaurantNames);
// Get all companies
router.get('/companies', authUser_1.authUser, controller.getAllCompanies);
router.get('/restaurants', authUser_1.authUser, controller.getAllRestaurants);
// Get restaurant details
router.get('/restaurant/:id/details', controller.getRestaurantDetails);
// create a company
router.post('/companies', authUser_1.authUser, controller.createCompany);
router.post('/restaurants', authUser_1.authUser, upload, controller.createRestaurant);
router.post('/menu/:restaurantId', authUser_1.authUser, controller.createMenu);
// Get individual company
router.get('/companies/:id', authUser_1.authUser, controller.getCompany);
router.get('/restaurants/:id', authUser_1.authUser, controller.getRestaurant);
// Edit company
router.put('/companies/:id', authUser_1.authUser, upload, controller.editCompany);
router.put('/restaurants/:id', authUser_1.authUser, upload, controller.editRestaurant);
// Delete company
router.delete('/companies/:id', authUser_1.authUser, controller.deleteCompany);
router.delete('/restaurants/:id', authUser_1.authUser, controller.deleteRestaurant);
router.get('/companies/:id/transaction', authUser_1.authUser, controller.getCompanyTransaction);
router.get('/companies/:id/getCompanyPopularProduct', authUser_1.authUser, controller.getCompanyPopularProducts);
// Get all users
router.get('/users', authUser_1.authUser, controller.getAllUsers);
router.get('/user/search', authUser_1.authUser, controller.searchUsers);
// Create a new manager
router.post('/managers', authUser_1.authUser, controller.createManager);
// Get individual user by ID
router.get('/user/:id', authUser_1.authUser, controller.getUser);
// Update user by ID
router.put('/user/:id', authUser_1.authUser, controller.editUser);
// Delete user by ID
router.delete('/user/:id', authUser_1.authUser, controller.deleteUser);
// Get all notifications
router.get('/notifications', authUser_1.authUser, controller.getAllNotifications);
// Create a new notification
router.post('/notifications', authUser_1.authUser, controller.createNotification);
// Get individual notification by ID
router.get('/notifications/:id', authUser_1.authUser, controller.getNotification);
// Update notification by ID
router.put('/notifications/:id', authUser_1.authUser, controller.updateNotification);
// Delete notification by ID
router.delete('/notifications/:id', authUser_1.authUser, controller.deleteNotification);
// Get all employees
router.get('/employees', authUser_1.authUser, controller.getAllEmployees);
// Get individual employee
router.get('/employees/:id', authUser_1.authUser, controller.getEmployee);
// Update employee
router.put('/employees/:id', authUser_1.authUser, controller.updateEmployee);
// Delete employee
router.delete('/employees/:id', authUser_1.authUser, controller.deleteEmployee);
router.get('/companyNotifications', authUser_1.authUser, controller.getAllCompanyNotifications);
// Get all transactions
router.get('/transactions', authUser_1.authUser, controller.getAllTransactions);
// Create a new transaction
router.post('/transactions', authUser_1.authUser, controller.createTransaction);
// Get a transaction by ID
router.get('/transactions/:id', authUser_1.authUser, controller.getTransaction);
router.get('/popularProducts', authUser_1.authUser, controller.getPopularProducts);
router.get('/dashboardCompanyDetails/:companyId', authUser_1.authUser, controller.getDashboardCompanyDetails);
// Image retrieval endpoint
router.get('/images/:imageId', authUser_1.authUser, controller.getImage);
exports.default = router;
//# sourceMappingURL=index.js.map