import { injectState } from "../freactal";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import { Button, StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import { compose } from "recompose";

const styles = StyleSheet.create( {
    wrapper: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
} );


const ActionSheet1 = {
    message: "Test",
    options: [
        "Cancel",
        "Apple",
        {
            component: <Text style={ { color: "orange", fontSize: 24 } }>Banana</Text>,
            height: 80,
        },
        { title: "Watermelon", onPress: action( "Watermelon" ) },
        {
            component: <Text style={ { color: "blueviolet" } }>Apple</Text>,
            height: 40,
            onPress: action( "Apple" )

        }
    ],
    cancelButtonIndex: 0,
    destructiveButtonIndex: 4,
    onPress: action( "SelectedAction" )
};


const ActionSheet2 = {
    message: "Test2",
    options: [
        "Cancel",
        "Watermelon",
    ],
    cancelButtonIndex: 0,
    destructiveButtonIndex: 4,
    onPress: action( "SelectedAction" )
};


const OneActionSheet = ( { effects } ) => (
    <Button title="Action Sheet" onPress={ () => effects.showActionSheet( ActionSheet1 ) }/>
);

const TwoActionSheets = ( { effects } ) => (
    <Fragment>
        <Button title="Action Sheet #1" onPress={ () => effects.showActionSheet( ActionSheet1 ) }/>
        <Button title="Action Sheet #2" onPress={ () => effects.showActionSheet( ActionSheet2 ) }/>
    </Fragment>
);


const makeScreen = Content => {
    const Wrapper = ( props ) => (
        <View style={ styles.wrapper }>
            <Content style={ styles.wrapper } { ...props }/>
        </View>
    );
    const Screen = compose( injectState )( Wrapper );
    return () => <Screen/>;
};


storiesOf( "WithActionSheet", module )
    .add( "default", makeScreen( OneActionSheet ) )
    .add( "two sheets", makeScreen( TwoActionSheets ) )
;
