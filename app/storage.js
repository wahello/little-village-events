import { AsyncStorage } from "react-native";

export default class Storage {

    constructor( name ) {
        this._name = `@${name.toUpperCase()}`;
    }

    _toKey( id ) {
        return `${this._name}:${id}`;
    }

    set( id, value ) {
        return AsyncStorage.setItem( this._toKey( id ), JSON.stringify( value ) );
    }

    async get( id ) {
        const result = await AsyncStorage.getItem( this._toKey( id ) );
        return result && JSON.parse( result );
    }

    remove( id ) {
        return AsyncStorage.removeItem( this._toKey( id ) );
    }


}
