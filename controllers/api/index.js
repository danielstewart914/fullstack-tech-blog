const apiRouter = require('express').Router();
const userRoutes = require( './userRoutes' );

apiRouter.use( '/users', userRoutes );

module.exports = apiRouter;