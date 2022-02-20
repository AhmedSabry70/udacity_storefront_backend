import Joi from 'joi';

export const regschema: Joi.ObjectSchema = Joi.object({
	user_name: Joi.string().alphanum().min(6).max(100).required(),

	first_name: Joi.string().alphanum().min(3).max(30).required(),

	last_name: Joi.string().alphanum().min(3).max(30).required(),

	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

	// repeat_password: Joi.ref('password'),

	// access_token: [Joi.string(), Joi.number()],

	// birth_year: Joi.number().integer().min(1900).max(2013),

	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'org'] },
		})
		.required(),
});
//.with('username', 'birth_year');
//.xor('password', 'access_token');
//.with('password', 'repeat_password');

export const loginschema: Joi.ObjectSchema = Joi.object({
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'org'] },
		})
		.required(),
});
export const upDateschema: Joi.ObjectSchema = Joi.object({
	user_name: Joi.string().alphanum().min(6).max(100),

	first_name: Joi.string().alphanum().min(3).max(30),

	last_name: Joi.string().alphanum().min(3).max(30),

	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net', 'org'] },
	}),
});

export default {
	regschema,
	upDateschema,
	loginschema,
};
