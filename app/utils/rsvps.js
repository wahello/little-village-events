import { dayStart } from "./date";
import { rsvpTense } from "./event-time";

import _values from "lodash/values";

const isPastRSVP = ( rsvp, todayStart, todayEnd, currentTime ) => {
    return rsvp.startTime.isBefore( todayStart )
        || (
            !rsvp.startTime.isAfter( todayEnd )
            && rsvpTense( rsvp, currentTime ) === "past"
        )
    ;
};

export const groupByDates = ( rsvps, currentTime, forPast ) => {

    const todayStart = dayStart( currentTime );
    const todayEnd = dayStart( currentTime );

    return _values( rsvps ).reduce( ( result, rsvp ) => {
        const isPast = isPastRSVP( rsvp, todayStart, todayEnd, currentTime );
        if ( forPast ? !isPast : isPast )
            return result;

        const dayTimestamp = dayStart( rsvp.startTime ).valueOf();
        if ( !result[ dayTimestamp ] )
            result[ dayTimestamp ] = [];
        result[ dayTimestamp ].push( { ...rsvp, showAsFeatured: false } );
        return result;
    }, {} );

};
