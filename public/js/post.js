// new post submit button
const submitPostButton = document.querySelector( '#submit-post' );

// edit post buttons
const editButton = document.querySelector( '#edit-post' );
const saveButton = document.querySelector( '#save-edit' );
const cancelButton = document.querySelector( '#cancel-edit' );
const deleteButton = document.querySelector( '#delete-post' );

// title and content
const titleEl = document.querySelector( '#title' );
const contentEl = document.querySelector( '#content' );
const postEl = document.querySelector( '#post' );

// views to show or hide in edit mode
const editViews = document.querySelectorAll( '.edit' );

// tool tips
const emptyTitleToolTip = new bootstrap.Tooltip( titleEl );
const emptyContentToolTip = new bootstrap.Tooltip( contentEl );
let showingToolTip = false;

// API URL's for creating new post or updating existing post
const apiURL = {
    POST: '/api/posts',
    PUT: `/api/posts/${ postEl.dataset.id }`
}

// toggle edit and display elements
const editPost = ( event ) => {
    editViews.forEach( view => view.classList.toggle( 'd-none' ) );
}

// check if element is blank
const isBlank = ( input, toolTip ) => {

    // if input is blank
    if ( !input ) {
        // if not showing tooltip
        if ( !showingToolTip ) {
            toolTip.show();
            showingToolTip = true;
            // hide tooltip after 1.5 seconds
            setTimeout( () => {
                toolTip.hide();
                showingToolTip = false;
            }, 1500 );
        }
        // return true for blank element
        return true;
    }
    // return false for populated element
    return false;
}

// save post
const savePost = async ( event ) => {

    const title = titleEl.value.trim();
    const content = contentEl.value.trim();

    // check if title or content is blank and display tooltip
    if ( isBlank( title, emptyTitleToolTip ) ) return;
    if ( isBlank( content, emptyContentToolTip ) ) return;
 
    // send either a POST or PUT request - method is stored in a button data attribute
    const response = await fetch( apiURL[ event.target.dataset.method ], {
        method: event.target.dataset.method,
        body: JSON.stringify( { title, content } ),
        headers: { 'Content-Type': 'application/json' }
    } );

    if ( response.ok )  {
        // either refresh page or send user to dashboard
        if ( event.target.dataset.method === 'POST' ) window.location.replace( '/dashboard' );
        if ( event.target.dataset.method === 'PUT' ) window.location.reload();
    }
    else alert( 'Cannot Save Post!' );
}

// delete post
const deletePost = async ( event ) => {
    // delete post
    const response = await fetch( `/api/posts/${ postEl.dataset.id }`, {
        method: 'DELETE'
    } );
    // send user to their dashboard window
    if ( response.ok ) window.location.replace( '/dashboard' );
    else alert( 'Cannot Delete Post!' );
}

// optional event listeners for either newPost or post views
if ( editButton ) editButton.addEventListener( 'click', editPost );
if ( saveButton ) saveButton.addEventListener( 'click', savePost );
if ( cancelButton ) cancelButton.addEventListener( 'click', () => window.location.reload() );
if ( deleteButton ) deleteButton.addEventListener( 'click', deletePost );
if ( submitPostButton ) submitPostButton.addEventListener( 'click', savePost );