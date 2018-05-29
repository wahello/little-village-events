import React from "react";
import { Text } from "react-native";

export const confirmRSPVActionSheet = ( event, RSVPConfirmed ) => {
    return {
        title: "Confirm RSVP",//( <Text>Confirm RSVP</Text> ),
        options: [
            "Cancel",
            {
                title: "RSVP + add to calendar",
                onPress: () => RSVPConfirmed( event, true )
            },
            {
                title: "RSVP",
                onPress: () => RSVPConfirmed( event, false )
            },
        ],
        cancelButtonIndex: 0,
        onPress: () => {}
    }

};

export const rescindRSPVActionSheet = ( event, RSVPRescinded ) => {
    return {
        title: "Rescind RSVP",//( <Text>Confirm RSVP</Text> ),
        options: [
            "Cancel",
            {
                title: "Rescind RSVP",
                onPress: () => RSVPRescinded( event, true )
            },
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
        onPress: () => {}
    }

};
