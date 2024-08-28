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
exports.generateUploadUrl = exports.generateFileKey = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = require("crypto");
const region = process.env.AWS_REGION;
const bucketName = process.env.BUCKETNAME;
const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETKEYID;
const s3 = new aws_sdk_1.default.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});
function generateFileKey(extension) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawBytes = yield (0, crypto_1.randomBytes)(16);
        const fileKey = rawBytes.toString('hex');
        return `${fileKey}.${extension}`;
    });
}
exports.generateFileKey = generateFileKey;
function generateUploadUrl(fileKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            Bucket: bucketName,
            Key: fileKey,
            Expires: 3600
        };
        const signedUrl = yield s3.getSignedUrlPromise('putObject', params);
        return signedUrl;
    });
}
exports.generateUploadUrl = generateUploadUrl;
//# sourceMappingURL=s3.js.map