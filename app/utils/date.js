
export const dayStart = ( date ) => {
    return date.clone().startOf( "day" );
};

export const dayEnd = ( date ) => {
    return date.clone().endOf( "day" );
};

export const addToDate = ( date, param ) => {
    return date.clone().add( param );
};

export const subtractFromDate = ( date, param ) => {
    return date.clone().subtract( param );
};

export const daysDiff = ( date1, date2 ) => {
    return dayStart( date1 ).diff( dayStart( date2 ), "days" );
};
