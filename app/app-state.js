import api from "./api";
import categories from "./models/categories";

import { mergeIntoState, provideState, update } from "@textpress/freactal";

import React, { Component } from "react";
import { Alert, Dimensions, Linking, Share } from "react-native";
import openMap from "react-native-open-maps";
import call from "react-native-phone-call"
import * as calendar from "react-native-add-calendar-event";
import SafariView from "react-native-safari-view";

import hoistNonReactStatics from "hoist-non-react-statics";
import { object } from "prop-types";

const appName = "little_village_events";

const initialState = {
    screenDimensions: Dimensions.get( "screen" ),
    windowDimensions: Dimensions.get( "window" ),
    api,
    categories
};

const appState = {
    initialState: () => initialState,

    effects: {

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
            const { url, readerMode, tintColor, barTintColor, fromBottom, onDismiss } = options;

            try {
                await SafariView.isAvailable();
            } catch ( x ) {
                effects.openExternalURL( url );
                return mergeIntoState( {} );
            }

            if ( onDismiss ) {

                let subscription = null;
                function listener() {
                    subscription.remove();
                    onDismiss();
                }
                subscription = SafariView.addEventListener( "onDismiss", listener );
            }


            await SafariView.addEventListener( "onDismiss", onDismiss || ( () => {} ) );
            await SafariView
                .show( { url, readerMode, tintColor, barTintColor, fromBottom } )
            ;
            return ( state ) => {
                return state;
            }
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
        } )
    }

};

const rootStatefulComponent = provideState( appState )();
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
