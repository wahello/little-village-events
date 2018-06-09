import { sortByStartTime } from "../../utils/event";

import moment from "moment";

import _keys from "lodash/keys";
import * as RSVPS from "../../utils/rsvps";


const toEventList = ( rsvps ) => {
    const currentTime = moment();
    const rsvpsByDates = RSVPS.groupByDates( rsvps, currentTime, false );

    return _keys( rsvpsByDates )
        .map( Number )
        .sort( ( a, b ) => b - a ) // reverse sorting
        .reduce( ( result, timestamp ) => {
            const rsvps = rsvpsByDates[ timestamp ];

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
