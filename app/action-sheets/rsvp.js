import { makeInfoParts, makeTitleView, calcTitleHeight } from "./utils";

import { StyleSheet } from "react-native";

const rawStyles = {
    title: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        paddingVertical: 18,
        paddingHorizontal: 32
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
        paddingBottom: 9,
        textAlign: "center"
    },

    info: {
        fontSize: 16,
        textAlign: "center",
        paddingBottom: 3,
    },

    infoGroup: {
        paddingBottom: 6,
    },

    note: {
        fontSize: 13,
        textAlign: "center",
        color: "#8F8F8F"
    }

};

const styles = StyleSheet.create( rawStyles );


const makeConfirmRSVPTitleParts = ( eventItem ) => ( {
    name: [ `RSVP to ${eventItem.eventSummary.name}?` ],
    info: makeInfoParts( eventItem ),
    note: [ "RSVP-ing to an event will add it to the list of events you are planning to attend and will allow us to notify you if the venue updates the event." ]
} );


export const confirmRSPVActionSheet = async ( eventItem, windowWidth, callback ) => {
    const parts = makeConfirmRSVPTitleParts( eventItem );

    return {
        title: makeTitleView( parts, styles ),
        options: [
            "Cancel",
            {
                title: "RSVP + add to calendar",
                onPress: () => callback( true )
            },
            {
                title: "RSVP",
                onPress: () => callback( false )
            },
        ],
        titleHeight: await calcTitleHeight( parts, windowWidth, rawStyles ),
        cancelButtonIndex: 0,
        onPress: () => {}
    }

};

const makeRescindRSVPTitleParts = ( eventItem ) => ( {
    name: [ `Rescind RSVP to ${eventItem.eventSummary.name}?` ],
    info: makeInfoParts( eventItem ),
    note: [ "Rescinding the RSVP will remove this event from the list of events you are planning to attend. It will also remove the event from your calendar." ]
} );


export const rescindRSPVActionSheet = async ( eventItem, windowWidth, callback ) => {
    const parts = makeRescindRSVPTitleParts( eventItem );

    return {
        title: makeTitleView( parts, styles ),
        options: [
            "Cancel",
            {
                title: "Rescind RSVP",
                onPress: () => callback()
            },
        ],
        titleHeight: await calcTitleHeight( parts, windowWidth, rawStyles ),
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
        onPress: () => {}
    }

};
