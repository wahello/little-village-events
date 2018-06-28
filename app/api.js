import { makeEventFullData, makeEventSummaryData } from "app/models/event";
import { format } from "app/utils/date";

import axios from "axios/index";

const root = "http://littlevillagemag.com/iowa-city-area-events-calendar";


export default {

    getEventList: async ( firstDate, lastDate ) => {
        const dateFormat = "YYYY-MM-DD";

        const from = format( firstDate, dateFormat );
        const to = format( lastDate, dateFormat );

        const url = `${root}/events.json?range_from=${from}&range_to=${to}`;
        const { data } = await axios.get( url );
        return data.events ? data.events.map( makeEventSummaryData ) : [];
    },

    getEventFullData: async eventId => {
        const url = `${root}/events/${eventId}.json`;
        const { data } = await axios.get( url );
        return makeEventFullData( data );
    },
}
