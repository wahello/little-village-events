import { daysDiff, addToDate, now } from "app/utils/date";

import { mergeIntoState, update } from "@textpress/freactal";

import range from "lodash/range";


const initialize = ( effects, { state } ) => {
    const { dates, realm } = state;

    const numberOfDays = daysDiff( dates.last, dates.first ) + 1;
    const today = now();

    const sections = range( numberOfDays ).map( day => {
        const date = addToDate( dates.first, { day } );
        // const timestamp = dayTimestamp( date );
        return {
            today,
            date,
            liveQuery,
            data: [ ...realm.objects( "Event" )
                .filtered( "eventDate = $0", date )
                .sorted( [ [ "featured", true ], "startTime", "name" ] )
            ]
        };
    } );

    const liveQuery = realm.objects( "Event" )
        .filtered( "eventDate >= $0 AND eventDate <= $1", dates.first, dates.last );

    liveQuery.addListener( ( events, changes ) => {
        console.log( "liveQuery.addListener", JSON.stringify( changes ) );
        // // Update UI in response to inserted objects
        // changes.insertions.forEach((index) => {
        //   let insertedDog = puppies[index];
        //   ...
        // });
        //
        // // Update UI in response to modified objects
        // changes.modifications.forEach((index) => {
        //   let modifiedDog = puppies[index];
        //   ...
        // });
        //
        // // Update UI in response to deleted objects
        // changes.deletions.forEach((index) => {
        //   // Deleted objects cannot be accessed directly
        //   // Support for accessing deleted objects coming soon...
        //   ...
        // });

    } );

    return mergeIntoState( {
        sections,
        liveQuery
    } );
};


const finalize = () => ( { liveQuery } ) => {
    console.log( "finalize" );
    liveQuery && liveQuery.removeAllListeners();
};


// const loadEvents = async api => {
//     const first = now();
//     const last = addToDate( now(), { days: numberOfDays - 1 } );
//     const events = await api.getEventList( first, last );
//
//     return {
//         events,
//         dates: {
//             first,
//             last
//         }
//     };
// };



export default {
    initialState: () => ( {
        sections: []
    } ),
    effects: {
        initialize,
        finalize
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
