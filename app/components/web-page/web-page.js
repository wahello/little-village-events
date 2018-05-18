import { opaque } from "../../navigator/styles";

import React, { Component } from "react";
import { WebView } from "react-native";
import URL from "url";

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
                    case "refresh": this.refresh()
                }
                break;
            }
        }
    };

    onPageLoading = () => {
        this.props.state.navigator.setTitle( { title: "" } );
    };

    onPageLoaded = ( { nativeEvent } ) => {
        const { url } = nativeEvent;
        this.props.state.navigator.setTitle( { title: urlToTitle( url ) } );
    };


    refresh() {
        if ( !this._webView )
            return;
        this._webView.reload();
    }

    render() {
        return <WebView ref={ webView => this._webView = webView } source={ this.props.source } onLoadStart={ this.onPageLoading } onLoad={ this.onPageLoaded } />
    }

}

export default WebPage;


