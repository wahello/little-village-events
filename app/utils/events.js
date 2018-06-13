import {
    daysDiff,
    weekStart,
    weekEnd,
    addToDate,
    dayTimestamp,
    isAfter,
    isBefore
} from "./date";

import { getRSVPInfo, isOngoingEvent } from "./event-time";

import { EventWithRSVP } from "app/models/event-with-rsvp";

import _range from "lodash/range";
import _sortBy from "lodash/sortBy";
import _values from "lodash/values";


const sortEvents = ( events ) =>
    _sortBy( events, [ "priority", e => e.startTime.valueOf(), "name" ] )
;


export const upcomingEventsMap = ( events ) => {

    events = events || [];
    return events.reduce( ( result, event ) => {
        if ( isOngoingEvent( event ) ) {
            result.ongoingEvents[ event.id ] = event;
            return result;
        }

        const timestamp = dayTimestamp( event.startTime );
        result.eventsByDate[ timestamp ] = result.eventsByDate[ timestamp ] || [];
        result.eventsByDate[ timestamp ].push( event );
        return result;

    }, { eventsByDate: {}, ongoingEvents: {} } );
};


export const upcomingEvents = ( dates, { eventsByDate, ongoingEvents }, rsvpsByDates, currentTime ) => {
    if ( !dates )
        return [];

    const week = { start: weekStart( dates.first ), end: weekEnd( dates.first ) };

    const thisWeekOngoingEvents = _values( ongoingEvents )
        .filter( event => {
            const rsvpInfo = getRSVPInfo( event );
            return !isAfter( rsvpInfo.first, week.end ) && !isBefore( rsvpInfo.last, week.start );
        } );
    let addOngoingEvents = thisWeekOngoingEvents.length;

    const numberOfDays = daysDiff( dates.last, dates.first ) + 1;

    return _range( numberOfDays ).reduce( ( result, day ) => {
        const date = addToDate( dates.first, { day } );
        const timestamp = dayTimestamp( date );

        const events = eventsByDate[ timestamp ] || [];
        const rsvpMap = rsvpsByDates[ timestamp ] || {};

        let dayEvents = events.reduce( ( dayEvents, event ) => {
            const rsvps = rsvpMap[ event.id ] || [];
            if ( rsvps.length )
                rsvps.forEach( rsvp => dayEvents.push( new EventWithRSVP( event, rsvp ) ) );
            else
                dayEvents.push( new EventWithRSVP( event, null ) );

            return dayEvents;
        }, [] );

        dayEvents = _values( ongoingEvents ).reduce( ( dayEvents, event ) => {
            const rsvps = rsvpMap[ event.id ] || [];
            if ( rsvps.length )
                rsvps.forEach( rsvp => dayEvents.push( new EventWithRSVP( event, rsvp ) ) );

            return dayEvents;
        }, dayEvents );

        if ( addOngoingEvents && isAfter( date, week.end ) ) {
            result.push( {
                today: currentTime,
                data: sortEvents( thisWeekOngoingEvents ),
                ongoing: true
            } );

            addOngoingEvents = false;
        }

        if ( dayEvents.length ) {
            result.push( {
                today: currentTime,
                date,
                data: sortEvents( dayEvents )
            } );
        }

        return result;

    }, [] );
};
