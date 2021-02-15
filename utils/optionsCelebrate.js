const { Joi } = require('celebrate');
const validator = require('validator');

const optionsValidSignUp = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Имя не должно быть короче 2 символов',
        'string.max': 'Имя не должно быть больше 30 символов',
        'string.empty': 'name обязателен',
        'any.required': 'name обязателен',
      }),
    email: Joi.string().required().email().messages({
      'string.base': 'Недопустимый формат Email',
      'string.empty': 'Недопустимый формат Email',
      'string.email': 'Недопустимый формат Email',
      'any.required': 'Email обязателен',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль обязателен',
    }),
  }),
};
const optionsValidSignIn = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': 'Недопустимый формат Email',
      'string.empty': 'Недопустимый формат Email',
      'string.email': 'Недопустимый формат Email',
      'any.required': 'Email обязателен',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль обязателен',
    }),
  }),
};

const optionsValidUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Имя должно быть не короче 2 символов',
      'string.max': 'Имя должно быть не больше 30 символов',
    }),
    email: Joi.string().email().messages({
      'string.email': 'Недопустимый формат Email',
      'string.base': 'Недопустимый формат Email',
      'any.required': 'Email обязателен',

    }),
  }),
};

const optionsValidCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required().min(2).messages({
      'string.min': 'название страны слишком короткое',
      'any.required': 'название страны обязательно',
    }),
    director: Joi.string().required().min(2).messages({
      'string.min': 'Имя режиссера слишком короткое',
      'string.base': 'Недопустимый формат',
      'string.empty': 'Недопустимый формат',
      'any.required': 'Имя режиссера обязательно',
    }),
    duration: Joi.number().required(),
    year: Joi.string().required().messages({
      'string.integer': 'Не допустимый формат года',
      'string.base': 'Недопустимый формат',
      'string.empty': 'Недопустимый формат',
      'any.required': 'год обязательный параметр',
    }),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('поле image заполнено некорректно');
    })
      .messages({
        'string.pattern': 'Не допустимый формат ссылки',
        'any.required': 'image обязательно',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('поле trailer заполнено некорректно');
    })
      .messages({
        'string.pattern': 'Не допустимый формат ссылки',
        'any.required': 'image обязательно',
      }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('поле thumbnail заполнено некорректно');
    })
      .messages({
        'string.pattern': 'Не допустимый формат ссылки',
        'any.required': 'thumbnail обязательно',
      }),
    movieId: Joi.number().required().integer()
      .messages({
        'number.integer': 'Недопустимый формат Id',
        'number.empty': 'Не допустимый формат Id',
        'any.required': 'Не допустимый формат Id',
      }),
  }),
};

const optionsValidDeleteMovie = {
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex()
      .messages({
        'string.length': 'Неверный формат переданного запроса',
        'string.hex': 'Неверный формат переданного запроса',
        'string.empty': 'Недопустимый формат',
        'any.required': 'Неверный формат переданного запроса',
      }),
  }),
};

module.exports = {
  optionsValidSignUp,
  optionsValidSignIn,
  optionsValidUpdateUser,
  optionsValidCreateMovie,
  optionsValidDeleteMovie,
};
