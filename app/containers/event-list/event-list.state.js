import { upcomingEvents } from "app/utils/events";


export default {
    initialState: () => ( {
    } ),
    effects: {
    },
    computed: {
        eventList: ( { dates, eventMaps, rsvpMap } ) => upcomingEvents( dates, eventMaps, rsvpMap, new Date() )
    }
}
