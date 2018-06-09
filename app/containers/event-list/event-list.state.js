import { upcomingEvents } from "../../utils/events";

import moment from "moment";

export default {
    initialState: () => ( {
    } ),
    effects: {
    },
    computed: {
        eventList: ( { dates, events, rsvps } ) => upcomingEvents( dates, events, rsvps, moment() )
    }
}
