import React, { Fragment } from "react";
import { compose } from "recompose";


export default function composeDecorator( ...args ) {
    function StorybookProvider( { children } ) {

        const composed = ( props ) => {
            return <Fragment>{ props.children }</Fragment>;
        };

        const Composed = compose( ...args )( composed );
        return <Composed>{ children }</Composed>;
    }

    return ( story ) => {
        return <StorybookProvider>{ story() }</StorybookProvider>;
    };
}
