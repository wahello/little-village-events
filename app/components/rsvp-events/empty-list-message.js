import * as Styles from "../../styles";

import React from "react";
import { Text, View } from "react-native";

const styles = Styles.create( {
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: Styles.variables.grayTextColor,
        fontSize: Styles.variables.regularFontSize
    }
} );

const EmptyListMessage = () => (
    <View style={ styles.root }>
        <Text style={ styles.label }>
            NO EVENTS FOUND
        </Text>
    </View>
);

export default EmptyListMessage;
