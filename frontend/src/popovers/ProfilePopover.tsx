import { Badge, Box, ButtonBase, Divider, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import useAuth from "hooks/useAuth";
import { FC, Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout";
import { useSelector } from "react-redux";
import { selectUser } from "redux/userReducer";

// styled components
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor:'#cccccc'
  },
}));

const ProfilePopover: FC = () => {
  const anchorRef = useRef(null);
  const current_user=useSelector(selectUser)
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuItem = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          <UkoAvatar
            src={current_user?current_user:"/static/avatar/001-man.svg"}
            sx={{ width: 35, height: 35, ml: 5 }}
          />
        </Badge>
      </ButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center">
            <UkoAvatar
              src={current_user?current_user:"/static/avatar/001-man.svg"}
              sx={{ width: 35, height: 35 }}
            />

            <Box ml={1}>
              <H6>{user?.name}</H6>
              <Tiny display="block" fontWeight={500} color="text.disabled">
                {user?.email}
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall
            onClick={() => handleMenuItem("/dashboard/user-profile")}
          >
            Set Status
          </StyledSmall>

          <StyledSmall
            onClick={() => handleMenuItem("/dashboard/user-profile")}
          >
            Profile & Account
          </StyledSmall>

          <Divider sx={{ my: 1 }} />

          <StyledSmall
            onClick={() => {
              logout();
              toast.error("You Logged out Successfully");
            }}
          >
            Sign Out
          </StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
