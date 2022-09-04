const homeRouter = require( 'express' ).Router();
const { User } = require('../models');
const authorized = require( '../utils/auth' );


homeRouter.get( '/', async ( req, res ) => {
    try {

        if ( req.session.loggedIn ) {
            const name = ( await User.findOne( { 
                attributes: { 
                include: [ 'name' ] },
                where: { 
                    id: req.session.userId 
                } 
                } ) )
            .toJSON()
            .name;

            res.render( 'homepage', {
                loggedIn: req.session.loggedIn,
                userName: name
            } );

        } else res.render( 'homepage', { loggedIn: req.session.loggedIn } );

    } catch ( err ) {
        res.status(400).json( err );
    }
   
} );

homeRouter.get( '/login', ( req, res ) => {

    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

homeRouter.get( '/signup', ( req, res ) => {

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = homeRouter;