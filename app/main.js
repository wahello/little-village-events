import registerScreens from "./navigator/screens";

import { Navigation } from "react-native-navigation";

const params = registerScreens();

Navigation
    .startTabBasedApp( params )
;
