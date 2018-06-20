import EventList from "app/components/event-list";
import state from "./discover-events.state";

import { injectState, provideState } from "../../utils/freactal";

import { compose } from "recompose";

export default compose(
    injectState,
    provideState( state ),
    injectState
)( EventList );
