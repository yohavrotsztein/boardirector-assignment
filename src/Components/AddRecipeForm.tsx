
import { useState, useEffect } from 'react';
import React from 'react';
import { TextField, Button, Box, Stack, MenuItem, Snackbar } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addRecipes } from '../redux/meal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getCategories } from '../redux/meal';
import { RootState } from '../redux/store';
import * as Yup from 'yup';
import { MuiChipsInput } from 'mui-chips-input'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddRecipeForm(props) {
  const [chips, setChips] = useState([])
  const [truc, setTruc] = useState("")
  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleChange = (newChips: any) => {
    setChips(newChips)
  }
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state: RootState) => state.meal.categories)
  console.log(useAppSelector((state: RootState) => state.meal))

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);

  const CreateUserSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    mealName: Yup.string().min(3, "Minimum 3 characters").required("Required").trim(),
    imageUrl: Yup.string().min(3, "Minimum 3 characters").required("Required").trim(),
    instructions: Yup.string().min(3, "Minimum 3 characters").required("Required").trim(),
  });

  const { register, control, handleSubmit, reset } = useForm({
    resolver: yupResolver(CreateUserSchema),
  });

  const onSubmit = (data: any) => {
    // data.ingredients = chips
    console.log(chips)
    dispatch(addRecipes({
      strMeal: data.mealName,
      strCategory: data.category,
      strMealThumb: data.imageUrl,
      strInstructions: data.instructions,
      strIngredient: chips
    }))
    reset()
    setOpen(true);
    setTruc("")
    setChips([])
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 6,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '1fr 2fr' },
            }}
          >
            <Stack spacing={3}>

              <Controller
                name="mealName"
                control={control}
                render={({ fieldState: { error } }) => <TextField type="text" label="Meal name" error={!!error} helperText={error?.message} {...register("mealName")} />}
              />
              <Controller
                name="category"
                control={control}
                render={({ field, fieldState: { error } }) =>
                  <>
                    <TextField
                      select
                      fullWidth
                      defaultValue={truc}
                      label="Choose a category"
                      inputProps={register('category')}
                      error={!!error}
                      helperText={error?.message}
                    >
                      {categories?.map((category: any, key: any) => (
                        <MenuItem key={category.strCategory} value={category.strCategory}>{category.strCategory}</MenuItem>
                      ))}
                    </TextField>
                  </>
                }
              />

              <Controller
                name="imageUrl"
                control={control}
                render={({ fieldState: { error } }) => <TextField type="text" label="Image URL" error={!!error} helperText={error?.message} {...register("imageUrl")} />}
              />


              <Controller
                name="ingredients"
                control={control}
                render={({ fieldState: { error } }) => (
                  <MuiChipsInput value={chips} error={!!error}
                    helperText={error?.message} {...register("ingredients")} onChange={handleChange}
                    sx={{ display: 'block' }}
                    validate={(chipValue) => {
                      return {
                        isError: chipValue.length <= 3,
                        textError: 'the value must be at least 3 characters long'
                      }
                    }}
                  />
                )}
              />

            </Stack>
            <Controller
              name="instructions"
              control={control}
              render={({ fieldState: { error } }) => <TextField
                sx={{
                  '& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root': { height: '100%' },
                  '& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input ': { height: '100% !important' }
                }}
                style={{ height: '100% !important' }} multiline type="text" label="Instructions" error={!!error} helperText={error?.message} {...register("instructions")} />}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 'fit-content', marginLeft: "auto !important", backgroundColor: "#7C65D5", color: "white", textTransform: "none" }}
          >
            Add
          </Button>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Recipe added
          </Alert>
        </Snackbar>
      </form>
    </>
  );
}