import { AxiosRequestConfig } from 'axios';



export type GeoDocument = {
  type: 'Point';
  coordinates: number[];
};

export type ImagePaths = {
  path1: string;
  path2: string | null;
  path3: string | null;
  path4: string | null;
  path5: string | null;
};

export type PriceDetail = {
  totalTime: number;
  totalSlot: number;
  totalBase: number;
  totalBasePrice: number;
  totalExtraCharge: number;
  totalExtraChargePrice: number;
  totalDiscount: number;
  totalDiscountPrice: number;
  totalDiscountOnWeekend: number;
  totalDiscountOnWeekendPrice: number;
  serviceFee: number;
  taxRate: number;
  salesTax: number;
  totalCost: number;
};

export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

export type TotalPrices = {
  totalBase: number;
  totalDiscount: number;
  totalExtraCharge: number;
  totalDiscountOnWeekend: number;
};

export type ApiConfig = AxiosRequestConfig & {
  urlParams?: any;
};
