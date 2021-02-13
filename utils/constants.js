const REGEX_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
const OK_CODE = 200;
const CREATE_CODE = 201;
const INTERNAL_SERVER_ERROR_CODE = 500;

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: 'GET, PUT, PATCH, POST, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  REGEX_URL,
  OK_CODE,
  CREATE_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  corsOptions,
  mongooseConnectionOptions,
};
