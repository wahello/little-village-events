import { makeRSVPEvent, validateRSVPEvent } from "./rsvp";
import Storage from "../storage";

const arrayToMap = array => {
    return array.reduce( ( result, pair ) => {
        const rsvp = pair[ 1 ];
        result[ rsvp.rsvpId ] = rsvp;
        return result;
    }, {} );
};

export default class RSVPs {

    storage = new Storage( "RSVP" );

    async add( event, calendarDay ) {
        const rsvp = makeRSVPEvent( event, calendarDay );
        await this.storage.set( rsvp.rsvpId, rsvp );
        return rsvp;
    }


    async remove( rsvp ) {
        validateRSVPEvent( rsvp );
        await this.storage.remove( rsvp.rsvpId );
        return rsvp;
    }


    async all() {
        const result = await this.storage.all();
        return arrayToMap( result );
    }


    clear() {
        return this.storage.clear();
    }


};
