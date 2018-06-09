import _keys from "lodash/keys";

const rsvpProperties = [
    "rsvpId",
    "startTime",
    "endTime"
];


export class EventWithRSVP {

    event: null;
    rsvp: null;

    constructor( event, rsvp ) {
        this.event = event;
        this.rsvp = rsvp || null;

        const props = _keys( this.event )
            .reduce( ( result, name ) => {
                if ( rsvpProperties.indexOf( name ) < 0 )
                    result[name] = { get: () => this.event[name] };
                else
                    result[name] = { get: () => this.rsvp ? this.rsvp[name] : this.event[name] }
                return result;
            }, {} )
        ;
        Object.defineProperties( this, props );
    }

    get rsvpId() {
        return this.rsvp && this.rsvp.rsvpId;
    }

    get priority() { // reverse for simpler sorting
        return this.event.featured ? 0 : 1;
    }

}

