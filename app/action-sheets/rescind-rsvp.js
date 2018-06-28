import Header from "./components/header";

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

const RescindRSVPActionSheet = ( props ) => {
    const { styles, options, close } = props;
    const { eventSummary, rsvpTime } = options;
    return (
        <Fragment>
            <Header styles={ styles } top={ true }>
                <Text style={ styles.h1 }>
                    { `Rescind RSVP to ${eventSummary.name}?` }
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
                    Rescinding the RSVP will remove this event from the list of events you are planning to attend. It
                    will also remove the event from your calendar.
                </Text>
            </Header>
            <Separator { ...props }/>
            <Button
                { ...props }
                labelStyle={ styles.deleteButtonLabel }
                bottom={ true }
                onPress={ () => close( true ) }
            >Rescind RSVP</Button>

        </Fragment>
    );
};


export default ( { eventSummary, eventItem } ) => (
    {
        sheetView: RescindRSVPActionSheet,
        eventSummary,
        rsvpTime: { startTime: eventItem.startTime, endTime: eventItem.endTime }
    }
);
