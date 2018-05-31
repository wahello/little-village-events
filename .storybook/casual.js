import Categories from "../app/models/categories";

import casual from "casual-browserify";
import moment from "moment";

import _isEqual from "lodash/isEqual";
import _keys from "lodash/keys";
import _range from "lodash/range";
import _uniqWith from "lodash/uniqWith";


casual.define( "id", () => casual.integer( 100000, Number.MAX_SAFE_INTEGER ) );

casual.define( "futureDate", () => moment().add( { minutes: casual.integer( 10, 20160 ) } ) );
casual.define( "pastDate", () => moment().subtract( { minutes: casual.integer( 10, 20160 ) } ) );
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
        "featured": casual.coin_flip,

        "multimedia": casual.multimedia
    }
} );

casual.define( "rsvps", ( quantity, tense ) => {
    const result = {};
    while ( _keys( result ).length < quantity ) {
        const rsvp = casual.summaryEvent( tense );
        result[rsvp.id] = { ...rsvp, rsvp: true };
    }

    return result;
} );


export default casual;
