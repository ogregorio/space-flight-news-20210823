import { MongoClient as MongoClientDriver } from 'mongodb';

const MongoClient = () => {
  const uri = process.env.MONGODB_URI;
  return new MongoClientDriver(uri);
};

export { MongoClient };
