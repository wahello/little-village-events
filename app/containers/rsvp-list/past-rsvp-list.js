import PastRSVPList from "app/components/past-rsvp-list";
import state from "./rsvp-list.state";

import { injectState, provideState } from "app/utils/freactal";

import { compose } from "recompose";

import React from "react";


const List = compose(
    injectState,
    provideState( state ),
    injectState
)( PastRSVPList );

export default props => <List showUpcoming={false} {...props } />;
