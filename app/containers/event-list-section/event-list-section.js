import state from "./event-list-section.state";

import Item from "app/components/event-list-item";
import Separator from "app/components/event-list-item-separator";

import { View, FlatList } from "react-native";
import React from "react";

import { injectState, provideState } from "app/utils/freactal";

import { compose } from "recompose";


const SectionContent = ( { state } ) =>
    <View>
        <FlatList
            data={ state.items }
            renderItem={ props => <Item { ...props } date={state.date} /> }
            keyExtractor={ ( item, index ) => `${item.id || index}` }
        />
        {/* <TouchableButton onPress={ () => this.setState( { expanded: !this.state.expanded } ) }>
            <Text>    { this.state.expanded ? "SHOW LESS" : "SHOW MORE" }</Text>
        </TouchableButton> */}
    </View>
;


export default compose(
    injectState,
    provideState( state ),
    injectState
)( SectionContent );
