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
      <GridItem area={"nav"} padding={"10px 2.5rem"}>
        <Box padding={5} bg={"#000000"} color={"#ffffff"}>
          <NavBar />
        </Box>
      </GridItem>
      <GridItem area={"main"} padding={"10px 2.5rem"}>
        <Box>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
