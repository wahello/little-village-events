import { makeSummaryEvent } from "../../models/event";
import { mergeIntoState, update } from "../../utils/freactal";

import axios from "axios";
import moment from "moment";

import _range from "lodash/range";
import _findIndex from "lodash/findIndex";

const numberOfDays = 14;

const loadEvents = async () => {
    const dateFormat = "YYYY-MM-DD";

    const start = moment().startOf( "day" ).format( dateFormat );
    const end = moment().add( { days: numberOfDays } ).endOf( "day" ).format( dateFormat );

    const url = `http://littlevillagemag.com/iowa-city-area-events-calendar/events.json?range_from=${start}&range_to=${end}`;
    const { data } = await axios.get( url );

    return mergeIntoState( {
        events: data.events && data.events.map( makeSummaryEvent )
    } );
};


export default {
    initialState: () => ( {
        events: null
    } ),
    effects: {
        initialize: loadEvents,
        updateEvent: ( effects, event ) => {
            return state => {
                const { events } = state;

                if ( !events )
                    return state;

                const eventIndex = _findIndex( events, e => e.id === event.id );
                if ( eventIndex === -1 )
                    return state;

                const updatedEvents = events
                    .slice( eventIndex )
                    .concat( [
                        event,
                        events.slice( eventIndex + 1, events.length )
                    ] )
                ;

                return { ...state, events: updatedEvents };
            };
        }
    },
    computed: {
        eventCalendar: ( { events } ) => {
            if ( !events ) return [];

            const today = moment();

            return _range( numberOfDays ).reduce( ( result, days ) => {
                const date = today.clone().add( { days } );

                const start = date.clone().startOf( "day" );
                const end = date.clone().endOf( "day" );

                const dayEvents = events.filter( event => {
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
