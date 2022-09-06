const User = require( './User' );
const Post = require( './Post' );
const Comment = require( './Comment' );

User.hasMany( Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as: 'userPosts'
} );

Post.belongsTo( User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
} );

Post.hasMany( Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    as: 'postComments'
} );

Comment.belongsTo( Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
} );

User.hasMany( Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as: 'userComments'
} );

Comment.belongsTo( User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
} );

module.exports = { User, Post, Comment };