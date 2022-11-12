import joi from 'joi'

export const event = joi.object(
    {
        title: joi.string().required(),
        data: joi.date().required()
    }
)
