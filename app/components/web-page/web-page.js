import { NextIcon, PreviousIcon, ShareIcon, SafariIcon } from "../icons";

import Bar, { UrlTitle, Button } from "./web-page.bar-parts";

import React, { Component } from "react";
import { Text, View, WebView, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    root: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
    },


    webView: {
        flex: 1
    },


    topBarPortrait: {
        paddingTop: 20
    },


    closeButtonLabel: {
        marginHorizontal: 6,

        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#ffffff",
    },


    bottomBarButton: {
        flex: 1
    }


} );


class WebPage extends Component {

    static id = "events.webPage";

    static navigatorStyle = {
        navBarHidden: true
    };

    state = {
        canGoBack: false,
        canGoForward: false,
        title: "",
        url: "",
        loading: false
    };

    constructor( props ) {
        super( props );
        const { state } = this.props;

        state.navigator.setOnNavigatorEvent( this.onNavigatorEvent );

        this._webView = null;
    }


    onNavigatorEvent = ( event ) => {
        switch ( event.type ) {
            case "NavBarButtonPress": {
                switch ( event.id ) {
                    case "refresh":
                        this.refresh()
                }
                break;
            }
        }
    };

    onReload = () => {
        this._webView && this._webView.reload();
    };


    onCancel = () => {
        if ( !this._webView )
            return;
        this._webView.stopLoading();
        this.setState( { loading: false } );
    };


    goBack = () => {
        this._webView && this._webView.goBack();
    };


    goForward = () => {
        this._webView && this._webView.goForward();
    };


    share = () => {
        const { effects } = this.props;
        const { title, url } = this.state;
        return effects.share( { title, message: title, url }, { subtitle: title } );
    };


    openInBrowser = () => {
        const { effects } = this.props;
        return effects.openExternalURL( this.state.url );
    };


    onLoadStart = ( { nativeEvent } ) => {
        this._updateState( nativeEvent, true );
    };


    onLoad = ( { nativeEvent } ) => {
        this._updateState( nativeEvent, false );
    };


    onError = ( { nativeEvent } ) => {
        this._updateState( nativeEvent, false );
    };


    onClose = () => {
        const { effects, screenInstanceID } = this.props;
        effects.navigateFromWebPage( screenInstanceID );
    };


    _updateState( nativeEvent, loading ) {
        const { canGoBack, canGoForward, title, url } = nativeEvent;

        this.setState( () => ( {
            canGoBack,
            canGoForward,
            title,
            url,
            loading
        } ) );
    }

    sharedBarButtons( style ) {
        const { canGoBack, canGoForward, url } = this.state;
        return {
            left: [
                <Button key="back" style={ style } disabled={ !canGoBack } onPress={ this.goBack }><PreviousIcon/></Button>,
                <Button key="forward" style={ style } disabled={ !canGoForward } onPress={ this.goForward }><NextIcon/></Button>
            ],
            right: [
                <Button key="share" style={ style } disabled={ !url } onPress={ this.share }><ShareIcon/></Button>,
                <Button key="browser" style={ style } disabled={ !url } onPress={ this.openInBrowser }><SafariIcon/></Button>

            ]
        };
    }


    renderTopBar( landscape ) {
        const { url, loading } = this.state;

        const sharedBarButtons = landscape ? this.sharedBarButtons() : { left: [], right: [] };

        const action = loading
            ? { onPress: this.onCancel, image: PreviousIcon }
            : { onPress: this.onReload, image: NextIcon, disabled: !url }
            ;

        return (
            <Bar style={ landscape ? null : styles.topBarPortrait } >
                <Button onPress={ this.onClose }><Text style={ styles.closeButtonLabel }>Done</Text></Button>
                { sharedBarButtons.left }
                <UrlTitle url={ url }/>
                { sharedBarButtons.right }
                <Button
                    disabled={ action.disabled }
                    onPress={ action.onPress }
                ><action.image/></Button>
            </Bar>
        );
    }


    renderBottomBar( landscape ) {
        if ( landscape )
            return null;

        const sharedBarButtons = this.sharedBarButtons( styles.bottomBarButton );

        return (
            <Bar>
                { sharedBarButtons.left }
                { sharedBarButtons.right }
            </Bar>
        );
    }


    render() {
        const { screenDimensions } = this.props.state;
        const landscape = screenDimensions.width > screenDimensions.height;


        return (
            <View style={ styles.root }>
                { this.renderTopBar( landscape ) }
                <WebView
                    style={ styles.webView }
                    ref={ webView => this._webView = webView }
                    source={ this.props.source }
                    onLoadStart={ this.onLoadStart }
                    onLoad={ this.onLoad }
                    onError={ this.onError }
                    renderLoading={ () => null }
                />
                { this.renderBottomBar( landscape ) }
            </View>
        );
    }

}

export default WebPage;
