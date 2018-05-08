import registerScreens from "./screens";

import { Navigation } from "react-native-navigation";

const mainScreen = registerScreens();

const navigatorStyle = {
    navBarTextColor: "white",
    navBarButtonColor: "white",
    statusBarTextColorScheme: "light"
};

Navigation
    .startSingleScreenApp( {
        screen: {
            ...mainScreen,
            navigatorStyle
        }
    } )
;
