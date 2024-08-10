import SidebarHome from "./SidebarHome";
import SidebarSearch from "./SidebarSearch";
import SidebarNotifications from "./SidebarNotifications";
import SidebarCreatePost from "./SidebarCreatepost";
import SidebarProfile from "./SidebarProfile";

const SidebarItems = () => {
  return (
    <>
      <SidebarHome />
      <SidebarSearch />
      <SidebarNotifications />
      <SidebarCreatePost />
      <SidebarProfile />
    </>
  );
};

export default SidebarItems;
