import { MongoClient as MongoClientDriver } from 'mongodb';

class MongoClient {
  mongo: any;

  constructor() {
    const uri = process.env.MONGODB_URI;
    this.mongo = new MongoClientDriver(uri);
  }

  async getDb() {
    await this.mongo.connect();
    return this.mongo.db(process.env.MONGODB_DATABASE);
  }
}

export { MongoClient };
