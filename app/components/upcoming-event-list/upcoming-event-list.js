import Header from "./upcoming-event-list.header";
import EmptyMessage from "./upcoming-event-list.empty-message"

import FeaturedItem from "../event-list-featured-item";
import Item from "../event-list-item";
import Separator from "../event-list-item-separator";


import React from "react";
import { SectionList } from "react-native";

const renderEvent = ( props ) => {
    const { item: event } = props;
    return event.featured
        ? <FeaturedItem { ...props }/>
        : <Item { ...props }/>
    ;
};

const UpcomingEventList = ( props ) => {
    const { state } = props;
    if ( !state.eventList.length )
        return <EmptyMessage/>;

    return (
        <SectionList
            ItemSeparatorComponent={ Separator }
            sections={ state.eventList }
            renderItem={ renderEvent }
            renderSectionHeader={ Header }
            keyExtractor={ ( item, index ) => item.id || index }
            stickySectionHeadersEnabled={ false }
        />
    );
};

export default UpcomingEventList;
