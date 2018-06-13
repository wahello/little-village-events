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
        const dayRSVPs = result[ timestamp ] || {};
        const eventRSVPs = dayRSVPs[ rsvp.id ] || [];
        eventRSVPs.push( { ...rsvp, tense } );
        dayRSVPs[ rsvp.id ] = eventRSVPs;
        result[ timestamp ] = dayRSVPs;
        return result;
    }, {} );

};
