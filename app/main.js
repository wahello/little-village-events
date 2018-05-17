import registerScreens from "./navigator/screens";

import { Navigation } from "react-native-navigation";

const screen = registerScreens();

Navigation
    .startSingleScreenApp( {
        screen
    } )
;
