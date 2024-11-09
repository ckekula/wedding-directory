import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  // Method to upload an image
  async uploadImage(fileName: string, fileBuffer: Buffer) {
    const bucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const region = this.configService.get<string>('AWS_S3_REGION');

    if (!bucket || !region) {
      throw new Error('S3 bucket name or region not configured properly');
    }
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'image/jpeg|image/png', // Or 'image/png'
    };

    await this.s3Client.send(new PutObjectCommand(params));

    return `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
  }

  // Method to upload a video
  async uploadVideo(fileName: string, fileBuffer: Buffer) {
    const bucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const region = this.configService.get<string>('AWS_S3_REGION');

    if (!bucket || !region) {
      throw new Error('S3 bucket name or region not configured properly');
    }
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'video/mp4|video/webm',
    }

    await this.s3Client.send(new PutObjectCommand(params));
    return `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
  }
}
