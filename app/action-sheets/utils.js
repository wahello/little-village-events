import { formatStartDate, formatStartTime } from "../utils/event";

import React from "react";
import { Text, View } from "react-native";
import MeasureText from "react-native-measure-text";

import _map from "lodash/map";
import _pick from "lodash/pick";
import _sum from "lodash/sum";
import _values from "lodash/values";

const calcPadding = style =>
    _sum( _values( _pick( style, [ "paddingTop", "paddingBottom" ] ) ) )
;

const calcTitlePartHeight = async ( texts, name, width, rawStyles ) => {
    const style = rawStyles[ name ];
    const groupStyle = rawStyles[ `${name}Group` ] || {};
    const groupPadding = calcPadding( groupStyle );
    const padding = calcPadding( style ) * texts.length;
    const heights = await MeasureText.heights( {
        texts,
        width,
        ..._pick( style, [ "fontSize", "fontFamily", "fontWeight" ] )
    } );

    const height = _sum( heights );

    return groupPadding + padding + height;
};

const makePartViews = ( texts, name, styles ) => {
    const parts = texts.map( ( text, i ) => <Text key={ `${name}#${i}` } style={ styles[name] }>{text}</Text> );
    const groupName = `${name}Group`;
    const groupStyle = styles[ groupName ];
    return parts.length && groupStyle
        ? <View key={ groupName } style={ groupStyle }>{ parts }</View>
        : parts
    ;
};


const formatStartTimeAndPlace = ( rsvpTime, { venue } ) => {
    return [ formatStartTime( rsvpTime ), venue && venue.name && `@ ${venue.name}` ]
        .filter( part => !!part )
        .join( " " )
    ;
};


export const makeInfoParts = ( rsvpTime, eventSummary ) =>
    [
        formatStartDate( rsvpTime ),
        formatStartTimeAndPlace( rsvpTime, eventSummary )
    ].filter( part => !!part )
;


export const makeTitleView = ( parts, styles ) => (
    <View style={ styles.title }>
        { _map( parts, ( texts, name ) => makePartViews( texts, name, styles ) ) }
    </View>
);

export const calcTitleHeight = async ( parts, windowWidth, rawStyles ) => {
    const externalHorizontalPadding = 10;
    const width = windowWidth - externalHorizontalPadding * 2 - rawStyles.title.paddingHorizontal * 2;
    const padding = rawStyles.title.paddingVertical * 2;

    const heights = await Promise.all( _map( parts, ( texts, name ) => calcTitlePartHeight( texts, name, width, rawStyles ) ) );
    const height = _sum( heights );

    return padding + height;
};
