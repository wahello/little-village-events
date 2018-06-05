import * as Styles from "../../styles";

import React from "react";
import { View, Text } from "react-native";
import moment from "moment";

const styles = Styles.create( {
    root: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        paddingHorizontal: Styles.variables.marginHorizontal,

        paddingVertical: 2,

        borderTopWidth: Styles.variables.borderWidth,
        borderTopColor: Styles.variables.borderColor
    },
    weekday: {
        fontSize: Styles.variables.largeFontSize,
        fontWeight: "bold",
        color: Styles.variables.textColor,
    },
    monthDay: {
        fontSize: Styles.variables.regularFontSize,
        color: Styles.variables.grayTextColor
    }


} );


const Header = ( { section: { today, date } } ) => {
    const monthDay = moment( date ).calendar( today, {
        sameDay: "dddd, MMM D",
        nextDay: "dddd, MMM D",
        nextWeek: "MMM D",
        sameElse: "MMM D"
    } ).toUpperCase();

    const weekday = moment( date ).calendar( today, {
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        sameElse: "dddd"
    } );

    return (
        <View style={ styles.root }>
            <Text style={ styles.monthDay }>{ monthDay }</Text>
            <Text style={ styles.weekday }>{ weekday }</Text>
        </View>
    );
};


export default Header;
