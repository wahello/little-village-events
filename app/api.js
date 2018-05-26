import axios from "axios/index";

const root = "http://littlevillagemag.com/iowa-city-area-events-calendar";

export default {

    getEventList: async ( startDate, numberOfDays ) => {
        const dateFormat = "YYYY-MM-DD";

        const start = startDate.clone().format( dateFormat );
        const end = startDate.clone().add( { days: numberOfDays - 1 } ).format( dateFormat );

        const url = `${root}/events.json?range_from=${start}&range_to=${end}`;
        const { data } = await axios.get( url );
        return data;
    },

    getEvent: async eventId => {
        const url = `${root}/events/${eventId}.json`;
        const { data } = await axios.get( url );
        return data;
    }
}