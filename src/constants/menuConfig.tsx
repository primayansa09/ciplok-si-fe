import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from '@mui/icons-material/Feed';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { JSX } from "react";
import { layoutPrivateStyle } from "../style/layout/private-route";

export interface ListItem {
  name: string;
  icon: JSX.Element;
  link: string;
  key: string;
  collapseList?: ListItem[];
}

export const sidebarMenu: ListItem[] = [
  {
    name: "Master Data",
    icon: <InventoryIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
    link: "/master-data",
    key: "Master Data",
    collapseList: [
      {
        name: "Data Majelis",
        icon: <InventoryIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }}/>,
        link: "/master-data/data-majelis",
        key: "Data Majelis",
      },
      {
        name: "Data Peminjam",
        icon: <InventoryIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
        link: "/master-data/data-peminjam",
        key: "Data Peminjam",
      },
      {
        name: "Data Kegiatan",
        icon: <InventoryIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
        link: "/master-data/data-kegiatan",
        key: "Data Kegiatan",
      },
      {
        name: "Data Ruangan",
        icon: <InventoryIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
        link: "/master-data/data-ruangan",
        key: "Data Ruangan",
      },
      {
        name: "Data Kriteria dan Sub Kriteria",
        icon: <InventoryIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
        link: "/kriteria-sub-kriteria",
        key: "Data Kriteria dan Sub Kriteria",
      },
    ],
  },
  {
    name: "Pinjam Ruangan",
    icon: <MeetingRoomIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
    link: "/pinjam-ruangan",
    key: "Pinjam Ruangan",
    collapseList: [
      {
        name: "Form Peminjaman",
        icon: <FeedIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
        link: "/pinjam-ruangan/form-peminjaman",
        key: "Form Peminjaman",
      },
      {
        name: "Approval",
        icon: <FactCheckIcon sx={{ ...layoutPrivateStyle.sideMenuIcon, color: "#fff" }} />,
        link: "/pinjam-ruangan/approval",
        key: "Approval",
      },
    ],
  },
];