import aws from 'aws-sdk';
import { randomBytes } from "crypto";

const region = process.env.AWS_REGION
const bucketName = process.env.BUCKETNAME
const accessKeyId = process.env.AWSACCESSKEYID
const secretAccessKey = process.env.AWSSECRETKEYID

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
})

export async function generateFileKey(extension: string): Promise<string> {
  const rawBytes = await randomBytes(16);
  const fileKey = rawBytes.toString('hex');
  return `${fileKey}.${extension}`;
}


export async function generateUploadUrl(fileKey: string): Promise<string> {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Expires: 3600
  };
  const signedUrl = await s3.getSignedUrlPromise('putObject', params);
  return signedUrl;
}