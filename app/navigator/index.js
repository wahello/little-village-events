import { Navigation } from "react-native-navigation";
import registerScreens from "./register-screens";

const startApp = () => {
    const params = registerScreens();

    Navigation
        .startTabBasedApp( params )
    ;
};

export default startApp;
