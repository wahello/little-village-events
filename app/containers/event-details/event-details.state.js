import { makeFullEvent } from "../../models/event";
import { mergeIntoState } from "../../utils/freactal";

import axios from "axios";

const initialize = async ( effects, { event } ) => {
    if ( !event.details ) {
        effects.loadEventDetails( event.id );
        event = { ...event, details: {} };
    }

    return mergeIntoState( {
        event
    } );

};

const loadEventDetails = async ( effects, eventId ) => {
    const url = `http://littlevillagemag.com/iowa-city-area-events-calendar/events/${eventId}.json`;
    const { data } = await axios.get( url );
    const event = makeFullEvent( data );

    // if ( effects.updateEvent )
    //     await effects.updateEvent( event );

    return mergeIntoState( {
        event
    } );

};

export default {
    initialState: () => ( {
        event: null
    } ),

    effects: {
        initialize,
        loadEventDetails
    }
}
