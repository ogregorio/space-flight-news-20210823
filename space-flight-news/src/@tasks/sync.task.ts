import { Logger } from '@nestjs/common';
import { MongoClient } from 'src/@drivers/mongo.driver';
import { articlesService } from 'src/@services/articles.service';
import { sendMail } from 'src/@services/mail.service';

const synchronizeDatabase = async () => {
  Logger.log('Started syncing database', 'Cron');
  const database = await new MongoClient().getDb();
  const articles = await getArticles();
  if (!!articles) {
    database.collection('articles').insertMany(articles, (err, result) => {
      if (err) sendMail();
      Logger.log('Inserted: ' + result.insertedCount + ' docs', 'Cron');
    });
  } else {
    Logger.log('Nothing to do', 'Cron');
  }
};

const getArticles = async () => {
  const config = (await getConfig()) || {};
  const articles = (
    await articlesService('articles', {
      params: {
        _start: config['lastarticlesId'] || 0,
        _sort: 'id',
        _limit: '100000',
      },
    })
  ).data;
  Logger.log(`Found ${articles.length} new article(s)`, 'Cron');
  if (articles.length > 0) {
    saveNewConfig(articles[articles.length - 1].id);
    return articles;
  }
  return null;
};

const saveNewConfig = async (lastarticlesId) => {
  const database = await new MongoClient().getDb();
  const query = { name: 'databaseStatus' };
  const update = { $set: { lastarticlesId: lastarticlesId } };
  const options = { upsert: true };
  database.collection('config').updateOne(query, update, options);
};

const getConfig = async () => {
  const database = await new MongoClient().getDb();
  const config = await database
    .collection('config')
    .findOne({ name: 'databaseStatus' });
  return config;
};

export { synchronizeDatabase };
