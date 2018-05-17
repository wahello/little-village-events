export { update, mergeIntoState } from "@textpress/freactal";

import {
    injectState as injectState_,
    provideState as provideState_,
} from "@textpress/freactal";

import hoistNonReactStatics from "hoist-non-react-statics";


export function provideState( state ) {
    const wrapper = provideState_( state );
    return ( Component ) => hoistNonReactStatics( wrapper( Component ), Component );
}


export function injectState( Component ) {
    return hoistNonReactStatics( injectState_( Component ), Component );
}
