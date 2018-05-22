"use strict";

const gulp = require( "gulp" );
const transform = require( "gulp-transform" );
const rename = require( "gulp-rename" );

const svgr = require( "svgr" ).default;

const yargs = require( "yargs" );
yargs.version( false );


const svgrOptions = {
    native: true,
    viewBox: false,
    title: false,
    tabWidth: 4,
    useTabs: false,
    template
};


gulp.task( "build-icons", () => {
    return gulp.src( [ "app/components/icons/svgs/*.svg" ] )
        .pipe( transform( "utf8", buildIcon ) )
        .pipe( rename( { extname: ".js" } ) )
        .pipe( gulp.dest( "app/components/icons" ) )
    ;
} );


function buildIcon( content ) {
    return svgr( content, svgrOptions );
}


const componentsToList = components =>
    [ ...components ]
        .filter( component => component !== "Svg" )
        .map( component => component != "Path" ? component : "Path as Path_" )
        .join( ", " );


const logUnsupportedComponents = components => !components.size
    ? ""
    : `
// SVGR has dropped some elements not supported by react-native-svg: ${componentsToList( components )}
`;


function template() {
    return ( code, state ) => {
        const {
            reactNativeSvgReplacedComponents = new Set(),
            unsupportedComponents = new Set(),
        } = state;

        return `import React from 'react'
    import Svg, { ${componentsToList(
        reactNativeSvgReplacedComponents,
    )} } from 'react-native-svg';
    ${logUnsupportedComponents( unsupportedComponents )}
    // ATTN: generated by \`yarn build-icons\`, do not edit
    export default ( { fill, ...props } ) => {
        const Path = props => <Path_ fill={fill} {...props} />;
        return ${code};
    }`
    };
}
