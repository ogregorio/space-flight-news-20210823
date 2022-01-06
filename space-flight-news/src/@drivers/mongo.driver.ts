import { MongoClient as MongoClientDriver } from 'mongodb';

const database = {};

const MongoClient = async () => {
  if (!!database['client']) return database['client'];
  const uri = process.env.MONGODB_URI;
  const mongo = await new MongoClientDriver(uri).connect();
  database['client'] = mongo.db(process.env.MONGODB_DATABASE);
  return database['client'];
};

export { MongoClient };
