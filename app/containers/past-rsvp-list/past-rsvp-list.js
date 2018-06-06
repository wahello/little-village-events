import PastRSVPList from "../../components/past-rsvp-list";
import state from "./past-rsvp-list.state";

import { injectState, provideState } from "../../utils/freactal";

import { compose } from "recompose";

export default compose(
    injectState,
    provideState( state ),
    injectState
)( PastRSVPList );
