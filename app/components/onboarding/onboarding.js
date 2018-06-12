import OnboardingStart from "./onboarding-start";
import InterestsPicker from "./onboarding-interests-picker";
import InterestsIntro from "./onboarding-interests-intro";
import NotificationsIntro from "./onboarding-notifications-intro";
import LocationIntro from "./onboarding-location-intro";
import LocationPicker from "./onboarding-location-picker";

import Swiper from "react-native-swiper";
import { StyleSheet } from "react-native";
import React, { Component } from "react";


const styles = StyleSheet.create( {
    root: {
    }
} );


class OnboardingSequence extends Component {

    _swiperRef = React.createRef()

    next = () => this._swiperRef.current.scrollBy( 1 )

    render() {
        return (
            <Swiper ref={this._swiperRef}
                style={styles.root}
                loop={false}
                showsPagination={false}
            >
                <OnboardingStart onContinue={ this.next } />
                <InterestsIntro onContinue={ this.next } />
                <InterestsPicker onContinue={ this.next } />
                <LocationIntro onContinue={ this.next } />
                <LocationPicker onContinue={ this.next } />
                <NotificationsIntro />
            </Swiper>
        );
    }
}


export default OnboardingSequence;
