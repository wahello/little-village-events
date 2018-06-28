import actionSheetFactory from "../add-rsvp";
import withActionSheet from "app/decorators/with-action-sheet";
import { toEventItemData } from "app/utils/realm";

import navigatorStyleDecorator from "/.storybook/decorators/navigator-style";
import casual from "/.storybook/casual/index";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const style = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#38F"
    },
    label: {
        marginVertical: 15,
        marginHorizontal: 15,
        textAlign: "center",
        color: "#FFF"
    },
    selected: {
        paddingVertical: 5,
        textAlign: "center",
        color: "grey"
    },

} );

class ScreenContent extends Component {
    state = {
        selected: null
    };

    actionSheetRef = React.createRef();

    open = async () => {
        const eventSummary = this.props.eventSummaryFactory();
        eventSummary.venue = { name: eventSummary.venueName };
        const eventItem = toEventItemData( eventSummary );

        const selected = await this.props.openActionSheet( actionSheetFactory( { ...this.props, eventSummary, eventItem } ) );
        this.setState( { selected } );
    };

    render() {
        const { selected } = this.state;
        return (
            <View style={ style.container }>
                <TouchableHighlight
                    onPress={ this.open }
                    underlayColor="#77ACFF"
                    style={ style.button }
                >
                    <Text style={ style.label }>Open action sheet</Text>
                </TouchableHighlight>
                <Text style={ style.selected }>
                    { selected ? `You selected: ${ JSON.stringify( selected ) }` : "Nothing is selected" }
                </Text>
            </View>
        );
    }
}

ScreenContent.defaultProps = {
    openWebBrowser: action( "openWebBrowser" )
};

const Screen = withActionSheet( ScreenContent );

storiesOf( "Add RSVP Action Sheet", module )
    .addDecorator( navigatorStyleDecorator( { style: "transparent", back: true } ) )
    .add( "default", () => <Screen eventSummaryFactory={ () => casual.eventSummary( { tense: "future", allDay: false } ) }/> )
    .add( "all day", () => <Screen eventSummaryFactory={ () => casual.eventSummary( { tense: "future", allDay: true } ) }/> )
    .add( "all day today", () => <Screen eventSummaryFactory={ () => casual.eventSummary( { tense: "today", allDay: true } ) }/> )
    .add( "ongoing", () => <Screen eventSummaryFactory={ () => casual.eventSummary( { tense: "ongoing", allDay: false } ) }/> )
    .add( "ongoing all day", () => <Screen eventSummaryFactory={ () => casual.eventSummary( { tense: "ongoing", allDay: true } ) }/> )
;
