const userRouter = require( 'express' ).Router();
const { User } = require( '../../models' );
const toLowerEmail = require( '../../utils/toLowerEmail' );

// create User route
userRouter.post( '/', toLowerEmail, async ( req, res ) => {
    try {
        const newUserData = await User.create( req.body );

        req.session.userId = newUserData.id;
        req.session.userName = newUserData.name;
        req.session.loggedIn = true;
        req.session.save( () => res.status(200).json( newUserData ) );
    } catch ( err ) {
        res.status(400).json( err );
    }
} );

// User login route
userRouter.post( '/login', toLowerEmail, async ( req, res ) => {
    try {
        const userData = await User.findOne( { where: { email: req.body.email } } );

        if( !userData ) {
            res.status(400).json( { message: 'Incorrect email or password, please try again' } );
            return;
        };

        const validPass = await userData.checkPassword( req.body.password );

        if( !validPass ) {
            res.status(400).json( { message: 'Incorrect email or password, please try again' } );
            return;
        }

        req.session.userId = userData.id;
        req.session.userName = userData.name;
        req.session.loggedIn = true;

        req.session.save( () => {
            res.json( { message: 'You are now logged in' } )
        } );

    } catch ( err ) {
        res.status(400).json( err );
    }
} );

// user Logout
userRouter.post( '/logout', ( req, res ) => {
    if ( req.session.loggedIn ) {
        req.session.destroy( () => {
            res.status(204).end();
        } );
    }
    else {
        res.status(404).end();
    }
} );

module.exports = userRouter;