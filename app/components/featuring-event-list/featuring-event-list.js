import Header from "./featuring-event-list.header";

import FeaturedItem from "../event-list-featured-item";
import Item from "../event-list-item";
import Separator from "../event-list-item-separator";


import React from "react";
import { SectionList } from "react-native";

const renderEvent = ( props ) => {
    const { item: event } = props;
    return event.showAsFeatured
        ? <FeaturedItem { ...props }/>
        : <Item { ...props }/>
    ;
};

const FeaturingEventList = ( props ) => {
    const { state } = props;
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

export default FeaturingEventList;
