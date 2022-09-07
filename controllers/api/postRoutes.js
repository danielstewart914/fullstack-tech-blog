const postRouter = require( 'express' ).Router();
const { Post } = require( '../../models' );

postRouter.post( '/', async ( req, res ) => {
    try {

        if ( !req.body.title || !req.body.content || !req.session.user_id ) {
            res.status(400).json( { message: 'Missing Data' } );
            return;
        }

        const newPost = await Post.create( { 
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
         } );
        res.status(200).json( newPost );
        
    } catch ( err ) {
        res.status(400).json( err );
    }
} );

postRouter.put( '/:id', async ( req, res ) => {
    try {
        if ( !req.body.title || !req.body.content ) {
            res.status(400).json( { message: 'Missing Data' } );
            return;
        }

        const post = await Post.findOne( { 
            where: {
                id: req.params.id
            }
        } );

        if ( post.user_id !== req.session.userId ) {
            res.status(401).json( { message: 'Unauthorized' } );
            return;
        }

        const updatedPost = await Post.update( {
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId
        }, 
        {
            where: {
                id: req.params.id
            }
        }
        );

        res.status(200).json( updatedPost );

    } catch ( err ) {
        res.status(400).json( err );
    }
} );

postRouter.delete( '/:id', async ( req, res ) => {
    try {

        const deleted = await Post.destroy( {
            where: {
                id: req.params.id
            }
        } );

        if ( !deleted ) {
            res.status(404).json( { message: `Could not find Post with Id: ${ req.params.id }` } );
            return;
        }
      
        res.status(200).json( { message: `Post ${ req.params.id } has been deleted` } );
    } catch ( err ) {
        res.status(400).json( err );
    }
} );

module.exports = postRouter;