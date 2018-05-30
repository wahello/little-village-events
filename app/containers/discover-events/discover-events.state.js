import { mergeIntoState } from "../../utils/freactal";

import moment from "moment";

const numberOfDays = 14;

const loadEvents = async ( effects, { state: { api } } ) => {
    const first = moment();
    const last = moment().add( { days: numberOfDays - 1 } );
    const events = await api.getEventList( first, last );

    return mergeIntoState( {
        events,
        dates: {
            first,
            last
        }
    } );
};


export default {
    initialState: () => ( {
        events: null,
        dates: null
    } ),
    effects: {
        initialize: loadEvents,
        // updateEvent: ( effects, event ) => {
        //     return state => {
        //         const { events } = state;
        //
        //         if ( !events )
        //             return state;
        //
        //         const eventIndex = _findIndex( events, e => e.id === event.id );
        //         if ( eventIndex === -1 )
        //             return state;
        //
        //         const updatedEvents = events
        //             .slice( eventIndex )
        //             .concat( [
        //                 event,
        //                 events.slice( eventIndex + 1, events.length )
        //             ] )
        //         ;
        //
        //         return { ...state, events: updatedEvents };
        //     };
        // }
    }
}
