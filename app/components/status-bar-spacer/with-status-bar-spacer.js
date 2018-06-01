import StatusBarSpacer from "./status-bar-spacer";

import hoistNonReactStatics from "hoist-non-react-statics";
import React, { Fragment } from "react";


export default Screen => hoistNonReactStatics(
    props => (
        <Fragment>
            <StatusBarSpacer />
            <Screen { ...props }/>
        </Fragment>
    ),
    Screen
);
