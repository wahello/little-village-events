import { Alert, Linking } from "react-native";


export const showUpdateYourSettingsAlert = async message => {
    const supported = await Linking.canOpenURL( "app-settings:" );
    return new Promise( resolve => {
        const buttons = [ { text: "Cancel", style: "cancel", onPress: () => resolve( false ) } ];
        if ( supported )
            buttons.push( { text: "Settings", onPress: () => ( Linking.openURL( "app-settings:" ), resolve( true ) ) } );

        Alert.alert(
            "Update Your Settings",
            message,
            buttons,
            { cancelable: false }
        );
    } );
}
