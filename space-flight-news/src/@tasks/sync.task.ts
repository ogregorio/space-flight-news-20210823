import { Logger } from '@nestjs/common';
import { MongoClient } from 'src/@drivers/Mongo.driver';
import { articlesService } from 'src/@services/articles.service';

const synchronizeDatabase = async () => {
  Logger.log('Started syncing database', 'Cron');
  const database = (await MongoClient()).db(process.env.MONGODB_DATABASE);
  const news = await getNews();
  if (!!news) {
    database.collection('news').insertMany(news, (err, result) => {
      if (err) sendMail();
      Logger.log('Inserted: ' + result.insertedCount + ' docs', 'Cron');
    });
  } else {
    Logger.log('Nothing to do', 'Cron');
  }
};

const getNews = async () => {
  const config = (await getConfig()) || {};
  const news = (
    await articlesService('articles', {
      params: {
        _start: config['lastNewsId'] || 0,
        _sort: 'id',
        _limit: '100000',
      },
    })
  ).data;
  Logger.log(`Found ${news.length} new news`, 'Cron');
  if (news.length > 0) {
    saveNewConfig(news[news.length - 1].id);
    return news;
  }
  return null;
};

const saveNewConfig = async (lastNewsId) => {
  const database = (await MongoClient()).db(process.env.MONGODB_DATABASE);
  const query = { name: 'databaseStatus' };
  const update = { $set: { lastNewsId: lastNewsId } };
  const options = { upsert: true };
  database.collection('config').updateOne(query, update, options);
};

const getConfig = async () => {
  const database = (await MongoClient()).db(process.env.MONGODB_DATABASE);
  const config = await database
    .collection('config')
    .findOne({ name: 'databaseStatus' });
  return config;
};

const sendMail = () => {
  console.log('Sending mail');
};

export { synchronizeDatabase };
