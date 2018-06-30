import { realmQuerySubscription } from "app/utils/realm";
import { weekEnd } from "app/utils/date";

import { update } from "@textpress/freactal";

import groupBy from "lodash/groupBy";
import keys from "lodash/keys";
import isNil from "lodash/isNil";


const buildLiveQuery = ( realm, dates, today, currentWeek, filters, liveQuerySubscription ) => {
    let query = realm.objects( "EventItem" ).filtered(
        "( endTime >= $0 AND eventDate <= $1 ) OR ( eventDate = null AND endTime > $2 AND startTime <= $3 )",
        today, dates.last, currentWeek.first, currentWeek.last
    );

    if ( filters.categories && filters.categories.length ) {
        query = query.filtered(
            `SUBQUERY( eventSummary.categories, $category, ${ filters.categories.map( ( id, i ) => `$category.id = $${i}` ).join( " OR " ) } ).@count > 0`,
            ...filters.categories
        );
    }

    if ( filters.location && !isNil( filters.location.latitude ) ) {
        query = query.filtered(
            "SUBQUERY( eventSummary.venue.distances, $distance, $distance.locationId = $0 AND $distance.distance < $1 ).@count > 0",
            filters.location.id,
            filters.maxDistance
        );
    }

    query = query
        .sorted( [ "eventDate", [ "eventSummary.featured", true ], "startTime", "eventSummary.name" ] );

    liveQuerySubscription.update( query );
    return query;
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


const initialize = effects => state => {
    const { liveQuerySubscription } = state;
    liveQuerySubscription.subscribe( ( events, { modifications, insertions, deletions } ) => {
        if ( modifications.length || insertions.length || deletions.length )
            effects.refresh();
    } );

    return state;
};


const finalize = () => ( { liveQuerySubscription } ) => {
    liveQuerySubscription.reset();
};


export default {
    initialState: ( { state: { today } } ) => ( {
        liveQuerySubscription: realmQuerySubscription(),
        currentWeek: { first: today, last: weekEnd( today ) },
        forceUpdate: 0
    } ),
    effects: {
        initialize,
        finalize,
        refresh: update( ( { forceUpdate } ) => ( { forceUpdate: forceUpdate + 1 } ) )
    },
    computed: {
        liveQuery: ( { realm, dates, today, currentWeek, filters = {}, liveQuerySubscription } ) =>
            buildLiveQuery( realm, dates, today, currentWeek, filters, liveQuerySubscription ),

        // presence of `forceUpdate` in the args forces freactal to recalculate
        // `sections` computed after we call `effects.refresh`
        sections: ( { liveQuery, today, currentWeek, forceUpdate } ) =>
            buildSections( liveQuery, today, currentWeek, forceUpdate )
    }
}
