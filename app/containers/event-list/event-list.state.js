import { weekEnd } from "app/utils/date";

import { mergeIntoState, update } from "@textpress/freactal";

import groupBy from "lodash/groupBy";
import keys from "lodash/keys";


const buildLiveQuery = ( realm, dates, today, currentWeek, filters = {} ) => {
    let query = realm.objects( "EventItem" ).filtered(
        "( endTime >= $0 AND eventDate <= $1 ) OR ( eventDate = null AND endTime > $2 AND startTime <= $3 )",
        today, dates.last, currentWeek.first, currentWeek.last
    );

    if ( filters.categories.length ) {
        query = query.filtered(
            `SUBQUERY( eventSummary.categories, $category, ${ filters.categories.map( ( id, i ) => `$category.id = $${i}` ).join( " OR " ) } ).@count > 0`,
            ...filters.categories
        );
    }

    return query
        .sorted( [ "eventDate", [ "eventSummary.featured", true ], "startTime", "eventSummary.name" ] );
};


const buildSections = ( liveQuery, today, currentWeek ) => {
    const endOfWeek = currentWeek.last.valueOf();
    const eventsByDate = groupBy( liveQuery, ( { eventDate } ) => eventDate ? eventDate.valueOf() : endOfWeek );

    const dates = keys( eventsByDate ).map( Number ).sort( ( a, b ) => a - b );
    return dates.map( date => {
        const ongoing = date === endOfWeek;
        return {
            today,
            ongoing,
            date: ongoing ? null : new Date( date ),
            data: eventsByDate[date]
        };
    } );
};


const initialize = ( effects, { state, filters } ) => {
    const { realm, dates, today } = state;
    const currentWeek = { first: today, last: weekEnd( today ) };

    const liveQuery = buildLiveQuery( realm, dates, today, currentWeek, filters );
    liveQuery.addListener( ( events, { modifications, insertions, deletions } ) => {
        if ( modifications.length || insertions.length || deletions.length )
            effects.refresh( realm );
    } );

    return mergeIntoState( {
        sections: buildSections( liveQuery, today, currentWeek ),
        liveQuery,
        currentWeek
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
        refresh: update( ( { liveQuery, today, currentWeek } ) => ( {
            sections: buildSections( liveQuery, today, currentWeek )
        } ) )
    }
}
