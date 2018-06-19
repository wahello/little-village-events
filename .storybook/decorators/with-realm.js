import { injectState, provideState } from "@textpress/freactal";

import React, { Fragment } from "react";
import { compose } from "recompose";


export default function withRealmDecorator( { seed } ) {
    function StorybookProvider( { children } ) {

        const withRealm = ( props ) => {
            return <Fragment>{ props.children }</Fragment>;
        };

        const WithRealm = compose(
            injectState,
            provideState( {
                initialState: ( { state } ) => {
                    seed && seed( state.realm );
                    return {};
                }
            } ),
            injectState,
        )( withRealm );

        return <WithRealm>{ children }</WithRealm>;
    }

    return ( story ) => {
        return <StorybookProvider>{ story() }</StorybookProvider>;
    };
}
