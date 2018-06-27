import { TouchableLink } from "app/components/touchable";

import humanizeList from "app/utils/humanize-list";

import { View, Text, StyleSheet } from "react-native";
import React from "react";


const styles = StyleSheet.create( {
    root: {
        flexDirection: "column",
        padding: 16
    },
    title: {
        flexDirection: "row",
        paddingBottom: 10
    },
    titleText: {
        fontWeight: "800",
        fontSize: 34,
        fontWeight: "800",
        transform: [ { translateY: 2 } ]
    },
    subtitle: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    subtitleText: {
        fontWeight: "500"
    },
    underlined: {
        borderBottomWidth: 1,
        borderBottomColor: "#BDBDBD"
    }
} );


const shortCategoryName = c => c.split( "/" )[0];
const formatInterests = interests =>
    humanizeList(
        interests.map( x => shortCategoryName( x ) ),
        { maxLength: 3, etcConjunction: "& more" }
    ).toUpperCase();


const Link = ( { style, children, onPress } ) =>
    <TouchableLink style={ styles.underlined } activeOpacity={.6} onPress={ onPress }>
        <Text style={ style }>{children}</Text>
    </TouchableLink>
;


const subtitleParts = ( interests, location, onPress ) => [].concat(
    <Link style={ styles.subtitleText } onPress={ onPress } key="interests">
        { interests.length ? formatInterests( interests ) : "EVERYTHING" }
    </Link>,
    location
        ? [ <Text key="prep"> IN </Text>,
            <Link style={ styles.underlined } onPress={ onPress } key="location">{ location.toUpperCase() }</Link> ]
        : [ <Text key="prep"> </Text>,
            <Link style={ styles.underlined } key="location">ANYWHERE</Link> ]
);


export default ( { timePeriod, interests, location, onPress } ) =>
    <View style={ styles.root }>
        <View style={ styles.title }>
            <Link style={ styles.titleText } onPress={ onPress }>{ timePeriod }</Link>
        </View>
        <View style={ styles.subtitle }>
            { subtitleParts( interests, location, onPress ) }
        </View>
    </View>;
