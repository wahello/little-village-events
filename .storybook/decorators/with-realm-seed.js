import hoistNonReactStatics from "hoist-non-react-statics";

import { injectState } from "@textpress/freactal";

import React, { Component } from "react";


export default seed => Story => {

    class WithRealmSeed extends Component {

        constructor( ...args ) {
            super( ...args );
            const { state } = this.props;
            seed( state.realm, this.props );
        }

        render() {
            return <Story { ...this.props }/>;
        }
    }

    hoistNonReactStatics( WithRealmSeed, Story );

    return injectState( WithRealmSeed );
};
