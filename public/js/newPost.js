const titleEl = document.querySelector( '#title' );
const contentEl = document.querySelector( '#content' );
const submitPostButton = document.querySelector( '#submit-post' );

const createPost = async ( event ) => {

    const title = titleEl.value.trim();
    const content = contentEl.value.trim();
 
    const response = await fetch( '/api/posts', {
        method: 'POST',
        body: JSON.stringify( { title, content } ),
        headers: { 'Content-Type': 'application/json' }
     } );

     if ( response.ok ) document.location.replace( '/dashboard' );
     else alert( 'Cannot Create Post!' );
}

submitPostButton.addEventListener( 'click', createPost );