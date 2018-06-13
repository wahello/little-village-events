import _keys from "lodash/keys";
import _uniq from "lodash/uniq"

const rsvpProperties = [
    "rsvpId",
    "startTime",
    "endTime",
    "tense"
];


export class EventWithRSVP {

    event: null;
    rsvp: null;

    constructor( event, rsvp ) {
        this.event = event;
        this.rsvp = rsvp || null;

        const props = _uniq( _keys( this.event || this.rsvp ).concat( rsvpProperties ) )
            .reduce( ( result, name ) => {
                if ( rsvpProperties.indexOf( name ) < 0 )
                    result[name] = { get: () => this.event ? this.event[name] : this.rsvp[name] };
                else
                    result[name] = { get: () => this.rsvp ? this.rsvp[name] : this.event[name] };
                return result;
            }, {} )
        ;
        Object.defineProperties( this, props );
    }

    get priority() { // reverse for simpler sorting
        return this.featured ? 0 : 1;
    }

}

