import { sortByDate } from "./date";
import format from "date-fns/format";

export const formatStartDate = ( { startTime } ) =>
    startTime && format( startTime, "dddd, MMM D" )
;

export const formatStartTime = ( { allDay, startTime } ) =>
    allDay
        ? "All day"
        : startTime && format( startTime, "h:mm A" )
;


export const sortByStartTime = ( events ) => {
    return sortByDate( events, "startTime" );
};
