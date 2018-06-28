import withActionSheet from "app/decorators/with-action-sheet";
import { toEventItem } from "app/utils/realm";
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
    }

} );

class ScreenContent extends Component {
    state = {
        selected: null
    };

    actionSheetRef = React.createRef();

    open = async () => {
        const { actionSheetFactory } = this.props;
        const selected = await this.props.openActionSheet( actionSheetFactory( this.props ) );
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

export default withActionSheet( ScreenContent );
