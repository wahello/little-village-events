import EventList from "app/components/event-list";
import state from "./event-list.state";

import { injectState, provideState } from "app/utils/freactal";

import React from "react";

import { compose } from "recompose";


const EventListContainer = ( { state } ) =>
    <EventList
        sections={ state.sections }
    />
;


export default compose(
    injectState,
    provideState( state ),
    injectState
)( EventListContainer );
