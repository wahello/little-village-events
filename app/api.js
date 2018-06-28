import { makeEventFullData, makeEventSummaryData } from "app/models/event";
import { format } from "app/utils/date";

import config from "app/config";

import axios from "axios/index";

const { apiRoot } = config;


export default {

    getEventList: async ( firstDate, lastDate ) => {
        const dateFormat = "YYYY-MM-DD";

        const from = format( firstDate, dateFormat );
        const to = format( lastDate, dateFormat );

        const url = `${apiRoot}/events.json?range_from=${from}&range_to=${to}`;
        const { data } = await axios.get( url );
        return data.events ? data.events.map( makeEventSummaryData ) : [];
    },

    getEventFullData: async eventId => {
        const url = `${apiRoot}/events/${eventId}.json`;
        const { data } = await axios.get( url );
        return makeEventFullData( data );
    }
}
