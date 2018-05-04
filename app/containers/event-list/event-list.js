import state from "./event-list.state";

import { injectState, provideState } from "@textpress/freactal";

import React from "react";
import { SectionList, StyleSheet, Text } from "react-native";
import { compose } from "recompose";

const styles = StyleSheet.create( {
    list: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "rgba(247,247,247,1.0)",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
} );

const detailsView = {
    screen: "events.details",
    title: "Details",
    backButtonTitle: ""
};

const EventList = ( props ) => {
    const { state, navigator } = props;
    return ( <SectionList
        sections={ state.events }
        renderItem={ ( { item } ) => <Text style={ styles.item }
            onPress={ () => navigator.push( { ...detailsView, passProps: { event: item } } ) }>{ item.name }</Text> }
        renderSectionHeader={ ( { section } ) => <Text style={ styles.sectionHeader }>{ section.title }</Text> }
        keyExtractor={ ( item, index ) => item.id || index }
    /> );
};

export default compose(
    provideState( state ),
    injectState
)( EventList );
