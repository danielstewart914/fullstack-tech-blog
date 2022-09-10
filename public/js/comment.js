const newCommentEl = document.querySelector( '#new-comment' );
const postCommentButton = document.querySelector( '#post-comment' );
const postIdEl = document.querySelector( '#post' );

const emptyCommentToolTip = new bootstrap.Tooltip( newCommentEl );
let showingCommentToolTip = false;

const postComment = async () => {
    const comment = newCommentEl.value.trim();

    // if comment input is blank
    if ( !comment ) {
        // if not showing comment tooltip
        if ( !showingCommentToolTip ) {
            // display tooltip
            emptyCommentToolTip.show();
            showingCommentToolTip = true;
            // hide comment tooltip after 1.5 seconds
            setTimeout( () => {
                emptyCommentToolTip.hide();
                showingCommentToolTip = false;
        }, 1500 );
        }
        return;
    }

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