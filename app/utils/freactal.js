export { update, mergeIntoState } from "@textpress/freactal";

import {
    injectState as injectState_,
    provideState as provideState_,
} from "@textpress/freactal";

import hoistNonReactStatics from "hoist-non-react-statics";

const middleware = () => {
    const result = [];
    if ( __DEV__ ) {
        const logger = require( "freactal-logger" ).default;
        result.push( logger() );
    }
    return result;
};

export function provideState( state ) {
    const wrapper = provideState_( { ...state, middleware: middleware() } );
    return ( Component ) => hoistNonReactStatics( wrapper( Component ), Component );
}


export function injectState( Component ) {
    return hoistNonReactStatics( injectState_( Component ), Component );
}
