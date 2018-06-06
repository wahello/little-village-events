import UpcomingRSVPList from "../../components/upcoming-rsvp-list";
import state from "./upcoming-rsvp-list.state";

import { injectState, provideState } from "../../utils/freactal";

import { compose } from "recompose";

export default compose(
    injectState,
    provideState( state ),
    injectState
)( UpcomingRSVPList );
