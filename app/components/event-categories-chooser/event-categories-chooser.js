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
        // height: 56,
        paddingTop: 1
    },
    label: {
        fontSize: variables.regularFontSize,
        color: "#000",
    },
    selectedLabel: {
        color: variables.highlightColor,
        fontWeight: "500"
    },
    icon: {
        height: 28,
        width: 80,
        opacity: .6
    },
    selectedIcon: {
        color: variables.highlightColor,
        opacity: 1
    },
    checkmark: {
        position: "absolute",
        right: 22
    },
    separator: {
        marginLeft: 75,
        marginRight: 10,
    }
} );


const CategoryItem = ( { icon: Icon, label, selected, ...props } ) =>
    <TouchableButton style={styles.item} {...props}>
        <Icon style={[ styles.icon, selected ? styles.selectedIcon : null ]} />
        <Text style={[ styles.label, selected ? styles.selectedLabel : null ]}>{label.toUpperCase()}</Text>
        <RoundCheckmark style={styles.checkmark} checked={selected} />
    </TouchableButton>
;


const EventCategoriesChooser = ( { state, effects, onChange, style, ...props } ) =>
    <View style={ [ styles.root, style ] } {...props}>
        { [ ...state.categories.entries() ].map( ( [ id, { name, icon } ] ) =>
            <Fragment key={id}>
                <CategoryItem
                    icon={ icon() }
                    label={name}
                    selected={ state.selected.has( id ) }
                    onPress={ () => effects.toggleItem( id, onChange ) }
                />
                <Hr style={ styles.separator } />
            </Fragment>
        ) }
    </View>
;


export default compose(
    provideState( {
        initialState: ( { categories, selected } ) => ( {
            categories,
            selected: new Set( selected )
        } ),
        effects: {
            toggleItem: update( ( { selected }, id, onChange ) => {
                if ( selected.has( id ) )
                    selected.delete( id );
                else
                    selected.add( id );

                onChange && onChange( Array.from( selected ) );
                return { selected: new Set( selected ) };
            } )
        }
    } ),
    injectState
)( EventCategoriesChooser );
