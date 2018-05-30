import { mergeIntoState } from "../../utils/freactal";

import moment from "moment";

import _range from "lodash/range";


const numberOfDays = 14;


const loadEvents = async ( effects, { state: { api } } ) => {
    const events = await api.getEventList( moment(), numberOfDays );

    return mergeIntoState( {
        events
    } );
};


export default {
    initialState: () => ( {
        events: null
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
    },
    computed: {
        eventList: ( { events, rsvps } ) => {
            if ( !events ) return [];

            const today = moment();

            const eventsWithRSVP = events.map( event => ( { ...event, rsvp: !!rsvps[ event.id ] } ) );

            return _range( numberOfDays ).reduce( ( result, days ) => {
                const date = today.clone().add( { days } );

                const start = date.clone().startOf( "day" );
                const end = date.clone().endOf( "day" );

                const dayEvents = eventsWithRSVP.filter( event => {
                    return event.startTime.isBefore( end )
                        && ( event.endTime || event.startTime ).isAfter( start )
                    ;
                } );

                result.push( {
                    today,
                    date,
                    data: dayEvents
                } );
                return result;

            }, [] );
        }
    }
}
