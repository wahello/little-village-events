import _get from "lodash/get";
import _keys from "lodash/keys";
import _last from "lodash/last";
import _pick from "lodash/pick";
import _reduce from "lodash/reduce";
import _values from "lodash/values";
import _toNumber from "lodash/toNumber";


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
        return date && new Date( date );
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
    "allDay": "allday",
    "startTime": date( "starttime" ),
    "endTime": date( "endtime" ),

    venue: data => {
        return data.venue_id ? {
            id: data.venue_id,
            ...( data.venue ) || {}
        } : null;
    },

    "categories":
        array( "categories", data => {
            const { id, name } = data;
            const result = { id };
            if ( name )
                result.name = name.trim();
            return result;
        } ),
    "featured":
        1,

    "multimedia":
        array( "multimedia", fields( {
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
        "id": 1,
        "name": 1,
        "address": 1,
        "phone": 1,
        "latitude": 1,
        "longitude": 1
    } ) )
};

export const makeEventSummaryData = rawEvent => ( {
    ...process( rawEvent, summaryProperties ),
    details: null
} );


export const makeEventFullData = rawEvent => ( {
    ...process( rawEvent, summaryProperties ),
    details: process( rawEvent, detailsProperties )
} );

export const stripToSummaryEvent = event => _pick( event, _keys( summaryProperties ) );
