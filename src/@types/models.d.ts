import { refreshToken } from "./../components/admin/auth/auth.controller";
/* eslint-disable no-use-before-define */
import mongoose from "mongoose";
import {
  GeoDocument,
  ImagePaths,
  PriceDetail,
  comparePasswordFunction,
} from "./index";


export type dashboardUserDocument = mongoose.Document & {
  email: string;
  password: string;
  name: string;
  companyId: string;
  status: 'employee' | 'manager' | 'admin';
  accessToken?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type companyDocument = mongoose.Document & {
  companyId: number;
  name: string;
  domain?: string;
  location: string;
  invitationCode: string;
  managerName: string;
  managerEmail: string;
  numberOfEmployees: number;
  billingCycle: Date;
  monthlyCost: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type restaurantDocument = mongoose.Document & {
  restaurantId: number;
  name: string;
  location: string;
  managerName: string;
  managerEmail: string;
  category: string;
  logo: string;
  menuId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type menuDocument = mongoose.Document & {
  restaurantId: mongoose.Schema.Types.ObjectId;
  items: Array<{
    name: string;
    price: string;
    calories?: string;
    description?: string;
    barcode: string;
    discount: boolean;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type notificationDocument = mongoose.Document & {
  company: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type transactionDocument = mongoose.Document & {
  companyId: string;
  userId: string;
  productName: string;
  quantity: string;
  productName: string;
  profit: string;
  date: Date;
  discount: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};