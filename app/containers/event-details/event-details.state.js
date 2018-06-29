import addRSPVActionSheet from "app/action-sheets/add-rsvp";
import rescindRSPVActionSheet from "app/action-sheets/rescind-rsvp";
import {
    createEventDetails,
    createEventItem,
    createRsvpedEventItem,
    getEventDetails,
    getEventItem
} from "app/utils/realm";
import { mergeIntoState } from "app/utils/freactal";
import { addToDate } from "app/utils/date";

const makeCalendarEvent = ( { startTime, endTime, eventSummary }, { venue, moreInfo } ) => ( {
    title: eventSummary.name,
    startDate: startTime.toISOString(),
    endDate: ( endTime || addToDate( startTime, { hours: 1 } ) ).toISOString(),
    location: ( [ venue.name, venue.address ].filter( p => !!p ).join( ", " ) ),
    url: moreInfo || ""
} );


const initialize = async ( effects, { eventItemData, state: { api, realm } } ) => {
    const eventItem = getEventItem( realm, eventItemData.id );
    const { eventSummary } = getEventItem( realm, eventItemData.id );
    let eventDetails = getEventDetails( realm, eventSummary.id );
    if ( !eventDetails ) {
        const fullEvent = await api.getEventFullData( eventSummary.id );
        realm.write( () => eventDetails = createEventDetails( realm, eventSummary.id, fullEvent.details ) );
    }

    return mergeIntoState( {
        eventItem,
        eventDetails
    } );
};


const handleAddRSVP = async ( state, openWebBrowser, addEventToCalendar ) => {
    const { eventItem, eventDetails, realm, openActionSheet } = state;
    const { eventSummary } = eventItem;
    const { ticketUrl } = eventDetails;

    if ( ticketUrl )
        await openWebBrowser( { url: ticketUrl, wait: true } );

    const result = await openActionSheet( addRSPVActionSheet( {
        eventItem: eventItem,
        eventSummary,
        openWebBrowser: url => openWebBrowser( { url } )
    } ) );

    if ( !result )
        return null;

    const { rsvpTime, addToCalendar } = result;

    let updatedEventItem;
    realm.write( () => {
        updatedEventItem = createRsvpedEventItem( realm, eventSummary, rsvpTime );
    } );

    if ( addToCalendar )
        await addEventToCalendar( makeCalendarEvent( updatedEventItem, eventDetails ) );

    return updatedEventItem;
};

const handleRescindRSVP = async ( state ) => {
    const { eventItem, realm, openActionSheet } = state;
    const { eventSummary } = eventItem;

    const result = await openActionSheet( rescindRSPVActionSheet( {
        eventItem: eventItem,
        eventSummary
    } ) );

    if ( !result )
        return null;

    let updatedEventItem;
    realm.write( () => {
        updatedEventItem = createEventItem( realm, eventSummary );
        if ( eventItem.id !== updatedEventItem.id )
            realm.delete( eventItem );
    } );

    return updatedEventItem;
};


export default {


    initialState: ( { eventItemData, openActionSheet } ) => {
        return ( {
            eventItem: eventItemData,
            eventDetails: null,
            openActionSheet
        } );
    },


    effects: {
        initialize,

        handleRSVP: async ( effects, state ) => {
            const { eventItem } = state;

            const updatedEventItem = eventItem.rsvp
                ? await handleRescindRSVP( state )
                : await handleAddRSVP( state, effects.openEmbeddedBrowser, effects.addEventToCalendar )
            ;

            return mergeIntoState( updatedEventItem ? { eventItem: updatedEventItem } : {} );
        }
    }

}
