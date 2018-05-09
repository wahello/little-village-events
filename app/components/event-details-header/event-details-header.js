import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";


const Header = ( { height, width, uri } ) => {
    const styles = StyleSheet.create( {
        image: {
            width,
            height
        }
    } );

    return <Image style={ styles.image } source={ { uri } }/>;
};

export default Header;
