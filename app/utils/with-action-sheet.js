import React, { Fragment } from "react";
import { provideState, injectState, update } from "./freactal";

import { ActionSheetCustom as ActionSheet } from "react-native-custom-actionsheet";

import { compose } from "recompose";
import _omit from "lodash/omit";

const state = {
    initialState: () => ( {
        actionSheet: null,
        actionSheetRef: null
    } ),
    effects: {
        attachActionSheet: update( ( state, actionSheetRef ) => ( { actionSheetRef } ) ),

        showActionSheet: ( effects, actionSheetDef ) => {
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
            actionSheet.onPress = index => {
                const action = actions[ index ];
                return action
                    ? action()
                    : defaultOnPress( index )
                ;
            };

            return ( state ) => {
                state.actionSheetRef.show();
                return { ...state, actionSheet };
            };
        }
    }

};

export default Screen => {

    const WithActionSheet = props => {
        const { effects, state } = props;
        const { actionSheet } = state;

        return (
            <Fragment>
                <Screen { ...props }/>
                <ActionSheet
                    ref={ effects.attachActionSheet }
                    { ...( actionSheet ? actionSheet : { options: [ "Cancel" ] } ) }
                />
            </Fragment>
        );
    };

    return compose(
        provideState( state ),
        injectState
    )( WithActionSheet )
    ;
}
