import _sortBy from "lodash/sortBy";
import startOfDay from "date-fns/start_of_day";
import endOfDate from "date-fns/end_of_day";
import startOfWeek from "date-fns/start_of_week";
import endOfWeek from "date-fns/end_of_week";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import addDays from "date-fns/add_days";
import addMinutes from "date-fns/add_minutes";
import subDays from "date-fns/sub_days";
import subMinutes from "date-fns/sub_minutes";

export { default as isAfter } from "date-fns/is_after";
export { default as isBefore } from "date-fns/is_before";

export { default as minutesDiff } from "date-fns/difference_in_minutes";
export { default as hoursDiff } from "date-fns/difference_in_hours";
export const daysDiff = differenceInCalendarDays;

export const now = Date.now;


export const dayStart = ( date ) => {
    return startOfDay( date );
};


export const dayEnd = ( date ) => {
    return endOfDate( date );
};


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


export const addToDate = ( date, param ) => {
    const days = param.day || param.days;
    if ( days )
        return addDays( date, days );

    const minutes = param.minute || param.minutes;
    if ( minutes )
        return addMinutes( date, minutes );

    return date;
};


export const subtractFromDate = ( date, param ) => {
    const days = param.day || param.days;
    if ( days )
        return subDays( date, days );

    const minutes = param.minute || param.minutes;
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
    return _sortBy( items, item => item[property].valueOf() );
};
