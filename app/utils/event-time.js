import {
    addToDate,
    daysDiff,
    dayStart,
    isAfter,
    isBefore,
    hoursDiff,
    minutesDiff,
    moveTimeToDate,
    now,
    subtractFromDate
} from "./date";

import config from "../config";

const { eventThresholds } = config;

export const firstRSVPDate = event => {
    const { startTime, allDay } = event;
    return allDay ? dayStart( startTime ) : startTime;
};

export const lastRSVPDate = event => {
    const { startTime, endTime, allDay } = event;
    const days = endTime ? daysDiff( endTime, startTime ) : 0;
    if ( days < 1 )
        return null;

    const last = addToDate( startTime, { days } );
    if ( allDay )
        return dayStart( last );

    // overnight
    if ( isBefore( endTime, last ) ) {
        return days > 1
            ? subtractFromDate( last, { day: 1 } )
            : null
        ;
    }
    return last;
};


export const isOngoingEvent = event => {
    const { startTime, endTime } = event;
    return endTime && hoursDiff( endTime, startTime ) >= 24 || false;
};


export const getRSVPInfo = event => {
    const { startTime, endTime, allDay = false } = event;
    const first = firstRSVPDate( event );
    const last = lastRSVPDate( event );

    return {
        first,
        last,
        allDay,
        duration: allDay || !endTime ? 0 : Math.max( 0, minutesDiff( endTime, last || startTime ) )
    };

};

const calcRSVPStartTime = ( rsvpInfo, calendarDay ) => {
    const { first, last } = rsvpInfo;
    if ( !last || isBefore( calendarDay, first ) )
        return first;

    if ( isAfter( calendarDay, last ) )
        return last;

    return moveTimeToDate( first, calendarDay );
};


const calcRSVPEndTime = ( rsvpInfo, startTime ) => {
    const { allDay, duration } = rsvpInfo;
    if ( allDay || !duration )
        return null;

    return addToDate( startTime, { minutes: duration } );
};

export const RSVPTimeForDay = ( event, calendarDay ) => {
    const rsvpInfo = getRSVPInfo( event );
    const { first, last, allDay } = rsvpInfo;
    if ( daysDiff( calendarDay, last || first ) > 0 )
        return null;

    if ( daysDiff( calendarDay, first ) < 0 )
        return null;

    const startTime = calcRSVPStartTime( rsvpInfo, calendarDay );

    if ( allDay ) {
        return {
            startTime: startTime,
            endTime: null,
            allDay
        };
    }

    return {
        startTime,
        endTime: calcRSVPEndTime( rsvpInfo, startTime ),
        allDay
    };
};


export const calcRSVPTime = ( event, calendarDay ) => {
    const result = RSVPTimeForDay( event, calendarDay );
    if ( !result )
        throw new Error( `RSVP Time: given calendar day is outside of event days:\n${ JSON.stringify( {
            event,
            result,
            calendarDay
        } ) }` );
    return result;
};


export const rsvpTense = ( rsvp, currentTime ) => {
    currentTime = currentTime || now();
    const { startTime, endTime } = rsvp;

    if ( rsvp.allDay && daysDiff( currentTime, startTime ) === 0 )
        return "upcoming";

    const minutes = minutesDiff( startTime, currentTime );
    if ( minutes > 0 )
        return minutes < eventThresholds.upcoming ? "upcoming" : "future";

    const isPast = endTime
        ? isBefore( endTime, currentTime )
        : Math.abs( minutes ) >= eventThresholds.past
    ;

    return isPast ? "past" : "present";
};


export const eventTense = ( event, calendarDay, currentTime ) => {
    currentTime = currentTime || now();
    const rsvpTime = RSVPTimeForDay( event, calendarDay );
    if ( !rsvpTime ) {
        return isBefore( calendarDay, event.startTime )
            ? "future"
            : "past"
        ;
    }

    const days = daysDiff( currentTime, rsvpTime.startTime );
    if ( days > 0 )
        return "past";
    if ( days < 0 )
        return "future";

    return rsvpTense( RSVPTimeForDay( event, calendarDay ), currentTime );
};


export const defaultEventEndItem = ( { startTime } ) =>
    addToDate( startTime, { minutes: config.eventThresholds.past } );
