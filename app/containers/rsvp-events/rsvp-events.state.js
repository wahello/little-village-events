import { update } from "../../utils/freactal";

import memoize from "memoizee";
import moment from "moment";

import _reduce from "lodash/reduce";


const firstLastDates = ( dates, startTime ) => {
    if ( !dates )
        return { first: startTime, last: startTime };

    const { first, last } = dates;
    return {
        first: first.isAfter( startTime ) ? startTime : first,
        last: last.isBefore( startTime ) ? startTime : last
    }
};

const eventsAndDates = memoize( ( rsvps, scope ) => {

    const today = moment();
    const matchUpcoming = scope === "upcoming";
    const match = ( startTime ) => {
        const past = startTime.isBefore( today );
        return matchUpcoming ? !past : past;
    };

    return _reduce( rsvps, ( result, event ) => {
        const { startTime } = event;

        if ( !match( startTime ) )
            return result;

        result.events.push( event );
        result.dates = firstLastDates( result.dates, startTime );

        return result;
    }, { events: [], dates: null, invertOrder: !matchUpcoming } );
} );

export default {
    initialState: () => ( {
        scope: "upcoming",
    } ),
    effects: {
        setScope: update( ( state, scope ) => ( { scope } ) )
    },
    computed: {
        events: ( { rsvps, scope } ) => eventsAndDates( rsvps, scope ).events,
        dates: ( { rsvps, scope } ) => eventsAndDates( rsvps, scope ).dates,
        invertOrder: ( { rsvps, scope } ) => eventsAndDates( rsvps, scope ).invertOrder,
    }
}
