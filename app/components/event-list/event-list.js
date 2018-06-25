import Item from "app/components/event-list-item";

import SectionHeader from "app/components/event-list-section-header";
import Separator from "app/components/event-list-item-separator";


import React from "react";
import { SectionList } from "react-native";



const EventList = ( props ) => {
    const { state } = props;
    // console.log( "@@@ EventList state.sections", JSON.stringify( state.sections ) );
    return (
        <SectionList
            ItemSeparatorComponent={ Separator }
            sections={ state.sections }
            // renderItem={ props => null }
            renderItem={ props => <Item {...props} /> }
            renderSectionHeader={ SectionHeader }
            keyExtractor={ ( item, index ) => `${item.id || index}` }
        />
    );
};

export default EventList;
