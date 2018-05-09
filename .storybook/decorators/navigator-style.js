import styles from "/app/screens/navigator-styles";

import { injectState } from "@textpress/freactal";

import React, { Fragment } from "react";
import { compose } from "recompose";

import _isString from "lodash/isString"


export default function navigatorStyleDecorator( style ) {
    if ( _isString( style ) )
        style = styles[ style ];

    function StorybookProvider( { children } ) {

        const navigatorStyle = ( { state, children } ) => {
            state.navigator.setStyle( style );
            return <Fragment>{ children }</Fragment>;
        };

        const NavigatorStyle = compose( injectState )(
            navigatorStyle
        );

        return <NavigatorStyle>{ children }</NavigatorStyle>;
    }

    return ( story ) => {
        return <StorybookProvider>{ story() }</StorybookProvider>;
    };
}
