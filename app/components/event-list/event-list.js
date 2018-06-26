import Item from "app/components/event-list-item";

import SectionHeader from "app/components/event-list-section-header";
import Separator from "app/components/event-list-item-separator";

import variables from "app/styles/variables";

import React from "react";
import { SectionList, StyleSheet } from "react-native";


const styles = StyleSheet.create( {
    root: {
        backgroundColor: variables.panelBackgroundColor
    }
} );


export default props =>
    <SectionList style={ styles.root }
        ItemSeparatorComponent={ Separator }
        renderItem={ props => <Item {...props} /> }
        renderSectionHeader={ SectionHeader }
        keyExtractor={ ( item, index ) => `${item.id || index}` }
        {...props}
    />
;
