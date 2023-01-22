

import { Drawer, Box, Typography, IconButton, Button, Stack, Tooltip, List, ListItem, ListItemText } from '@mui/material'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import axios from 'axios';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
}));

export const Details = (props: any) => {

  const currentCategory = useAppSelector((state: RootState) => state.meal.currentCategory);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { strMeal, strMealThumb, strCategory, strInstructions, idMeal } = props.details.meal
  // eslint-disable-next-line
  const [dense, setDense] = useState(true);
  const [details, setDetails] = useState<any>([])
  // Fetching by ID
  const getDetails = async (idMeal: number) => {
    try {
      const response = await axios.get<any>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      setDetails(response.data.meals[0])
    } catch (error) {
      console.error('error', error);
    }
  };
  useEffect(() => {


    if (isDrawerOpen === true) {
      if (strInstructions === undefined) {
        getDetails(idMeal)
      }
    }
  }, [isDrawerOpen, idMeal, strInstructions]);

  let ingredients: any = []
  const check = 'strIngredient1' in props.details.meal ? props.details.meal : details
  if (props.details.meal.strIngredient) {
    ingredients = props.details.meal.strIngredient
  } else {
    ingredients =

      Object.values(Object.fromEntries(Object.entries(check)
        .filter(([key]) => key.includes('strIngredient'))))
        .filter(e => e !== '');
  }


  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <Button onClick={() => setIsDrawerOpen(true)} style={{ backgroundColor: "#7C65D5", color: "white", textTransform: "none" }} size="small">Read More</Button>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader sx={{ position: 'fixed' }}>
          <IconButton aria-label="settings" onClick={handleDrawerClose} >
            <Box component={Icon} icon={'material-symbols:close'} />
          </IconButton>
        </DrawerHeader>


        <Box p={5} width='550px' role='presentation' >
          <Stack spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
          >
            <Box
              component="img"
              sx={{
                height: 350,
                width: 350,
                maxHeight: { xs: 300, md: 300 },
                maxWidth: { xs: 350, md: 350 },
                borderRadius: "8px"
              }}
              alt={strMealThumb}
              src={strMealThumb}
            />
            <Box sx={{ alignSelf: 'flex-start' }}>
              <Typography variant='h6' component='div'>
                {strMeal}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} >
                <Typography variant='body2' component='div'>
                  {strCategory || currentCategory}
                </Typography>
                <Tooltip title="Add to favorite">
                  <IconButton aria-label="settings">
                    <Box component={Icon} icon={'uit:favorite'} sx={{ width: '30px', height: '30px', color: '#FAE711' }} />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography variant='body1' component='div' sx={{ p: '30px 0 10px 0 ' }}>
                Ingredients:
              </Typography>
              <List dense={dense}>
                {
                  ingredients.map((ingredient: any, index: number) => (
                    <ListItem key={index} sx={{ padding: "0" }}>
                      <ListItemText sx={{ margin: "0" }}
                        primary={`\u26AC ${ingredient}`}
                      />
                    </ListItem>
                  ))}

              </List>
            </Box>
          </Stack>
          <Typography variant='body1' component='div' sx={{ p: '30px 0 10px 0 ' }}>
            Instructions
          </Typography>
          <Typography variant='body2' component='div'>
            {strInstructions}
            {details.length === 0 ? null
              : details.strInstructions
            }
          </Typography>
        </Box>

      </Drawer>
    </>
  )
}

export default Details