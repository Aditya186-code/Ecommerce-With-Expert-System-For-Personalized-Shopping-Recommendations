import {
  Box,
  Drawer,
  List,
  ListItemButton,
  styled,
  Theme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollBar from "simplebar-react";
import { sidebarItems } from "./SidebarItem";

// root component interface


// custom styled components
const MainMenu = styled(Box)(({ theme }:any) => ({
  left: 0,
  top:0,
  width: 80,
  height: "100%",
  position: "fixed",
  boxShadow: theme.shadows[2],
  transition: "left 0.3s ease",
  zIndex: theme.zIndex.drawer + 11,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: { left: -80 },
  "& .simplebar-track.simplebar-vertical": { width: 7 },
  "& .simplebar-scrollbar:before": {
    background: theme.palette.text.primary,
  },
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  marginBottom: "1rem",
  justifyContent: "center",
  "&:hover": { backgroundColor: "transparent" },
}));

// root component
const DashboardSideBar: FC = (
 
) => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Browse Products");


  const handleActiveMainMenu = (menuItem: any) => () => {
    setActive(menuItem.name);

    navigate(menuItem.url);
   
  };

  // main menus content
  const mainSideBarContent = (
    <List sx={{ height: "100%" }}>
      <StyledListItemButton disableRipple>
        <img src="/static/pop.jpg" alt="Logo" width={31} />
      </StyledListItemButton>

      <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
        {sidebarItems.map((nav, index) => (
          <Tooltip title={nav.name} placement="right" key={index}>
            <StyledListItemButton
            
              disableRipple
              onClick={handleActiveMainMenu(nav)}
            >
              <nav.icon
                sx={{
                  color:
                    active === nav.name ? "blue" : "secondary.400",
                }}
              />
            </StyledListItemButton>
          </Tooltip>
        ))}
      </ScrollBar>
    </List>
  );

  // for mobile device
  

  return <MainMenu>{mainSideBarContent}</MainMenu>;
};

export default DashboardSideBar;
