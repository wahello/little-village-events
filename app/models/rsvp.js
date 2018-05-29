import Storage from "../storage";

import _omit from "lodash/omit";
import _isArray from "lodash/isArray";

const arrayToMap = array => {
    return array.reduce( ( result, pair ) => {
        const event = pair[ 1 ];
        result[ event.id ] = event;
        return result;
    }, {} );
};


export default class RSVP {

    storage = new Storage( "RSVP" );

    add( event ) {
        return this.storage.set( event.id, _omit( event, "details" ) );
    }


    remove( event ) {
        return this.storage.remove( event.id );
    }


    async get( ids ) {
        if ( !_isArray( ids ) )
            return this.storage.get( ids );

        const result = await this.storage.multiGet( ids );
        return arrayToMap( result );
    }

    async all() {
        const result = await this.storage.all();
        return arrayToMap( result );
    }

    clear() {
        return this.storage.clear();
    }

};
