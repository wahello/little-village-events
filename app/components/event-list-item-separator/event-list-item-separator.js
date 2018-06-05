import * as Styles from "../../styles";

import React from "react";
import { View } from "react-native";

const styles = Styles.create( {
    root: {
        flex: 1,
        marginLeft: 120,
        height: Styles.variables.borderWidth,
        backgroundColor: Styles.variables.borderColor
    },
} );


const EventListItemSeparator = ( props ) => {
    return (
        <View style={ styles.root }/>
    );
};


export default EventListItemSeparator;
