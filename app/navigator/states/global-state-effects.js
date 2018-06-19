import api from "app/api";

import { createEvent } from "app/utils/realm";
//import * as RSVPs from "app/utils/rsvps";
import openBrowser from "app/utils/openEmbeddedBrowser"
import { addToDate, dayStart, now } from "app/utils/date";
import slowlog from "app/utils/slowlog";

import { mergeIntoState, update } from "@textpress/freactal";

import { Alert, Dimensions, Linking, Share } from "react-native";
import openMapApp from "react-native-open-maps";
import phoneCall from "react-native-phone-call"
import * as calendar from "react-native-add-calendar-event";

import _omit from "lodash/omit";


const appName = "little_village_events";
const numberOfDays = 14;


const loadEvents = async ( realm, api ) => {
    const first = dayStart( now() );
    const last = addToDate( first, { days: numberOfDays - 1 } );
    const events = await api.getEventList( first, last );

    slowlog( () => realm.write( () => {
        events.forEach( event => createEvent( realm, event ) );
    } ) );

    console.warn( "Event", JSON.stringify( realm.objects( "Event" )[0] ) );

    return {
        dates: {
            first,
            last
        }
    };
};


export const initialize = async ( effects, { realm } ) => {
    Dimensions.addEventListener( "change", effects.updateDimensions );

    // await api.rsvps.clear();
    // const rsvps = await api.rsvps.all();
    // api.rsvps.addEventListener( "added", effects._rsvpAdded );
    // api.rsvps.addEventListener( "removed", effects._rsvpRemoved );

    return mergeIntoState( {
        // rsvps,
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


export const addEventToCalendar = async ( effects, { name, venueName, startTime, details: { venue, moreInfo } } ) => {
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


export const _rsvpAdded = async ( effects, rsvp ) => {
    return ( state ) => ( { ...state, rsvps: { ...state.rsvps, [ rsvp.rsvpId ]: rsvp } } );
};


export const _rsvpRemoved = async ( effects, rsvp ) => {
    return ( state ) => ( { ...state, rsvps: _omit( state.rsvps, [ rsvp.rsvpId ] ) } );
};
