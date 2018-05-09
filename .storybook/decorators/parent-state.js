import { injectState, provideState } from "@textpress/freactal";

import React, { Fragment } from "react";
import { compose } from "recompose";


export default function stateDecorator( state ) {
    function StorybookProvider( { children } ) {

        const withState = ( props ) => {
            return <Fragment>{ props.children }</Fragment>;
        };

        const WithState = compose(
            provideState( state ),
            injectState,
        )( withState );

        return <WithState>{ children }</WithState>;
    }

    return ( story ) => {
        return <StorybookProvider>{ story() }</StorybookProvider>;
    };
}
