import _reduce from "lodash/reduce";
import _values from "lodash/values";

export default {
    initialState: () => ( {
    } ),
    effects: {
    },
    computed: {
        events: ( { rsvps } ) => {
            return _values( rsvps );
        },

        dates: ( { rsvps } ) => {
            return _reduce( rsvps, ( result, { startTime } ) => {
                if ( !result )
                    return { first: startTime, last: startTime };

                const { first, last } = result;
                return {
                    first: first.isAfter( startTime ) ? startTime : first,
                    last: last.isBefore( startTime ) ? startTime : last
                }
            }, null );
        }
    }
}
