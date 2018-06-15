import Storage from "../storage";
import { defaultLocation } from "app/models/locations";

//import EventEmitter from "events";


const profileKey = "default";
const initialProfile = {
    newUser: false,
    // newUser: true,
    location: defaultLocation,
    interests: []
};


class UserProfile {

    storage = new Storage( "UserProfile" );
    // events = new EventEmitter();
    //
    // addEventListener( ...args ) {
    //     return this.events.addListener( ...args );
    // }

    async read() {
        return await this.storage.get( profileKey ) || initialProfile;
    }

    async update( profile ) {
        await this.storage.set( profileKey, profile );
    }

    async reset() {
        this.update( initialProfile );
    }
};


export default new UserProfile();
