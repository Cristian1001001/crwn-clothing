import {UserActionTypess} from "./user.types";

export const setCurrentUser = user => ({
    type: UserActionTypess.SET_CURRENT_USER,
    payload: user
})