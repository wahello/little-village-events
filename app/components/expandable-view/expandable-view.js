import LinearGradient from "react-native-linear-gradient";

import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from "react-native";
import React, { Component } from "react";

import isNull from "lodash/isNull";


const styles = StyleSheet.create( {
    root: {
        overflow: "hidden"
    },
    footer: {
        position: "absolute",
        display: "flex",
        left: 0,
        right: 0,
        bottom: 0
    },
    button: {
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        paddingTop: 12
    },
    buttonLabel: {
        fontSize: 12,
        color: "#000",
        padding: 8
    }
} );


const Gradient = ( { children, ...props } ) =>
    <LinearGradient
        locations={[ 0, .4, 1 ]}
        colors={[ "rgba(255,255,255,0)", "rgba(255,255,255,1)", "rgba(255,255,255,1)" ]}
        {...props}
    >
        { children }
    </LinearGradient>
;


export default class extends Component {

    state = {
        contentHeight: null,
        expanded: false
    }


    _onLayout = ( { layout } ) => {
        this.setState( ( { contentHeight } ) => isNull( contentHeight )
            ? { contentHeight: layout.height }
            : {}
        );
    }


    _toggleExpand = () => {
        LayoutAnimation.configureNext( LayoutAnimation.Presets.spring );
        this.setState( ( { expanded } ) => ( { expanded: !expanded } ) );
    }


    _renderFooter = expanded => {
        const label = expanded ? "Show Less" : "Show More";
        const gradientProps = expanded
            ? { locations: [], colors: [] }
            : { style: styles.footer };

        return (
            <Gradient {...gradientProps}>
                <TouchableOpacity style={ styles.button }
                    onPress={ this._toggleExpand }
                    accessible={ true }
                    accessibilityTraits={ "button" }
                    accessibilityLabel={ label }
                >
                    <Text style={ styles.buttonLabel }>{ label.toUpperCase() }</Text>
                </TouchableOpacity>
            </Gradient>
        )
    }


    render() {
        const { children, initialMaxHeight = 200 } = this.props;
        const { contentHeight, expanded } = this.state;

        const style = isNull( contentHeight ) || expanded
            ? {}
            : { maxHeight: initialMaxHeight };

        const showFooter = ( contentHeight || 0 ) > initialMaxHeight;

        return (
            <View style={ [ styles.root, style ] }>
                <View onLayout={ ( { nativeEvent } ) => this._onLayout( nativeEvent ) } >
                    {children}
                </View>
                { showFooter ? this._renderFooter( expanded ) : null }
            </View>
        );
    }
}
