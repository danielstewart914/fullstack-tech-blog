const editButton = document.querySelector( '#edit-post' );
const saveButton = document.querySelector( '#save-edit' );
const deleteButton = document.querySelector( '#delete-post' );
const editTitleEl = document.querySelector( '#edit-title' );
const editContentEl = document.querySelector( '#edit-content' );
const titleEl = document.querySelector( '#title' );
const contentEl = document.querySelector( '#content' );
const postEl = document.querySelector( '#post' );

const editPost = ( event ) => {
    console.log( 'hello' )
    event.preventDefault();

    titleEl.classList.add( 'd-none' );
    editTitleEl.classList.remove( 'd-none' );

    contentEl.classList.add( 'd-none' );
    editContentEl.classList.remove( 'd-none' );

    editButton.classList.add( 'd-none' );
    saveButton.classList.remove( 'd-none' );
}

const saveChanges = async ( event ) => {
    const title = editTitleEl.value.trim();
    const content = editContentEl.value.trim();

    const response = await fetch( `/api/posts/${ postEl.dataset.id }`, { 
        method: 'PUT',
        body: JSON.stringify( { title, content } ),
        headers: { 'Content-Type': 'application/json' }
     } );

     if ( response.ok ) document.location.reload();
     else alert( 'Cannot Update Post!' );
}

const deletePost = async ( event ) => {
    const response = await fetch( `/api/posts/${ postEl.dataset.id }`, {
        method: 'DELETE'
    } );
    if ( response.ok ) document.location.replace( '/dashboard' );
    else alert( 'Cannot Delete Post!' );
}

editButton.addEventListener( 'click', editPost );
saveButton.addEventListener( 'click', saveChanges );
deleteButton.addEventListener( 'click', deletePost );