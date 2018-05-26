import React from "react";
import { Text } from "react-native";

const makeActionSheet = ( event, RSVPConfirmed ) => {
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

export default makeActionSheet;
