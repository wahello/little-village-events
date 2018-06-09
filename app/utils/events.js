import {
    daysDiff,
    weekStart,
    weekEnd,
    addToDate,
    dayTimestamp
} from "./date";

import { getRSVPInfo } from "./event-time";

import * as RSVPs from "./rsvps";

import { EventWithRSVP } from "../models/event-with-rsvp";

import moment from "moment/moment";

import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _first from "lodash/first";
import _keys from "lodash/keys";
import _last from "lodash/last";
import _range from "lodash/range";
import _sortBy from "lodash/sortBy";
import _values from "lodash/values";


const calcRSVPDays = rsvpsByDates => {

    const allTimestamps = _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => a - b )
    ;

    if ( !allTimestamps.length )
        return null;

    return {
        first: moment( _first( allTimestamps ) ),
        last: moment( _last( allTimestamps ) ),
    };
};

const sortEvents = ( events ) =>
    _sortBy( events, [ "timestamp" ] ) //"name", "priority",
;

export const upcomingEvents = ( dates, events, rsvps, currentTime ) => {
    if ( !dates )
        return [];

    events = events || [];

    const rsvpsByDates = RSVPs.groupByDates( rsvps, currentTime );

    const week = { start: weekStart( dates.first ), end: weekEnd( dates.first ) };

    const { eventsByDate, ongoingEvents } = events.reduce( ( result, event ) => {
        const rsvpInfo = getRSVPInfo( event );
        if ( !rsvpInfo.last ) {
            const timestamp = dayTimestamp( rsvpInfo.first );
            result.eventsByDate[ timestamp ] = result.eventsByDate[ timestamp ] || [];
            result.eventsByDate[ timestamp ].push( event );
            return result;
        }

        if ( rsvpInfo.first.isAfter( week.end ) || rsvpInfo.last.isBefore( week.start ) )
            return result;

        result.ongoingEvents[ event.id ] = event;
        return result;

    }, { eventsByDate: {}, ongoingEvents: {} } );

    const rsvpDays = calcRSVPDays( rsvpsByDates );
    const first = rsvpDays ? moment.min( rsvpDays.first, dates.first ) : dates.first;
    const last = rsvpDays ? moment.max( rsvpDays.last, dates.last ) : dates.last;
    const numberOfDays = daysDiff( first, last ) + 1;

    const result = _range( numberOfDays ).reduce( ( result, day ) => {
        const date = addToDate( first, { day } )
        const timestamp = dayTimestamp( date );

        const events = eventsByDate[timestamp] || [];
        const rsvps = rsvpsByDates[timestamp] || [];

        let dayEvents = events.reduce( ( dayEvents, event ) => {
            const rsvpIndex = _findIndex( rsvps, rsvp => rsvp.id === event.id );
            const rsvp = rsvpIndex < 0 ? null : rsvps.splice( rsvpIndex, 1 )[0];
            dayEvents.push( new EventWithRSVP( event, rsvp ) );
            return dayEvents;
        }, [] );

        dayEvents = rsvps.reduce( ( dayEvents, rsvp ) => {
            const event = _find( ongoingEvents, event => rsvp.id === event.id );
            if ( !event )
                return dayEvents;

            dayEvents.push( new EventWithRSVP( event, rsvp ) );

            return dayEvents;
        }, dayEvents );

        if ( dayEvents.length ) {
            result.push( {
                today: currentTime,
                date,
                data: sortEvents( dayEvents )
            } );
        }

        return result;

    }, [] );

    if ( _keys( ongoingEvents ).length ) {
        const ongoingIndex = Math.max( 0, Math.min( result.length, daysDiff( first, week.end ) + 1 ) );
        result.splice( ongoingIndex, 0, {
            today: currentTime,
            data: sortEvents( _values( ongoingEvents ).map( e => new EventWithRSVP( e ) ) ),
            ongoing: true
        } );
    }


    return result;
};

