import { Injectable, LoggerService } from '@nestjs/common';
import log4js, { Logger } from 'log4js';
import path from 'path';
import config from '../../envconfig';
const LOG4CONFI = {
  appenders: {
    out: { type: 'console' },
    app: {
      type: 'dateFile',
      filename: path.join(config.LOG_PATH, 'BLOG_LOGGER'),
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      appender: {
        type: 'console'
      }
    }
  },
  categories: {
    default: {
      appenders: ['out', 'app'],
      level: config.LOG_LEVEL
    }
  }
};

@Injectable()
export class BlogLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    log4js.configure(LOG4CONFI);
    this.logger = log4js.getLogger('itxuye');
  }

  public error(message: string, trace?: string) {
    this.logger.error(message);
  }
  public log(message: string) {
    this.logger.info(message);
  }
  public warn(message: string) {
    this.logger.warn(message);
  }
}
