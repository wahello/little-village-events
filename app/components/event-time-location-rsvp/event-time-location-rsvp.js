import EventTime from "app/components/event-time";
import CheckmarkIcon from "app/components/icons/checkmark";
import * as Styles from "app/styles";

import React, { Fragment } from "react";
import { Text, View } from "react-native";

const styles = Styles.create( {

    root: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: Styles.variables.textColor
    },

    atSymbol: {
        marginLeft: 5,
        color: Styles.variables.grayTextColor
    },

    rsvpBadge: {
        flex: 0,
        height: 22,
        width: 22,
        marginLeft: 4,
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
            fontSize: Styles.variables.largeFontSize
        }

    } ),
    small: Styles.create( {
        location: {
            fontSize: Styles.variables.regularFontSize
        }

    } )

};


const EventTimeLocationRSVP = ( props ) => {
    const { eventItem, size = "small" } = props;
    const { eventSummary: { venue } } = eventItem;

    const locationStyle = [ styles.location, stylesSize[ size ].location ];

    const locationViews = venue.name
        ? (
            <Fragment>
                <Text style={ [ locationStyle, styles.atSymbol ] }>@</Text>
                <View style={ styles.locationWrapper }>
                    <Text numberOfLines={ 1 } style={ locationStyle }>
                        { venue.name }
                    </Text>
                </View>
            </Fragment>

        ) : null;

    const rsvpViews = eventItem.rsvp
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
