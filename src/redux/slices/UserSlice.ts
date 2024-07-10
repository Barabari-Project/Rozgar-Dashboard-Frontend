import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types/user";

interface UserState {
    user: IUser | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
    },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
