import schema from "app/models/schema";
import seed from "app/models/seed";

import { dayEnd, dayStart } from "app/utils/date";
import { defaultEventEndTime, isOngoingEvent } from "app/utils/event-time";
import { distance } from "app/utils/geo";
import isProduction from "app/utils/is-production";

import { createConnection } from "typeorm/browser";

import omit from "lodash/omit";
import values from "lodash/values";
import uniqBy from "lodash/uniqBy";
import isNil from "lodash/isNil";

import EventEmitter from "EventEmitter";


export const createInstance = async ( options = {} ) => {
    const dbConnection = await createConnection( {
        type: "react-native",
        database: "events",
        entities: schema,
        location: "default",
        logging: [ "error", "query", "schema" ],
        // dropSchema: !isProduction(),
        // synchronize: !isProduction(),
        ...options
    } );

    const db = dbConnection.manager;
    await seed( db );
    // console.warn( "seeded DB" )
    return db;
};


export const write = ( db, fn ) => {
    let result;
    db.write( () => result = fn() );
    return result;
};


export const createEventSummary = ( db, { categories, ...summaryData } ) =>
    db.create( "EventSummary", {
        ...summaryData,
        categories: uniqBy( categories, "id" )
    }, true );


export const createEventDetails = ( db, eventId, detailsData, locations ) => {
    if ( locations ) {
        const { venue } = detailsData;
        venue.distances = locations.map( location => ( {
            id: `${venue.id}.${location.id}`,
            locationId: location.id,
            distance: isNil( location.latitude )
                ? 0
                : Math.round( distance(
                    { lat: location.latitude, lon: location.longitude },
                    { lat: venue.latitude, lon: venue.longitude }
                ) )
        } ) );
    }

    return db.create( "EventDetails", {
        id: eventId,
        ...detailsData
    }, true );
}


export const createRsvpedEventItem = ( db, eventSummary, { startTime, endTime } ) => {
    const ongoing = isOngoingEvent( eventSummary );

    const id = ongoing
        ? `${eventSummary.id}.${startTime}`
        : `${eventSummary.id}`;

    return db.create( "EventItem", {
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


export const createEventItem = ( db, eventSummary ) => {
    return db.create( "EventItem", toEventItem( eventSummary ), true );
};


export const createEventWithDetails = ( db, eventData ) => {
    const summary = createEventSummary( db, eventData );
    createEventItem( db, summary );
    createEventDetails( db, eventData.id, eventData.details );
};


export const getEventItem = ( db, eventItemId ) =>
    db.objectForPrimaryKey( "EventItem", eventItemId );


export const getEventSummary = ( db, eventId ) =>
    db.objectForPrimaryKey( "EventSummary", eventId );


export const getEventDetails = ( db, eventId ) =>
    db.objectForPrimaryKey( "EventDetails", eventId );


export const getUserProfile = ( db, id ) =>
    db.objectForPrimaryKey( "UserProfile", id );


export const updateUserProfile = ( db, id, userProfileData ) =>
    db.create( "UserProfile", {
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


export const realmQuerySubscription = () => {
    const eventName = "queryUpdate";
    return {
        query: null,
        eventEmmiter: new EventEmitter(),

        subscribe( callback ) {
            this.eventEmmiter.addListener( eventName, callback );
        },

        update( newQuery ) {
            if ( this.query )
                this.query.removeAllListeners();
            this.query = newQuery;
            this.query.addListener( this._emitQeuryUpdate.bind( this ) );
        },

        reset() {
            this.update( null );
            this.eventEmmiter.removeAllListeners();
        },

        _emitQeuryUpdate( ...args ) {
            this.eventEmmiter.emit( eventName, ...args );
        }
    }
};
