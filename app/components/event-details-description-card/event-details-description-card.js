import DetailsCard from "../event-details-card";
import parseDescription from "./parse-description.js";

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
};


const htmlStyles = StyleSheet.create( {
    body: {
        fontSize: 16,
    },
    strong: {
        fontWeight: "600"
    }
} );


export const DescriptionCard = ( { summary, description, details } ) =>
    <DetailsCard style={ styles.root }>
        <Text style={ styles.tab }>DESCRIPTION</Text>
        <HTMLView
            value={`<body>${summary ? `<p><strong>${summary}</strong></p>` : ""}${description}</body>`}
            stylesheet={ htmlStyles }
            renderNode={ renderNode }
        />
    </DetailsCard>
;




export default ( { event: { details } } ) => {
    const { summary, description } = details;
    if ( !summary && !description )
        return null;

    return <DescriptionCard summary={summary} {...parseDescription( description )} />;
}
