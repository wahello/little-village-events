import confirmRSPVActionSheet from "../../action-sheets/confirm-rsvp";

import { makeFullEvent } from "../../models/event";
import { mergeIntoState } from "../../utils/freactal";

const initialize = async ( effects, { event, state: { api } } ) => {
    if ( !event.details ) {
        effects.loadEventDetails( api, event.id );
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
        loadEventDetails,
        handleRSVP: async ( effects, { event } ) => {
            const { details: { ticketUrl } } = event;

            if ( ticketUrl )
                await effects.openEmbeddedBrowser( { url: ticketUrl, wait: true } );
            await effects.showActionSheet( confirmRSPVActionSheet( event, effects.RSVPConfirmed ) );

            return mergeIntoState( {} );
        },

        RSVPConfirmed: async ( effects, event, addToCalendar ) => {
            await effects.addRSVP( event );
            if ( addToCalendar )
                await effects.addEventToCalendar( event );

            return mergeIntoState( {} );
        }
    }
}
