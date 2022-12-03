export class DBConfig {
  static NAME: string = 'new-wall-backend';
  static HOST: string = 'localhost';
  static PORT: number = 27017;
  static URL: string = `mongodb://${this.HOST}:${this.PORT}/${this.NAME}?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
}

class StorageConfig {
  static STORAGE_DIR: string = 'storage';
  static storagePath: string = `./images/${this.STORAGE_DIR}`;
}

export class Config {
  static DB_Config = DBConfig;
  static STORAGE_CONFIG = StorageConfig;
}
