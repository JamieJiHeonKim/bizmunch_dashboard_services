"use strict";
// import randomstring from 'randomstring';
// import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { Logger } from '../../middleware/log4';
// import { CREDENTIALS, S3_BUCKET_REGION } from '../../middleware/env';
// const s3Client = new S3Client({ region: S3_BUCKET_REGION, credentials: CREDENTIALS });
// type URL = { url: string };
// type FILE_INFO = { url: string; filePath: string };
// /**
//  * create presigned url for get image
//  * @param key
//  * @returns
//  */
// export const getObjectWithSignature = async (filePath: string, bucket: string) => {
//   try {
//     const command = new GetObjectCommand({
//       Bucket: bucket,
//       Key: filePath,
//     });
//     const signedUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: 60,
//     });
//     return Promise.resolve({ url: signedUrl });
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };
// /**
//  * create presigned url for uploading image.
//  * @returns
//  */
// export const uploadObjectWithSignature = async (contentType: string, directoryName: string, bucket: string) => {
//   try {
//     const fileName = randomstring.generate(16);
//     const command = new PutObjectCommand({
//       Bucket: bucket,
//       Key: `${directoryName}/${fileName}.${contentType}`,
//       ContentType: contentType,
//     });
//     const signedUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: 60,
//     });
//     return Promise.resolve({ url: signedUrl, filePath: `${directoryName}/${fileName}.${contentType}`, fileName });
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };
// export const deleteObject = async (filePath: string, bucket: string) => {
//   try {
//     const command = new DeleteObjectCommand({
//       Bucket: bucket,
//       Key: filePath,
//     });
//     const response = await s3Client.send(command);
//     Logger.info(response);
//     return Promise.resolve();
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };
//# sourceMappingURL=uploadMediaToS3.js.map