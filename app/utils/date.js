import _sortBy from "lodash/sortBy";


export const dayStart = ( date ) => {
    return date.clone().startOf( "day" );
};


export const dayEnd = ( date ) => {
    return date.clone().endOf( "day" );
};


export const dayTimestamp = ( date ) => {
    return dayStart( date ).valueOf();
};


export const weekStart = ( date ) => {
    return date.clone().startOf( "week" );
};


export const weekEnd = ( date ) => {
    return date.clone().endOf( "week" );
};


export const weekTimestamp = ( date ) => {
    return weekStart( date ).valueOf();
};


export const addToDate = ( date, param ) => {
    return date.clone().add( param );
};


export const subtractFromDate = ( date, param ) => {
    return date.clone().subtract( param );
};


export const daysDiff = ( startDay, endDay ) => {
    return dayStart( endDay ).diff( dayStart( startDay ), "days" );
};


export const hoursDiff = ( startDay, endDay ) => {
    return endDay.diff( startDay, "hours" );
};


export const moveTimeToDate = ( time, date ) => {
    if ( time === date )
        return time;
    const daysToAdd = daysDiff( time, date );
    return daysToAdd
        ? addToDate( time, { days: daysToAdd } )
        : time
    ;
};


export const sortByDate = ( items, property ) => {
    return _sortBy( items, item => item[property].valueOf() );
};

