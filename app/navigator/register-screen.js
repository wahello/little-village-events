import screenState from "./screen-state";

import provideAppState from "../app-state";
import { provideState } from "../utils/freactal";
import provideActionSheet from "../utils/with-action-sheet";

import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

import hoistNonReactStatics from "hoist-non-react-statics";

import _omit from "lodash/omit";

export default screen => {
    const ScreenView = hoistNonReactStatics(
        compose(
            provideAppState,
            provideState( screenState ),
            provideActionSheet
        )( screen.view ),
        _omit( screen, [ "view" ] )
    );

    Navigation.registerComponent(
        screen.id,
        () => ScreenView
    );
};
