import { Avatar, Flex, Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  InstagramLogo,
  InstagramMobileLogo,
  SearchLogo,
  NotificationsLogo,
  CreatePostLogo,
} from "../../assets/contants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

const SidebarItems = [
  { icon: <AiFillHome size={25} />, text: "Home", link: "/" },
  { icon: <SearchLogo />, text: "Search" },
  { icon: <NotificationsLogo />, text: "Notifications" },
  { icon: <CreatePostLogo />, text: "Create" },
  { icon: <SearchLogo />, text: "Search", link: "/" },
  {
    icon: <Avatar size={"sm"} name="Burak Orknez" src="/profilepic.png" />,
    text: "Profile",
    link: "/asaprogrammer",
  },
];

const Sidebar = () => {
  return (
    <Box
      h={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          w={{ base: 10 }}
          cursor={"pointer"}
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          {SidebarItems.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                as={RouterLink}
                to={item.link || null}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {item.icon}
                <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>
        <Tooltip
  
              hasArrow
              label={"logout"}
              placement="right"
              ml={1}
              
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                as={RouterLink}
                to={"/auth"}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                mt={"auto"}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                <BiLogOut size={25}/>
                <Box display={{ base: "none", md: "block" }}>Logout</Box>
              </Link>
            </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
