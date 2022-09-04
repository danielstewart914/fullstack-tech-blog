const login = async ( event ) => {
    event.preventDefault();

    const email = document.querySelector( '#loginEmail' ).value.trim();
    const password = document.querySelector( '#loginPassword' ).value.trim();

    if ( email && password ) {
        const response = await fetch( 'api/users/login', {
            method: 'POST',
            body: JSON.stringify( { email, password } ),
            headers: { 'Content-Type': 'application/json' }
        } );

        console.log( response )

        if ( response.ok ) document.location.replace( '/' );
        else alert( 'Login failed!' );
    }
}

document.querySelector( '.login-form' ).addEventListener( 'submit', login );