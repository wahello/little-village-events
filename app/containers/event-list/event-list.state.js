import moment from "moment";

import _range from "lodash/range";

export default {
    initialState: () => ( {
    } ),
    effects: {
    },
    computed: {
        eventList: ( { dates, events, rsvps } ) => {
            if ( !dates || !events ) return [];

            const today = moment();
            const { first, last } = dates;
            const numberOfDays = last.clone().startOf( "day" ).diff( first.clone().startOf( "day" ), "days" ) + 1;

            const eventsWithRSVP = events.map( event => ( { ...event, rsvp: !!rsvps[ event.id ] } ) );

            return _range( numberOfDays ).reduce( ( result, days ) => {
                const date = first.clone().add( { days } );

                const start = date.clone().startOf( "day" );
                const end = date.clone().endOf( "day" );

                const dayEvents = eventsWithRSVP.filter( event => {
                    return event.startTime.isBefore( end )
                        && ( event.endTime || event.startTime ).isAfter( start )
                    ;
                } );

                result.push( {
                    today,
                    date,
                    data: dayEvents
                } );
                return result;

            }, [] );
        }
    }
}
