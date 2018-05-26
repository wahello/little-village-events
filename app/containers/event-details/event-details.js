import state from "./event-details.state";

import EventDetails from "../../components/event-details";

import { injectState, provideState } from "../../utils/freactal";

import { compose } from "recompose";

export default compose(
    injectState,
    provideState( state ),
    injectState
)( EventDetails );
