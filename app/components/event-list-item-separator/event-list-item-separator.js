import Hr from "../hr";
import * as Styles from "app/styles";

import { View } from "react-native";
import React from "react";


const styles = Styles.create( {
    root: {
        paddingLeft: 120,
        backgroundColor: Styles.variables.bodyBackgroundColor
    },
} );


export default () => <View style={ styles.root }><Hr/></View>;
