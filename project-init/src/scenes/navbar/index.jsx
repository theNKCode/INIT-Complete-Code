import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Home, // Import Home icon
  Work, // Import Work icon for jobs
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import NotificationFeed from "pages/miniComponents/NotificationFeed";
import NotificationDrawer from "pages/miniComponents/NotificationDrawer";
import Messaging from "pages/miniComponents/Messaging";
import ProfilePage from "scenes/profilePage";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const { mode, neutral, background, primary } = theme.palette;
  const { light: neutralLight, dark } = neutral;
  const { default: backgroundDefault, alt } = background;
  const { light: primaryLight } = primary;

  const fullName = `${user.firstName} ${user.lastName}`;
  const firstName = user.firstName;

  const handleModeToggle = () => dispatch(setMode());
  const handleLogout = () => dispatch(setLogout());

  const handleNotificationClick = (component) => {
    setActiveComponent(component);
    setIsNotificationDrawerOpen(false);
  };

  const handleJobsClick = () => {
    navigate("/home");
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} sx={{ position: 'relative', zIndex: 1000 }}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
        >
          INIT
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <FlexBetween direction="column" alignItems="center">
            <IconButton onClick={() => navigate("/home")} sx={{ fontSize: "25px" }}>
              <Home />
            </IconButton>
            <Typography variant="caption">Home</Typography>
          </FlexBetween>
          <FlexBetween direction="column" alignItems="center">
            <IconButton onClick={() => navigate("/messaging")}>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <Typography variant="caption">Message</Typography>
          </FlexBetween>
          <FlexBetween direction="column" alignItems="center">
            <IconButton onClick={handleJobsClick}>
              <Work sx={{ fontSize: "25px" }} />
            </IconButton>
            <Typography variant="caption">Jobs</Typography>
          </FlexBetween>
          <FlexBetween direction="column" alignItems="center">
            <IconButton onClick={() => setIsNotificationDrawerOpen(true)}>
              <Notifications sx={{ fontSize: "25px" }} />
            </IconButton>
            <Typography variant="caption">Notifications</Typography>
          </FlexBetween>
          <UserMenu fullName={fullName} onLogout={handleLogout} />
          <IconButton onClick={handleModeToggle}>
            {mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <MobileMenu
          backgroundDefault={backgroundDefault}
          isNonMobileScreens={isNonMobileScreens}
          setIsMobileMenuToggled={setIsMobileMenuToggled}
          onModeToggle={handleModeToggle}
          onLogout={handleLogout}
          firstName={firstName}
          mode={mode}
          dark={dark}
        />
      )}

      {/* NOTIFICATION DRAWER */}
      <Drawer
        anchor="right"
        open={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
      >
        <Box
          sx={{
            width: "300px",
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setIsNotificationDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Typography variant="h6">Notifications</Typography>
          <NotificationFeed onNotificationClick={handleNotificationClick} />
        </Box>
      </Drawer>

      {/* COMPONENT RENDERING */}
      {activeComponent === 'messaging' && <Messaging />}
      {activeComponent === 'profile' && <ProfilePage />}
    </FlexBetween>
  );
};

const UserMenu = ({ fullName, onLogout }) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  return (
    <FormControl variant="standard" value={fullName}>
      <Select
        value={fullName}
        sx={{
          backgroundColor: neutralLight,
          width: "150px",
          borderRadius: "0.25rem",
          p: "0.25rem 1rem",
          "& .MuiSvgIcon-root": {
            pr: "0.25rem",
            width: "3rem",
          },
          "& .MuiSelect-select:focus": {
            backgroundColor: neutralLight,
          },
        }}
        input={<InputBase />}
      >
        <MenuItem value={fullName}>
          <Typography>{fullName}</Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>Log Out</MenuItem>
      </Select>
    </FormControl>
  );
};

const MobileMenu = ({
  backgroundDefault,
  isNonMobileScreens,
  setIsMobileMenuToggled,
  onModeToggle,
  onLogout,
  firstName,
  mode,
  dark,
}) => {
  const theme = useTheme();

  return (
    <Box
      position="fixed"
      right="0"
      top="0"
      height="50%"
      zIndex="10"
      maxWidth="20%"
      minWidth="10%"
      backgroundColor={backgroundDefault}
      borderRadius={isNonMobileScreens ? "0" : "10px"}
      p="1rem"
      display="flex"
      flexDirection="column"
      gap="2rem"
    >
      {/* CLOSE ICON */}
      <Box display="flex" justifyContent="flex-end" mb="1rem">
        <IconButton onClick={() => setIsMobileMenuToggled(false)}>
          <Close />
        </IconButton>
      </Box>

      {/* MENU ITEMS */}
      <FlexBetween
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="2rem"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={onModeToggle} sx={{ fontSize: "25px" }}>
            {mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Typography variant="caption">Mode</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton>
            <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <Typography variant="caption">Message</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
          </IconButton>
          <Typography variant="caption">Notifications</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton>
            <Help sx={{ fontSize: "25px" }} />
          </IconButton>
          <Typography variant="caption">Help</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={handleJobsClick}>
            <Work sx={{ fontSize: "25px" }} />
          </IconButton>
          <Typography variant="caption">Jobs</Typography>
        </Box>
        <FormControl variant="standard" value={firstName}>
          <Select
            value={firstName}
            sx={{
              backgroundColor: theme.palette.neutral.light,
              width: "90%",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: theme.palette.neutral.light,
              },
            }}
            input={<InputBase />}
          >
            <MenuItem value={firstName}>
              <Typography>{firstName}</Typography>
            </MenuItem>
            <MenuItem onClick={onLogout}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    </Box>
  );
};

export default Navbar;
