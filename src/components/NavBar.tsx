import { HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack>
      <Heading size={"md"}>YOUTUBE APP</Heading>
      <HStack marginStart={10} spacing={5}>
        <Link to="/">Home</Link>
        <Link to="/thumbnail">Thumbnail</Link>
        <Link to="/about">About</Link>
      </HStack>
    </HStack>
  );
};

export default NavBar;
