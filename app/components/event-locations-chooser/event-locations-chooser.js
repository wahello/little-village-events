import variables from "../../styles/variables";
import { TouchableButton } from "../../components/touchable";
import RoundCheckmark from "../../components/round-checkmark";
import Hr from "../../components/hr";

import { update, injectState, provideState } from "@textpress/freactal";

import { View, Text, StyleSheet } from "react-native";
import React, { Fragment } from "react";

import { compose } from "recompose";


const styles = StyleSheet.create( {
    root: {
        flexDirection: "column",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        paddingTop: 1,
        paddingLeft: 22
    },
    label: {
        fontSize: variables.regularFontSize,
        color: "#000",
    },
    selectedLabel: {
        color: variables.highlightColor,
        fontWeight: "500"
    },
    checkmark: {
        position: "absolute",
        right: 22
    },
    separator: {
        marginLeft: 10,
        marginRight: 10,
    }
} );


const LocationItem = ( { label, selected, ...props } ) =>
    <TouchableButton style={styles.item} {...props}>
        <Text style={[ styles.label, selected ? styles.selectedLabel : null ]}>{label.toUpperCase()}</Text>
        <RoundCheckmark style={styles.checkmark} checked={selected} />
    </TouchableButton>
;


const EventLocationsChooser = ( { state, effects, locations, onChange, style, ...props } ) =>
    <View style={ [ styles.root, style ] } {...props}>
        { [ ...locations.entries() ].map( ( [ id, { name } ] ) =>
            <Fragment key={id}>
                <LocationItem
                    label={name}
                    selected={ id === state.selected }
                    onPress={ () => effects.handleSelect( id, onChange ) }
                />
                <Hr style={ styles.separator } />
            </Fragment>
        ) }
    </View>
;


export default compose(
    provideState( {
        initialState: ( { selected } ) => ( {
            selected
        } ),
        effects: {
            handleSelect: update( ( state, selected, onChange ) => {
                onChange && onChange( selected );
                return { selected };
            } )
        }
    } ),
    injectState
)( EventLocationsChooser );
