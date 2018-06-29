import ListHeader from "./list-header";

import EventList from "app/containers/event-list";

import NavHeader from "app/components/nav-header";
import StatusBarSpacer from "app/components/status-bar-spacer";

import { provideState, injectState } from "app/utils/freactal";

import variables from "app/styles/variables";

import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { compose } from "recompose";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        backgroundColor: variables.panelBackgroundColor
    },

} );


const EventsForYou = ( { state } ) =>
    <View style={styles.root} >
        <StatusBarSpacer />
        <NavHeader>
            <Text>For you</Text>
        </NavHeader>
        <EventList
            ListHeaderComponent={ () => <ListHeader /> }
            filters={ state.filters }
        />
    </View>
;


export default compose(
    provideState( {
        initialState: () => ( {} ),
        computed: {
            filters: ( { userProfile } ) => ( {
                categories: userProfile.interests.map( x => x.id ),
                location: userProfile.location,
                maxDistance: userProfile.maxDistance
            } )
        }
    } ),
    injectState
)( EventsForYou );
