import { daysDiff, addToDate, now } from "app/utils/date";

import { mergeIntoState, update } from "@textpress/freactal";

import range from "lodash/range";


const initialize = ( effects, { state } ) => {
    const { dates, realm } = state;

    const numberOfDays = daysDiff( dates.last, dates.first ) + 1;
    const today = now();

    const sections = range( numberOfDays ).map( day => {
        const date = addToDate( dates.first, { day } );
        return {
            today,
            date,
            data: [ ...realm.objects( "Event" )
                .filtered( "eventDate = $0", date )
                .sorted( [ [ "featured", true ], "startTime", "name" ] )
            ]
        };
    } );

    const liveQuery = realm.objects( "Event" )
        .filtered( "eventDate >= $0 AND eventDate <= $1", dates.first, dates.last );

    realm.addListener( "change", ( realm, name, ...args ) => {
        console.log( "@@@@@ change", JSON.stringify( [ ...args ] ) );
    } );

    liveQuery.addListener( ( events, changes ) => {
        // debugger;
        // // Update UI in response to inserted objects
        // changes.insertions.forEach((index) => {
        //   let insertedDog = puppies[index];
        //   ...
        // });
        //
        // // Update UI in response to modified objects
        const indexes = [ ...changes.modifications ];
        if ( indexes.length )
            effects.refresh( realm, dates, indexes );

        // changes.modifications.forEach( ( index ) => {
        //     const modifiedEvent = events[index];
        //     // const modifiedEvent = omit( events[index], [ "categories", "multimedia" ] );
        //     console.log( "@@@@ modifiedEvent", index, modifiedEvent.name );
        // } );
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
        finalize,
        refresh: ( effects, realm, dates, indexes ) => {
            // console.log( "@@@refresh", indexes );
            return state => {
                const { sections } = state;
                // const liveQuery = [ ...realm.objects( "Event" )
                //     .filtered( "eventDate >= $0 AND eventDate <= $1", dates.first, dates.last ) ];
                // const event = liveQuery[0];
                // console.log( "@@@@ EVENT", liveQuery[indexes[0]] );
                return {
                    ...state,
                    sections: [].concat( sections )
                };
            };
        }
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
