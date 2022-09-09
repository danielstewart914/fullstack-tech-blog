const titleEl = document.querySelector( '#title' );
const contentEl = document.querySelector( '#content' );
const submitPostButton = document.querySelector( '#submit-post' );

// tool tips
let emptyTitleToolTip;
let emptyContentToolTip;

const createPost = async ( event ) => {

    const title = titleEl.value.trim();
    const content = contentEl.value.trim();

    if ( !title ) {
        emptyTitleToolTip.show();
        return;
    }

    if ( !content ) {
        emptyContentToolTip.show();
        return;
    }
 
    const response = await fetch( '/api/posts', {
        method: 'POST',
        body: JSON.stringify( { title, content } ),
        headers: { 'Content-Type': 'application/json' }
     } );

     if ( response.ok ) window.location.replace( '/dashboard' );
     else alert( 'Cannot Create Post!' );
}

submitPostButton.addEventListener( 'click', createPost );

submitPostButton.addEventListener( 'focusout', () => {
    emptyTitleToolTip.hide();
    emptyContentToolTip.hide();
} );

document.addEventListener( 'DOMContentLoaded' , () => {
    emptyTitleToolTip = new bootstrap.Tooltip( titleEl );
    emptyContentToolTip = new bootstrap.Tooltip( contentEl );
} );