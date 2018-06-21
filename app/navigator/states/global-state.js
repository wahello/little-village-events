import * as effects from "./global-state-effects.js";
import * as computed from "./global-state-computed.js";

import config from "app/config";

import { addToDate, dayStart, now } from "app/utils/date";

import { provideState } from "@textpress/freactal";

import { Dimensions } from "react-native";


const initialState = {
    screenDimensions: Dimensions.get( "screen" ),
    windowDimensions: Dimensions.get( "window" ),
};


export default ( props = {} ) => {

    const today = now();
    const first = dayStart( today );
    const last = addToDate( first, { days: config.daysToLoad - 1 } );
    const dates = { first, last };

    const globalState = {
        initialState: () => ( {
            ...initialState,
            realm: props.realm,
            api: props.api,
            today,
            dates
        } ),
        effects,
        computed
    };

    const rootStatefulComponent = provideState( globalState )();
    rootStatefulComponent.effects.initialize( { ...props, dates } );
    return () => rootStatefulComponent.getChildContext();
};
