import moment from "moment";


const dayStart = ( date ) => {
    return date.clone().startOf( "day" );
};

const dayEnd = ( date ) => {
    return date.clone().endOf( "day" );
};

const add = ( date, param ) => {
    return date.clone().add( param );
};


const validateEventTimeRange = ( event, result, calendarDay ) => {
    const eventDayStart = dayStart( result.startTime );
    const eventDayEnd = dayEnd( result.endTime );

    if ( calendarDay.isBefore( eventDayStart ) || calendarDay.isAfter( eventDayEnd ) )
        throw new Error( `Event Time: given calendar day is outside of event days:\n${ JSON.stringify( {
            event,
            result,
            calendarDay
        } ) }` );
};


const calcClosestEventTime = ( { startTime, endTime, allDay }, calendarDay ) => {
    const calendarDayStart = dayStart( calendarDay );
    const eventFirstDayStart = dayStart( startTime );

    if ( !endTime ) {
        if ( allDay ) {
            endTime = add( eventFirstDayStart, { hours: 17 } );
            if ( endTime.isAfter( startTime ) )
                return { startTime, endTime };
        }

        endTime = add( startTime, { minutes: 15 } );
        const eventFirstDayEnd = dayEnd( startTime );
        if ( endTime.isAfter( eventFirstDayEnd ) )
            endTime = eventFirstDayEnd;
        return { startTime, endTime };
    }

    const lastEventDayStart = dayStart( endTime );

    if ( eventFirstDayStart.isAfter( calendarDayStart ) ) {
        return {
            startTime,
            endTime: add( endTime, { days: eventFirstDayStart.diff( lastEventDayStart, "days" ) } )
        };
    }

    if ( lastEventDayStart.isBefore( calendarDayStart ) ) {
        return {
            startTime: add( startTime, { days: lastEventDayStart.diff( eventFirstDayStart, "days" ) } ),
            endTime
        };
    }

    return {
        startTime: add( startTime, { days: calendarDayStart.diff( eventFirstDayStart, "days" ) } ),
        endTime: add( endTime, { days: calendarDayStart.diff( lastEventDayStart, "days" ) } )
    };
};


export const closestEventTime = ( event, calendarDay ) => {
    const result = calcClosestEventTime( event, calendarDay );
    validateEventTimeRange( event, result, calendarDay );
    return result;
};


export const eventTense = ( event, calendarDay, currentTime ) => {
    currentTime = currentTime || moment();
    const { startTime, endTime } = closestEventTime( event, calendarDay );

    if ( endTime.isBefore( currentTime ) )
        return "past";

    if ( currentTime.isBefore( startTime ) ) {
        const minutes = startTime.diff( currentTime, "minutes" );
        return minutes <= 60 ? "upcoming" : "future";
    }

    return "present";
};
