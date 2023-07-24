import Joi from 'joi';

export const createReserveSchema = Joi.object({
  roomId: Joi.number().required(),
});
