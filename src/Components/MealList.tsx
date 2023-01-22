import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Box } from '@mui/material';
import MealCard from './MealCard';
import EmptySpace from './EmptySpace';
import AppPagination from './Pagination';

const MealList = (props: any) => {
  const mealsList = useAppSelector((state: RootState) => state.meal.meal.data);
  const favoriteList = useAppSelector((state: RootState) => state.meal.favorites.data);

  const pageMeals = useAppSelector((state: RootState) => state.meal.meal.currentPage);
  const pageFavorite = useAppSelector((state: RootState) => state.meal.meal.currentPage);

  const page = props.list === 'meals' ? pageMeals : pageFavorite;
  const displayList = props.list === 'meals' ? mealsList : favoriteList;

  return (
    <>
      {displayList === null || displayList.length === 0 ? (
        <EmptySpace type={props.list} />
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(5, 1fr)',
              },
            }}
          >
            {displayList[page].map((meal: any, index: any) => (
              <MealCard key={index} meal={meal} type={props.list} />
            ))}
          </Box>
          <AppPagination type={props.list}/>
        </>
      )}
    </>
  );
};

export default MealList;
