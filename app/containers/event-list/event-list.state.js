import { mergeIntoState } from "@textpress/freactal";

import axios from "axios";
import moment from "moment";

import _range from "lodash/range";

const numberOfDays = 14;

const loadEvents = async () => {
    const dateFormat = "YYYY-MM-DD";

    const start = moment().startOf( "day" ).format( dateFormat );
    const end = moment().add( { days: numberOfDays } ).endOf( "day" ).format( dateFormat );

    const url = `http://littlevillagemag.com/iowa-city-area-events-calendar/events.json?range_from=${start}&range_to=${end}`;
    const { data } = await axios.get( url );

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

            const today = moment();

            return _range( numberOfDays ).reduce( ( result, days ) => {
                const date = today.clone().add( { days } );

                const start = date.clone().startOf( "day" );
                const end = date.clone().endOf( "day" );

                const events = rawEvents.filter( event => {
                    return moment( event.starttime ).isBefore( end )
                        && moment( event.endtime || event.starttime ).isAfter( start )
                    ;
                } );

                result.push( {
                    today,
                    date,
                    data: events
                } );
                return result;

            }, [] );
        }
    }
}
