import * as effects from "./global-state-effects.js";
import * as computed from "./global-state-computed.js";

import config from "app/config";

import { addToDate, dayStart, now } from "app/utils/date";
import { getUserProfile } from "app/utils/db";

import { provideState } from "@textpress/freactal";

import { Dimensions } from "react-native";


const initialState = {
    screenDimensions: Dimensions.get( "screen" ),
    windowDimensions: Dimensions.get( "window" ),
    permissions: {}
};


const makeRootStatefulComponent = async props => {
    const userProfile = await getUserProfile( props.db, "default" );
    const today = now();
    const first = dayStart( today );
    const last = addToDate( first, { days: config.daysToLoad - 1 } );
    const dates = { first, last };

    const globalState = {
        initialState: () => ( {
            ...initialState,
            db: props.db,
            api: props.api,
            userProfile,
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


export default async ( props = {} ) => {
    const root = await makeRootStatefulComponent( props );
    return {
        getChildContext: () => root.getChildContext(),
        showOnboardingScreen: () => {
            const { state } = root.getChildContext().freactal;
            return state.showOnboardingScreen;
        }
    }
};
