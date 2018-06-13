import { sortByStartTime } from "../../utils/event";

import { now } from "app/utils/date";

import _keys from "lodash/keys";
import _values from "lodash/values";


const toEventList = ( rsvpsByDates ) => {
    const currentTime = now();

    return _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => a - b )
        .reduce( ( result, timestamp, index ) => {
            const rsvps = [].concat( ..._values( rsvpsByDates[ timestamp ] ) );

            if ( !index ) {
                const rsvp = rsvps[ 0 ];
                rsvp.showAsFeatured = [ "upcoming", "present" ].indexOf( rsvp.tense ) > -1;
            }

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
        eventList: ( { rsvpMap } ) => toEventList( rsvpMap )
    }
}
