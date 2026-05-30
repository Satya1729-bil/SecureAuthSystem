console.log('ENV CHECK:', {
  MONGO_URI: process.env.MONGO_URI ? 'SET' : 'MISSING',
  JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'MISSING',
  NODE_ENV: process.env.NODE_ENV
});
require('./src/app');
