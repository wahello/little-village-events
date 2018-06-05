import Title from "./event-list-featured-item.title";

import imageUriBuilder from "../../utils/image-uri-builder";

import * as Styles from "../../styles";

import React from "react";
import { Image, View } from "react-native";

import LinearGradient from "react-native-linear-gradient";

const aspectRatio = 1.85;

const styles = Styles.create( {
    root: {
        aspectRatio
    },

    imageWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
    },

    image: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        borderRadius: 5
    },

    overlay: {
        flexDirection: "column",
        justifyContent: "space-between",

        height: "100%",
        width: "100%",

        paddingHorizontal: 14,
        paddingVertical: 15,
        borderRadius: 5
    },

    badge: {
    },
} );


const Banner = ( { event, windowDimensions: { width } } ) => (
    <View style={ styles.root }>
        <View style={ styles.imageWrapper } >
            <Image style={ styles.image } source={ { uri: imageUriBuilder( event ).scale( width, Math.round( width / aspectRatio ) ) } }/>
        </View>
        <LinearGradient
            style={ styles.overlay }
            locations={[ 0, .25, .4, .6, 1 ]}
            colors={[ "rgba(0,0,0,.35)", "rgba(0,0,0,.1)", "rgba(0,0,0,.1)", "rgba(0,0,0,.25)", "rgba(0,0,0,.8)" ]}
        >
            <View style={ styles.badge }/>
            <Title event={ event }/>
        </LinearGradient>
    </View>
);

export default Banner;
