import * as Styles from "../../styles";

import React from "react";
import { Text } from "react-native";

const styles = Styles.create( {
    hashtags: {
        fontSize: Styles.variables.smallFontSize,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: Styles.variables.grayTextColor
    }

} );

const EventHashtags = ( { event, style } ) => {
    const { categories } = event;
    const hashtags = categories
        .map( c => c.name )
        .filter( n => !!n )
        .map( n => n.toUpperCase() )
        .join( " " )
    ;
    return hashtags
        ? <Text style={ [ styles.hashtags, style ] }>{ hashtags }</Text>
        : null
    ;
};

export default EventHashtags;
