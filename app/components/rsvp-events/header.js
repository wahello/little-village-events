import ScopeSelector from "./scope-selector";

import * as Styles from "../../styles";

import React from "react";
import { Text, View } from "react-native";


const styles = Styles.create( Styles.tabHeader, {
    root: {
        paddingBottom: 6,

        borderBottomColor: Styles.variables.borderColor,
        borderBottomWidth: Styles.variables.borderWidth,
    }
} );

const Header = ( { scope, setScope } ) => (
    <View style={ styles.root }>
        <Text style={ styles.label }>You’re going</Text>
        <ScopeSelector scope={ scope } setScope={ setScope }/>
    </View>
);


export default Header;
