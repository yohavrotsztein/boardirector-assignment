import { useEffect } from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';
import AddRecipeForm from '../Components/AddRecipeForm';
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';


export default function AddRecipe() {

  useEffect(() => {
    document.title = "Add Recipe";
  }, []);

  return (
    <>

      <Button component={Link}
        to='/'
        startIcon={<Box component={Icon} icon={'material-symbols:arrow-back-ios-new'} />}
        style={{ position: "absolute", left: "10px", top: "10px", color: "black", textTransform: "none" }}>
        Back
      </Button>
      <Box sx={{ m: 3, alignItems: 'center', justifyContent: 'center', display: 'flex', height: '80vh', padding: "0 10%" }}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          display='block'
          sx={{ mb: 1 }}
        >
          <Typography sx={{ m: 3 }} variant="h4">Add Recipe</Typography>
          <AddRecipeForm />
        </Stack>
      </Box>
    </>
  )
}