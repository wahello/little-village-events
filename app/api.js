import { makeFullEvent, makeSummaryEvent } from "./models/event";
import RSVPStorage from "./models/rsvp";

import axios from "axios/index";

const root = "http://littlevillagemag.com/iowa-city-area-events-calendar";


const rsvpStorage = new RSVPStorage;

export default {

    getEventList: async ( startDate, numberOfDays ) => {
        const dateFormat = "YYYY-MM-DD";

        const start = startDate.clone().format( dateFormat );
        const end = startDate.clone().add( { days: numberOfDays - 1 } ).format( dateFormat );

        const url = `${root}/events.json?range_from=${start}&range_to=${end}`;
        const { data } = await axios.get( url );
        return data.events ? data.events.map( makeSummaryEvent ) : [];
    },

    getEvent: async eventId => {
        const url = `${root}/events/${eventId}.json`;
        const { data } = await axios.get( url );
        return makeFullEvent( data );
    },


    addRSVP: event => rsvpStorage.add( event ),

    removeRSVP: event => rsvpStorage.remove( event ),

    getRSVPList: ids => rsvpStorage.get( ids ),
    getAllRSVPs: () => rsvpStorage.all(),

    removeAllRSVPs: () => rsvpStorage.clear()
}
