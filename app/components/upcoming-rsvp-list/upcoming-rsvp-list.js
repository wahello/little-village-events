import FeaturingEventList from "app/components/featuring-event-list";
import EmptyMessage from "./upcoming-rsvp-list.empty-message"

import React from "react";

const UpcomingRSVPList = ( props ) => {
    const { state } = props;
    if ( !state.sections.length )
        return <EmptyMessage/>;

    return <FeaturingEventList sections={state.sections} />;
};

export default UpcomingRSVPList;
