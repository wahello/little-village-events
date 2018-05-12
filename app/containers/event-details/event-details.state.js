import { mergeIntoState, update } from "@textpress/freactal";

import axios from "axios";

const loadEvent = async ( effects, { event } ) => {
    await effects.setEvent( event );

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
        initialize: loadEvent,
        setEvent: update( event => ( { event } ) )
    }
}
