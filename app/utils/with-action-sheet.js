import React, { Fragment } from "react";
import { provideState, injectState, mergeIntoState, update } from "./freactal";

import { ActionSheetCustom as ActionSheet } from "react-native-custom-actionsheet";

import hoistNonReactStatics from "hoist-non-react-statics";
import { compose } from "recompose";
import _omit from "lodash/omit";

const state = {
    initialState: () => ( {
        actionSheet: null
    } ),
    effects: {
        showActionSheet: async ( effects, actionSheetDef ) => {
            const actionSheet = { ...actionSheetDef };
            const actions = [];

            actionSheet.options = actionSheet.options.map( option => {
                if ( typeof option === "string" ) {
                    actions.push( null );
                    return option;
                }

                actions.push( option.onPress ? option.onPress : null );

                return option.component
                    ? _omit( option, [ "onPress" ] )
                    : option.title
                ;
            } );

            const defaultOnPress = actionSheet.onPress;
            actionSheet.onPress = async index => {
                await effects._setActionSheet( null );
                const action = actions[ index ];
                return action
                    ? action()
                    : defaultOnPress( index )
                ;
            };

            await effects._setActionSheet( actionSheet );
            return mergeIntoState( {} );
        },

        _setActionSheet: update( ( state, actionSheet ) => ( { actionSheet } ) )
    }

};

const ActionSheetWrapper = compose( injectState )(
    ( { state: { actionSheet } } ) => actionSheet ? (
        <ActionSheet
            key="action-sheet"
            ref={ ref => ref && ref.show() }
            { ...actionSheet }
        />
    ) : null
);

export default Screen => {

    const WithActionSheet = props => {
        return (
            <Fragment>
                <Screen { ...props }/>
                <ActionSheetWrapper { ...props }/>
            </Fragment>
        );
    };

    return compose(
        provideState( state )
    )( hoistNonReactStatics( WithActionSheet, Screen ) )
    ;
}
