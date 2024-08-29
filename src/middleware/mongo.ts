import bluebird from "bluebird";
import mongoose, { mongo } from "mongoose";
import { GridFSBucket, ObjectId, GridFSBucketReadStream } from 'mongodb';
import { MONGO_DB_CONNECTION_STRING, IS_PRODUCTION } from "./env";
// import { Logger } from ‘./log4’;
mongoose.Promise = bluebird;
export const mongoUri = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;

interface GridFSFile {
  _id: ObjectId;
  filename: string;
  contentType: string;
  size: number;
  bucketName: string;
  uploadDate: Date;
  md5: string;
}

const config = {
  ssl: IS_PRODUCTION,
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
  // user: process.env.DB_USER,
  // pass: process.env.DB_PASS,
  // dbName: process.env.DB_NAME,
  // ssl: true,
};

let gfs: GridFSBucket;

export const connectMongo = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(mongoUri, config);
    // Initialize GridFS once the database connection is successfully established
    gfs = new mongoose.mongo.GridFSBucket(connection.connection.db, {
      bucketName: 'uploads' // Setting the bucket name for GridFS
    });
    console.log('Connected to DB and GridFS initialized');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const saveImageToGridFS = async (fileBuffer: Buffer, filename: string, contentType: string): Promise<string> => {
  const uploadStream = gfs.openUploadStream(filename, {
    metadata: { contentType },
    contentType: contentType
  });
  uploadStream.write(fileBuffer);
  uploadStream.end();
  return new Promise((resolve, reject) => {
    uploadStream.on('finish', (file: GridFSFile) => resolve(file._id.toHexString()));
    uploadStream.on('error', reject);
  });
};

// Function to retrieve images from GridFS
export const getImageFromGridFS = (fileId: string): Promise<GridFSBucketReadStream> => {
  return new Promise((resolve, reject) => {
      const id = new mongoose.Types.ObjectId(fileId);
      const stream = gfs.openDownloadStream(id);
      
      resolve(stream);
  });
}