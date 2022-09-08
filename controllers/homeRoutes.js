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
            order: [ [ 'createdAt', 'DESC' ] ]
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

        const postData = await Post.findAll( {
            where: {
                user_id: req.session.userId
            },
            include: [ 'postComments' ],
            order: [ [ 'createdAt', 'DESC' ] ]
        } );

        const posts = postData.map( post => post.toJSON() );

        res.render( 'dashboard', {
            loggedIn: req.session.loggedIn,
            userName: req.session.userName,
            posts
        } );

    } catch ( err ) {
        res.status(400).json( err );
    }

} );

homeRouter.get( '/dashboard/new', authorized, ( req, res ) => {
    res.render( 'newPost', {
        loggedIn: req.session.loggedIn,
        userName: req.session.userName
    } );
} );

homeRouter.get( '/post/:id', async ( req, res ) => {
    try {

        const postData = ( await Post.findByPk( req.params.id, {
            include: [ { 
                model: User,
                attributes: { 
                    exclude: [ 'password' ]
                    }
            } ] 
        } ) );

        if ( !postData ) {
            res.render( '404', {
                loggedIn: req.session.loggedIn,
                userName: req.session.userName
            } );
            return;
        }

        const post = postData.toJSON();

        const commentData = ( await Comment.findAll( { 
            where: {
                post_id: req.params.id
            },
            include: [ { 
                model: User,
                attributes: { 
                    exclude: [ 'password' ]
                    }
            } ],
            order: [ 
                [ 'createdAt', 'DESC' ]
             ]
        } ) );

        const comments = commentData.map( comment => comment.toJSON() );

        res.render( 'post', {
            loggedIn: req.session.loggedIn,
            userName: req.session.userName,
            post,
            comments,
            usersPost: post.user_id === req.session.userId
        } );
    } catch ( err ) {
        res.status(400).json( err );
    }
    
} );

homeRouter.get( '/*', ( req, res ) => {
    res.render( '404', {
        loggedIn: req.session.loggedIn,
        userName: req.session.userName
    } );
} );

module.exports = homeRouter;