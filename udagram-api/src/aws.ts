i



mport AWS = require('aws-sdk');
import {config} from './config/config';


// Configure AWS
//const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
//AWS.config.credentials = credentials;

AWS.config.update({
  accessKeyId: "AKIAXWSCWDPGVF3VXGET",
  secretAccessKey: "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",
});

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: {Bucket: config.aws_media_bucket},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;
  console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------------------"); 
  console.log(config.aws_profile);
  console.log(AWS.config.credentials);

  s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  }, url => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(url);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

  });

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
