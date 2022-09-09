const editButton = document.querySelector( '#edit-post' );
const saveButton = document.querySelector( '#save-edit' );
const cancelButton = document.querySelector( '#cancel-edit' );
const deleteButton = document.querySelector( '#delete-post' );
const titleEl = document.querySelector( '#edit-title' );
const contentEl = document.querySelector( '#edit-content' );
const editViews = document.querySelectorAll( '.edit' );

// tool tips
let emptyTitleToolTip;
let emptyContentToolTip;

// toggle edit and display elements
const editPost = ( event ) => {
    editViews.forEach( view => view.classList.toggle( 'd-none' ) );
}

// PUT changes to posts route
const saveChanges = async ( event ) => {
    const title = titleEl.value.trim();
    const content = contentEl.value.trim();

    // check if title is blank
    if ( !title ) {
        // display tool tip
        emptyTitleToolTip.show();
        return;
    }

    // check if content is empty
    if ( !content ) {
        // display tool tip
        emptyContentToolTip.show();
        return;
    }

    // update post
    const response = await fetch( `/api/posts/${ postEl.dataset.id }`, { 
        method: 'PUT',
        body: JSON.stringify( { title, content } ),
        headers: { 'Content-Type': 'application/json' }
     } );

    //  reload window
     if ( response.ok ) window.location.reload();
     else alert( 'Cannot Update Post!' );
}

const deletePost = async ( event ) => {
    // delete post
    const response = await fetch( `/api/posts/${ postEl.dataset.id }`, {
        method: 'DELETE'
    } );
    // reload window
    if ( response.ok ) window.location.replace( '/dashboard' );
    else alert( 'Cannot Delete Post!' );
}

editButton.addEventListener( 'click', editPost );
saveButton.addEventListener( 'click', saveChanges );
cancelButton.addEventListener( 'click', () => window.location.reload() );
deleteButton.addEventListener( 'click', deletePost );


saveButton.addEventListener( 'focusout', () => {
    emptyTitleToolTip.hide();
    emptyContentToolTip.hide();
} );

document.addEventListener( 'DOMContentLoaded' , () => {
    emptyTitleToolTip = new bootstrap.Tooltip( titleEl );
    emptyContentToolTip = new bootstrap.Tooltip( contentEl );
} );