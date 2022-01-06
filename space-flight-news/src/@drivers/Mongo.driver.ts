import { MongoClient as MongoClientDriver } from 'mongodb';

const MongoClient = async () => {
  const uri = process.env.MONGODB_URI;
  const database = await new MongoClientDriver(uri).connect();
  return database;
};

export { MongoClient };
