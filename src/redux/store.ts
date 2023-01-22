import { configureStore} from '@reduxjs/toolkit';
import mealReducer from './meal';

export const store = configureStore({
  reducer: {
    meal: mealReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;



