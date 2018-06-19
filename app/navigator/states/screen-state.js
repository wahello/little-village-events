import { EventDetails } from "../screens";
//import WebPage from "../containers/web-page";
import { provideState, update } from "../../utils/freactal";

//import { Navigation } from "react-native-navigation";

const initialState = {
    navigator: null
};

const screenState = {
    initialState: () => ( { ...initialState } ),

    effects: {

        initialize: update( ( state, { navigator } ) => ( { navigator } ) ),


        navigateToEventDetails: async ( effects, eventItem, calendarDay ) => {
            return ( state ) => {
                state.navigator.push( {
                    screen: EventDetails.id,
                    backButtonTitle: EventDetails.backButtonTitle,
                    passProps: { eventItemId: eventItem.id, calendarDay }
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

export default provideState( screenState );
