import Categories from "../../app/models/categories";

import casual from "casual-browserify";
import moment from "moment";

import _isEqual from "lodash/isEqual";
import _keys from "lodash/keys";
import _range from "lodash/range";
import _sortBy from "lodash/sortBy";
import _uniqWith from "lodash/uniqWith";

import "./multimedia-image-source";

casual.define( "id", () => casual.integer( 100000, Number.MAX_SAFE_INTEGER ) );

casual.define( "futureDate", () => moment().add( { minutes: casual.integer( 1, 20160 ) } ) );
casual.define( "pastDate", () => moment().subtract( { minutes: casual.integer( 1, 20160 ) } ) );
casual.define( "anyDate", () => casual.coin_flip ? casual.futureDate : casual.pastDate );

casual.define( "categories", () => {
    const ids = _keys( Categories );
    const result = _range( casual.integer( 1, 5 ) )
        .map( (  ) => {
            const id = ids[ casual.integer( 0, ids.length - 1 ) ];
            const name = Categories[id];
            return {
                id,
                name
            }
        } );
    return _uniqWith( result, _isEqual );
} );

casual.define( "multimedia", () => [ {
    source: "lorem",
    term: casual.word
} ] );


casual.define( "summaryEvent", ( tense ) => {
    tense = tense || "future";
    const startTime = casual[`${tense}Date`];

    return {
        "id": casual.id,
        "updatedAt": casual.pastDate,

        "name": casual.catch_phrase,
        "venueId": casual.id,
        "venueName": casual.company_name,
        "allDay": false,
        "startTime": startTime,
        "endTime": null,

        "categories": casual.categories,
        "featured": casual.integer( 0, 3 ) === 0,

        "multimedia": casual.multimedia,

        "rsvp": casual.integer( 0, 3 ) === 0
    }
} );

casual.define( "events", ( quantity, tense ) => {
    const ids = {};
    const result = [];
    while ( result.length < quantity ) {
        const event = casual.summaryEvent( tense );
        if ( ids[ event.id ] )
            continue;

        result.push( event );
        ids[ event.id ] = true;
    }

    return _sortBy( result, event => event.startTime.valueOf() );
} );

casual.define( "rsvps", ( quantity, tense ) => {
    const events = casual.events( quantity, tense );

    return events.reduce( ( result, event ) => {
        result[event.id] = event;
        return result
    }, {} );
} );


export default casual;
