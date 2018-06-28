import schema from "app/models/schema";
import seed from "app/models/seed";

import { dayEnd, dayStart } from "app/utils/date";
import { defaultEventEndTime, isOngoingEvent } from "app/utils/event-time";

import Realm from "realm";

import omit from "lodash/omit";
import values from "lodash/values";
import uniqBy from "lodash/uniqBy";


export const createInstance = ( options = {} ) => {
    const realm = new Realm( {
        schema,
        schemaVersion: 6,
        // deleteRealmIfMigrationNeeded: !isProduction(),
        ...options,
        migration: ( oldRealm, newRealm ) => {
            // if ( !isProduction() )
            //     newRealm.deleteAll();
        }
    } );

    // realm.write( () => realm.deleteAll() );
    seed( realm );
    return realm;
};


export const write = ( realm, fn ) => {
    let result;
    realm.write( () => result = fn() );
    return result;
};


export const createEventSummary = ( realm, { categories, ...summaryData } ) =>
    realm.create( "EventSummary", {
        ...summaryData,
        categories: uniqBy( categories, "id" ),
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


export const createRsvpedEventItem = ( realm, eventSummary, { startTime, endTime } ) => {
    const ongoing = isOngoingEvent( eventSummary );

    const id = ongoing
        ? `${eventSummary.id}.${startTime}`
        : `${eventSummary.id}`;

    return realm.create( "EventItem", {
        id,
        eventDate: dayStart( startTime ),
        startTime: startTime,
        endTime,
        allDay: false,
        rsvp: true,
        eventSummary
    }, true );
};


const normalizeEventTime = eventSummary => {
    const { allDay, startTime, endTime } = eventSummary;
    return allDay
        ? {
            startTime: dayStart( startTime ),
            endTime: dayEnd( endTime || startTime )
        }
        : {
            startTime,
            endTime: endTime && endTime.valueOf() > startTime.valueOf()
                ? endTime
                : defaultEventEndTime( eventSummary )
        }
};


export const toEventItem = ( eventSummary ) => {
    const ongoing = isOngoingEvent( eventSummary );

    const { startTime, endTime } = normalizeEventTime( eventSummary );

    return {
        id: `${eventSummary.id}`,
        eventDate: ongoing ? null : dayStart( startTime ),
        startTime,
        endTime,
        allDay: eventSummary.allDay,
        rsvp: false,
        eventSummary
    };
};


export const createEventItem = ( realm, eventSummary ) => {
    return realm.create( "EventItem", toEventItem( eventSummary ), true );
};


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


export const getUserProfile = ( realm, id ) =>
    realm.objectForPrimaryKey( "UserProfile", id );


export const updateUserProfile = ( realm, id, userProfileData ) =>
    realm.create( "UserProfile", {
        id,
        ...userProfileData
    }, true );


const copyRealmObjProperty = ( obj, name, type ) => {
    switch ( type ) {
        case "object":
            return toPlainObj( obj[ name ] );
        case "list":
            return obj[ name ].map( toPlainObj );
        case "linkingObjects":
            return null;
    }

    return obj[ name ];
};


export function toPlainObj( obj, skipProps = [] ) {
    const props = obj.objectSchema().properties;
    const result = {};
    values( omit( props, skipProps ) ).forEach( ( { name, type } ) => {
        result[ name ] = copyRealmObjProperty( obj, name, type );
    } );

    return result;
}
