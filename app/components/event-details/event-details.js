
import { injectState } from "@textpress/freactal";

import React from "react";
import { View, Text } from "react-native";
import { compose } from "recompose";

const EventDetails = ( { event } ) => (
    <View>
        <Text>Details for { event.name }</Text>
    </View>
);

export default compose(
    injectState
)( EventDetails );
