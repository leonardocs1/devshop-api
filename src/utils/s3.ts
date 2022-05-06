import { Injectable } from '@nestjs/common'
import * as aws from 'aws-sdk'

@Injectable()
export class s3 {
  constructor() {
    aws.config.update({
      region: 'us-east-1',
      accessKeyId: '',
      secretAccessKey: ''
    })
  }
  async upload(
    filename: string,
    stream: any,
    mimetype: string,
    bucket: string,
    destinationFilename: string
  ): Promise<string> {
    console.log(filename)
    const s3 = new aws.S3()
    const s3Params = {
      Bucket: bucket,
      Key: destinationFilename,
      ACL: 'public-read',
      ContentType: mimetype,
      Body: stream
    }
    const { Location } = await s3.upload(s3Params).promise()
    console.log(Location)
    return Location
  }
}
