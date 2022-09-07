const postRouter = require( 'express' ).Router();
const { Post, User } = require( '../../models' );

postRouter.get( '/', async ( req, res ) => {
    try {
        const postData = await Post.findAll( {
            include: [ 
                { 
                    model:User,
                    attributes: { 
                        exclude: [ 'password' ]
                     }
                },
                'postComments'
             ],
            order: [ [ 'createdAt', 'ASC' ] ]
        } );

        console.log( postData )
        
        const posts = postData.map( post => post.toJSON() );

        res.status(200).json( posts );
    } catch ( err ) {
        res.status(400).json( err );
    }
} );

postRouter.get( '/:id', async ( req, res ) => {
    try {

        const post = await Post.findByPk( req.params.id, {
            include: [ 
                { 
                    model:User,
                    attributes: { 
                        exclude: [ 'password' ]
                     }
                },
                'postComments'
            ] } );
        
        res.status(200).json( post );
    } catch ( err ) {
        res.status(400).json( { message: 'No post with that id!' } );
    }
} );

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
        if ( !req.body.title || !req.body.content || !req.session.user_id ) {
            res.status(400).json( { message: 'Missing Data' } );
            return;
        }

        const post = await Post.findOne( { 
            where: {
                id: req.params.id
            }
         } );

         if ( post.id !== req.session.user_id ) {
            res.status(401).json( { message: 'Unauthorized' } );
         }

         const updatedPost = await Post.update( {
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
         } );

         res.status(200).json( updatedPost );

    } catch ( err ) {
        res.status(400).json( err );
    }
} );

module.exports = postRouter;