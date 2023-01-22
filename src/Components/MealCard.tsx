import { Card, Typography, CardMedia, CardContent, CardActions, CardHeader, IconButton, Box, Tooltip } from '@mui/material'
import { Icon } from '@iconify/react';
import { Details } from '../Components'
import { addFavorites, removeFavorites } from '../redux/meal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';




const MealCard = (props: any) => {
  
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector((state: RootState) => state.meal.currentCategory);
  console.log(useAppSelector((state: RootState) => state.meal.favorites))
  const handleAddFavorite = () =>{
    dispatch(addFavorites(props.meal))
  }

  const handleRemoveFavorite = () =>{
    dispatch(removeFavorites(strMeal))
  }

  const { strMeal, strMealThumb, strCategory, strInstructions } = props.meal
  return (
    <Card sx={{ maxWidth: 345,'& .css-1qvr50w-MuiTypography-root': { lineHeight:'0.8'}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={strMealThumb}
        title={strMeal}
      />
      <CardHeader
        action={
          <Tooltip title={props.type === "meals" ? "Add to favorite" : "Remove from favorite"}>
            <IconButton aria-label="settings" onClick={() => { props.type === "meals" ? handleAddFavorite() : handleRemoveFavorite() }}>
              <Box component={Icon} icon={props.type === "meals" ? 'uit:favorite' : 'uis:favorite'} sx={{ width: '30px', height: '30px', color: '#FAE711' }} />
            </IconButton>
          </Tooltip>
        }
        title={<span style={{ fontSize: "1rem",  }}>{strMeal}</span>}
        subheader={strCategory || currentCategory}
        style={{ height: "2.5em"}}
      />
      {/* {strInstructions ? */}
        <CardContent style={{
          lineHeight: '1.5em',
          height: "2em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}>
          <Typography component={'span'} variant="body2" color="text.secondary"  >
            {strInstructions || 'No description available, click on read more.'}
          </Typography>
        </CardContent>
        {/* : null} */}
      <CardActions>
        <Details details={props} />
      </CardActions>
    </Card>
  );
}

export default MealCard