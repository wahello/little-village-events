import config from "app/config";
import debug from "debug";


export default namespace => {
    const result = debug( namespace );
    if ( config.debug[namespace] )
        debug.enable( namespace );
    return result;
};
