import fbjsPerformanceNow from "fbjs/lib/performanceNow";

export default ( f, { threshold = 16, verbose, name } = {} ) => {
    if ( !__DEV__ )
        return f();

    const performanceNow = global.nativePerformanceNow || fbjsPerformanceNow
    const start = performanceNow();
    const result = f();
    const timing = performanceNow() - start;
    const benchkey = f.name || name;

    if ( timing > threshold ) {
        console.warn( `slowlog: ${benchkey} was slow at: ${timing.toFixed( 3 )}ms` );
    } else if ( verbose ) {
        console.log( benchkey, timing.toFixed( 6 ) );
    }

    return result;
};
