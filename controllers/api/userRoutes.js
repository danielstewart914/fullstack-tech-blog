const userRouter = require( 'express' ).Router();
const { User } = require( '../../models' );

// create User route
userRouter.post( '/', async ( req, res ) => {
    try {
        const newUserData = await User.create( req.body );

        req.session.userId = newUserData.id,
        req.session.loggedIn = true;
        req.session.save( () => res.status(200).json( newUserData ) );
    } catch ( err ) {
        res.status(400).json( err );
    }
} );

// User login route
userRouter.post( '/login', async ( req, res ) => {
    try {
        console.log( req.body )

        const userData = await User.findOne( { where: { email: req.body.email } } );

        if( !userData ) {
            console.log( 'email failed' )
            res.status(400).json( { message: 'Incorrect email or password, please try again' } );
        };

        const validPass = await userData.checkPassword( req.body.password );

        if( !validPass ) {
            console.log( 'password failed' )
            res.status(400).json( { message: 'Incorrect email or password, please try again' } );
        }

        req.session.userId = userData.id;
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