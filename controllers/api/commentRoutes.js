const commentRouter = require( 'express' ).Router();
const { Comment } = require( '../../models' );

commentRouter.post( '/', async ( req, res ) => {
    try {

        if ( !req.body.comment || !req.body.post_id || !req.session.userId ) {
            res.status(400).json( { message: 'Missing Data' } );
            return;
        }

        const newComment = await Comment.create( { 
            comment: req.body.comment,
            user_id: req.session.userId,
            post_id: req.body.post_id
         } );

         res.status(200).json( newComment );

    } catch ( err ) {
        res.status(400).json( err );
    }
} );

module.exports = commentRouter;