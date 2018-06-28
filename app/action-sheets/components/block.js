import React from "react";
import { View } from "react-native";

export default ( { styles, style, top, bottom, children } ) => (
    <View
        style={ [
            styles.control,
            top && styles.topBorder,
            bottom && styles.bottomBorder,
            style
        ] }
    >
        { children }
    </View>
)



