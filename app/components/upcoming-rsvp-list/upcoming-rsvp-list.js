import FeaturingEventList from "../featuring-event-list";
import EmptyMessage from "./upcoming-rsvp-list.empty-message"

import React from "react";

const UpcomingRSVPList = ( props ) => {
    const { state } = props;
    if ( !state.eventList.length )
        return <EmptyMessage/>;

    return <FeaturingEventList { ...props}/>;
};

export default UpcomingRSVPList;
