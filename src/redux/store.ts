import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mainReducer from './slices/mainSlice';
import queueReducer from './slices/queueSlice';
export const store = configureStore({
    reducer: {
        main : mainReducer,
        queue : queueReducer,
    }
})

export type AppDispatch =  typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
