import { AsyncStorage } from "react-native";
import jsonParser from "moment-json-parser";

export default class Storage {

    constructor( name ) {
        this._prefix = `@${name.toUpperCase()}:`;
    }

    _toKey = ( id ) => {
        return `${this._prefix}${id}`;
    };


    set( id, value ) {
        return AsyncStorage.setItem( this._toKey( id ), JSON.stringify( value ) );
    }


    async get( id ) {
        const result = await AsyncStorage.getItem( this._toKey( id ) );
        return result && JSON.parse( result );
    }

    async all() {
        const allKeys = await this._allKeys();
        return this._multiGet( allKeys );
    }


    async multiGet( ids ) {
        return this._multiGet( ids.map( this._toKey ) );
    }


    remove( id ) {
        return AsyncStorage.removeItem( this._toKey( id ) );
    }


    async clear() {
        const allKeys = await this._allKeys();
        return AsyncStorage.multiRemove( allKeys );
    }


    async _multiGet( keys ) {
        const result = await AsyncStorage.multiGet( keys );
        return ( result || [] ).map( pair => [ pair[0].substr( this._prefix.length ), jsonParser( pair[1] ) ] );
    }


    async _allKeys() {
        const allKeys = await AsyncStorage.getAllKeys();
        return allKeys.filter( key => key.startsWith( this._prefix ) );
    }
}
