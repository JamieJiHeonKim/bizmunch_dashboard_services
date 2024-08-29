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
exports.getImageFromGridFS = exports.saveImageToGridFS = exports.connectMongo = exports.mongoUri = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
// import { Logger } from ‘./log4’;
mongoose_1.default.Promise = bluebird_1.default;
exports.mongoUri = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const config = {
    ssl: env_1.IS_PRODUCTION,
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
    // user: process.env.DB_USER,
    // pass: process.env.DB_PASS,
    // dbName: process.env.DB_NAME,
    // ssl: true,
};
let gfs;
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield mongoose_1.default.connect(exports.mongoUri, config);
        // Initialize GridFS once the database connection is successfully established
        gfs = new mongoose_1.default.mongo.GridFSBucket(connection.connection.db, {
            bucketName: 'uploads' // Setting the bucket name for GridFS
        });
        console.log('Connected to DB and GridFS initialized');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
});
exports.connectMongo = connectMongo;
const saveImageToGridFS = (fileBuffer, filename, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadStream = gfs.openUploadStream(filename, {
        metadata: { contentType },
        contentType: contentType
    });
    uploadStream.write(fileBuffer);
    uploadStream.end();
    return new Promise((resolve, reject) => {
        uploadStream.on('finish', (file) => resolve(file._id.toHexString()));
        uploadStream.on('error', reject);
    });
});
exports.saveImageToGridFS = saveImageToGridFS;
// Function to retrieve images from GridFS
const getImageFromGridFS = (fileId) => {
    return new Promise((resolve, reject) => {
        const id = new mongoose_1.default.Types.ObjectId(fileId);
        const stream = gfs.openDownloadStream(id);
        resolve(stream);
    });
};
exports.getImageFromGridFS = getImageFromGridFS;
//# sourceMappingURL=mongo.js.map