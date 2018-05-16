import details from "./details";
import { mergeIntoState, update } from "@textpress/freactal";

import { Dimensions } from "react-native";
import call from "react-native-phone-call"

const initialState = {
    windowDimensions: Dimensions.get( "window" ),
    categories: {
        "62": "Editors' Picks",
        "63": "Music",
        "64": "Art/Exhibition",
        "65": "Theatre/Performance",
        "81": "Literature",
        "67": "Cinema",
        "68": "Foodie",
        "79": "Education",
        "80": "Community",
        "71": "Fashion",
        "66": "Drink Specials",
        "82": "Crafty",
        "83": "Family",
        "85": "Sports / Rec"
    }
};

const state = {
    initialState: () => initialState,
    effects: {
        initialize: update( ( state, { navigator } ) => ( { navigator } ) ),
        showEventDetails: ( effects, event ) => {
            return ( state ) => {
                state.navigator.push( { screen: details.id, ...details.nav, passProps: { event } } );
                return state;
            }
        },
        call: ( effects, number ) => {
            call( {
                number: number.replace( /[- ()]/g, "" ),
                prompt: true
            } );
            return mergeIntoState( {} );
        }
    }
};

export default state;
