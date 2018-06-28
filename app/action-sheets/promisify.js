export default ( openActionSheet ) => {
    return options =>
        new Promise( ( resolve, reject ) => {
            try {
                openActionSheet( { ...options, onClose: resolve } )
            } catch ( x ) {
                reject( x );
            }
        } );

}
