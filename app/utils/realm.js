import schema from "app/models/event-schema";

import { dayStart } from "app/utils/date";
import { isOngoingEvent, defaultEventEndItem } from "app/utils/event-time";
import isProduction from "app/utils/is-production";

import Realm from "realm";

import omit from "lodash/omit";
import values from "lodash/values";
import isFunction from "lodash/isFunction";


export const createInstance = ( options = {} ) =>
    new Realm( {
        schema,
        schemaVersion: 1,
        // deleteRealmIfMigrationNeeded: !isProduction(),
        ...options,
        migration: ( oldRealm, newRealm ) => {
            if ( !isProduction() )
                newRealm.deleteAll();
        }
    } );


export const createEventSummary = ( realm, summaryData ) =>
    realm.create( "EventSummary", {
        ...summaryData,
        venue: {
            id: summaryData.venueId,
            name: summaryData.venueName,
            ...summaryData.venue
        }
    }, true );


export const createEventDetails = ( realm, eventId, detailsData ) =>
    realm.create( "EventDetails", {
        id: eventId,
        ...detailsData
    }, true );


export const createEventItem = ( realm, eventSummary, rsvpTime ) => {
    const ongoing = isOngoingEvent( eventSummary );

    const id = rsvpTime && ongoing
        ? `${eventSummary.id}.${rsvpTime.startTime}`
        : `${eventSummary.id}`;

    const startTime = rsvpTime && rsvpTime.startTime || eventSummary.startTime;

    return realm.create( "EventItem", {
        id,
        eventDate: ongoing ? null : dayStart( startTime ),
        startTime,
        endTime: rsvpTime && rsvpTime.endTime || eventSummary.endTime || defaultEventEndItem( eventSummary ),
        allDay: rsvpTime ? false : eventSummary.allDay,
        rsvp: !!rsvpTime,
        eventSummary,
    }, true );
}


export const createEventWithDetails = ( realm, eventData ) => {
    const summary = createEventSummary( realm, eventData );
    createEventItem( realm, summary );
    createEventDetails( realm, eventData.id, eventData.details );
};


export const getEventItem = ( realm, eventItemId ) =>
    realm.objectForPrimaryKey( "EventItem", eventItemId );


export const getEventSummary = ( realm, eventId ) =>
    realm.objectForPrimaryKey( "EventSummary", eventId );


export const getEventDetails = ( realm, eventId ) =>
    realm.objectForPrimaryKey( "EventDetails", eventId );



const copyRealmObjProperty = ( obj, name, type ) => {
    switch ( type ) {
        case "object": return toPlainObj( obj[name] );
        case "list": return obj[name].map( toPlainObj );
        case "linkingObjects": return null;
    }

    return obj[name];
};


export function toPlainObj( obj, skipProps = [] ) {
    const props = obj.objectSchema().properties;
    const result = [];
    values( omit( props, skipProps ) ).forEach( ( { name, type } ) => {
        result[name] = copyRealmObjProperty( obj, name, type );
    } );

    return result;
}
