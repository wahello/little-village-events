import { format } from "app/utils/date";

import React from "react";
import { View, Text } from "react-native";

export default ( { styles, highlighted, date } ) => (
    <View style={ [ styles.date, highlighted && styles.dateHighlighted ] }>
        <Text style={ [ styles.dateLabel, highlighted && styles.dateLabelHighlighted ] }>
            { format( date, "ddd, MMM D" ).toUpperCase() }
        </Text>
    </View>
);
