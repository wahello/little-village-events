import EventCategoriesChooser from "../../components/event-categories-chooser";
import Hr from "../../components/hr";
import StatusBarSpacer from "../../components/status-bar-spacer";
import { TouchableButton } from "../../components/touchable";

import Categories from "../../models/categories";
import variables from "../../styles/variables";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { Fragment } from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
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
        padding: 20
    },
    skipButton: {
        backgroundColor: "#DADADA",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 50
    },
    buttonLabel: {
        fontSize: variables.largeFontSize
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


const SkipButton = () =>
    <TouchableButton style={ styles.skipButton} >
        <Text style={ styles.buttonLabel }>Skip</Text>
    </TouchableButton>
;



export default () =>
    <View style={ styles.root }>
        <Header />
        <Hr />
        <ScrollView style={ styles.picker }>
            <EventCategoriesChooser
                categories={ Categories }
                selected={ [] }
                onChange={ () => {} }
            />
            <View style={ styles.footer } >
                <SkipButton />
            </View>
        </ScrollView>
    </View>
;
