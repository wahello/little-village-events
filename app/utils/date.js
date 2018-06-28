import _sortBy from "lodash/sortBy";
import startOfWeek from "date-fns/start_of_week";
import endOfWeek from "date-fns/end_of_week";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import differenceInCalendarWeeks from "date-fns/difference_in_calendar_weeks";
import addDays from "date-fns/add_days";
import addHours from "date-fns/add_hours";
import addMinutes from "date-fns/add_minutes";
import subDays from "date-fns/sub_days";
import subMinutes from "date-fns/sub_minutes";
import dateFormat from "date-fns/format";

export { default as minDate } from "date-fns/min";
export { default as maxDate } from "date-fns/max";

export { default as isAfter } from "date-fns/is_after";
export { default as isBefore } from "date-fns/is_before";
export { default as isSameDay } from "date-fns/is_same_day";

export { default as minutesDiff } from "date-fns/difference_in_minutes";
export { default as hoursDiff } from "date-fns/difference_in_hours";
export const daysDiff = differenceInCalendarDays;

export const format = dateFormat;

export const now = () => new Date();


export const dayStart = ( date ) => new Date( format( date, "YYYY-MM-DD[T00:00:00.000]Z" ) );
export const dayEnd = ( date ) => new Date( format( date, "YYYY-MM-DD[T23:59:59.999]Z" ) );


export const dayTimestamp = ( date ) => {
    return dayStart( date ).valueOf();
};


export const weekStart = ( date ) => {
    return startOfWeek( date );
};


export const weekEnd = ( date ) => {
    return endOfWeek( date );
};


export const weekTimestamp = ( date ) => {
    return weekStart( date ).valueOf();
};


export const addToDate = ( date, params ) => {
    const days = params.day || params.days;
    if ( days )
        return addDays( date, days );

    const minutes = params.minute || params.minutes;
    if ( minutes )
        return addMinutes( date, minutes );

    const hours = params.hour || params.hours;
    if ( hours )
        return addHours( date, hours );

    return date;
};


export const subtractFromDate = ( date, params ) => {
    const days = params.day || params.days;
    if ( days )
        return subDays( date, days );

    const minutes = params.minute || params.minutes;
    if ( minutes )
        return subMinutes( date, minutes );

    return date;
};


export const moveTimeToDate = ( time, date ) => {
    if ( time === date )
        return time;
    const daysToAdd = daysDiff( date, time );
    return daysToAdd
        ? addToDate( time, { days: daysToAdd } )
        : time
        ;
};


export const sortByDate = ( items, property ) => {
    return _sortBy( items, item => item[ property ].valueOf() );
};

export const calendarFormat = ( date, referenceDate, formats ) => {
    referenceDate = referenceDate || now();

    const days = daysDiff( date, referenceDate );
    switch ( days ) {
        case -1:
            return format( date, formats.lastDay );
        case 0:
            return format( date, formats.sameDay );
        case 1:
            return format( date, formats.nextDay );
    }

    const weeks = differenceInCalendarWeeks( referenceDate );
    switch ( weeks ) {
        case -1:
            return format( date, formats.lastWeek );
        case 0:
            return format( date, days < 0 ? formats.lastWeek : formats.nextWeek );
        case 1:
            return format( date, formats.nextWeek );
    }

    return format( date, formats.sameElse );
};
