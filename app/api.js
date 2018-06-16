import { makeFullEvent, makeSummaryEvent } from "./models/event";
import RSVPStorage from "./models/rsvps";
import { format } from "./utils/date";

import axios from "axios/index";

const event = require( "./events.json" );

const root = "http://littlevillagemag.com/iowa-city-area-events-calendar";


const rsvpStorage = new RSVPStorage;

export default {

    getEventList: async ( firstDate, lastDate ) => {
        return event.events.map( makeSummaryEvent );

        // const dateFormat = "YYYY-MM-DD";
        //
        // const from = format( firstDate, dateFormat );
        // const to = format( lastDate, dateFormat );
        //
        // const url = `${root}/events.json?range_from=${from}&range_to=${to}`;
        // const { data } = await axios.get( url );
        // return data.events ? data.events.map( makeSummaryEvent ) : [];
    },

    getEvent: async eventId => {
        const url = `${root}/events/${eventId}.json`;
        const { data } = await axios.get( url );
        return makeFullEvent( data );
    },


    rsvps: rsvpStorage
}
