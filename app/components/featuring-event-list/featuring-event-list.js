import Header from "./featuring-event-list.header";

import FeaturedItem from "../event-list-featured-item";
import Item from "../event-list-item";
import Separator from "../event-list-item-separator";


import React from "react";
import { SectionList } from "react-native";

const renderEvent = ( props ) => {
    const { item: event, section: { featured } } = props;
    return featured[ event.id ]
        ? <FeaturedItem { ...props }/>
        : <Item { ...props }/>
    ;
};

const FeaturingEventList = ( { sections } ) => {
    return (
        <SectionList
            ItemSeparatorComponent={ Separator }
            sections={ sections }
            renderItem={ renderEvent }
            renderSectionHeader={ Header }
            keyExtractor={ ( item, index ) => item.id || index }
            stickySectionHeadersEnabled={ false }
        />
    );
};

export default FeaturingEventList;
