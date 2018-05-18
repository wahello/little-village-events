import BottomBar from "./web-page.bottom-bar";

import { opaque } from "../../navigator/styles";

import React, { Component } from "react";
import { View, WebView, StyleSheet } from "react-native";
import URL from "url";

const styles = StyleSheet.create( {
    root: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
    },
    webView: {
        flex: 1
    }

} );


function urlToTitle( url ) {
    const result = [];

    if ( url ) {
        const parsedUrl = URL.parse( url );
        if ( parsedUrl.protocol === "https:" )
            result.push( "\uD83D\uDD12" );

        const hostname = parsedUrl.hostname && parsedUrl.hostname.startsWith( "www." )
            ? parsedUrl.hostname.substr( 4 )
            : parsedUrl.hostname
        ;

        result.push( hostname );
    }
    return result.join( "" );
}


class WebPage extends Component {

    static id = "events.webPage";

    static navigatorStyle = {
        ...opaque
    };

    static navigatorButtons = {
        rightButtons: [ { // buttons for the right side of the nav bar (optional)
            title: "↻", // if you want a textual button
            id: "refresh", // id of the button which will pass to your press event handler. See the section bellow for Android specific button ids
            disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
            buttonFontSize: 24, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
            buttonFontWeight: "600", // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
        } ],
    };

    state = {
        canGoBack: false,
        canGoForward: false,
        title: "",
        url: "",
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

    onPageLoading = ( { nativeEvent } ) => {
        this.updateState( nativeEvent );
    };

    onPageLoaded = ( { nativeEvent } ) => {
        this.updateState( nativeEvent );
    };

    updateState( nativeEvent ) {
        const { canGoBack, canGoForward, title, url } = nativeEvent;
        this.props.state.navigator.setTitle( { title: urlToTitle( url ) } );

        this.setState( () => ( {
            canGoBack,
            canGoForward,
            title,
            url
        } ) );
    }


    refresh() {
        this._webView && this._webView.reload();
    }

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

    render() {
        const { canGoBack, canGoForward, url } = this.state;

        return (
            <View style={ styles.root } >
                <WebView
                    style={ styles.webView }
                    ref={ webView => this._webView = webView }
                    source={ this.props.source }
                    onLoadStart={ this.onPageLoading }
                    onLoad={ this.onPageLoaded }/>
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
