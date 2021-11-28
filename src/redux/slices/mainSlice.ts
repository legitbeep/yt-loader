import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../store';
// import API

export interface mainState { 
    value : number;
    status : 'idle' | 'loading' | 'success' | 'error' ;
}

const initialState : mainState  = {
    value :  0,
    status : "idle"
}

// thunk
export const mainThunk = createAsyncThunk(
    'main/fetch',
    async (amount : number) => {
        const response = 0 ; // await fetchCount(amount);
        return response ; // .data;
    }
)

export const mainSlice = createSlice({
    name : 'main',
    initialState,
    reducers : {
        increment: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(mainThunk.pending, state => {
            state.status = 'loading';
        })
        builder.addCase(mainThunk.fulfilled, state => {
            state.status = 'success';
        })
        builder.addCase(mainThunk.rejected, state => {
            state.status = 'error';
        })
    }
})

export const { increment } = mainSlice.actions;
export const selectValue = (state: RootState) => state.main.value;

export const incrementIf = (amount : number): AppThunk => async (
    dispatch,
    getState
) => {
    // we can obtain state here in order to create thunk
    // this can be sync or async
    const currentVal = selectValue(getState());
    if ( currentVal % 2) // fulfills if
        dispatch(increment(amount))
}

export default mainSlice.reducer;