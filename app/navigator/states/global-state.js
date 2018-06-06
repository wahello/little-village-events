import api from "../../api";
import categories from "../../models/categories";
import openEmbeddedBrowser from "../../utils/openEmbeddedBrowser"

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
    api,
    categories,
};


const globalState = {
    initialState: () => initialState,

    effects: {
        initialize: async () => {
            const rsvps = await api.getAllRSVPs();
            return mergeIntoState( { rsvps } );
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


        addRSVP: async ( effects, event ) => {
            await api.addRSVP( event );
            return ( state ) => ( { ...state, rsvps: { ...state.rsvps, [event.id]: event } } );
        },


        removeRSVP: async ( effects, event ) => {
            await api.removeRSVP( event );
            return ( state ) => ( { ...state, rsvps: _omit( state.rsvps, [ event.id ] ) } );
        }


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
