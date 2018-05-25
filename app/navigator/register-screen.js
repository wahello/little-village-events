import screenState from "./screen-state";

import provideAppState from "../app-state";
import { provideState } from "../utils/freactal";
import provideActionSheet from "../utils/with-action-sheet";

import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

export default screen => {
    Navigation.registerComponent(
        screen.id,
        () => compose(
            provideAppState,
            provideState( screenState ),
            provideActionSheet
        )( screen )
    );
};
