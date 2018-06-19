import { createInstance } from "app/utils/realm";
import registerScreens from "./register-screens";

import { Navigation } from "react-native-navigation";


const startApp = () => {
    const params = registerScreens( {
        realm: createInstance()
    } );

    Navigation
        .startTabBasedApp( params )
    ;
};

export default startApp;
