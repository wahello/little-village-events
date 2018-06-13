import { now } from "app/utils/date";
import * as RSVPS from "app/utils/rsvps";
import { toDayEvents } from "app/utils/rsvps";

import _keys from "lodash/keys";


const toEventList = ( rsvps ) => {
    const currentTime = now();
    const rsvpsByDates = RSVPS.groupByDates( rsvps, currentTime, true );

    return _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => b - a ) // reverse sorting
        .reduce( ( result, timestamp ) => {
            const events = toDayEvents( rsvpsByDates, timestamp );

            result.push( {
                today: currentTime,
                date: new Date( timestamp ),
                data: events
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
