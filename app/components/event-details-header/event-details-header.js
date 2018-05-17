import EventDetailsCategories from "../../components/event-details-categories";
import EventDetailsTitle from "../../components/event-details-title";
import EventDetailsRsvpButton from "../../components/event-details-rsvp-button";

import LinearGradient from "react-native-linear-gradient";
import { View, ImageBackground, Animated, StyleSheet } from "react-native";
import React, { Component } from "react";

const fixedHeaderHeight = 78;


const styles = StyleSheet.create( {
    titleRow: {
        position: "relative",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginLeft: 22,
        marginRight: 20,
        paddingBottom: 5,
    },
    titleColumn: {
        paddingBottom: 10,
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    backgroundGradient: {
        flex: 1
    },
    fixedHeader: {
        // backgroundColor: "rgba(255,0,0,.2)"
    }
} );


const scrollTransform = ( animatedValue, height ) => {
    const translateY = animatedValue.interpolate( {
        inputRange: [ -height, 0, height - fixedHeaderHeight ],
        outputRange: [ -height / 2, 0, 0 ],
        extrapolateRight: "clamp"
    } );

    return {
        transform: [
            { translateY }
        ]
    };
};


const categoriesOpacity = ( animatedValue, height ) => {
    const opacity = animatedValue.interpolate( {
        inputRange: [ 0, height - 150, height - 120 ],
        outputRange: [ 1, 1, 0 ],
        extrapolate: "clamp"
    } );

    return { opacity };
};


// see https://stackoverflow.com/questions/41831300/react-native-animations-translatex-and-translatey-while-scaling
const titleBlockPosition = ( scale, width ) => ( {
    transform: [
        {
            translateX: scale.interpolate( {
                inputRange: [ 0, 1 ],
                outputRange: [ -( width / 2 ) + 150, 0 ],
                extrapolate: "clamp"
            } )
        }
    ]
} )


class TitleBlock extends Component {
    state = {
        width: 0
    }

    onLayout = ( { nativeEvent } ) => {
        const { layout } = nativeEvent;
        this.setState( { width: layout.width } );
    }

    render() {
        const { event, animatedValue, height } = this.props;

        const scale = animatedValue.interpolate( {
            inputRange: [ 0, height - 125, height - 100 ],
            outputRange: [ 1, 1, .8 ],
            extrapolate: "clamp"
        } );

        return (
            <Animated.View style={ titleBlockPosition( scale, this.state.width ) }>
                <EventDetailsTitle style={ { transform: [ { scale } ] } }
                    event={ event } onLayout={ this.onLayout } />
            </Animated.View>
        );
    }
};


const Gradient = () =>
    <LinearGradient
        style={ styles.backgroundGradient }
        locations={[ 0, .25, .4, .6, 1 ]}
        colors={[ "rgba(0,0,0,.35)", "rgba(0,0,0,.1)", "rgba(0,0,0,.1)", "rgba(0,0,0,.25)", "rgba(0,0,0,.8)" ]}
    />
;


const overlayOpacity = ( animatedValue, height ) => {
    const opacity = animatedValue.interpolate( {
        inputRange: [ 0, height * .2, height - fixedHeaderHeight ],
        outputRange: [ 0, .7, 1 ],
        extrapolate: "clamp"
    } );

    return { opacity };
};

const Overlay = ( { children, height, animatedValue } ) =>
    <View>
        <Animated.View style={ [ styles.background, overlayOpacity( animatedValue, height ) ] }>
            <Gradient />
        </Animated.View>
        {children}
    </View>
;


export const Fixed = ( { event, height, animatedValue } ) =>
    <Animated.View style={ [ styles.background, styles.fixedHeader ] } ></Animated.View>;


export const Foreground = ( { event, height, animatedValue, openWeb } ) =>
    <Overlay animatedValue={animatedValue} height={height}>
        <Animated.View style={ [ styles.titleRow, { height }, scrollTransform( animatedValue, height ) ] } pointerEvents="box-none">
            <Animated.View style={ [ styles.titleColumn ] } pointerEvents="none">
                <EventDetailsCategories style={ categoriesOpacity( animatedValue, height ) } event={ event } />
                <TitleBlock event={event} animatedValue={animatedValue} height={height} />
            </Animated.View>
            <EventDetailsRsvpButton event={ event } openWeb={ openWeb } />
        </Animated.View>
    </Overlay>
;


export const Background = ( { uri } ) =>
    <ImageBackground style={ styles.background } source={ { uri } }>
        <Gradient />
    </ImageBackground>
;
