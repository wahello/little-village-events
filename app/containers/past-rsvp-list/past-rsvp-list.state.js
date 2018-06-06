import { sortByStartTime } from "../../utils/event";

import moment from "moment";

import _keys from "lodash/keys";
import * as RSVPS from "../../utils/rsvps";


const toEventList = ( rsvps ) => {
    const currentTime = moment();
    const rsvpsByDates = RSVPS.groupByDates( rsvps, currentTime, false );

    return _keys( rsvpsByDates )
        .map( Number )
        .sort()
        .reverse()
        .reduce( ( result, dayTimestamp ) => {
            const rsvps = rsvpsByDates[ dayTimestamp ];
            const date = moment( dayTimestamp );

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
