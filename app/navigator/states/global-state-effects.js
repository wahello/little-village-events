import { createEventItem, createEventSummary, updateUserProfile, write } from "app/utils/realm";
import openBrowser from "app/utils/openEmbeddedBrowser"
import slowlog from "app/utils/slowlog";

import config from "app/config";

import { mergeIntoState, update } from "@textpress/freactal";

import { Alert, Dimensions, Linking, Share } from "react-native";
import openMapApp from "react-native-open-maps";
import phoneCall from "react-native-phone-call"
import * as calendar from "react-native-add-calendar-event";
import Permissions from "react-native-permissions";


const loadEvents = async ( realm, api, dates ) => {
    const events = await api.getEventList( dates.first, dates.last );

    slowlog( () => realm.write( () => {
        events.forEach( eventData => {
            const summary = createEventSummary( realm, eventData );
            if ( !summary.items.length )
                createEventItem( realm, summary );
        } );
    } ), { threshold: 100 } );
};


export const checkPermissions = async () => {
    const permissions = await Permissions.checkMultiple( [ "event", "notification", "location" ] );
    return mergeIntoState( { permissions } );
};


export const initialize = async ( effects, { realm, api, dates } ) => {
    Dimensions.addEventListener( "change", effects.updateDimensions );
    effects.checkPermissions();

    await loadEvents( realm, api, dates );

    return mergeIntoState( {} );
};


export const saveLocation = update( ( { realm, userProfile }, location ) => ( {
    userProfile: write( realm, () => updateUserProfile( realm, userProfile.id, { location } ) )
} ) );


export const saveInterests = update( ( { realm, userProfile }, interests ) => ( {
    userProfile: write( realm, () => updateUserProfile( realm, userProfile.id, { interests } ) )
} ) );



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
        await calendar.presentEventCreatingDialog( calendarEvent );
    } catch ( x ) {
        if ( x.message === "permissionNotGranted" )
            await effects.showUpdateYourSettings();
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
        `To add an event to your calendar, you'll need to give ${config.appName} permission to access your calendar in Settings`,
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
