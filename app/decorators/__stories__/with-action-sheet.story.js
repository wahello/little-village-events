import withActionSheet from "app/decorators/with-action-sheet";
import { injectState } from "app/utils/freactal";
import casual from "/.storybook/casual";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { ChoicesSheetView } from "react-native-power-action-sheet";
import { compose } from "recompose";

const styles = StyleSheet.create( {
    wrapper: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
} );


const actionSheetFactory = () => (
    {
        sheetView: ChoicesSheetView,
        maxHeightRatio: 0.7,
        title: casual.title,
        message: casual.description,
        choices: casual.array_of_words( casual.integer( 0, 7 ) ).map( choice => ( { label: choice, value: choice } ) )
    }
);


const ActionSheet = ( { openActionSheet } ) => (
    <Button title="Action Sheet" onPress={ async () => action( "choice" )( await openActionSheet( actionSheetFactory() ) ) }/>
);

const makeScreen = Content => {
    const Wrapper = ( props ) => (
        <View style={ styles.wrapper }>
            <Content style={ styles.wrapper } { ...props }/>
        </View>
    );
    const Screen = compose( withActionSheet, injectState )( Wrapper );
    return () => <Screen/>;
};


storiesOf( "WithActionSheet", module )
    .add( "default", makeScreen( ActionSheet ) )
;
