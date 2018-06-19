import schema from "app/models/event-schema";

import { dayStart } from "app/utils/date";
import isProduction from "app/utils/is-production";

import Realm from "realm";


export const createInstance = ( options = {} ) =>
    new Realm( {
        schema,
        deleteRealmIfMigrationNeeded: !isProduction(),
        ...options
    } );


export const createEvent = ( realm, event ) =>
    realm.create( "Event", {
        ...event,
        venue: {
            id: event.venueId,
            name: event.venueName,
            ...event.venue
        },
        eventDate: dayStart( event.startTime )
    }, true );



export const createEventDetails = ( realm, eventId, eventDetails ) => {

    eventDetails = {
        id: eventId,
        ...eventDetails
    };

    return realm.create( "EventDetails", eventDetails, true );
};


export const createEventWithDetails = ( realm, event ) => {
    createEvent( realm, event );
    createEventDetails( realm, event.id, event.details );
};
