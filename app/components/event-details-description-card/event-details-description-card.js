import DetailsCard from "../event-details-card";

import HTMLView from "react-native-htmlview";

import { Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flexDirection: "column",
        padding: 16,
        paddingBottom: 18
    },
    tab: {
        fontSize: 12,
        color: "#4a4a4a",
        paddingBottom: 16
    }
} );


const renderNode = node => {
    switch ( node.name ) {
        case "iframe": return null;
    }
}


const htmlStyles = StyleSheet.create( {
    body: {
        fontSize: 16,
    }
} );


export const DescritionCard = ( { description, details } ) =>
    <DetailsCard style={ styles.root }>
        <Text style={ styles.tab }>DESCRIPTION</Text>
        <HTMLView
            value={`<body>${description}</body>`}
            stylesheet={ htmlStyles }
            renderNode={ renderNode }
        />
    </DetailsCard>
;


export const parseDescription = desc => {
    const detailsRe = /(<p>(\w+(?:\s+\w+)*):(\w+(?:\s+\w+)*)<\/p>)/g;

    const details = [];
    const description = desc
        .replace( detailsRe, ( match, p1, p2, p3 ) => {
            details.push( [ p2, p3 ] );
            return "";
        } )
        .replace( /(<br>)/g, "" )
        .replace( /(<p><\/p>)/g, "" )
        ;

    return { description, details };
};


export default ( { event } ) => {
    const { description } = event;
    if ( !description )
        return null;

    return <DescritionCard {...parseDescription( description )} />;
}
