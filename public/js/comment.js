const newCommentEl = document.querySelector( '#new-comment' );
const postCommentButton = document.querySelector( '#post-comment' );
const postIdEl = document.querySelector( '#post' );

const emptyCommentToolTip = new bootstrap.Tooltip( newCommentEl );

const postComment = async () => {
    const comment = newCommentEl.value.trim();

    if ( isBlank( comment, emptyCommentToolTip ) ) return;

    // store post id from data attribute
    const post_id = postIdEl.dataset.id;

    // post comment
    const response = await fetch( '/api/comments', {
        method: 'POST',
        body: JSON.stringify( { comment, post_id } ),
        headers: { 'Content-Type': 'application/json' }
    } );

    // reload page
    if ( response.ok ) window.location.reload();
    else alert( 'Cannot Post Comment!' );
}

postCommentButton.addEventListener( 'click', postComment );