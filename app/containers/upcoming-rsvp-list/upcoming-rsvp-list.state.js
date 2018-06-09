import { sortByStartTime } from "../../utils/event";
import { isRSVPFeatured, rsvpTense } from "../../utils/event-time";
import * as RSVPS from "../../utils/rsvps";

import moment from "moment";

import _keys from "lodash/keys";


const toEventList = ( rsvps ) => {
    const currentTime = moment();
    const rsvpsByDates = RSVPS.groupByDates( rsvps, currentTime, false );

    return _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => a - b )
        .reduce( ( result, timestamp, index ) => {
            const rsvps = rsvpsByDates[ timestamp ];

            if ( !index ) {
                const rsvp = rsvps[ 0 ];
                rsvp.showAsFeatured = [ "upcoming", "present" ].indexOf( rsvp.tense ) > -1;
            }

            result.push( {
                today: currentTime,
                date: moment( timestamp ),
                data: sortByStartTime( rsvps )
            } );
            return result;
        }, [] );
};


export default {
    initialState: () => ( {} ),
    computed: {
        eventList: ( { rsvps } ) => toEventList( rsvps )
    }
}

