import EventsForYouHeader from "app/components/events-for-you-header";

import { provideState, injectState } from "app/utils/freactal";

import React from "react";

import { compose } from "recompose";


const ListHeader = ( { state: { timePeriod, interests, location }, ...props } ) =>
    <EventsForYouHeader
        timePeriod={ timePeriod }
        interests={ interests }
        location={ location }
        {...props}
    />
;


export default compose(
    provideState( {
        computed: {
            timePeriod: ( { userProfile } ) => userProfile.timePeriod.name,
            interests: ( { userProfile } ) => userProfile.interests.map( x => x.name ),
            location: ( { userProfile } ) => userProfile.location.id === "anywhere"
                ? null
                : userProfile.location.name
        }
    } ),
    injectState
)( ListHeader );
