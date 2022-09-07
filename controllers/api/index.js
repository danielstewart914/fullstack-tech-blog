const apiRouter = require('express').Router();
const userRoutes = require( './userRoutes' );
const postRoutes = require( './postRoutes' );

apiRouter.use( '/users', userRoutes );
apiRouter.use( '/posts', postRoutes );

module.exports = apiRouter;