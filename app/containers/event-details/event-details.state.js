import { confirmRSPVActionSheet, rescindRSPVActionSheet } from "../../action-sheets/rsvp";
import { EventWithRSVP } from "../../models/event-with-rsvp";
import { mergeIntoState } from "../../utils/freactal";


function setRSVP( rsvp ) {
    return state => {
        const event = new EventWithRSVP( state.event.event, rsvp );
        return {
            ...state,
            event
        };
    }
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

    return state => ( { ...state, event: new EventWithRSVP( event, state.event.rsvp ) } );
};


export default {


    initialState: () => ( {
        event: null,
        calendarDay: null
    } ),


    effects: {
        initialize,
        loadEventDetails,
        handleRSVP: async ( effects, state ) => {
            const { event } = state;
            if ( event.rsvp )
                await effects.confirmRescindSVP( state );
            else
                await effects.confirmAddRSVP( state );

            return mergeIntoState( {} );
        },


        confirmAddRSVP: async ( effects, state ) => {
            const { event, windowDimensions } = state;
            const { details: { ticketUrl } } = event;

            if ( ticketUrl )
                await effects.openEmbeddedBrowser( { url: ticketUrl, wait: true } );
            await effects.showActionSheet( await confirmRSPVActionSheet(
                event,
                windowDimensions.width,
                ( ...args ) => effects.RSVPConfirmed( state, ...args )
            ) );

            return mergeIntoState( {} );
        },


        confirmRescindSVP: async ( effects, state ) => {
            const { event, windowDimensions } = state;
            await effects.showActionSheet( await rescindRSPVActionSheet(
                event,
                windowDimensions.width,
                ( ...args ) => effects.RSVPRescinded( state, ...args )
            ) );
            return mergeIntoState( {} );
        },


        RSVPConfirmed: async ( effects, state, addToCalendar ) => {
            const { api, event, calendarDay } = state;
            const rsvp = await api.rsvps.add( event, calendarDay );
            if ( addToCalendar )
                await effects.addEventToCalendar( event );

            return setRSVP( rsvp );
        },


        RSVPRescinded: async ( effects, state ) => {
            const { api, event } = state;
            await api.rsvps.remove( event );
            return setRSVP( null );
        }


    }


}
