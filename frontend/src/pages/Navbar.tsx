import {
  AppBar,
  Box,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { H2 } from "components/Typography";
import { TitleContext } from "contexts/TitleContext";
import { FC, useContext } from "react";
import LanguagePopover from "../popovers/LanguagePopover";
import NotificationsPopover from "../popovers/NotificationsPopover";
import ProfilePopover from "../popovers/ProfilePopover";
import ServicePopover from "../popovers/ServicePopover";

// root component interface


// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const ToggleIcon = styled(Box)(({ theme }:any) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: theme.palette.primary.main,
}));

// root component
const DashboardNavbar: FC = (
) => {
  const { name } = useContext(TitleContext);
  
  

  

  return (
    <DashboardNavbarRoot position="sticky">
      <StyledToolBar sx={{ml:'3vw'}}>
        <Box>
          <ToggleIcon />
          <ToggleIcon />
          <ToggleIcon />
        </Box>

        <H2
        sx={{ml:'1vw'}}
          fontSize={21}
          lineHeight={0}
          mx={1}
          fontWeight="700"
          color="text.primary"
        >
          {name}
        </H2>

        {/* <Box flexGrow={1} mr={0} /> */}

        <Box flexGrow={0.8}/>
        <>
            <LanguagePopover />
            <NotificationsPopover />
            <ServicePopover />
        </>
          
        <Box>

        <ProfilePopover />
        </Box>
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;
