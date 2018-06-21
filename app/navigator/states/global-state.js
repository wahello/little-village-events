import * as effects from "./global-state-effects.js";
import * as computed from "./global-state-computed.js";

import api from "app/api";

import { now } from "app/utils/date";

import { provideState } from "@textpress/freactal";

import { Dimensions } from "react-native";


const initialState = {
    screenDimensions: Dimensions.get( "screen" ),
    windowDimensions: Dimensions.get( "window" ),
    today: now(),
    realm: null,
    api,
};


export default ( props = {} ) => {

    const globalState = {
        initialState: () => ( {
            ...initialState,
            realm: props.realm
        } ),
        effects,
        computed
    };

    const rootStatefulComponent = provideState( globalState )();
    rootStatefulComponent.effects.initialize( props );
    return () => rootStatefulComponent.getChildContext();
};
