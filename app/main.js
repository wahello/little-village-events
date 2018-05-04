import { registerScreens } from "./screens";

import { Navigation } from "react-native-navigation";

const screens = registerScreens();

const navigatorStyle = {
    navBarTextColor: "white",
    navBarButtonColor: "white",
    statusBarTextColorScheme: "light"
};

Navigation
    .startSingleScreenApp( {
        screen: {
            ...screens.main,
            navigatorStyle
        }
    } )
;
