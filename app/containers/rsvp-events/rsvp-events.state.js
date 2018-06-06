import { update } from "../../utils/freactal";

export default {
    initialState: () => ( {
        upcoming: true,
    } ),
    effects: {
        flipUpcoming: update( ( { upcoming } ) => ( { upcoming: !upcoming } ) )
    }
}
