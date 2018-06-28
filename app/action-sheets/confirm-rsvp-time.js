import HeaderView from "./components/header";

import { formatStartDate, formatStartTime } from "app/utils/event";

import { Button, Separator } from "react-native-power-action-sheet";

import React, { Fragment } from "react";
import { Text, View } from "react-native";

const formatStartTimeAndPlace = ( rsvpTime, { venue } ) => {
    return [ formatStartTime( rsvpTime ), venue && venue.name && `@ ${venue.name}` ]
        .filter( part => !!part )
        .join( " " )
    ;
};

const ConfirmRSVPTimeActionSheet = ( props ) => {
    const { styles, options, close } = props;
    const { eventSummary, rsvpTime } = options;
    return (
        <Fragment>
            <HeaderView styles={ styles } top={ true }>
                <Text style={ styles.h1 }>
                    { `RSVP to ${eventSummary.name}?` }
                </Text>
                <View style={ styles.infoBlock }>
                    <Text style={ styles.infoText } numberOfLines={ 1 }>
                        { formatStartDate( rsvpTime ) }
                    </Text>
                    <Text style={ styles.infoText } numberOfLines={ 1 }>
                        { formatStartTimeAndPlace( rsvpTime, eventSummary ) }
                    </Text>
                </View>
                <Text style={ styles.p }>
                    RSVP-ing to an event will add it to the list of events you are planning to attend and will allow us
                    to notify you if the venue updates the event.
                </Text>
            </HeaderView>
            <Separator { ...props }/>
            <Button
                { ...props }
                onPress={ () => close( { rsvpTime, addToCalendar: true } ) }
            >RSVP + add to calendar</Button>
            <Separator { ...props }/>
            <Button
                { ...props }
                bottom={ true }
                onPress={ () => close( { rsvpTime, addToCalendar: false } ) }
            >RSVP</Button>

        </Fragment>
    );
};

export default ( { eventSummary, rsvpTime } ) => (
    {
        sheetView: ConfirmRSVPTimeActionSheet,
        eventSummary,
        rsvpTime
    }
);
