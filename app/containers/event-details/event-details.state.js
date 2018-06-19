import { confirmRSPVActionSheet, rescindRSPVActionSheet } from "../../action-sheets/rsvp";
import { EventWithRSVP } from "app/models/event-with-rsvp";
import { getEventItem, getEventDetails, createEventDetails } from "app/utils/realm";
import { mergeIntoState, update } from "app/utils/freactal";
// import { EventDetails } from "app/models/event-schema";


function setRSVP( rsvp ) {
    return state => {
        // const event = new EventWithRSVP( state.event.event, rsvp );
        return {
            ...state,
            rsvp
            // event
        };
    }
}



const initialize = async ( effects, { eventItemId, state: { api, realm } } ) => {
    const { eventSummary } = getEventItem( realm, eventItemId );
    let eventDetails = getEventDetails( realm, eventSummary.id );
    if ( !eventDetails ) {
        const fullEvent = await api.getEvent( eventSummary.id );
        eventDetails = realm.write( () => createEventDetails( realm, eventSummary.id, fullEvent.details ) );
    }

    return mergeIntoState( {
        eventDetails
    } );
};

export default {


    initialState: ( { eventItemId, calendarDay, state: { realm } } ) => {
        const eventItem = getEventItem( realm, eventItemId );
        return ( {
            eventItem,
            rsvp: eventItem.rsvp,
            eventDetails: null,
            calendarDay
        } );
    },


    effects: {
        initialize,

        handleRSVP: async ( effects, state ) => {
            const { event } = state;
            if ( event.rsvp )
                await effects.confirmRescindSVP( state );
            else
                await effects.confirmAddRSVP( state );

            return mergeIntoState( {} );
        },


        confirmAddRSVP: async ( effects, state ) => {
            const { event, eventDetails, windowDimensions } = state;
            const { ticketUrl } = eventDetails;

            if ( ticketUrl )
                await effects.openEmbeddedBrowser( { url: ticketUrl, wait: true } );
            await effects.showActionSheet( await confirmRSPVActionSheet(
                event,
                windowDimensions.width,
                ( ...args ) => effects.RSVPConfirmed( state, ...args )
            ) );
            // effects.RSVPConfirmed( state )

            return mergeIntoState( {} );
        },


        confirmRescindSVP: async ( effects, state ) => {
            const { event, windowDimensions } = state;
            await effects.showActionSheet( await rescindRSPVActionSheet(
                event,
                windowDimensions.width,
                ( ...args ) => effects.RSVPRescinded( state, ...args )
            ) );

            // effects.RSVPRescinded( state )
            return mergeIntoState( {} );
        },


        RSVPConfirmed: async ( effects, state, addToCalendar ) => {
            const { api, event, calendarDay, realm } = state;

            // const rsvp = null;
            // const rsvp = await api.rsvps.add( event, calendarDay );
            realm.write( () => {
                event.rsvp = true;
            } );

            if ( addToCalendar )
                await effects.addEventToCalendar( event );

            return setRSVP( event.rsvp );
        },


        RSVPRescinded: async ( effects, state ) => {
            const { api, event, realm } = state;
            // await api.rsvps.remove( event );

            realm.write( () => {
                event.rsvp = false;
            } );

            return setRSVP( event.rsvp );
        }


    }


}
