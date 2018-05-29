
export const formatStartDate = ( { startTime } ) =>
    startTime && startTime.format( "dddd, MMM D" )
;

export const formatStartTime = ( { allDay, startTime } ) =>
    allDay
        ? "All day"
        : startTime && startTime.format( "h:mm A" )
;

export const formatStartTimeAndPlace = ( event ) =>
    [ formatStartTime( event ), event.venueName && `@ ${event.venueName}` ]
        .filter( part => !!part )
        .join( " " )
;
