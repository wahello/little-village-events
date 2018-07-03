import { showUpdateYourSettingsAlert } from "./alerts";

import Permissions from "react-native-permissions";

const authorized = "authorized";
const undetermined = "undetermined";

export const requestPermission = async ( name, updateYourSettingsMessage, options ) => {
    switch ( await Permissions.check( name, options ) ) {
        case authorized:
            return true;

        case undetermined:
            const result = await Permissions.request( name, options );
            return result === authorized;

        default:
            await showUpdateYourSettingsAlert( updateYourSettingsMessage );
            break;
    }

    return false;
};

export default ( name, updateYourSettingsMessage, options ) => ( {
    check: async () => Permissions.check( name, options ),
    request: async () => requestPermission( name, updateYourSettingsMessage, options ),
    isAuthorized: async () => await Permissions.check( name, options ) === authorized,
    isInitialized: async () => await Permissions.check( name, options ) !== undetermined,

} );
