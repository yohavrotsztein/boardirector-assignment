import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MealState {
  meal: any;
  input: string;
  addedFavorites: any,
  favorites: any;
  categories: string[];
  addedRecipe: any;
  pagination: any;
  currentCategory: any;
}

const initialState: MealState = {
  meal: {
    currentPage: 0,
    data: [],
  },
  input: '',
  addedFavorites: [],
  favorites: {
    currentPage: 0,
    data: [],
  },
  categories: [],
  currentCategory: '',
  addedRecipe: [],
  pagination: {
    count: 0,
    from: 0,
    to: 10,
  },
};

const mealReducer = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    // ADD INPUT
    addInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },

    // CURRENT CATEGORY
    currentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },

    // ADD FAVORITES
    addFavorites: (state, action: PayloadAction<any>) => {
      state.addedFavorites.push(action.payload);
      state.favorites.data = paginateData(state.addedFavorites);
      state.favorites.currentPage = 0;
    },

    // REMOVE FAVORITES
    removeFavorites: (state, action: PayloadAction<any>) => {
      const removedFavorites = state.favorites.data.map((favorite: any) => favorite.filter((fav: any) => fav.strMeal !== action.payload));
      state.favorites.data = removedFavorites;
    },
    
    // ADD CATEGORIES
    addCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },

    // ADD RECIPES
    addRecipes: (state, action: PayloadAction<any>) => {
      state.addedRecipe.push(action.payload);
    },

    // PAGINATION
    setPage: (state, action: PayloadAction<any>) => {
      state.meal.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMeal.fulfilled, (state, action) => {
      state.meal.data = action.payload;
      state.meal.currentPage = 0;
    });
    builder.addCase(getByCategory.fulfilled, (state, action) => {
      state.meal.data = action.payload;
      state.meal.currentPage = 0;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

// ----------------------------------------------------------------------

export default mealReducer.reducer;

// Actions
export const { addInput, addFavorites, addRecipes, removeFavorites, setPage, currentCategory } = mealReducer.actions;

export const getMeal = createAsyncThunk('meal/getMeal', async (search: string) => {
  const {
    data: { meals },
  } = await axios.get<any>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);

  return paginateData(meals)
});

export const getByCategory = createAsyncThunk('meal/getByCategory', async (search: string, { getState }) => {
  const {
    data: { meals },
  } = await axios.get<any>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`);

  const state: any = getState()

  const liked = state.meal.addedRecipe.filter(function (el) { return el.strCategory === search });

  if (liked.length !== 0) {
    for (let i = 0; i < liked.length; i++) {
      meals.unshift(liked[i])
    }
  }

  return paginateData(meals)
});

export const getCategories = createAsyncThunk('meal/getCategory', async () => {
  const response = await axios.get<any>('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  return response.data.meals;
});

export const getDetails = createAsyncThunk('meal/getDetails', async (idMeal: number) => {
  const response = await axios.get<any>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  return response.data.meals;
});

const paginateData = (meals: any) => {
  const data = meals.reduce((mealsinArrays, meal, index) => {
    index % 10 === 0 || index === 0
      ? mealsinArrays.push([meal])
      : mealsinArrays[mealsinArrays.length - 1].push(meal);
    return mealsinArrays;
  }, []);
  return data;
}


