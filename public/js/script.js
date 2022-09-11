let showingToolTip = false;

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