import { addToDate, dayStart, dayEnd } from "./date";
import config from "../config";

import moment from "moment";

const { eventThresholds } = config;

const validateRSVPTimeRange = ( event, result, calendarDay ) => {
    const eventDayStart = dayStart( result.startTime );
    const eventDayEnd = dayEnd( result.endTime );

    if ( calendarDay.isBefore( eventDayStart ) || calendarDay.isAfter( eventDayEnd ) )
        throw new Error( `RSVP Time: given calendar day is outside of event days:\n${ JSON.stringify( {
            event,
            result,
            calendarDay
        } ) }` );
};

// TODO remove end time calculation, tense checks should use config.eventThresholds.past instead

const calcRSVPTimeImpl = ( { startTime, endTime, allDay }, calendarDay ) => {
    const calendarDayStart = dayStart( calendarDay );
    const eventFirstDayStart = dayStart( startTime );

    if ( !endTime ) {
        if ( allDay ) {
            endTime = addToDate( eventFirstDayStart, { hours: 17 } );
            if ( endTime.isAfter( startTime ) )
                return { startTime, endTime };
        }

        endTime = addToDate( startTime, { minutes: 15 } );
        const eventFirstDayEnd = dayEnd( startTime );
        if ( endTime.isAfter( eventFirstDayEnd ) )
            endTime = eventFirstDayEnd;
        return { startTime, endTime };
    }

    const lastEventDayStart = dayStart( endTime );

    if ( eventFirstDayStart.isAfter( calendarDayStart ) ) {
        return {
            startTime,
            endTime: addToDate( endTime, { days: eventFirstDayStart.diff( lastEventDayStart, "days" ) } )
        };
    }

    if ( lastEventDayStart.isBefore( calendarDayStart ) ) {
        return {
            startTime: addToDate( startTime, { days: lastEventDayStart.diff( eventFirstDayStart, "days" ) } ),
            endTime
        };
    }

    return {
        startTime: addToDate( startTime, { days: calendarDayStart.diff( eventFirstDayStart, "days" ) } ),
        endTime: addToDate( endTime, { days: calendarDayStart.diff( lastEventDayStart, "days" ) } )
    };
};


export const calcRSVPTime = ( event, calendarDay ) => {
    const result = calcRSVPTimeImpl( event, calendarDay );
    validateRSVPTimeRange( event, result, calendarDay );
    return result;
};


export const rsvpTense = ( rsvp, currentTime ) => {
    currentTime = currentTime || moment();
    const { startTime, endTime } = rsvp;

    if ( endTime.isBefore( currentTime ) )
        return "past";

    if ( currentTime.isBefore( startTime ) ) {
        const minutes = startTime.diff( currentTime, "minutes" );
        return minutes <= eventThresholds.upcoming ? "upcoming" : "future";
    }

    if ( rsvp.allDay )
        return "upcoming";

    return "present";
};


export const isRSVPFeatured = ( rsvp, currentTime ) => {
    return [ "upcoming", "present" ].indexOf( rsvpTense( rsvp, currentTime ) ) > -1;
};


export const eventTense = ( event, calendarDay, currentTime ) => {
    currentTime = currentTime || moment();
    return rsvpTense( calcRSVPTime( event, calendarDay ), currentTime );
};
