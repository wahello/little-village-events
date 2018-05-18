import { ShareIcon, SafariIcon } from "../icons";

import BottomBar from "./web-page.bottom-bar";
import TopBar, { Button as TopBarButton } from "./web-page.top-bar";

import React, { Component } from "react";
import { View, WebView, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    root: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
    },
    webView: {
        flex: 1
    },
    actionButton: {
        width: 44
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


    renderTopBarActions() {
        const { url, loading } = this.state;
        if ( !url )
            return null;

        return loading
            ? ( <TopBarButton onPress={ this.onCancel } style={ styles.actionButton }><ShareIcon/></TopBarButton> )
            : ( <TopBarButton onPress={ this.onReload } style={ styles.actionButton }><SafariIcon/></TopBarButton> )
        ;
    }


    render() {
        const { canGoBack, canGoForward, url } = this.state;
        const { closeWebPage } = this.props.effects;

        return (
            <View style={ styles.root }>
                <TopBar
                    url={ url }
                    onClose={ closeWebPage }
                >
                    { this.renderTopBarActions() }
                </TopBar>
                <WebView
                    style={ styles.webView }
                    ref={ webView => this._webView = webView }
                    source={ this.props.source }
                    onLoadStart={ this.onLoadStart }
                    onLoad={ this.onLoad }
                    onError={ this.onError }
                    renderLoading={ () => null }
                />
                <BottomBar
                    goBack={ canGoBack ? this.goBack : null }
                    goForward={ canGoForward ? this.goForward : null }
                    share={ url ? this.share : null }
                    openInBrowser={ url ? this.openInBrowser : null }
                />
            </View>
        );


    }

}

export default WebPage;
