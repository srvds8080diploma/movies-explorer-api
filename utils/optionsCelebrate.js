const { Joi } = require('celebrate');

const { REGEX_URL } = require('./constants');

const optionsValidSign = {
  body: Joi.object().keys({
    email: Joi.string().required(true).email().message({
      'string.email': 'Недопустимый формат Email',
      'any.required': 'Email обязателен',
    }),
    password: Joi.string().required(true).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message({
        'string.pattern': 'Недопустимый формат пароля',
        'any.required': 'Пароль обязателен',
      }),
  }),
};

const optionsValidUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).message({
      'string.min': 'Имя должно быть не короче 2 символов',
      'string.max': 'Имя должно быть не больше 30 символов',
    }),
    email: Joi.string().email().message({
      'string.email': 'Недопустимый формат Email',
    }),
  }),
};

const optionsValidCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(true).min(2).message({
      'string.min': 'название страны слишком короткое',
      'any.required': 'название страны обязательно',
    }),
    director: Joi.string().required(true).min(2).message({
      'string.min': 'Имя режиссера слишком короткое',
      'any.required': 'Имя режиссера обязательно',
    }),
    duration: Joi.number().required(true),
    year: Joi.number().required(true).integer().message({
      'string.integer': 'Не допустимый формат года',
      'any.required': 'год обязательный параметр',
    }),
    description: Joi.string().required(true),
    image: Joi.string().required(true).pattern(new RegExp(REGEX_URL))
      .message({
        'string.pattern': 'Не допустимый формат ссылки',
        'any.required': 'image обязательно',
      }),
    trailer: Joi.string().required(true).pattern(new RegExp(REGEX_URL))
      .message({
        'string.pattern': 'Не допустимый формат ссылки',
        'any.required': 'image обязательно',
      }),
    nameRU: Joi.string().required(true),
    nameEN: Joi.string().required(true),
    thumbnail: Joi.string().required(true).pattern(new RegExp(REGEX_URL))
      .message({
        'string.pattern': 'Не допустимый формат ссылки',
        'any.required': 'thumbnail обязательно',
      }),
    movieId: Joi.string().required(true).length(24).hex()
      .message({
        'string.length': 'Не допустимый формат Id',
        'string.hex': 'Не допустимый формат Id',
      }),
  }),
};

const optionsValidDeleteMovie = {
  params: Joi.object().keys({
    id: Joi.string().required(true).length(24).hex()
      .message({
        'string.length': 'Неверный формат переданного запроса',
        'string.hex': 'Неверный формат переданного запроса',
        'any.required': 'Неверный формат переданного запроса',
      }),
  }),
};

module.exports = {
  optionsValidSign,
  optionsValidUpdateUser,
  optionsValidCreateMovie,
  optionsValidDeleteMovie,
};