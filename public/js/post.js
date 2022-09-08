const editButton = document.querySelector( '#edit-post' );
const saveButton = document.querySelector( '#save-edit' );
const deleteButton = document.querySelector( '#delete-post' );
const titleEl = document.querySelector( '#edit-title' );
const contentEl = document.querySelector( '#edit-content' );
const editViews = document.querySelectorAll( '.edit' );


const editPost = ( event ) => {
    editViews.forEach( view => view.classList.toggle( 'd-none' ) );
}

const saveChanges = async ( event ) => {
    const title = titleEl.value.trim();
    const content = contentEl.value.trim();

    const response = await fetch( `/api/posts/${ postEl.dataset.id }`, { 
        method: 'PUT',
        body: JSON.stringify( { title, content } ),
        headers: { 'Content-Type': 'application/json' }
     } );

     if ( response.ok ) window.location.reload();
     else alert( 'Cannot Update Post!' );
}

const deletePost = async ( event ) => {
    const response = await fetch( `/api/posts/${ postEl.dataset.id }`, {
        method: 'DELETE'
    } );
    if ( response.ok ) window.location.replace( '/dashboard' );
    else alert( 'Cannot Delete Post!' );
}

editButton.addEventListener( 'click', editPost );
saveButton.addEventListener( 'click', saveChanges );
deleteButton.addEventListener( 'click', deletePost );