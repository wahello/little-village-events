import Header from "./rsvp-events.header";
import UpcomingRSVPList from "../../containers/upcoming-rsvp-list";
import PastRSVPList from "../../containers/past-rsvp-list";

import * as Styles from "../../styles";

import React from "react";
import { View } from "react-native";

const styles = Styles.create( Styles.screen );

const RSVPEvents = ( props ) => {
    const { state, effects } = props;
    return (
        <View style={ styles.root }>
            <Header upcoming={ state.upcoming } flipUpcoming={ effects.flipUpcoming }/>
            { state.upcoming
                ? <UpcomingRSVPList/>
                : <PastRSVPList/>
            }
        </View>
    );
};

export default RSVPEvents;
