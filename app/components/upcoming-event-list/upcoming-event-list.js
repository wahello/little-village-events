import FeaturingEventList from "../featuring-event-list";
import EmptyMessage from "./upcoming-event-list.empty-message"

import React from "react";

const UpcomingEventList = ( props ) => {
    const { state } = props;
    if ( !state.eventList.length )
        return <EmptyMessage/>;

    return <FeaturingEventList { ...props}/>;
};

export default UpcomingEventList;
