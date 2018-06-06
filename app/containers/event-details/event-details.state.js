import { confirmRSPVActionSheet, rescindRSPVActionSheet } from "../../action-sheets/rsvp";

import { mergeIntoState } from "../../utils/freactal";


function setRSVP( rsvp ) {
    return state => ( { ...state, event: { ...state.event, rsvp } } )
}


const initialize = async ( effects, { event, calendarDay, state: { api } } ) => {
    if ( !event.details ) {
        effects.loadEventDetails( api, event.id );
    }

    return mergeIntoState( {
        event,
        calendarDay
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
        event: null,
        calendarDay: null
    } ),

    effects: {
        initialize,
        loadEventDetails,
        handleRSVP: async ( effects, { event, windowDimensions } ) => {
            if ( event.rsvp )
                await effects.confirmRescindSVP( event, windowDimensions.width );
            else
                await effects.confirmAddRSVP( event, windowDimensions.width );

            return mergeIntoState( {} );
        },

        confirmAddRSVP: async ( effects, event, windowWidth ) => {
            const { details: { ticketUrl } } = event;

            if ( ticketUrl )
                await effects.openEmbeddedBrowser( { url: ticketUrl, wait: true } );
            await effects.showActionSheet( await confirmRSPVActionSheet( event, effects.RSVPConfirmed, windowWidth ) );

            return mergeIntoState( {} );
        },

        RSVPConfirmed: async ( effects, event, addToCalendar ) => {
            await effects.createRSVP( event );
            if ( addToCalendar )
                await effects.addEventToCalendar( event );

            return setRSVP( true );
        },

        confirmRescindSVP: async ( effects, event, windowWidth ) => {
            await effects.showActionSheet( await rescindRSPVActionSheet( event, effects.RSVPRescinded, windowWidth ) );
            return mergeIntoState( {} );
        },

        RSVPRescinded: async ( effects, event ) => {
            await effects.deleteRSVP( event );
            return setRSVP( false );
        }

    }

}
