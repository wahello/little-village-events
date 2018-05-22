import { mergeIntoState } from "../../utils/freactal";

import axios from "axios";

const initialize = async ( effects, { event } ) => {
    effects.loadEvent( event );
    return mergeIntoState( {
        event
    } );

};

const loadEvent = async ( effects, event ) => {
    const url = `http://littlevillagemag.com/iowa-city-area-events-calendar/events/${event.id}.json`;
    const { data } = await axios.get( url );

    return mergeIntoState( {
        event: data
    } );

};

export default {
    initialState: () => ( {
        event: null
    } ),

    effects: {
        initialize,
        loadEvent
    }
}
