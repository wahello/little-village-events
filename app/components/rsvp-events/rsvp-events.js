import Header from "./header";
import EmptyListMessage from "./empty-list-message";
import EventList from "../../containers/event-list";

import * as Styles from "../../styles";

import React from "react";
import { View } from "react-native";

const styles = Styles.create( Styles.screen );

const RSVPEvents = ( props ) => {
    const { state, effects } = props;
    return (
        <View style={ styles.root }>
            <Header scope={ state.scope } setScope={ effects.setScope }/>
            { state.events.length
                ? ( <EventList { ...props }/> )
                : ( <EmptyListMessage/> )
            }
        </View>
    );
};

export default RSVPEvents;
