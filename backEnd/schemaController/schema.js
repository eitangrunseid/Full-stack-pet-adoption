
const S = require("fluent-json-schema");
const updateProfileSchema = S.object()
	.prop("firstName", S.string().required())
	.prop("lastName", S.string().required())
	.prop("email", S.string().required().format(S.FORMATS.EMAIL))
	.prop("password", S.string().minLength(6).maxLength(20).required())
	.prop("phone", S.string().required())
	.valueOf();

exports.updateProfileSchema = updateProfileSchema;

const signUpSchema = S.object()
	.prop("firstName", S.string().required())
	.prop("lastName", S.string().required())
	.prop("email", S.string().required().format(S.FORMATS.EMAIL))
	.prop("password", S.string().minLength(6).maxLength(20).required())
	.prop("phone", S.string().required())
	.valueOf();

exports.signUpSchema = signUpSchema;

const loginSchema = S.object()
	.prop("email", S.string().required().format(S.FORMATS.EMAIL))
	.prop("password", S.string().minLength(6).maxLength(20).required())
	.valueOf();

exports.loginSchema = loginSchema;
