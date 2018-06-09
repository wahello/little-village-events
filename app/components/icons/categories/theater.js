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
        <Svg viewBox="0 0 38 30" {...props}>
            <Path d="M11.55 13.34l1.23-.67A3.79 3.79 0 0 0 9 10.75a7.14 7.14 0 0 0-3.29 1.9l1 1a5.63 5.63 0 0 1 2.53-1.49 2.39 2.39 0 0 1 2.31 1.18zM18.21 19H9a.7.7 0 0 0-.6.34.69.69 0 0 0 0 .68 7.26 7.26 0 0 0 3.13 3.09h.1a6.52 6.52 0 0 0 2.06.46 7.38 7.38 0 0 0 2-.46l.16-.06A7.14 7.14 0 0 0 18.83 20a.69.69 0 0 0 0-.68.7.7 0 0 0-.62-.32zm-3 2.78l-.13.05a6.65 6.65 0 0 1-1.49.37 5.41 5.41 0 0 1-1.55-.36h-.09a4.93 4.93 0 0 1-1.71-1.41h6.62a4.6 4.6 0 0 1-1.6 1.37zM18.21 10.82a3.66 3.66 0 0 0-3.8 1.92l1.23.66A2.33 2.33 0 0 1 18 12.19a5.18 5.18 0 0 1 2.51 1.48l1-.94a6.5 6.5 0 0 0-3.3-1.91z" />
            <Path d="M23.55 21.43C25.75 14.46 27 1.61 27 1.06a.69.69 0 0 0-.31-.64.7.7 0 0 0-.71 0A27.17 27.17 0 0 1 13.88 3h-.57A26.45 26.45 0 0 1 1.33.38a.69.69 0 0 0-.72 0 .71.71 0 0 0-.31.64c0 .55 1.27 13.4 3.47 20.38 1.79 5.64 4.68 8.19 9.27 8.19h.59c4.96.24 8.03-2.27 9.92-8.16zm-9.92 6.79c-4.31.19-6.86-2-8.52-7.21C3.34 15.42 2.19 5.59 1.82 2.16a27.44 27.44 0 0 0 11.52 2.28h.5A28.3 28.3 0 0 0 25.5 2.15C25.14 5.57 24 15.41 22.21 21c-1.68 5.26-4.21 7.42-8.58 7.22z" />
            <Path d="M37.67.47a.71.71 0 0 0-.73 0A23.65 23.65 0 0 1 27 3.3v1.4a25.13 25.13 0 0 0 9.44-2.41C36.1 5.78 35 15.51 33.19 21.08c-1.69 5.24-4.26 7.4-8.58 7.21a6.41 6.41 0 0 1-3.77-.9l-.68 1.22a7.65 7.65 0 0 0 4.44 1.08h.6c4.62 0 7.51-2.55 9.32-8.2 2.21-7 3.42-19.83 3.47-20.37a.7.7 0 0 0-.32-.65z" />
            <Path d="M26.8 19.48l-.15-.06a6.47 6.47 0 0 0-2-.46l-.09 1.4a5.11 5.11 0 0 1 1.56.37h.08a5.82 5.82 0 0 1 2.39 2.42l1.25-.63a7.13 7.13 0 0 0-3.04-3.04zM31.54 11a4.93 4.93 0 0 1-2.45 1.48 3.67 3.67 0 0 1-2.1-.94l-.95 1a5.06 5.06 0 0 0 3 1.33h.09c1.55 0 3.22-1.71 3.4-1.91z" />
        </Svg>
    );
};