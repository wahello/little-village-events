import EventList from "../event-list";
import EmptyMessage from "./past-rsvp-list.empty-message"

import React from "react";

const PastRSVPList = ( props ) => {
    const { state } = props;
    if ( !state.sections.length )
        return <EmptyMessage/>;

    return <EventList sections={state.sections}/>;
};

export default PastRSVPList;
