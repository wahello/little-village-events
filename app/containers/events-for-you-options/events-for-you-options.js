import EventLocationsChooser from "app/components/event-locations-chooser";
import EventCategoriesChooser from "app/components/event-categories-chooser";
import SectionListHeader from "app/components/section-list-header";
import NavHeader from "app/components/nav-header";
import StatusBarSpacer from "app/components/status-bar-spacer";

import withNavigationEvents from "app/decorators/with-navigation-events";

import { provideState, injectState, update } from "app/utils/freactal";

import variables from "app/styles/variables";

import { SectionList, View, Text, StyleSheet } from "react-native";
import React from "react";

import { compose } from "recompose";
import map from "lodash/map";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        backgroundColor: variables.panelBackgroundColor
    },
    navHeader: {
        height: 45
    },
    title: {
        fontSize: variables.largeFontSize,
        fontWeight: "600"
    },
    sectionTitle: {
        fontSize: variables.largeFontSize,
        fontWeight: "600"
    },
    sectionBoby: {
        backgroundColor: variables.bodyBackgroundColor
    }

} );


const EventsForYouOptions = ( { state: { Locations, Categories, interests, location }, effects } ) =>
    <View style={ styles.root } >
        <StatusBarSpacer />
        <NavHeader style={ styles.navHeader }>
            <Text style={ styles.title }>Show me events...</Text>
        </NavHeader>
        <SectionList
            renderSectionHeader={ ( { section: { title } } ) =>
                <SectionListHeader>
                    <Text style={ styles.sectionTitle }>{ title }</Text>
                </SectionListHeader>
            }
            sections={[
                { title: "In or near...", data: [ {} ], renderItem: () =>
                    <EventLocationsChooser
                        style={ styles.sectionBoby }
                        locations={ Locations }
                        selected={ location }
                        onChange={ effects.updateLocation }
                    />
                },
                // { title: "That are happening...", data: [], renderItem: },
                { title: "That match the following categories...", data: [ {} ], renderItem: () =>
                    <EventCategoriesChooser
                        style={ styles.sectionBoby }
                        categories={ Categories }
                        selected={ interests }
                        onChange={ effects.updateInterests }
                    />
                },
            ]}
            keyExtractor={ ( item, index ) => index }
        />
    </View>
;


export default compose(
    injectState,
    provideState( {
        initialState: ( { state: { userProfile } } ) => ( {
            interests: map( userProfile.interests, "id" ),
            location: userProfile.location.id,
        } ),
        effects: {
            updateInterests: update( ( state, interests ) => ( { interests } ) ),
            updateLocation: update( ( state, location ) => ( { location } ) ),
        }
    } ),
    injectState,
    withNavigationEvents( {
        willDisappear: ( { effects, state: { interests, location } } ) => {
            effects.updateUserProfile( {
                interests: interests.map( id => ( { id } ) ),
                location: { id: location }
            } )
        },
    } ),
)( EventsForYouOptions );
