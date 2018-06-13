import { now } from "app/utils/date";

import _keys from "lodash/keys";
import { toDayEvents } from "app/utils/rsvps";


const toEventList = ( rsvpsByDates ) => {
    const currentTime = now();

    return _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => a - b )
        .reduce( ( result, timestamp, index ) => {

            const events = toDayEvents( rsvpsByDates, timestamp );

            if ( !index ) {
                const event = events[ 0 ];
                event.showAsFeatured = [ "upcoming", "present" ].indexOf( event.tense ) > -1;
            }

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
        eventList: ( { rsvpMap } ) => toEventList( rsvpMap )
    }
}
