import OnboardingStart from "./onboarding-start";
import InterestsPicker from "./onboarding-interests-picker";
import InterestsIntro from "./onboarding-interests-intro";
import NotificationsIntro from "./onboarding-notifications-intro";
import LocationIntro from "./onboarding-location-intro";
import LocationPicker from "./onboarding-location-picker";

import Permissions from "react-native-permissions";

import { startMainApp } from "app/navigator";

import Swiper from "react-native-swiper";
import { StyleSheet } from "react-native";
import React, { Component } from "react";

import map from "lodash/map";


const styles = StyleSheet.create( {
    root: {
    }
} );


class OnboardingSequence extends Component {

    _swiperRef = React.createRef()

    next = () => this._swiperRef.current.scrollBy( 1 )
    skip = n => this._swiperRef.current.scrollBy( n, false )


    render() {
        const { state: { userProfile, Categories, Locations }, effects } = this.props;
        return (
            <Swiper ref={this._swiperRef}
                style={styles.root}
                loop={false}
                showsPagination={false}
            >
                <OnboardingStart onContinue={ this.next } />
                <InterestsIntro onContinue={ this.next } onSkip={ () => this.skip( 2 ) } />
                <InterestsPicker
                    categories = { Categories }
                    selected={ map( userProfile.interests, "id" ) }
                    onContinue={ selected => { effects.saveInterests( selected.map( id => ( { id } ) ) ); this.next() } }
                    onSkip={ () => this.skip( 1 ) }
                />
                <LocationIntro onContinue={ this.next } onSkip={ () => this.skip( 2 ) } />
                <LocationPicker
                    locations = { Locations }
                    selected={ userProfile.location.id }
                    onContinue={ selected => { effects.saveLocation( { id: selected } ); this.next() } }
                    onSkip={ () => this.skip( 1 ) }
                />
                <NotificationsIntro onContinue={ () => Permissions.request( "notification" ) }
                    onSkip={ startMainApp } />
            </Swiper>
        );
    }
}


export default OnboardingSequence;
