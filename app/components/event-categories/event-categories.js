import variables from "app/styles/variables";

import { Animated, Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        marginBottom: 2,
        overflow: "hidden",
    },
    category: {
        fontSize: variables.smallFontSize,
        fontWeight: "400",
        color: variables.grayTextColor,
        marginRight: 7
    }
} );


const categories = event => [ ...event.categories ]
    .sort( ( a, b ) => a.order - b.order )
    .map( c => ( c.name || "" ).toUpperCase() )
    .filter( c => !!c )
;


export default ( { event, style, textStyle, numberOfLines, ...props } ) =>
    <Animated.View style={ [ styles.root, numberOfLines ? { maxHeight: 14 * numberOfLines } : null, style ] } {...props}>
        { categories( event ).map( c =>
            <Text style={ [ styles.category, textStyle ] } key={c}>{c}</Text>
        ) }
    </Animated.View>
;
