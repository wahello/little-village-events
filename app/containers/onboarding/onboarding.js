import Onboarding from "app/components/onboarding";

import UserProfile from "app/models/user-profile";

import { injectState, provideState, update, mergeIntoState } from "app/utils/freactal";

import { compose } from "recompose";
import memoize from "lodash/memoize";


const startupProfile = memoize( () => UserProfile.read() );


export const showOnboardingScreen = async () =>
    ( await startupProfile() ).newUser;


const initialize = async () => {
    return mergeIntoState( {
        userProfile: await startupProfile()
    } );
};


export default compose(
    provideState( {
        initialState: () => ( {
            userProfile: {}
        } ),
        effects: {
            initialize,

            saveLocation: async ( effects, location ) => {
                const { userProfile } = await effects.updateLocation( location );
                console.log( "saveLocation", userProfile );
                await UserProfile.update( userProfile );
                return state => state;
            },

            updateLocation: update( ( { userProfile }, location ) => ( {
                userProfile: {
                    ...userProfile,
                    location
                }
            } ) )
        }
    } ),
    injectState
)( Onboarding );
