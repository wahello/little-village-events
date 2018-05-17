import Header from "./event-list.header";
import Item from "./event-list.item";
import state from "./event-list.state";

import { injectState, provideState } from "../../utils/freactal";
import navigatorStyles from "../../navigator/styles";

import React from "react";
import { SectionList } from "react-native";
import { compose } from "recompose";

const EventList = ( props ) => {
    const { state } = props;
    return (
        <SectionList
            sections={ state.events }
            renderItem={ props => <Item { ...props }/> }
            renderSectionHeader={ Header }
            keyExtractor={ ( item, index ) => item.id || index }
        />
    );
};

EventList.id = "events.list";
EventList.navigatorStyle = {
    ...navigatorStyles.opaque,
};

EventList.title = "Iowa City";

export default compose(
    provideState( state ),
    injectState
)( EventList );
