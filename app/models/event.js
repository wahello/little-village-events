import Categories from "./categories";

import moment from "moment";

import _assign from "lodash/assign";
import _get from "lodash/get";
import _keys from "lodash/keys";
import _last from "lodash/last";
import _pick from "lodash/pick";
import _reduce from "lodash/reduce";
import _values from "lodash/values";
import _toNumber from "lodash/toNumber";
import memoize from "memoizee";


const priceRange = ( { tickets } ) => {
    const result = _values( tickets || [] )
        .map( ticket => _toNumber( ticket.price ) )
        .filter( price => !isNaN( price ) )
        .sort( ( x, y ) => x > y )
    ;

    if ( _last( result ) === 0 )
        return [];

    return result.length > 2
        ? [ result[ 0 ], _last( result ) ]
        : result
    ;
};


function date( path ) {
    return rawEvent => {
        const date = _get( rawEvent, path, null );
        return date && moment( date );
    }
}


function array( path, visitor, _default = [] ) {
    return rawEvent => {
        const array = _get( rawEvent, path, null );
        if ( !array )
            return _default;

        return _reduce( array, ( result, item ) => {
            const value = visitor( item );
            if ( value !== null )
                result.push( value );
            return result;
        }, [] );
    }
}


function object( path, visitor, _default = {} ) {
    return rawEvent => {
        const object = _get( rawEvent, path, null );
        return object && visitor( object ) || _default;
    }
}


function value( path ) {
    return rawEvent => {
        return _get( rawEvent, path, null );
    }
}

function fieldValue( rawEvent, field, source ) {
    let path = field;
    switch ( typeof source ) {
        case "function":
            return source( rawEvent );
        case "string":
            path = source;
            break;
    }

    return _get( rawEvent, path, null );
}

function fields( fieldsMap ) {
    return rawEvent => {
        return _reduce( fieldsMap, ( result, source, field ) => {
            result[ field ] = fieldValue( rawEvent, field, source );
            return result;
        }, {} )
    };
}


function process( rawEvent, fieldsMap ) {
    return fields( fieldsMap )( rawEvent );
}


export const summaryProperties = {
    "id": 1,
    "updatedAt": date( "updated_at" ),

    "name": 1,
    "venueId": "venue_id",
    "venueName": "venue.name",
    "allDay": "allday",
    "startTime": date( "starttime" ),
    "endTime": date( "endtime" ),

    "categories": array( "categories", fields( {
        "id": 1,
        "name": c => ( Categories.get( c.id ) || {} ).name || null
    } ) ),
    "featured": 1,

    "multimedia": array( "multimedia", fields( {
        source: 1,
        type: 1,
        id: 1
    } ) )

};


const detailsProperties = {

    description: 1,
    summary: 1,

    moreInfo: "moreinfo",

    ticketUrl: "ticketurl",
    priceRange: priceRange,

    venue: object( "venue", fields( {
        "address": 1,
        "phone": 1,
        "latitude": 1,
        "longitude": 1,
        "location": venue => ( [ venue.name, venue.address ].filter( p => !!p ).join( " " ) )
    } ) )
};

export const makeSummaryEvent = rawEvent => ( {
    ...process( rawEvent, summaryProperties ),
    details: null
} );


export const makeFullEvent = rawEvent => ( {
    ...process( rawEvent, summaryProperties ),
    details: process( rawEvent, detailsProperties )
} );

export const stripToSummaryEvent = event => _pick( event, _keys( summaryProperties ) );
