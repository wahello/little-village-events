import { isInProgress } from "../event-details-date-card";
import moment from "moment";

describe( "event-details-date-card", () => {

    describe( "isInProgress", () => {
        const now = moment( "2018-05-14T14:45:14.903-05:00" );

        describe( "events without end time", () => {

            it( "returns true for events started earlier today", () => {
                expect( isInProgress( now, now ) ).toBe( true );
                expect( isInProgress( now, "2018-05-14T14:45:00.000-05:00" ) ).toBe( true );
                expect( isInProgress( now, "2018-05-14T09:00:00.000-05:00" ) ).toBe( true );
            } );

            it( "returns false for events of past days", () => {
                expect( isInProgress( now, "2018-05-13T09:00:00.000-05:00" ) ).toBe( false );
                expect( isInProgress( now, "2018-05-13T21:00:00.000-05:00" ) ).toBe( false );
            } );

            it( "returns false for future events", () => {
                expect( isInProgress( now, now.clone().add( { milliseconds: 1 } ) ) ).toBe( false );
                expect( isInProgress( now, "2018-05-15T09:00:00.000-05:00" ) ).toBe( false );
                expect( isInProgress( now, "2018-05-15T15:00:00.000-05:00" ) ).toBe( false );
            } );

        } );

        describe( "events with end time", () => {

            it( "returns true for events in progress", () => {
                expect( isInProgress( now, now, now.clone().add( { milliseconds: 1 } ) ) ).toBe( true );
                expect( isInProgress( now, "2018-05-14T09:00:00.000-05:00", "2018-05-14T18:00:00.000-05:00" ) ).toBe( true );
                expect( isInProgress( now, "2018-05-11T14:45:00.000-05:00", "2018-05-14T14:46:00.000-05:00" ) ).toBe( true );
                expect( isInProgress( now, "2018-05-14T14:45:00.000-05:00", "2018-05-17T14:46:00.000-05:00" ) ).toBe( true );
                expect( isInProgress( now, "2018-05-11T09:00:00.000-05:00", "2018-05-17T18:00:00.000-05:00" ) ).toBe( true );
            } );

            it( "returns false for past events", () => {
                expect( isInProgress( now, now.clone().subtract( { milliseconds: 1 } ), now ) ).toBe( false );
                expect( isInProgress( now, "2018-05-11T09:00:00.000-05:00", now.clone().subtract( { milliseconds: 1 } ) ) ).toBe( false );
                expect( isInProgress( now, "2018-05-11T09:00:00.000-05:00", "2018-05-13T18:00:00.000-05:00" ) ).toBe( false );
            } );

            it( "returns false for future events", () => {
                expect( isInProgress( now, now.clone().add( { milliseconds: 1 } ), now.clone().add( { minutes: 1 } ) ) ).toBe( false );
                expect( isInProgress( now, now.clone().add( { milliseconds: 1 } ), "2018-05-17T18:00:00.000-05:00" ) ).toBe( false );
                expect( isInProgress( now, "2018-05-15T09:00:00.000-05:00", "2018-05-17T18:00:00.000-05:00" ) ).toBe( false );
            } );

            it( "returns false for ongoing events not yet started today", () => {
                expect( isInProgress( now, now.clone().add( { milliseconds: 1 } ).subtract( { days: 3 } ), now.clone().add( { minutes: 1, days: 3 } ) ) ).toBe( false );
                expect( isInProgress( now, "2018-05-11T16:00:00.000-05:00", "2018-05-17T18:00:00.000-05:00" ) ).toBe( false );
            } );

            it( "returns false for ongoing events already ended today", () => {
                expect( isInProgress( now, now.clone().subtract( { milliseconds: 1, days: 3 } ), now.clone().add( { days: 3 } ) ) ).toBe( false );
                expect( isInProgress( now, "2018-05-11T09:00:00.000-05:00", "2018-05-17T12:00:00.000-05:00" ) ).toBe( false );
            } );
        } );


    } );

} );

