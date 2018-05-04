import { mergeIntoState } from "@textpress/freactal";

import axios from "axios";
import moment from "moment";

import _range from "lodash/range";

const numberOfDays = 14;

const loadEvents = async () => {
    const dateFormat = "YYYY-MM-DD";

    const start = moment().startOf( "day" ).format( dateFormat );
    const end = moment().add( { days: numberOfDays } ).endOf( "day" ).format( dateFormat );

    const { data } = await axios.get( `http://littlevillagemag.com/iowa-city-area-events-calendar/events.json?range_from=${start}&range_to=${end}` );

    return mergeIntoState( {
        rawEvents: data.events
    } );
};


export default {
    initialState: () => ( {
        rawEvents: null
    } ),
    effects: {
        initialize: loadEvents,
    },
    computed: {
        events: ( { rawEvents } ) => {
            if ( !rawEvents ) return [];

            const now = moment();

            return _range( numberOfDays ).reduce( ( result, days ) => {
                const date = now.clone().add( { days } );
                const title = date.calendar( now, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd, MMM Do",
                    sameElse: "dddd, MMM Do"
                } );
                const start = date.startOf( "day" );
                const end = date.endOf( "day" );

                const events = rawEvents.filter( event =>
                    moment( event.starttime ).isBefore( end )
                    && moment( event.endtime || event.starttime ).isAfter( start )
                );

                result.push( {
                    title: title,
                    data: events
                } );
                return result;

            }, [] );
        }
    }
}
