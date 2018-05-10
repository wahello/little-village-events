import React from "react";
import { View } from "react-native";


const themes = {
    "default": "#eaeaea",
    "black": "#000000"
};


const containerStyle = ( { backgroundColor } ) => ( {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor
} );


const ComponentHost = ( { story, ...props } ) =>
    <View style={ containerStyle( props ) }>
        {story()}
    </View>
;


export default function layout( { theme = "default", ...options } = {} ) {
    const props = {
        backgroundColor: themes[theme] || themes.default,
        ...options
    };

    return ( story ) => {
        return <ComponentHost story={story} {...props} />;
    };
}
