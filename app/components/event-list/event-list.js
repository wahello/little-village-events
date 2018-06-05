import Header from "../event-list-header";
import Item from "../event-list-item";
import Separator from "../event-list-item-separator";

import React from "react";
import { SectionList } from "react-native";

const EventList = ( props ) => {
    const { state } = props;
    return (
        <SectionList
            ItemSeparatorComponent={ Separator }
            sections={ state.eventList }
            renderItem={ props => <Item { ...props }/> }
            renderSectionHeader={ Header }
            keyExtractor={ ( item, index ) => item.id || index }
        />
    );
};

export default EventList;
