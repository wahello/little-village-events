import { BackIcon } from "/app/components/icons";
import navStyles from "/app/screens/navigator-styles";

import { injectState } from "@textpress/freactal";

import { StyleSheet } from "react-native";
import React, { Fragment } from "react";
import { compose } from "recompose";

import _isString from "lodash/isString"


const styles = StyleSheet.create( {
    back: {
        position: "absolute",
        left: 5,
        top: 31
    }
} );


export default function navigatorStyleDecorator( style, optios = {} ) {
    if ( _isString( style ) )
        style = navStyles[ style ];

    function StorybookProvider( { children } ) {

        const navigatorStyle = ( { state, children } ) => {
            state.navigator.setStyle( style );
            return <Fragment>{ children }</Fragment>;
        };

        const NavigatorStyle = compose( injectState )(
            navigatorStyle
        );

        return (
            <NavigatorStyle>
                { children }
                { optios.back ? <BackIcon style={ styles.back }/> : null }
            </NavigatorStyle>
        );
    }

    return ( story ) => {
        return <StorybookProvider>{ story() }</StorybookProvider>;
    };
}
