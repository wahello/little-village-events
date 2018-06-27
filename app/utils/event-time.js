import {
    addToDate,
    dayEnd,
    daysDiff,
    dayStart,
    hoursDiff,
    isAfter,
    isBefore,
    minutesDiff,
    moveTimeToDate,
    now,
    subtractFromDate
} from "./date";

import config from "../config";

const { eventThresholds } = config;

export const firstRSVPDate = eventItem => {
    const { startTime, allDay } = eventItem;
    return allDay ? dayStart( startTime ) : startTime;
};

export const lastRSVPDate = eventItem => {
    const { startTime, endTime, allDay } = eventItem;
    const days = daysDiff( endTime, startTime );
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


export const getRSVPInfo = eventItem => {
    const { endTime, allDay = false } = eventItem;
    const first = firstRSVPDate( eventItem );
    const last = lastRSVPDate( eventItem ) || first;

    return {
        first,
        last,
        singleDay: first === last,
        allDay,
        duration: allDay ? null : Math.max( 0, minutesDiff( endTime, last ) )
    };

};

const calcRSVPStartTime = ( rsvpInfo, calendarDay ) => {
    const { first, last } = rsvpInfo;
    if ( isBefore( calendarDay, first ) )
        return first;

    if ( isAfter( calendarDay, last ) )
        return last;

    return moveTimeToDate( first, calendarDay );
};


export const RSVPTimeForDay = ( eventItem, calendarDay ) => {
    const rsvpInfo = getRSVPInfo( eventItem );
    const { first, last, duration, allDay } = rsvpInfo;
    if ( daysDiff( calendarDay, last ) > 0 )
        return null;

    if ( daysDiff( calendarDay, first ) < 0 )
        return null;

    const startTime = calcRSVPStartTime( rsvpInfo, calendarDay );

    return {
        startTime,
        endTime: allDay ? dayEnd( startTime ) : addToDate( startTime, { minutes: duration } ),
        allDay
    };
};


export const rsvpTense = ( rsvpTime, currentTime ) => {
    currentTime = currentTime || now();
    const { startTime, endTime, allDay } = rsvpTime;

    if ( allDay && daysDiff( currentTime, startTime ) === 0 )
        return "upcoming";

    const minutes = minutesDiff( startTime, currentTime );
    if ( minutes > 0 )
        return minutes < eventThresholds.upcoming ? "upcoming" : "future";

    return isBefore( endTime, currentTime ) ? "past" : "present";
};


export const eventTense = ( eventItem, calendarDay, currentTime ) => {
    currentTime = currentTime || now();
    const rsvpTime = RSVPTimeForDay( eventItem, calendarDay );
    if ( !rsvpTime ) {
        return isBefore( calendarDay, eventItem.startTime )
            ? "future"
            : "past"
        ;
    }

    const days = daysDiff( currentTime, rsvpTime.startTime );
    if ( days > 0 )
        return "past";
    if ( days < 0 )
        return "future";

    return rsvpTense( rsvpTime, currentTime );
};


export const defaultEventEndTime = ( { startTime } ) =>
    addToDate( startTime, { minutes: config.eventThresholds.past } );
