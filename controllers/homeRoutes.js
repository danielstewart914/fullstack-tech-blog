const homeRouter = require( 'express' ).Router();
const authorized = require( '../utils/auth' );


homeRouter.get( '/', async ( req, res ) => {
    res.render( 'homepage', {
        loggedIn: req.session.loggedIn
    } );
} );

homeRouter.get( '/login', (req, res) => {

    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  homeRouter.get( '/signup', (req, res) => {

    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

module.exports = homeRouter;