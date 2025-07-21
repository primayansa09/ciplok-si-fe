import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
  Toolbar,
  Box,
  IconButton,
  Stack,
  Divider,
  Typography,
  MenuItem,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarMenu, ListItem } from "../../constants/menuConfig";
import MenuIcon from "@mui/icons-material/Menu";
import { layoutPrivateStyle } from "../../style/layout/private-route";
import logo from "../../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import { Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { RootState } from "../../store";

const drawerWidth = 240;
const settings = ["Logout"];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState(false);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenu(true);
  };

  const handleClose = () => {
    setProfileMenu(false);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // Clear the Redux state
    navigate("/login");
    handleClose();
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleParentClick = (item: ListItem) => {
    if (item.collapseList && item.collapseList.length > 0) {
      setOpenCollapse(openCollapse === item.name ? null : item.name);
    } else {
      navigate(item.link);
    }
  };

  const handleChildClick = (link: string) => {
    navigate(link);
  };
  const fullName = useSelector((state: RootState) => state.auth.fullName);
  const role = useSelector((state: RootState) => state.auth.roleName)
  const jabatan = useSelector((state: RootState) => state.auth.jabatanPenatua);
  console.log(sidebarMenu)

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{ backgroundColor: "#183B4E" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2, width: "25px", height: "25px"
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ gap: { xs: "10px", sm: "16px" } }}
            >
              <Box
                component="img"
                src={logo}
                sx={layoutPrivateStyle.headerImg}
              />
              <Box sx={layoutPrivateStyle.headerDivider} />
              <Typography sx={layoutPrivateStyle.headerTypography}>
                GKI Cipinang Elok
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" alignItems="center" gap="16px">
              <Typography sx={layoutPrivateStyle.headerTypography}>Welcome, {fullName}</Typography>
              <Avatar
                src="/static/images/avatar/2.jpg"
                sx={layoutPrivateStyle.headerAvatar}
                onClick={handleOpenUserMenu}
              />
            </Stack>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(profileMenu)}
              onClose={handleClose}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") handleLogout();
                    else handleClose();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#183B4E",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon sx={{ color: "white", width: "35px", height: "35px" }} />
              ) : (
                <ChevronRightIcon sx={{ color: "white", width: "35px", height: "35px" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {sidebarMenu
              .filter((item) => {
                // Only show items based on role
                if (role === 'user') {
                  // Return only specific items for 'user' role
                  return item.key === 'Pinjam Ruangan' || item.key === 'Master Data';
                }
                // Return all items for other roles
                return true;
              })
              .map((item) => (
                <Stack key={item.key}>
                  <ListItemButton
                    onClick={() => handleParentClick(item)}
                    sx={{
                      backgroundColor:
                        location.pathname.startsWith(item.link) && !item.collapseList
                          ? '#DDA853'
                          : 'inherit',
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} sx={{ color: 'white' }} />
                    {item.collapseList ? (
                      openCollapse === item.name ? (
                        <ExpandLess sx={{ color: 'white', width: '35px', height: '35px' }} />
                      ) : (
                        <ExpandMore sx={{ color: 'white', width: '35px', height: '35px' }} />
                      )
                    ) : null}
                  </ListItemButton>
                  {item.collapseList && (
                    <Collapse in={openCollapse === item.name} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.collapseList
                          .filter((subItem) => {
                            // Show only specific subItems based on role
                            if (role === 'User') {
                              return (
                                subItem.key === 'Form Peminjaman' || subItem.key === 'Data Jemaat'
                              );
                            }
                            return true;
                          })
                          .map((subItem) => (
                            <ListItemButton
                              key={subItem.key}
                              sx={{
                                pl: 4,
                                backgroundColor:
                                  location.pathname === subItem.link ? '#DDA853' : 'inherit',
                              }}
                              onClick={() => handleChildClick(subItem.link)}
                            >
                              <ListItemIcon>{subItem.icon}</ListItemIcon>
                              <ListItemText primary={subItem.name} sx={{ color: 'white' }} />
                            </ListItemButton>
                          ))}
                      </List>
                    </Collapse>
                  )}
                </Stack>
              ))}
          </List>;
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </>
  );
};

export default Sidebar;
