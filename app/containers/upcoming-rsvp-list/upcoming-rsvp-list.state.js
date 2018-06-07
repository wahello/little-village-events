import { sortByStartTime } from "../../utils/event";
import { isRSVPFeatured } from "../../utils/event-time";
import * as RSVPS from "../../utils/rsvps";

import moment from "moment";

import _keys from "lodash/keys";


const toEventList = ( rsvps ) => {
    const currentTime = moment();
    const rsvpsByDates = RSVPS.groupByDates( rsvps, currentTime, false );

    return _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => a - b )
        .reduce( ( result, dayTimestamp, index ) => {
            const rsvps = rsvpsByDates[ dayTimestamp ];
            const date = moment( dayTimestamp );

            if ( !index )
                rsvps[ 0 ].showAsFeatured = isRSVPFeatured( rsvps[ 0 ], currentTime );

            result.push( {
                today: currentTime,
                date,
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

