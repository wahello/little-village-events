import * as effects from "./global-state-effects.js";
import * as computed from "./global-state-computed.js";

import config from "app/config";

import { addToDate, dayStart, now } from "app/utils/date";
import { getUserProfile } from "app/utils/realm";

import { provideState } from "@textpress/freactal";

import { Dimensions } from "react-native";


const initialState = {
    screenDimensions: Dimensions.get( "screen" ),
    windowDimensions: Dimensions.get( "window" )
};


const makeRootStatefulComponent = props => {
    const today = now();
    const first = dayStart( today );
    const last = addToDate( first, { days: config.daysToLoad - 1 } );
    const dates = { first, last };

    const globalState = {
        initialState: () => ( {
            ...initialState,
            realm: props.realm,
            api: props.api,
            userProfile: getUserProfile( props.realm, "default" ),
            today,
            dates
        } ),
        effects,
        computed
    };

    const result = provideState( globalState )();
    result.effects.initialize( { ...props, dates } );
    return result;
};


export default ( props = {} ) => {
    const root = makeRootStatefulComponent( props );
    return {
        getChildContext: () => root.getChildContext(),
        showOnboardingScreen: () => {
            const { state } = root.getChildContext().freactal;
            return true;//state.showOnboardingScreen;
        }
    }
};
