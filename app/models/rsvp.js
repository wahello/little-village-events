import { stripToSummaryEvent } from "./event";
import { calcRSVPTime } from "../utils/event-time";

const toRsvpId = event => `${event.id}.${event.startTime.valueOf()}`;

export const makeRSVPEvent = ( event, calendarDay ) => {
    const result = {
        ...stripToSummaryEvent( event ),
        ...calcRSVPTime( event, calendarDay )
    };

    result.rsvpId = toRsvpId( result );
    return result;
};

export const validateRSVPEvent = rsvp => {
    if ( !rsvp.rsvpId )
        throw new Error( "RSVP validation: passed event is not rsvp" );
};
