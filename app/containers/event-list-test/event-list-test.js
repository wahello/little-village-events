import { TouchableButton } from "app/components/touchable";

import _range from "lodash/range";

import React, { Component } from "react";
import { FlatList, SectionList, Text, View } from "react-native";


const Header = ( { section: { title } } ) => (
    <Text>Header { title }</Text>
);

const Item = ( { item } ) => {
    console.log( `Rendering ${item.title}` );
    return (
        <Text key={ item.key }>    item { item.title }</Text>
    );
};

class Content extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            expanded: false,
            items: _range( 20 ).map( i => ( { key: `${i}`, title: `${ this.props.item.data }-${i}` } ) )
        };
    }

    render() {
        return (
            <View>
                <FlatList
                    data={ this.state.expanded ? this.state.items : this.state.items.slice( 0, 5 ) }
                    renderItem={ Item }
                />
                <TouchableButton onPress={ () => this.setState( { expanded: !this.state.expanded } ) }>
                    <Text>    { this.state.expanded ? "SHOW LESS" : "SHOW MORE" }</Text>
                </TouchableButton>
            </View>
        );
    }
}


const EventListTest = () => {
    const sections = _range( 20 ).map( i => ( {
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
