import details from "./details";
import list from "./list";
import state from "../state";

import { provideState } from "../utils/freactal";

import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

const registerScreen = screen => {
    Navigation.registerComponent( screen.id, () => compose( provideState( state ) )( screen.view ) );
};

const registerScreens = () => {
    registerScreen( list );
    registerScreen( details );

    return {
        screen: list.id,
        ...list.nav
    };
};

export default registerScreens;
