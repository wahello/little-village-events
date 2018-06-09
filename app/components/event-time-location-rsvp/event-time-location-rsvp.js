import EventTime from "../event-time";
import CheckmarkIcon from "../icons/checkmark";
import * as Styles from "../../styles";

import React, { Fragment } from "react";
import { Text, View } from "react-native";

const styles = Styles.create( {

    root: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2
    },

    timeAndLocation: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    locationWrapper: {
        flex: 1
    },

    location: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: Styles.variables.textColor
    },

    rsvpBadge: {
        flex: 0,
        height: 22,
        width: 22,
        borderRadius: 22,
        backgroundColor: "#007aff",
        alignSelf: "flex-start"
    },

    rsvpBadgeIcon: {
        height: 22,
        width: 22,
        color: "#efeff4",
    }

} );

const stylesSize = {
    regular: Styles.create( {
        location: {
            fontSize: Styles.variables.regularFontSize
        }

    } ),
    small: Styles.create( {
        location: {
            fontSize: Styles.variables.smallFontSize
        }

    } )

};


const EventTimeLocationRSVP = ( props ) => {
    const { event, size = "small" } = props;

    const locationStyle = [ styles.location, stylesSize[ size ].location ];

    const locationViews = event.venueName
        ? (
            <Fragment>
                <Text style={ locationStyle }>@</Text>
                <View style={ styles.locationWrapper }>
                    <Text numberOfLines={ 1 } style={ locationStyle }>
                        { event.venueName }
                    </Text>
                </View>
            </Fragment>

        ) : null;

    const rsvpViews = event.rsvp
        ? (
            <View style={ styles.rsvpBadge }>
                <CheckmarkIcon style={ styles.rsvpBadgeIcon }/>
            </View>
        )
        : null
    ;

    return (
        <View style={ styles.root }>
            <View style={ styles.timeAndLocation }>
                <EventTime { ...props } size={ size }/>
                { locationViews }
            </View>
            { rsvpViews }
        </View>
    );
};

export default EventTimeLocationRSVP;
