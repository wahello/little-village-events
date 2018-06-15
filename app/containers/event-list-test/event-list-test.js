import { TouchableButton } from "app/components/touchable";

import _range from "lodash/range";

import React, { Component } from "react";
import { FlatList, SectionList, Text, View, StyleSheet } from "react-native";


const styles = StyleSheet.create( {
    header: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 20,
        backgroundColor: "white",
        // opacity: .8
    },
    item: {
        display: "flex",
        flexDirection: "row",
        padding: 10
    },
    thumbnail: {
        width: 50,
        height: 50,
        backgroundColor: "#ccc"
    }
} );


const Header = ( { section: { title } } ) => (
    <Text style={styles.header}>Header { title }</Text>
);



class Item extends Component {
    componentDidMount() {
        const { item } = this.props;
        console.log( `+++ Mounted ${item.title}` );
    }

    componentWillUnmount() {
        const { item } = this.props;
        console.log( `--- Unmounted ${item.title}` );
    }

    render() {
        const { item } = this.props;
        console.log( `Rendering ${item.title}` );
        return (
            <View key={ item.key } style={ styles.item } >
                <View style={ styles.thumbnail } />
                <Text >    item { item.title }</Text>
            </View>
        );

    }
}


class Content extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            expanded: false,
            items: _range( 100 ).map( i => ( { key: `${i}`, title: `${ this.props.item.data }-${i}` } ) )
        };
    }

    render() {
        return (
            <View>
                <FlatList
                    data={ this.state.expanded ? this.state.items : this.state.items.slice( 0, 5 ) }
                    renderItem={ props => <Item {...props} /> }
                />
                <TouchableButton onPress={ () => this.setState( { expanded: !this.state.expanded } ) }>
                    <Text>    { this.state.expanded ? "SHOW LESS" : "SHOW MORE" }</Text>
                </TouchableButton>
            </View>
        );
    }
}


const EventListTest = () => {
    const sections = _range( 50 ).map( i => ( {
        title: `Day ${ i + 1 }`,
        data: [ { key: `${i}`, data: i + 1 } ]
    } ) );

    return (
        <SectionList
            sections={ sections }
            renderItem={ props => <Content { ...props }/> }
            renderSectionHeader={ Header }
        />
    );


};

export default EventListTest;
