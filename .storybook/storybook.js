import navigatorStyleDecorator from "./decorators/navigator-style";

import registerScreen from "../app/navigator/register-screen";
import { transparent } from "../app/navigator/styles";

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
    static id = "storybook.main";
    static navigatorStyle = { ...transparent };

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

registerScreen( StorybookUIHMRRoot );

Navigation
    .startSingleScreenApp( {
        screen: {
            screen: StorybookUIHMRRoot.id
        }
    } )
;

export default StorybookUIHMRRoot;
