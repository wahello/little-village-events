import { makeFullEvent } from "../../models/event";
import { mergeIntoState } from "../../utils/freactal";

const initialize = async ( effects, { event, state: { api } } ) => {
    if ( !event.details ) {
        effects.loadEventDetails( api, event.id );
        event = { ...event, details: {} };
    }

    return mergeIntoState( {
        event
    } );

};

const loadEventDetails = async ( effects, api, eventId ) => {
    const data = await api.getEvent( eventId );
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
