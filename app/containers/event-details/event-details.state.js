import { confirmRSPVActionSheet, rescindRSPVActionSheet } from "../../action-sheets/rsvp";

import { mergeIntoState } from "../../utils/freactal";


function setRSVP( rsvp ) {
    return state => ( { ...state, event: { ...state.event, rsvp } } )
}


const initialize = async ( effects, { event, state: { api } } ) => {
    if ( !event.details ) {
        effects.loadEventDetails( api, event.id );
    }

    return mergeIntoState( {
        event
    } );
};


const loadEventDetails = async ( effects, api, eventId ) => {
    const event = await api.getEvent( eventId );

    // if ( effects.updateEvent )
    //     await effects.updateEvent( event );

    return state => ( { ...state, event: { ...state.event, ...event } } );
};


export default {
    initialState: () => ( {
        event: null
    } ),

    effects: {
        initialize,
        loadEventDetails,
        handleRSVP: async ( effects, { event } ) => {
            if ( event.rsvp )
                await effects.confirmRescindSVP( event );
            else
                await effects.confirmAddRSVP( event );

            return mergeIntoState( {} );
        },

        confirmAddRSVP: async ( effects, event ) => {
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

            return setRSVP( true );
        },

        confirmRescindSVP: async ( effects, event ) => {
            await effects.showActionSheet( rescindRSPVActionSheet( event, effects.RSVPRescinded ) );
            return mergeIntoState( {} );
        },

        RSVPRescinded: async ( effects, event ) => {
            await effects.removeRSVP( event );
            return setRSVP( false );

        }

    }

}
