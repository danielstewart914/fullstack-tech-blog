const newCommentEl = document.querySelector( '#new-comment' );
const postCommentButton = document.querySelector( '#post-comment' );
const postEl = document.querySelector( '#post' );

const postComment = async () => {
    const comment = newCommentEl.value.trim();

    const post_id = postEl.dataset.id;

    const response = await fetch( '/api/comments', {
        method: 'POST',
        body: JSON.stringify( { comment, post_id } ),
        headers: { 'Content-Type': 'application/json' }
    } );

    if ( response.ok ) window.location.reload();
    else alert( 'Cannot Post Comment!' );
}

postCommentButton.addEventListener( 'click', postComment );