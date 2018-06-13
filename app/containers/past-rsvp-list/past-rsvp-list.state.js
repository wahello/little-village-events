import { now } from "app/utils/date";
import { sortByStartTime } from "app/utils/event";
import * as RSVPS from "app/utils/rsvps";

import _keys from "lodash/keys";


const toEventList = ( rsvps ) => {
    const currentTime = now();
    const rsvpsByDates = RSVPS.groupByDates( rsvps, currentTime, true );

    return _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => b - a ) // reverse sorting
        .reduce( ( result, timestamp ) => {
            const rsvps = rsvpsByDates[ timestamp ];

            result.push( {
                today: currentTime,
                date: new Date( timestamp ),
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
