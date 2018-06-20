import { mergeIntoState, update } from "@textpress/freactal";

import keys from "lodash/keys";
import groupBy from "lodash/groupBy";


const buildLiveQuery = ( realm, today, showUpcoming ) =>
    realm.objects( "EventItem" )
        .filtered( showUpcoming ? "rsvp = $0 AND endTime > $1" : "rsvp = $0 AND endTime <= $1", true, today )
        .sorted( [ "startTime", "eventSummary.name" ] )
    ;


const buildSections = ( liveQuery, today, showUpcoming ) => {
    const rsvpsByDate = groupBy( liveQuery, eventItem => eventItem.eventDate.valueOf() );
    const dates = keys( rsvpsByDate ).map( Number ).sort( ( a, b ) => showUpcoming ? a - b : b - a );
    return dates.map( ( date, i ) => {
        const data = rsvpsByDate[date];
        const featured = showUpcoming && i == 0 ? { [ data[0].id ]: true } : {};

        return ( {
            today,
            date: new Date( date ),
            featured,
            data
        } );
    } );
};


const initialize = ( effects, { showUpcoming = true, state } ) => {
    const { realm, today } = state;

    const liveQuery = buildLiveQuery( realm, today, showUpcoming );
    liveQuery.addListener( ( events, { modifications, insertions, deletions } ) => {
        if ( modifications.length || insertions.length || deletions.length )
            effects.refresh( realm );
    } );

    return mergeIntoState( {
        showUpcoming,
        sections: buildSections( liveQuery, today, showUpcoming ),
        liveQuery
    } );
};


const finalize = () => ( { liveQuery } ) => {
    liveQuery && liveQuery.removeAllListeners();
};


export default {
    initialState: () => ( {
        sections: [],
        liveQuery: null
    } ),
    effects: {
        initialize,
        finalize,
        refresh: update( ( { liveQuery, today, showUpcoming } ) => ( {
            sections: buildSections( liveQuery, today, showUpcoming )
        } ) )
    }
}
