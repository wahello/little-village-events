import EventList from "app/components/event-list";
import state from "./event-list.state";

import { injectState, provideState } from "app/utils/freactal";

import { compose } from "recompose";

export default compose(
    injectState,
    provideState( state ),
    injectState
)( EventList );
