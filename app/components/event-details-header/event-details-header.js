import EventDetailsCategories from "../../components/event-details-categories";
import EventDetailsTitle from "../../components/event-details-title";
import EventDetailsRsvpButton from "../../components/event-details-rsvp-button";

import { Image, Animated, StyleSheet } from "react-native";
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
        bottom: 0,
        backgroundColor: "black"
    }
} );


const scrollTransform = ( animatedValue, height ) => {
    const translateY = animatedValue.interpolate( {
        inputRange: [ -height, 0, height - fixedHeaderHeight ],
        outputRange: [ height / 2, 0, -( height - fixedHeaderHeight ) ],
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


export const Content = ( { event, height, animatedValue } ) =>
    <Animated.View style={ [ styles.titleRow, { height }, scrollTransform( animatedValue, height ) ] } pointerEvents="box-none">
        <Animated.View style={ [ styles.titleColumn ] } pointerEvents="none">
            <EventDetailsCategories style={ categoriesOpacity( animatedValue, height ) } event={ event } />
            <TitleBlock event={event} animatedValue={animatedValue} height={height} />
        </Animated.View>
        <EventDetailsRsvpButton event={ event } />
    </Animated.View>
;


export const Background = ( { uri } ) =>
    <Image style={ styles.background } source={ { uri } }/>
;
