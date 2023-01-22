import { Box, Typography } from '@mui/material';
// import { ReactComponent as EmptyRecipes } from '../assets/search_empty.svg';
import { ReactComponent as EmptyFavorites } from '../assets/favorite_empty.svg';
import { ReactComponent as EmptyRecipes } from '../assets/recipe_empty.svg';

import { styled } from '@mui/material/styles';




export default function EmptySpace(props) {
  const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.3',
    textAlign: 'center'
  }));

  return (
    <>
      <BoxStyle>
        {props.type === "meals" ?
          <Box sx={{display: 'grid'}}>
            <EmptyRecipes />
            <Typography component={'span'}>Start typing in the input to make a search</Typography>
          </Box>
          :
          <Box sx={{display: 'grid'}}>
            <EmptyFavorites />
            <Typography component={'span'}>Add books to your wishlist in the search page</Typography>
          </Box>
        }
      </BoxStyle>
    </>
  );
}
