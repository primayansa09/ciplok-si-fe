import { SxProps, Theme } from "@mui/material";

import { SxStyle } from "../../types/style";

const sideMenuIcon: SxStyle = { fontSize: "18px" };

const sideMenuIconCollapse: SxStyle = {
  fontSize: { xs: "14px", sm: "18px" },
};

const manageTitleHeader: SxStyle = {
  color: "#333333",
  padding: "2px 10px",
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const manageTableContainer: SxStyle = {
  width: "100%",
  overflow: "hidden",
  borderRadius: 2,
  border: 1,
  color: "#D9D9D9",
};

const moduleTableHead: SxStyle = {
  "& th": {
    backgroundColor: "#183B4E",
    padding: "16px ",
  },
};

const manageTableRow: SxStyle = {
  borderBottom: "1px solid black",
  "&:last-child td, &:last-child th": { border: 0 },
};

const manageTableCell: SxStyle = {
  height: "20px",
  padding: "10px",
};

const manageTitleAction: SxStyle = {
  color: "black",
  fontSize: "13px",
};

const manageColorTableHead: SxStyle = {
  color: "#183B4E",
  fontWeight: "bold",
};

const manageBoldTitle: SxStyle = {
  textAlign: "center",
  color: "white",
  fontSize: "32px",
  fontWeight: "bold",
};

const buttonAdd = {
  background: "#DDA853",
  fontSize: 12,
  width: 150,
  color: "white",
  border: "none",
  padding: "10px",
  marginBottom: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  cursor: "pointer",
};

const buttonSubmit = {
  background: "#27548A",
  fontSize: 12,
  width: 150,
  color: "white",
  border: "none",
  padding: "10px",
  marginBottom: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  cursor: "pointer",
};

const buttonCancel = {
  background: "#FD1C1C",
  fontSize: 12,
  width: 150,
  color: "white",
  border: "none",
  padding: "10px",
  marginBottom: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  cursor: "pointer",
};

const manageSubTitle: SxProps<Theme> = {
  fontFamily: "Open Sans,sans-serif",
  fontSize: "14px",
  color: "#333333",
  letterSpacing: "0.12px",
};

const manageModal: SxProps<Theme> = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const header: SxStyle = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "#183B4E",
  width: "98%",
  height: "55px",
  padding: "0 16px",
  borderBottom: "1px solid #c8ced3",
  display: "flex",
  justifyContent: "center",
};

const headerContainer: SxStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "1280px",
};

const headerIcon: SxProps<Theme> = {
  width: "20px",
  height: "20px",
  objectFit: "cover",
  cursor: "pointer",
};

const headerImg: SxProps<Theme> = {
  height: "32px",
};

const headerDivider: SxProps<Theme> = {
  background: "white",
  width: "1px",
  height: "24px",
};

const headerTypography: SxProps<Theme> = {
  fontSize: "14px",
  textTransform: "uppercase",
  color: "white",
};

const headerAvatar: SxProps<Theme> = {
  cursor: "pointer",
  width: "32px",
  height: "32px",
  objectFit: "cover",
};

const footer: SxProps<Theme> = {
  width: '80%',
  height: '3%',
  // minHeight: '55px',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: "center",
  padding: '20px',
  color: 'black',
  fontFamily: '"Open Sans",sans-serif !important',
};

const fixHeader: SxProps<Theme> = {
  padding: 1,
  marginTop: 5 
}

export const layoutPrivateStyle = {
  buttonAdd,
  buttonCancel,
  buttonSubmit,
  footer,
  fixHeader,
  sideMenuIcon,
  sideMenuIconCollapse,
  manageTitleHeader,
  manageTableContainer,
  moduleTableHead,
  manageTableRow,
  manageTableCell,
  manageTitleAction,
  manageSubTitle,
  manageBoldTitle,
  manageModal,
  header,
  headerContainer,
  headerIcon,
  headerImg,
  headerDivider,
  headerTypography,
  headerAvatar,
};
