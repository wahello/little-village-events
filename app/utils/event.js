
export const formatStartDate = ( { startTime } ) =>
    startTime && startTime.format( "dddd, MMM D" )
;

export const formatStartTime = ( { allDay, startTime } ) =>
    allDay
        ? "All day"
        : startTime && startTime.format( "h:mm A" )
;
