import EventCategories from "app/components/event-categories";
import { StyleSheet } from "react-native";

import React from "react";


const styles = StyleSheet.create( {
    root: {
        width: 220,
        marginBottom: 7
    },
    category: {
        color: "white",
    }
} );



export default ( { event, style, ...props } ) =>
    <EventCategories
        event={ event }
        style={[ styles.root, style ]}
        textStyle={ styles.category }
        numberOfLines={2}
        {...props} />
;
