import * as RSVPs from "app/utils/rsvps";

import api from "../../api";
import openEmbeddedBrowser from "../../utils/openEmbeddedBrowser"

import { upcomingEventsMap } from "app/utils/events";
import { addToDate, now } from "app/utils/date";

import { mergeIntoState, provideState, update } from "@textpress/freactal";

import React, { Component } from "react";
import { Alert, Dimensions, Linking, Share } from "react-native";
import openMap from "react-native-open-maps";
import call from "react-native-phone-call"
import * as calendar from "react-native-add-calendar-event";

import hoistNonReactStatics from "hoist-non-react-statics";
import { object } from "prop-types";

import _omit from "lodash/omit";

const appName = "little_village_events";

const initialState = {
    screenDimensions: Dimensions.get( "screen" ),
    windowDimensions: Dimensions.get( "window" ),
    rsvps: {},
    events: null,
    dates: null,
    api,
};


const numberOfDays = 14;

const loadEvents = async api => {
    const first = now();
    const last = addToDate( now(), { days: numberOfDays - 1 } );
    const events = await api.getEventList( first, last );

    return {
        events,
        dates: {
            first,
            last
        }
    };
};


const globalState = {
    initialState: () => initialState,

    effects: {
        initialize: async ( effects ) => {
            await api.rsvps.clear();
            const rsvps = await api.rsvps.all();
            api.rsvps.addEventListener( "added", effects._rsvpAdded );
            api.rsvps.addEventListener( "removed", effects._rsvpRemoved );
            return mergeIntoState( {
                rsvps,
                ...( await loadEvents( api ) )
            } );
        },

        call: async ( effects, number ) => {
            await call( {
                number: number.replace( /[- ()]/g, "" ),
                prompt: true
            } );
            return mergeIntoState( {} );
        },


        share: async ( effects, content, options ) => {
            await Share.share( content, options );
            return mergeIntoState( {} );
        },


        openMap: async ( effects, options ) => {
            await openMap( options );
            return mergeIntoState( {} );
        },

        openEmbeddedBrowser: async ( effects, options ) => {
            const { url, readerMode, tintColor, barTintColor, fromBottom, wait } = options;

            const success = await openEmbeddedBrowser( { url, readerMode, tintColor, barTintColor, fromBottom }, wait );

            if ( !success )
                await effects.openExternalURL( url );

            return ( state ) => state;
        },


        openExternalURL: async ( effects, url ) => {
            if ( await Linking.canOpenURL( url ) )
                await Linking.openURL( url );
            return mergeIntoState( {} );
        },


        addEventToCalendar: async ( effects, { name, venueName, startTime, details: { venue, moreInfo } } ) => {
            try {
                await calendar.presentEventDialog( {
                    title: name,
                    startDate: startTime.toISOString(),
                    endDate: startTime.clone().add( { hours: 1 } ).toISOString(),
                    location: venue ? venue.location : venueName,
                    url: moreInfo || ""
                } );
            } catch ( x ) {
                if ( x.message === "permissionNotGranted" )
                    await effects.showUpdateYourSettings( "Update " );
                else
                    console.error( "Failed addEventToCalendar", x.message, x )
            }
            return mergeIntoState( {} );
        },


        showUpdateYourSettings: async () => {
            const buttons = [ { text: "Cancel", style: "cancel" } ];

            const supported = await Linking.canOpenURL( "app-settings:" );
            if ( supported )
                buttons.push( { text: "Settings", onPress: () => Linking.openURL( "app-settings:" ) } );

            Alert.alert(
                "Update Your Settings",
                `To add an event to your calendar, you'll need to give ${appName} permission to access your calendar in Settings`,
                buttons,
                { cancelable: false }
            );
            return mergeIntoState( {} );
        },


        updateDimensions: update( ( state, dimensions ) => {

            return {
                screenDimensions: dimensions.screen,
                windowDimensions: dimensions.screen
            }
        } ),


        _rsvpAdded: async ( effects, rsvp ) => {
            return ( state ) => ( { ...state, rsvps: { ...state.rsvps, [ rsvp.rsvpId ]: rsvp } } );
        },


        _rsvpRemoved: async ( effects, rsvp ) => {
            return ( state ) => ( { ...state, rsvps: _omit( state.rsvps, [ rsvp.rsvpId ] ) } );
        }


    },
    computed: {
        eventMaps: ( { dates, events } ) => upcomingEventsMap( dates, events ),
        rsvpMap: ( { rsvps } ) => RSVPs.groupByDates( rsvps, new Date() ),
    }
};

const rootStatefulComponent = provideState( globalState )();
rootStatefulComponent.effects.initialize( {} );
const context = rootStatefulComponent.getChildContext();

export const contextTypes = {
    freactal: object
};

Dimensions.addEventListener( "change", context.freactal.effects.updateDimensions );

export default Screen => {

    class AppStateProvider extends Component {

        getChildContext() {
            return context;
        }

        render() {
            return <Screen { ...this.props }/>;
        }
    }

    AppStateProvider.childContextTypes = contextTypes;

    hoistNonReactStatics( AppStateProvider, Screen );

    return AppStateProvider;
}
