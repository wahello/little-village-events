import { makeFullEvent, makeSummaryEvent } from "./models/event";
import RSVPStorage from "./models/rsvps";

import axios from "axios/index";

const root = "http://littlevillagemag.com/iowa-city-area-events-calendar";


const rsvpStorage = new RSVPStorage;

export default {

    getEventList: async ( firstDate, lastDate ) => {
        const dateFormat = "YYYY-MM-DD";

        const from = firstDate.format( dateFormat );
        const to = lastDate.format( dateFormat );

        const url = `${root}/events.json?range_from=${from}&range_to=${to}`;
        const { data } = await axios.get( url );
        return data.events ? data.events.map( makeSummaryEvent ) : [];
    },

    getEvent: async eventId => {
        const url = `${root}/events/${eventId}.json`;
        const { data } = await axios.get( url );
        return makeFullEvent( data );
    },


    createRSVP: ( event, calendarDay ) => rsvpStorage.add( event, calendarDay ),

    deleteRSVP: rsvp => rsvpStorage.remove( rsvp ),

    getAllRSVPs: () => rsvpStorage.all(),

    removeAllRSVPs: () => rsvpStorage.clear()
}
