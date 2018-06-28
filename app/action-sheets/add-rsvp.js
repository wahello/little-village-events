import { now } from "app/utils/date";
import { getRSVPInfo, nextRSVPTime } from "app/utils/event-time";

import confirmRSVPTime from "./confirm-rsvp-time";
import pickRSVPTime from "./pick-rsvp-time";


export default ( { eventSummary, eventItem, openWebBrowser } ) => {

    if ( !eventItem.allDay && eventItem.eventDate )
        return confirmRSVPTime( {
            eventSummary,
            rsvpTime: {
                startTime: eventItem.startTime,
                endTime: eventItem.endTime
            }
        } );


    const rsvpInfo = getRSVPInfo( eventSummary );
    const rsvpTime = nextRSVPTime( rsvpInfo, now() );
    const mode = rsvpInfo.ongoing
        ? ( rsvpInfo.allDay ? "datetime" : "date" )
        : "time"
    ;

    return pickRSVPTime( {
        eventSummary,
        rsvpInfo,
        rsvpTime,
        mode,
        openWebBrowser,
        handler: ( { open, value } ) => open( confirmRSVPTime( { eventSummary, rsvpTime: value } ) )
    } );
}
