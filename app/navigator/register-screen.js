
import withGlobalState from "app/decorators/with-global-state";

import provideScreenState from "./states/screen-state";
import provideActionSheet from "../utils/with-action-sheet";

import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

import hoistNonReactStatics from "hoist-non-react-statics";

import _omit from "lodash/omit";


export default ( screen, getStateContext ) => {
    const ScreenView = hoistNonReactStatics(
        compose(
            withGlobalState( getStateContext ),
            provideScreenState,
            provideActionSheet
        )( screen.view ),
        _omit( screen, [ "view" ] )
    );

    Navigation.registerComponent(
        screen.id,
        () => ScreenView
    );
};
