import { format } from "app/utils/date";

import React from "react";
import { View, Text } from "react-native";

export default ( { styles, highlighted, date } ) => (
    <View style={ [ styles.time, highlighted && styles.timeHighlighted ] }>
        <Text style={ [ styles.timeLabel, highlighted && styles.timeLabelHighlighted ] }>
            { format( date, "h:mm A" ) }
        </Text>
    </View>
);
