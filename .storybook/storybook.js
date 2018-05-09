import appState from "/app/screens/state";
import { transparent } from "/app/screens/navigator-styles";

import { provideState } from "@textpress/freactal";

import { getStorybookUI, configure } from "@storybook/react-native";

import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { compose } from "recompose";

// import stories

configure( () => {
    require( "./stories" );
}, module );

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = compose(
    provideState( appState )
)( getStorybookUI( { port: 7007, host: 'localhost' } ) );


// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
    static navigatorStyle = transparent;

    render() {
        return <StorybookUIRoot navigator={ this.props.navigator } />;
    }
}

const screenId = "storybook.main";

Navigation.registerComponent( screenId, () => StorybookUIHMRRoot );

Navigation
    .startSingleScreenApp( {
        screen: {
            screen: screenId
        }
    } )
;

export default StorybookUIHMRRoot;
