import { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Box, Pagination } from '@mui/material';
import { setPage } from '../redux/meal';


function AppPagination(props: any) {
  const mealsList = useAppSelector((state: RootState) => state.meal.meal.data);
  const favoriteList = useAppSelector((state: RootState) => state.meal.favorites);

  const pageMeals = useAppSelector((state: RootState) => state.meal.meal.currentPage);
  const pageFavorite = useAppSelector((state: RootState) => state.meal.meal.currentPage);

  const page = props.type === 'meals' ? pageMeals : pageFavorite;
  const displayList = props.type === 'meals' ? mealsList : favoriteList;

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value - 1));
  };
  
  return (
    <Box justifyContent={'center'} alignItems="center" display={'flex'} sx={{ margin: '20px 0px' }}>
      <Pagination count={displayList.length} onChange={handleChange} defaultPage={page ? page : 1} />
    </Box>
  );
}

export default AppPagination;
