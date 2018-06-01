import StatusBarHeight from "@expo/status-bar-height";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { View, LayoutAnimation } from "react-native";
import React, { Component } from "react";


export default class extends Component {

    state = {
        height: getStatusBarHeight()
    }


    componentDidMount() {
        this.syncHeight();
        StatusBarHeight.addEventListener( this.onStatusBarHeightChanged );
    }


    componentWillUnmount() {
        StatusBarHeight.removeEventListener( this.onStatusBarHeightChanged );
    }


    syncHeight = async () => {
        const height = await StatusBarHeight.getAsync();
        this.setState( { height } );
    }


    onStatusBarHeightChanged = height => {
        this.setState( { height } );
    }


    getSnapshotBeforeUpdate( prevProps, prevState ) {
        if ( this.state.height !== prevState.height )
            LayoutAnimation.easeInEaseOut();

        return null;
    }


    componentDidUpdate() {
        // supress React warning about getSnapshotBeforeUpdate requiring
        // componentDidUpdate
    }


    render() {
        const { style } = this.props;
        return (
            <View style={ [ style, { paddingTop: this.state.height } ] } />
        );
    }
};
