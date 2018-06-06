import UpcomingEventList from "..";

import { addToDate, dayStart } from "../../../utils/date";

import navigatorStyleDecorator from "../../../../.storybook/decorators/navigator-style";
import casual from "../../../../.storybook/casual";

import { injectState, provideState } from "../../../utils/freactal";

import * as Styles from "../../../styles";

import { storiesOf } from "@storybook/react-native";

import React from "react";
import { View } from "react-native";
import { compose } from "recompose";

import moment from "moment";
import _reduce from "lodash/reduce";

const styles = Styles.create( Styles.screen, {
    root: {
        backgroundColor: Styles.variables.bodyBackgroundColor
    },
    fakeHeader: {
        height: 40,
        backgroundColor: "gray"
    }

} );

const ScreenWrapper = ( props ) => (
    <View style={ styles.root }>
        <View style={ styles.fakeHeader }/>
        <UpcomingEventList { ...props } />
    </View>
);


const generateEventList = quantity => {
    const today = moment();
    const events = casual.events( quantity, "future" );

    const eventsByDates = events.reduce( ( result, event, index ) => {
        if ( index === 0 ) {
            event.showAsFeatured = true;
            event.startTime = addToDate( today, { minutes: 1 } );
        }

        const date = dayStart( event.startTime ).toISOString();
        if ( !result[ date ] )
            result[ date ] = [];
        result[ date ].push( event );
        return result;
    }, {} );

    return _reduce( eventsByDates, ( result, data, date ) => {
        result.push( {
            today,
            date: moment( date ),
            data
        } );
        return result;
    }, [] )
};

const ScreenProvider = ( { quantity = 30 } = {} ) => {

    const Screen = compose(
        provideState( {
            initialState: () => ( {
                eventList: generateEventList( quantity )
            } )
        } ),
        injectState
    )( ScreenWrapper );
    return () => <Screen/>;
};

storiesOf( "UpcomingEventList", module )
    .addDecorator( navigatorStyleDecorator( { style: "navBarHiddenLight" } ) )
    .add( "default", ScreenProvider() )
    .add( "empty", ScreenProvider( { quantity: 0 } ) )
;
