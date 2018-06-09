import { dayTimestamp } from "./date";
import { rsvpTense } from "./event-time";

import _values from "lodash/values";

export const groupByDates = ( rsvps, currentTime, forPast ) => {

    return _values( rsvps ).reduce( ( result, rsvp ) => {

        const tense = rsvpTense( rsvp, currentTime );
        const isPast = tense === "past";
        if ( forPast ? !isPast : isPast )
            return result;

        const timestamp = dayTimestamp( rsvp.startTime );
        if ( !result[ timestamp ] )
            result[ timestamp ] = [];
        result[ timestamp ].push( { ...rsvp, tense } );
        return result;
    }, {} );

};
