import { StyleSheet } from "react-native";

import _merge from "lodash/merge";

export default ( ...styles ) => StyleSheet.create( _merge( ...styles ) );
