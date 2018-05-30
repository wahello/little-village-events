import Header from "../event-list-header";
import Item from "../event-list-item";

import React from "react";
import { SectionList } from "react-native";

const EventList = ( props ) => {
    const { state } = props;
    return (
        <SectionList
            sections={ state.eventList }
            renderItem={ props => <Item { ...props }/> }
            renderSectionHeader={ Header }
            keyExtractor={ ( item, index ) => item.id || index }
        />
    );
};

export default EventList;
