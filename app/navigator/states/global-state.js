import * as effects from "./global-state-effects.js";
import api from "app/api";

import { provideState } from "@textpress/freactal";

import { Dimensions } from "react-native";


const initialState = {
    screenDimensions: Dimensions.get( "screen" ),
    windowDimensions: Dimensions.get( "window" ),
    // rsvps: {},
    // events: null,
    // dates: null,
    realm: null,
    api,
};


export default ( props = {} ) => {

    const globalState = {
        initialState: () => ( { ...initialState } ),
        effects,
        computed: {
            // eventMaps: ( { events } ) => upcomingEventsMap( events ),
            // rsvpMap: ( { rsvps } ) => RSVPs.groupByDates( rsvps, new Date() ),
        }
    };

    const rootStatefulComponent = provideState( globalState )();
    rootStatefulComponent.effects.initialize( props );
    return () => rootStatefulComponent.getChildContext();
};
