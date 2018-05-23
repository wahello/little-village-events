import React from "react";
import Svg, { Path as Path_ } from "react-native-svg";
import { StyleSheet } from "react-native";
import omit from "lodash/omit";

// ATTN: generated by `yarn build-icons`, do not edit
export default ({ style = {}, color, ...rest }) => {
    const flattenedStyle = StyleSheet.flatten(style);
    const Path = props => (
        <Path_ fill={color || flattenedStyle.color} {...props} />
    );
    const props = { style: omit(flattenedStyle, ["color"]), ...rest };
    return (
        <Svg viewBox="0 0 24 24" {...props}>
            <Path d="M19.1 9.7h-1.2v-4A5.81 5.81 0 0 0 12 0a5.81 5.81 0 0 0-5.9 5.7v4H4.9A2.35 2.35 0 0 0 2.5 12v9.7A2.41 2.41 0 0 0 4.9 24H19a2.35 2.35 0 0 0 2.4-2.3V12a2.26 2.26 0 0 0-2.3-2.3zm-3.4 0H8.3v-4A3.53 3.53 0 0 1 12 2.2a3.59 3.59 0 0 1 3.7 3.5z" />
        </Svg>
    );
};
