import fs from 'fs';
import dotenv from 'dotenv';
import { ConflictException, Injectable } from '@nestjs/common';
import path from 'path';

export interface IEnvConfig {
  [prop: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = config;
  }

  public get APP_NAME() {
    return this.envConfig.APP_NAME;
  }
  public get DB_PASS() {
    return this.envConfig.DB_PASS;
  }
  public get DB_NAME() {
    return this.envConfig.DB_NAME;
  }
  public get secretKey() {
    return this.envConfig.secretKey;
  }
  public get expiresIn() {
    return this.envConfig.expiresIn;
  }
  public get APP_PORT(): number {
    return Number(this.envConfig.APP_PORT);
  }
  public get APP_PATH(): string {
    return this.envConfig.APP_PATH;
  }
  public get APP_LIMIT(): number {
    return Number(this.envConfig.APP_LIMIT);
  }

  public get LOG_PATH(): string {
    return this.envConfig.LOG_PATH;
  }
  public get LOG_LEVEL(): string {
    return this.envConfig.LOG_LEVEL;
  }

  public get EMAIL_HOST(): string {
    return this.envConfig.EMAIL_HOST;
  }
  public get EMAIL_ACCOUNT(): string {
    return this.envConfig.EMAIL_ACCOUNT;
  }
  public get EMAIL_PASSWORD(): string {
    return this.envConfig.EMAIL_PASSWORD;
  }

  public get QINNIU_ACCESSKEY(): string {
    return this.envConfig.QINNIU_ACCESSKEY;
  }
  public get QINNIU_TOKEN(): string {
    return this.envConfig.QINNIU_TOKEN;
  }
  public get QINNIU_BUCKET(): string {
    return this.envConfig.QINNIU_BUCKET;
  }
  public get QINNIU_ORIGIN(): string {
    return this.envConfig.QINNIU_ORIGIN;
  }
  public get QINIU_UPLOADURL(): string {
    return this.envConfig.QINIU_UPLOADURL;
  }

  public get BAIDU_SITE(): string {
    return this.envConfig.BAIDU_SITE;
  }
  public get BAIDU_TOKEN(): string {
    return this.envConfig.BAIDU_TOKEN;
  }

  public get MONGO_URL(): string {
    return this.envConfig.MONGO_URL;
  }

  public get JWTKEY(): string {
    return this.envConfig.JWTKEY;
  }
  public get DEFAULT_USERNAME(): string {
    return this.envConfig.DEFAULT_USERNAME;
  }
  public get DEFAULT_PASSWORD(): string {
    return this.envConfig.DEFAULT_PASSWORD;
  }
  public get APP_INFO() {
    return {
      name: 'itxuye_blog',
      version: '1.0.0',
      author: 'itxuye',
      site: 'https://itxuye.com',
      powered: ['React', 'Next.js', 'Node.js', 'TypeOrm', 'Typescript']
    };
  }
  public get ENV() {
    return this.envConfig.NODE_ENV;
  }
}

const config = new ConfigService(
  path.resolve(__dirname, '..', `${process.env.NODE_ENV}.env`)
);

export default config;
