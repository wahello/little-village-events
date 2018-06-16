import { confirmRSPVActionSheet, rescindRSPVActionSheet } from "../../action-sheets/rsvp";
import { EventWithRSVP } from "app/models/event-with-rsvp";
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


const getEvent = ( realm, eventId ) => realm.objects( "Event" ).filtered( "id = $0", eventId )[0];


const initialize = async ( effects, { eventId, state: { api, realm } } ) => {
    let eventDetails = realm.objects( "EventDetails" ).filtered( "id = $0", eventId )[0];
    if ( !eventDetails ) {
        const fullEvent = await api.getEvent( eventId );
        eventDetails = {
            id: eventId,
            ...fullEvent.details
        };

        // console.log( "eventDetails", JSON.stringify( eventDetails ) );
        realm.write( () => {
            eventDetails = realm.create( "EventDetails", eventDetails, true );
        } );
    }

    return mergeIntoState( {
        eventDetails
    } );
};

export default {


    initialState: ( { eventId, calendarDay, state: { realm } } ) => {
        const event = getEvent( realm, eventId );
        return ( {
            event,
            rsvp: event.rsvp,
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
