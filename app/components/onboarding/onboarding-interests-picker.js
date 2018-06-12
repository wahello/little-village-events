import { SkipButton, ContinueButton } from "./onboarding-buttons";
import EventCategoriesChooser from "../../components/event-categories-chooser";
import Hr from "../../components/hr";
import StatusBarSpacer from "../../components/status-bar-spacer";
import { TouchableButton } from "../../components/touchable";

import Categories from "../../models/categories";
import variables from "../../styles/variables";

import { update, injectState, provideState } from "@textpress/freactal";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { Fragment } from "react";

import { compose } from "recompose";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        backgroundColor: variables.panelBackgroundColor
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
    },
    title: {
        fontSize: variables.regularFontSize,
        fontWeight: "500"
    },
    picker: {
        backgroundColor: variables.bodyBackgroundColor
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        minHeight: 84
    },
    skipButton: {
        backgroundColor: "#DADADA",
    },
    continueButton: {
        position: "absolute",
        alignSelf: "center",
        bottom: 20
    }
} );


const Header = () =>
    <Fragment>
        <StatusBarSpacer />
        <View style={ styles.header }>
            <Text style={ styles.title }>Select at least three categories</Text>
        </View>
    </Fragment>
;


const OnboardingInterestsPicker = ( { state, effects, onSkip, onContinue } ) =>
    <View style={ styles.root }>
        <Header />
        <Hr />
        <ScrollView style={ styles.picker }>
            <EventCategoriesChooser
                categories={ state.categories }
                selected={ state.selected }
                onChange={ effects.updateSelected }
            />
            <View style={ styles.footer } >
                { state.canSkip
                    ? <SkipButton style={ styles.skipButton} onPress={ onSkip } />
                    : null
                }
            </View>
        </ScrollView>
        { state.canContinue
            ? <ContinueButton style={ styles.continueButton } onPress={ onContinue } />
            : null
        }
    </View>
;


export default compose(
    provideState( {
        initialState: () => ( {
            categories: Categories,
            selected: []
        } ),
        effects: {
            updateSelected: update( ( state, value ) => {
                return { selected: value };
            } )
        },
        computed: {
            canContinue: ( { selected } ) => selected.length >= 3,
            canSkip: ( { canContinue } ) => !canContinue
        }
    } ),
    injectState
)( OnboardingInterestsPicker );
