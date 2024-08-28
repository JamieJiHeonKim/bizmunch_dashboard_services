import bcrypt from 'bcryptjs';
import { PaginateModel, Schema, model } from 'mongoose';
import { comparePasswordFunction } from '../@types/index';
import mongoosePaginate from 'mongoose-paginate-v2';
import { dashboardUserDocument } from '../@types/models';

const dashboardUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    status: { type: String , enum: ['employee', 'manager', 'admin']},
    accessToken: { type: String },
    lastLogin:{ type:Date },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

dashboardUserSchema.pre('save', function save(next) {
  const user = this as any;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    next();
  } catch (err) {
    next(err as any);
  }
});

dashboardUserSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
  try {
    const data: any = this.getUpdate();
    if (data) {
      const password = data.$set.password;
      if (password) {
        this.setOptions({});
        const hash = bcrypt.hashSync(password, 10);
        this.setUpdate({ ...data.$set, password: hash });
      }
    }
    next();
  } catch (err) {
    return next(err as any);
  }
});

const comparePassword: comparePasswordFunction = async function (this: any, candidatePassword: any, cb: any) {
  try {
    const isMatch = bcrypt.compareSync(candidatePassword, this.password);
    cb(null, isMatch);
  } catch (err) {
    cb(err, false);
  }
};

dashboardUserSchema.methods.comparePassword = comparePassword;

dashboardUserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

dashboardUserSchema.plugin(mongoosePaginate);

export const DashboardUser = model<dashboardUserDocument>('Dashboard.Users', dashboardUserSchema) as PaginateModel<dashboardUserDocument>;
