import { sortByStartTime } from "/app/utils/event";
import { normalizeEventTime } from "/app/utils/event-time";
import { addToDate, dayStart, maxDate, moveTimeToDate, now, subtractFromDate, weekEnd } from "/app/utils/date";

import config from "/app/config";

import casual from "casual-browserify";

import fromPairs from "lodash/fromPairs";
import keys from "lodash/keys";
import range from "lodash/range";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";

import "./multimedia-image-source";


casual.define( "id", () => casual.integer( 100000, Number.MAX_SAFE_INTEGER ) );

casual.define( "todayDate", () => normalizeEventTime( addToDate( dayStart( now() ), { minutes: casual.integer( 1, 23 * 60 ) } ) ) );
casual.define( "upcomingDate", () => normalizeEventTime( addToDate( now(), { minutes: casual.integer( 1, config.eventThresholds.upcoming ) } ) ) );
casual.define( "futureDate", () => normalizeEventTime( addToDate( now(), { minutes: casual.integer( 1, 20160 ) } ) ) );
casual.define( "pastDate", () => normalizeEventTime( subtractFromDate( now(), { minutes: casual.integer( config.eventThresholds.past + 1, 20160 ) } ) ) );
casual.define( "anyDate", () => casual.coin_flip ? casual.futureDate : casual.pastDate );

casual.define( "categories", ( Categories ) => {
    const categories = fromPairs( Categories.map( c => [ c.id, c ] ) );

    const ids = keys( categories );
    const result = range( casual.integer( 1, 5 ) )
        .map( () => {
            const id = Number( casual.random_value( ids ) );
            const { name } = categories[ id ];
            return {
                id,
                name
            }
        } );
    return uniqWith( result, isEqual );
} );


casual.define( "multimedia", () => [ {
    source: "lorem",
    id: `${casual.id}`,
    type: casual.word
} ] );


casual.define( "eventTimes", ( { tense, allDay = casual.integer( 0, 10 ) > 8 } ) => {

    const today = now();

    switch ( tense ) {
        case "ongoing":
            const endOfWeek = weekEnd( today );
            const startTime = subtractFromDate( endOfWeek, { minutes: casual.integer( 60, 20160 ) } );
            let endTime = moveTimeToDate(
                startTime,
                maxDate( today, startTime )
            );

            endTime = addToDate( endTime, { days: casual.integer( 1, 14 ) } );
            if ( !allDay )
                endTime = addToDate( endTime, { minutes: casual.integer( 30, 24 * 60 - 1 ) } );

            return {
                startTime: normalizeEventTime( startTime ),
                endTime: normalizeEventTime( endTime ),
                allDay
            };
    }

    const startTime = casual[ `${tense}Date` ];
    const endTime = allDay ? null : normalizeEventTime( addToDate( startTime, { minutes: casual.integer( 30, 24 * 60 - 1 ) } ) );

    return {
        startTime,
        endTime,
        allDay
    };
} );


casual.define( "eventSummary", ( { tense, allDay, Categories } ) => {
    return {
        "id": casual.id,
        "updatedAt": casual.pastDate,

        "name": casual.catch_phrase,
        "venueId": casual.id,
        "venueName": casual.company_name,

        "categories": Categories ? casual.categories( Categories ) : [],
        "featured": casual.integer( 0, 3 ) === 0,

        "multimedia": casual.multimedia,

        ...casual.eventTimes( { tense, allDay } )
    }
} );


const price = () => {
    return casual.integer( 0, 5000 ) / 10;
};


casual.define( "eventDetails", eventSummary => {
    const address = `${casual.address}, ${casual.city}, ${casual.state_abbr} ${casual.zip( 5 )}`;

    return {
        id: eventSummary.id,
        description: casual.text,
        summary: casual.description,
        moreInfo: "https://google.com",
        ticketUrl: casual.coin_flip ? "https://google.com" : "",
        priceRange: casual.random_element( [ [], [ price() ], [ price(), price() ].sort( ( a, b ) => a - b ) ] ),
        venue: {
            id: eventSummary.venueId,
            name: eventSummary.venueName,
            address,
            phone: casual.phone,
            latitude: Number( casual.latitude ),
            longitude: Number( casual.longitude ),
            "location": [ eventSummary.venueName, address ].filter( p => !!p ).join( " " )

        }
    };

} );


casual.define( "events", ( { quantity, tense, state } ) => {
    const { Categories } = state;

    const ids = {};
    const result = [];
    while ( result.length < quantity ) {
        const event = casual.eventSummary( { tense, Categories } );
        if ( ids[ event.id ] )
            continue;

        result.push( event );
        ids[ event.id ] = true;
    }

    return sortByStartTime( result );
} );


export default casual;
