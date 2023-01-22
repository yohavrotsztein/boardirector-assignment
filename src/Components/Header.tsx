import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { Box, FormControl, MenuItem, InputLabel, Stack, TextField, InputAdornment, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMeal, addInput, getCategories, getByCategory, currentCategory } from '../redux/meal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link } from 'react-router-dom';


const Header = () => {
    const dispatch = useAppDispatch();
    const input = useAppSelector((state: RootState) => state.meal.input);
    const categories = useAppSelector((state: RootState) => state.meal.categories);
    // eslint-disable-next-line
    const [inputText, setInputText] = useState(input);
    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
        dispatch(getByCategory(event.target.value as string));
        dispatch(currentCategory(event.target.value as string));

    };

    const inputHandler = (e: { target: { value: string } }) => {
        setInputText(e.target.value.toLowerCase());
        dispatch(getMeal(e.target.value.toLowerCase()));
        dispatch(addInput(e.target.value.toLowerCase()));
    };


    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <Box sx={{ m: 3 }}>
            <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                // justifyContent="space-between"
                sx={{ mb: 1 }}
            >
                <Box width={{ xs: '100%', sm: '20%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Pick a Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Pick a Category"
                            onChange={handleChange}
                        >
                            {categories.length === 0
                                ? null
                                : categories.map((category: any, key: any) => (
                                      <MenuItem key={category.strCategory} value={category.strCategory}>
                                          {category.strCategory}
                                      </MenuItem>
                                  ))}
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    onChange={inputHandler}
                    placeholder="Search"
                    // defaultValue={inputText}
                    sx={{ mb: 3 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Box
                                    component={Icon}
                                    icon={'eva:search-fill'}
                                    sx={{ marginLeft: '8px', width: '20px', height: '20px', color: 'text.disabled' }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    component={Link}
                    to="add-recipe"
                    style={{ marginLeft: 'auto', backgroundColor: '#7C65D5', color: 'white', textTransform: 'none' }}
                >
                    Add Recipe
                </Button>
            </Stack>
        </Box>
    );
};

export default Header;
