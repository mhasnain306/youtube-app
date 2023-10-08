import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"}>
        <Box padding={5} bg={"lightgray"}>
          <NavBar />
        </Box>
      </GridItem>
      <GridItem area={"main"}>
        <Box padding={5}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
