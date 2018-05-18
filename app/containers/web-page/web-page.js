import WebPage from "../../components/web-page";

import { injectState } from "../../utils/freactal";

import { compose } from "recompose";

export default compose(
    injectState
)( WebPage );
