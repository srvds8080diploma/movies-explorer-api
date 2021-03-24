require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { corsOptions, mongooseConnectionOptions } = require('./utils/constants');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, PATH_DB = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(PATH_DB, mongooseConnectionOptions);
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => console.log('server`s ok!'));
