import EventList from "../../components/event-list";
import state from "./event-list.state";

import { injectState, provideState } from "../../utils/freactal";

import { compose } from "recompose";

export default compose(
    provideState( state ),
    injectState
)( EventList );
