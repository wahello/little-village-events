import details from "./details";
import { mergeIntoState, update } from "@textpress/freactal";

import { Alert, Dimensions, Linking } from "react-native";
import openMap from "react-native-open-maps";
import call from "react-native-phone-call"
import * as calendar from "react-native-add-calendar-event";

import moment from "moment";

const appName = "little_village_events";

const initialState = {
    windowDimensions: Dimensions.get( "window" ),
    categories: {
        "62": "Editors' Picks",
        "63": "Music",
        "64": "Art/Exhibition",
        "65": "Theatre/Performance",
        "81": "Literature",
        "67": "Cinema",
        "68": "Foodie",
        "79": "Education",
        "80": "Community",
        "71": "Fashion",
        "66": "Drink Specials",
        "82": "Crafty",
        "83": "Family",
        "85": "Sports / Rec"
    }
};

const state = {
    initialState: () => initialState,
    effects: {
        initialize: update( ( state, { navigator } ) => ( { navigator } ) ),

        showEventDetails: ( effects, event ) => {
            return ( state ) => {
                state.navigator.push( { screen: details.id, ...details.nav, passProps: { event } } );
                return state;
            }
        },

        call: async ( effects, number ) => {
            await call( {
                number: number.replace( /[- ()]/g, "" ),
                prompt: true
            } );
            return mergeIntoState( {} );
        },

        openMap: async ( effects, options ) => {
            await openMap( options );
            return mergeIntoState( {} );
        },

        addEventToCalendar: async ( effects, { name, starttime, venue, moreinfo } ) => {
            try {
                await calendar.presentEventDialog( {
                    title: name,
                    startDate: moment( starttime ).toISOString(),
                    endDate: moment( starttime ).clone().add( { hours: 1 } ).toISOString(),
                    location: venue ? [ venue.name, venue.address ].filter( p => !!p ).join( " " ) : "",
                    url: moreinfo
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
        }

    }
};

export default state;
