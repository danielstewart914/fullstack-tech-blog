const homeRouter = require( 'express' ).Router();
const { User, Post, Comment } = require('../models');
const authorized = require( '../utils/auth' );


homeRouter.get( '/', async ( req, res ) => {
    try {

        const postData = await Post.findAll( {
            include: [ 
                { 
                    model:User,
                    attributes: [
                        'username'
                    ]
                },
                'postComments'
             ],
            order: [ [ 'createdAt', 'ASC' ] ]
        } );

        const posts = postData.map( post => post.toJSON() );
        
        res.render( 'homepage', {
            loggedIn: req.session.loggedIn,
            userName: req.session.userName,
            posts: posts
        } );

    } catch ( err ) {
        res.status(400).json( err );
    }
   
} );

homeRouter.get( '/login', ( req, res ) => {

    if ( req.session.loggedIn ) {
      res.redirect( '/' );
      return;
    }
  
    res.render( 'login' );
} );

homeRouter.get( '/signup', ( req, res ) => {

  if ( req.session.loggedIn ) {
    res.redirect( '/' );
    return;
  }

  res.render( 'signup' );
} );

homeRouter.get( '/dashboard', authorized, async ( req, res ) => {
    try {

        res.render( 'dashboard', {
            loggedIn: req.session.loggedIn,
            userName: req.session.userName
        } );

    } catch ( err ) {
        res.status(400).json( err );
    }

} );

module.exports = homeRouter;