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
        <Svg viewBox="0 0 28 30" {...props}>
            <Path d="M17.07 29.7a17.63 17.63 0 0 1-4-.39 5 5 0 0 1-3.66-2.94 18.67 18.67 0 0 1-1.05-4.94l-.08-.65c0-.4-.08-.78-.15-1.15l-.17-1a34.17 34.17 0 0 0-.7-3.63 2.64 2.64 0 0 0-.48-1v.1c-.37 1-.73 7-.92 12.53a.81.81 0 0 1-.76.77 3.11 3.11 0 0 1-.57 0c-1.14 0-1.89-.14-1.89-.86 0-4.46 0-9.41-.05-10.11a19.66 19.66 0 0 0-.89-5c-.13-.35-.3-.74-.47-1.12a7.1 7.1 0 0 1-.87-4.14C.67 4.09 2.09 2.18 4.6.49A1.25 1.25 0 0 1 5.27.3a.91.91 0 0 1 .37.07 1.12 1.12 0 0 1 .74.71C7.16 3 8 4.89 8.73 6.83L10.87 12l.93 2.34c.65 1.63 1.3 3.28 2 4.89a4.91 4.91 0 0 0 1.77 2 4.43 4.43 0 0 0 1.71.43h.15a8.66 8.66 0 0 1 2.1.44c.47.19.92.4 1.36.6l.5.24c.38.19.71.35 1 .49s.88.4 1.31.58l.62.27c1 .4 1.78.78 2.51 1.13a1.19 1.19 0 0 1 .63.84 1.24 1.24 0 0 1-.16.87l-.11.16a2.87 2.87 0 0 1-1.46 1.24 20.61 20.61 0 0 1-6.11 1h-.48c-.57.15-1.31.18-2.07.18zM6.76 12.51h.35a2.66 2.66 0 0 1 1.49 2 30.42 30.42 0 0 1 .75 3.85l.17 1c.07.39.12.8.16 1.23l.08.65a17.76 17.76 0 0 0 1 4.57A3.58 3.58 0 0 0 13.4 28a16.44 16.44 0 0 0 3.67.35c.74 0 1.45 0 2-.05h.47a19.73 19.73 0 0 0 5.7-.95 1.48 1.48 0 0 0 .75-.65c-.63-.3-1.37-.63-2.23-1l-.62-.26c-.44-.19-.9-.39-1.33-.6s-.67-.31-1-.48l-.56-.36c-.42-.2-.84-.39-1.27-.57a7.12 7.12 0 0 0-1.71-.35h-.21a5.6 5.6 0 0 1-2.27-.63 6.35 6.35 0 0 1-2.31-2.64l-2-4.94-.93-2.32c-.71-1.71-1.42-3.46-2.13-5.22S5.93 3.64 5.17 1.8c-2 1.42-3.19 3-3.42 4.58a5.63 5.63 0 0 0 .72 3.35c.18.42.36.83.51 1.24a21 21 0 0 1 1 5.36C4 17.19 4 23.4 4 26h.44c.13-3.68.46-11 1-12.44a1.39 1.39 0 0 1 1.32-1.05zm-2.34 14zm21.7-.1zM5.27 1v.15z" />
            <Path d="M18.82 23.4a19.5 19.5 0 0 1-3.71-3.48 32.74 32.74 0 0 1-3.13-6c-.51-1.11-1-2.27-1.59-3.41C7 3.63 5.24 1.82 5.23 1.8l1-1c.08.08 2 1.92 5.45 9.12.56 1.14 1.09 2.32 1.6 3.45a34.47 34.47 0 0 0 2.95 5.69 18 18 0 0 0 3.41 3.19z" />
        </Svg>
    );
};
