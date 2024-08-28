export type HolidayTime = {
  is2Days: boolean;
  hours1: number;
  isDay1Holiday: boolean;
  hours2?: number;
  isDay2Holiday?: boolean;
};

export type DiscountTime = {
  isDiscount: boolean;
  is2Days: boolean;
  before10pm?: number;
  before0am?: number;
  before10am?: number;
  after10am?: number;
};

export type ReservationFilter = (
  | {
      $match: {
        boothId: string;
      };
    }
  | {
      $match: {
        'booth.salonId': string;
      };
    }
  | {
      $match: {
        userId: string;
      };
    }
  | {
      $match: {
        startTime: {
          $gte: Date;
          $lte: Date;
        };
      };
    }
  | {
      $match: {
        startTime: {
          $gte: Date;
        };
      };
    }
  | {
      $match: {
        startTime: {
          $lte: Date;
        };
      };
    }
  | {
      $match: {
        status: {
          $in: number[];
        };
      };
    }
  | {
      $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
      };
    }
  | {
      $unwind: string;
    }
  | {
      $match: {
        'salon.adminId': string;
      };
    }
)[];

export type UserFilter = {
  name?: { $regex: RegExp; $options: string };
  prefecture?: string;
  status?: number | { $in: number[] };
  type?: number | { $in: number[] };
};

export type AdminFilter = {
  select: { password: number };
};

export type SalonFilter = (
  | {
      $geoNear: {
        near: {
          type: string;
          coordinates: number[];
        };
        distanceField: string;
        spherical: boolean;
      };
    }
  | {
      $match: {
        prefecture: string;
        status?: number;
        deletedAt: null;
      };
    }
  | {
      $match: {
        status?: number;
        deletedAt: null;
      };
    }
  | {
      $match: {
        adminId: string;
        status?: number;
        deletedAt: null;
      };
    }
  | {
      $match: {
        adminId: string;
        prefecture: string;
        status?: number;
        deletedAt: null;
      };
    }
  | {
      $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
      };
    }
  | {
      $project: {
        'admin.password': number;
      };
    }
  | {
      $unwind: string;
    }
  | {
      $match: {
        status: number;
      };
    }
)[];
