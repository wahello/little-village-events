import api from "app/api";

import seed from "app/models/seed";

import { createEventItem, createEventSummary } from "app/utils/realm";
import openBrowser from "app/utils/openEmbeddedBrowser"
import { addToDate, dayStart, now } from "app/utils/date";
import slowlog from "app/utils/slowlog";

import { mergeIntoState, update } from "@textpress/freactal";

import { Alert, Dimensions, Linking, Share } from "react-native";
import openMapApp from "react-native-open-maps";
import phoneCall from "react-native-phone-call"
import * as calendar from "react-native-add-calendar-event";


const appName = "little_village_events";
const numberOfDays = 14;


const loadEvents = async ( realm, api ) => {
    const first = dayStart( now() );
    const last = addToDate( first, { days: numberOfDays - 1 } );
    const events = await api.getEventList( first, last );

    slowlog( () => realm.write( () => {
        events.forEach( eventData => {
            const summary = createEventSummary( realm, eventData );
            if ( !summary.items.length )
                createEventItem( realm, summary );
        } );
    } ), { threshold: 100 } );

    return {
        dates: {
            first,
            last
        }
    };
};


export const initialize = async ( effects, { realm } ) => {
    Dimensions.addEventListener( "change", effects.updateDimensions );

    seed( realm );

    return mergeIntoState( {
        realm,
        ...( await loadEvents( realm, api ) )
    } );
};


export const call = async ( effects, number ) => {
    await phoneCall( {
        number: number.replace( /[- ()]/g, "" ),
        prompt: true
    } );
    return mergeIntoState( {} );
};


export const share = async ( effects, content, options ) => {
    await Share.share( content, options );
    return mergeIntoState( {} );
};


export const openMap = async ( effects, options ) => {
    await openMapApp( options );
    return mergeIntoState( {} );
};


export const openEmbeddedBrowser = async ( effects, options ) => {
    const { url, readerMode, tintColor, barTintColor, fromBottom, wait } = options;

    const success = await openBrowser( { url, readerMode, tintColor, barTintColor, fromBottom }, wait );

    if ( !success )
        await effects.openExternalURL( url );

    return ( state ) => state;
};


export const openExternalURL = async ( effects, url ) => {
    if ( await Linking.canOpenURL( url ) )
        await Linking.openURL( url );
    return mergeIntoState( {} );
};


export const addEventToCalendar = async ( effects, calendarEvent ) => {
    try {
        await calendar.presentEventDialog( calendarEvent );
    } catch ( x ) {
        if ( x.message === "permissionNotGranted" )
            await effects.showUpdateYourSettings( "Update " );
        else
            console.error( "Failed addEventToCalendar", x.message, x )
    }
    return mergeIntoState( {} );
};


export const showUpdateYourSettings = async () => {
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
};


export const updateDimensions = update( ( state, dimensions ) => {

    return {
        screenDimensions: dimensions.screen,
        windowDimensions: dimensions.screen
    }
} );
