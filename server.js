const path = require( 'path' );
const express = require( 'express' );
const session = require( 'express-session' );
const expressHandlebars = require( 'express-handlebars' );
const routes = require( './controllers' );

const sequelize = require( './config/connection' );
const { urlencoded } = require('express');

const SequelizeStore = require( 'connect-session-sequelize' )( session.Store );

const app = express();
const PORT = process.env.PORT || 3001;

const handlebars = expressHandlebars.create();

app.use( session( {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore ( {
        db: sequelize
    } )
} ) );

app.engine( 'handlebars', handlebars.engine );
app.set( 'view engine', 'handlebars' );

app.use( express.json() );
app.use( urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( routes );

sequelize.sync( { force: false } ).then( () => {
    app.listen( PORT, () => console.log( `Listening at: http://localhost:${ PORT }` ) );
} );