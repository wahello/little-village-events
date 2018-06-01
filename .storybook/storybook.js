import navigatorStyleDecorator from "./decorators/navigator-style";

import registerScreen from "../app/navigator/register-screen";
import NavigatorStyles from "../app/navigator/styles";

import { getStorybookUI, configure, addDecorator } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";

import React, { Component } from "react";
import { Navigation } from "react-native-navigation";

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI( { port: 7007, host: "localhost" } );

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {

    render() {
        return <StorybookUIRoot { ...this.props } />;
    }
}

// import stories

configure( () => {
    addDecorator( navigatorStyleDecorator( StorybookUIHMRRoot ) );
    addDecorator( withKnobs );
    require( "./stories" );
}, module );

const StorybookScreen = {
    id: "storybook.main",
    navigatorStyle: { ...NavigatorStyles.navBarHiddenLight },
    view: StorybookUIHMRRoot
};

registerScreen( StorybookScreen );

Navigation
    .startSingleScreenApp( {
        screen: {
            screen: StorybookScreen.id
        }
    } )
;

export default StorybookUIHMRRoot;
