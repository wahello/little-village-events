import { View, Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        maxHeight: 28,
        width: 220,
        overflow: "hidden",
    },
    category: {
        fontSize: 12,
        fontWeight: "400",
        color: "white",
        marginRight: 10
    }
} );


const categories = event => ( event.categories || [] )
    .map( c => ( c.name || "" ).trim().toUpperCase() )
    .filter( c => !!c )
    .sort()
;


export default ( { event } ) =>
    <View style={ styles.root }>
        { categories( event ).map( c =>
            <Text style={styles.category} key={c}>{c}</Text>
        ) }
    </View>
;
