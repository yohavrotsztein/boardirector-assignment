import { Header, Content } from '../Components'
import React, { useEffect} from "react";
import { Typography } from '@mui/material';

function Dashboard() {

  useEffect(() => {
    document.title = "Dashboard";  
  }, []);

  return (
    <>
    <Typography sx={{m:3}} variant="h3">Recipes</Typography>
      <Header />
      <Content />
    </>
  );
}

export default Dashboard;
