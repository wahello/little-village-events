import schema from "app/models/event-schema";

import { dayStart } from "app/utils/date";
import isProduction from "app/utils/is-production";

import Realm from "realm";
import isUndefined from "lodash/isUndefined";


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


export const createEventItem = ( realm, eventSummary, { startTime, endTime, allDay } = {} ) => {
    return realm.create( "EventItem", {
        id: startTime ? `${eventSummary.id}.${startTime}` : `${eventSummary.id}`,
        eventDate: dayStart( startTime || eventSummary.startTime ),
        startTime: startTime || eventSummary.startTime,
        endTime: endTime || eventSummary.endTime,
        allDay: isUndefined( allDay ) ? eventSummary.allDay : allDay,
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
