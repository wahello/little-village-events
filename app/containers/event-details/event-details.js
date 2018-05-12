import EventDetails from "../../components/event-details";

import { injectState } from "@textpress/freactal";

import { compose } from "recompose";

export default compose(
    injectState
)( EventDetails );
