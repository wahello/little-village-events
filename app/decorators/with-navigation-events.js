import { contextTypes } from "@textpress/freactal/lib/context";

import hoistNonReactStatics from "hoist-non-react-statics";

import React, { Component } from "react";


export default eventHandlers => Screen => {

    class WithNavigationEvents extends Component {

        static contextTypes = contextTypes;

        constructor( ...args ) {
            super( ...args );
            const { navigator } = this.props;
            navigator.setOnNavigatorEvent( this.handleNavigationEvent )
        }

        handleNavigationEvent = event => {
            const handler = eventHandlers[ event.id ];
            if ( handler ) {
                const { effects, state } = this.context.freactal;
                handler( { effects, state } );
            }
        }

        render() {
            return <Screen { ...this.props }/>;
        }
    }

    return hoistNonReactStatics( WithNavigationEvents, Screen );
};
