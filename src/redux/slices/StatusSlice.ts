import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBackEndError } from '../../utils/types/error';

interface StatusState {
    loading: boolean;
    error: IBackEndError | null;
}

const initialState: StatusState = {
    loading: false,
    error: null
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<IBackEndError>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});


export const { setLoading, setError, clearError } = statusSlice.actions;
export default statusSlice.reducer;
