import styles from "app/action-sheets/styles";
import promisifyActionSheet from "app/action-sheets/promisify";

import { PowerActionSheetConsumer, PowerActionSheetProvider } from "react-native-power-action-sheet";
import React from "react";

import hoistNonReactStatics from "hoist-non-react-statics";

export default Screen => {

    const WithActionSheet = props => {
        return (
            <PowerActionSheetProvider styles={ styles }>
                <PowerActionSheetConsumer>
                    { openActionSheet => <Screen
                        openActionSheet={ promisifyActionSheet( openActionSheet ) } { ...props }/> }
                </PowerActionSheetConsumer>
            </PowerActionSheetProvider>
        )
    };

    return hoistNonReactStatics( WithActionSheet, Screen );
}
