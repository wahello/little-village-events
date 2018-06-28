import SafariView from "react-native-safari-view";

const openEmbeddedBrowser = async ( options, wait ) => {
    try {
        await SafariView.isAvailable();
    } catch ( x ) {
        return false;
    }

    if ( !wait ) {
        await SafariView.show( options );
        return true;
    }


    await ( new Promise( ( resolve, reject ) => {

        let subscription = null;
        const onDismiss = () => {
            subscription.remove();
            setTimeout( resolve, 750 );
        };
        subscription = SafariView.addEventListener( "onDismiss", onDismiss );

        SafariView
            .show( options )
            .catch( reject )
        ;

    } ) );

    return true;
};

export default openEmbeddedBrowser;
