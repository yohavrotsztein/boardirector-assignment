import * as React from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material'
import { MealList } from '../Components'
import { makeStyles } from '@mui/styles';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const useStyles = makeStyles((theme?: any) => ({
  customStyleOnTab: {
    fontSize: '15px',
    color: 'green'
  },
  customStyleOnActiveTab: {
    color: 'red'
  },
  activeTab: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'pink'
  }
}))



function TabPanel(props: TabPanelProps) {

  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
          classes={{ indicator: classes.customStyleOnActiveTab }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#7C65D5",
            }
          }}>
          <Tab label={<span className={value === 0 ? classes.activeTab : classes.customStyleOnTab} style={{ color: 'black', textTransform: "none" }}>All Recipes</span>} {...a11yProps(0)} />
          <Tab label={<span className={value === 1 ? classes.activeTab : classes.customStyleOnTab} style={{ color: 'black', textTransform: "none" }}>Favorites</span>} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MealList list="meals" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MealList list="favorites" />
      </TabPanel>
    </Box>
  );
}