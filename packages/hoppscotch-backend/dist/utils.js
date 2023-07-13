"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLength = exports.stringToJson = exports.validateEmail = exports.taskEitherValidateArraySeq = exports.getGqlArg = exports.getUserFromGQLContext = exports.getAnnotatedRequiredRoles = exports.namedTrace = exports.trace = exports.throwErr = void 0;
const graphql_1 = require("@nestjs/graphql");
const function_1 = require("fp-ts/lib/function");
const O = require("fp-ts/Option");
const TE = require("fp-ts/TaskEither");
const T = require("fp-ts/Task");
const E = require("fp-ts/Either");
const A = require("fp-ts/Array");
const errors_1 = require("./errors");
function throwErr(errMessage) {
    throw new Error(errMessage);
}
exports.throwErr = throwErr;
const trace = (val) => {
    console.log(val);
    return val;
};
exports.trace = trace;
const namedTrace = (name, transform) => (val) => {
    console.log(`${name}:`, transform ? transform(val) : val);
    return val;
};
exports.namedTrace = namedTrace;
const getAnnotatedRequiredRoles = (reflector, context) => (0, function_1.pipe)(reflector.get('requiresTeamRole', context.getHandler()), O.fromNullable);
exports.getAnnotatedRequiredRoles = getAnnotatedRequiredRoles;
const getUserFromGQLContext = (ctx) => (0, function_1.pipe)(ctx, graphql_1.GqlExecutionContext.create, (ctx) => ctx.getContext().req, ({ user }) => user, O.fromNullable);
exports.getUserFromGQLContext = getUserFromGQLContext;
const getGqlArg = (argName, ctx) => (0, function_1.pipe)(ctx, graphql_1.GqlExecutionContext.create, (ctx) => ctx.getArgs(), (args) => args[argName]);
exports.getGqlArg = getGqlArg;
const taskEitherValidateArraySeq = (arr) => (0, function_1.pipe)(arr, A.map(TE.mapLeft(A.of)), A.sequence(TE.getApplicativeTaskValidation(T.ApplicativeSeq, A.getMonoid())));
exports.taskEitherValidateArraySeq = taskEitherValidateArraySeq;
const validateEmail = (email) => {
    return new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
};
exports.validateEmail = validateEmail;
function stringToJson(str) {
    try {
        return E.right(JSON.parse(str));
    }
    catch (err) {
        return E.left(errors_1.JSON_INVALID);
    }
}
exports.stringToJson = stringToJson;
function isValidLength(title, length) {
    if (title.length < length) {
        return false;
    }
    return true;
}
exports.isValidLength = isValidLength;
//# sourceMappingURL=utils.js.map