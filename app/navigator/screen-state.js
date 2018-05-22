import EventDetails from "../containers/event-details";
//import WebPage from "../containers/web-page";

import { update } from "@textpress/freactal";

//import { Navigation } from "react-native-navigation";

const initialState = {
    navigator: null
};

const screenState = {
    initialState: () => initialState,

    effects: {

        initialize: update( ( state, { navigator } ) => ( { navigator } ) ),


        navigateToEventDetails: async ( effects, event ) => {
            return ( state ) => {
                state.navigator.push( {
                    screen: EventDetails.id,
                    backButtonTitle: EventDetails.backButtonTitle,
                    passProps: { event }
                } );
                return state;
            }
        },


        // navigateToWebPage: async ( effects, uri ) => {
        //     return ( state ) => {
        //         state.navigator.push( { screen: WebPage.id, passProps: { source: { uri } } } );
        //         return state;
        //     }
        // },
        //
        //
        // navigateFromWebPage: async ( effects, screenInstanceId ) => {
        //     const { screenId: visibleScreenId } = await Navigation.getCurrentlyVisibleScreenId();
        //
        //     return ( state ) => {
        //         if ( visibleScreenId === screenInstanceId )
        //             state.navigator.pop();
        //
        //         return state;
        //     }
        // }

    }

};

export default screenState;
