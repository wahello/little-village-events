import { upcomingEvents } from "app/utils/events";
import { mergeIntoState } from "app/utils/freactal";


const initialize = async ( effects, { item: date, state } ) => {
    const { realm } = state;
    const items = realm.objects( "Event" ).filtered( "eventDate = $0", date );
    // console.log( "eventList section", date, JSON.stringify( items ) );
    return mergeIntoState( {
        items
    } );
}


export default {
    initialState: ( { item: { date, items } } ) => ( {
        date,
        items
    } ),
    effects: {
        // initialize,
    },
    computed: {
        eventList: ( { dates, eventMaps, rsvpMap } ) => upcomingEvents( dates, eventMaps, rsvpMap, new Date() )
    }
}
