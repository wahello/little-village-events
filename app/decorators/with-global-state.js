import hoistNonReactStatics from "hoist-non-react-statics";
import { object } from "prop-types";

import React, { Component } from "react";


const contextTypes = {
    freactal: object
};


export default getStateContext => Screen => {

    class AppStateProvider extends Component {

        getChildContext() {
            return getStateContext();
        }

        render() {
            return <Screen { ...this.props }/>;
        }
    }

    AppStateProvider.childContextTypes = contextTypes;

    hoistNonReactStatics( AppStateProvider, Screen );

    return AppStateProvider;
};
