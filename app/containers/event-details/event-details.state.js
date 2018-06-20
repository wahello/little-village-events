import { confirmRSPVActionSheet, rescindRSPVActionSheet } from "../../action-sheets/rsvp";
// import { confirmRSPVDateTimeActionSheet } from "../../action-sheets/rsvp-date-time";
// import { EventWithRSVP } from "app/models/event-with-rsvp";
import { getEventItem, getEventDetails, createEventDetails, createEventItem } from "app/utils/realm";
import { mergeIntoState } from "app/utils/freactal";
import { getRSVPInfo } from "app/utils/event-time";
import { addToDate } from "app/utils/date";
import config from "app/config";

// import { EventDetails } from "app/models/event-schema";

import setHours from "date-fns/set_hours";



const makeCalendarEvent = ( { startTime, endTime, eventSummary }, { venue, moreInfo } ) => ( {
    title: eventSummary.name,
    startDate: startTime.toISOString(),
    endDate: ( endTime || addToDate( startTime, { hours: 1 } ) ).toISOString(),
    location: venue.name ? [ venue.name, venue.location ].join( " " ) : venue.location,
    url: moreInfo || ""
} );


const initialize = async ( effects, { eventItemData, state: { api, realm } } ) => {
    const eventItem = getEventItem( realm, eventItemData.id );
    const { eventSummary } = getEventItem( realm, eventItemData.id );
    let eventDetails = getEventDetails( realm, eventSummary.id );
    if ( !eventDetails ) {
        const fullEvent = await api.getEvent( eventSummary.id );
        realm.write( () => eventDetails = createEventDetails( realm, eventSummary.id, fullEvent.details ) );
    }

    return mergeIntoState( {
        eventItem,
        eventDetails
    } );
};

export default {


    initialState: ( { eventItemData, calendarDay } ) => {
        return ( {
            eventItem: eventItemData,
            eventDetails: null,
            calendarDay
        } );
    },


    effects: {
        initialize,

        handleRSVP: async ( effects, state ) => {
            const { eventItem } = state;
            const { eventSummary } = eventItem;

            if ( eventItem.rsvp )
                await effects.confirmRescindSVP( state );
            else {
                if ( eventSummary.ongoing || eventSummary.allDay )
                    await effects.confirmRSVPDateTime( state );
                else
                    await effects.confirmAddRSVP( state, state.eventItem );
            }

            return mergeIntoState( {} );
        },


        confirmRSVPDateTime: async ( effects, state ) => {
            const { eventItem, eventDetails, windowDimensions } = state;

            // await effects.showActionSheet( await confirmRSPVDateTimeActionSheet(
            //     event,
            //     windowDimensions.width,
            //     ( ...args ) => effects.RSVPDateTimeConfirmed( state, ...args )
            // ) );

            const rsvpInfo = getRSVPInfo( eventItem );


            let startTime = rsvpInfo.first;
            if ( rsvpInfo.allDay ) {
                startTime = setHours( startTime, 21 );
            }

            effects.RSVPDateTimeConfirmed( state, startTime, rsvpInfo.duration );

            return mergeIntoState( {} );
        },


        confirmAddRSVP: async ( effects, state, rsvpTime ) => {
            const { eventItem: { eventSummary }, eventDetails: { ticketUrl }, windowDimensions } = state;
            console.log( "@@@@ confirmAddRSVP", rsvpTime );

            if ( ticketUrl )
                await effects.openEmbeddedBrowser( { url: ticketUrl, wait: true } );
            await effects.showActionSheet( await confirmRSPVActionSheet(
                rsvpTime,
                eventSummary,
                windowDimensions.width,
                ( ...args ) => effects.RSVPConfirmed( state, rsvpTime, ...args )
            ) );

            return mergeIntoState( {} );
        },


        confirmRescindSVP: async ( effects, state ) => {
            const { eventItem, windowDimensions } = state;
            await effects.showActionSheet( await rescindRSPVActionSheet(
                eventItem,
                windowDimensions.width,
                ( ...args ) => effects.RSVPRescinded( state, ...args )
            ) );

            return mergeIntoState( {} );
        },


        RSVPDateTimeConfirmed: async ( effects, state, startTime, duration ) => {
            const { api, eventItem, calendarDay, realm } = state;

            const endTime = addToDate( startTime, { minutes: duration || config.eventThresholds.past } )
            // debugger;
            const rsvpTime = {
                startTime,
                endTime,
            };

            console.log( "confirmedEvent", rsvpTime );
            await effects.confirmAddRSVP( state, rsvpTime );
            // const rsvp = null;
            // const rsvp = await api.rsvps.add( event, calendarDay );
            // realm.write( () => {
            //     event.rsvp = true;
            // } );

            // if ( addToCalendar )
            //     await effects.addEventToCalendar( event );

            // return setRSVP( event.rsvp );
        },


        RSVPConfirmed: async ( effects, state, rsvpTime, addToCalendar ) => {
            const { eventItem: { eventSummary }, eventDetails, realm } = state;

            // const rsvp = null;
            // const rsvp = await api.rsvps.add( event, calendarDay );
            let updatedItem;
            realm.write( () => {
                updatedItem = createEventItem( realm, eventSummary, rsvpTime );
            } );

            if ( addToCalendar )
                await effects.addEventToCalendar( makeCalendarEvent( updatedItem, eventDetails ) );

            return mergeIntoState( {
                eventItem: updatedItem
            } );
        },


        RSVPRescinded: async ( effects, state ) => {
            const { eventItem, realm } = state;
            const { eventSummary } = eventItem;
            // await api.rsvps.remove( event );

            let updatedItem;
            realm.write( () => {
                updatedItem = createEventItem( realm, eventSummary );
                if ( eventItem.id !== updatedItem.id )
                    realm.delete( eventItem );
            } );

            return mergeIntoState( {
                eventItem: updatedItem
            } );
        }


    }


}
