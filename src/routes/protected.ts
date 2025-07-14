import { ManageMajelis } from "../pages/dataMajelis/ManageMajelis";
import {ManagePeminjam} from "../pages/dataPeminjam/ManageDataPeminjam";
import { ManageKegiatan } from "../pages/dataKegiatan/ManageDataKegiatan";
import { ManageRuangan } from "../pages/dataRuangan/ManageRuangan";
import { ManagePeminjamanRuangan } from "../pages/formPeminjaman/ManagePeminjamanRuangan";
import { DetailApproval } from "../pages/approval/DetailApproval";
import { Login } from "../pages/login/login";
import { Route } from "../types/route";

export const protectedRoutes: Route[] = [
  {
    key: "manage-majelis",
    title: "Majelis",
    description: "Majelis",
    component: ManageMajelis,
    path: "/manage-majelis",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "manage-peminjam",
    title: "Peminjam",
    description: "Peminjam",
    component: ManagePeminjam,
    path: "/manage-majelis",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "manage-kegiatan",
    title: "Kegiatan",
    description: "Kegiatan",
    component: ManageKegiatan,
    path: "/manage-kegiatan",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "manage-ruangan",
    title: "Ruangan",
    description: "Ruangan",
    component: ManageRuangan,
    path: "/manage-ruangan",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "manage-peminjaman-ruangan",
    title: "Peminjaman Ruangan",
    description: "Peminjaman Ruangan",
    component: ManagePeminjamanRuangan,
    path: "/manage-peminjaman-ruangan",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "detail-approval",
    title: "Detail Approval",
    description: "Detail Approval",
    component: DetailApproval,
    path: "/detail-approval",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "login",
    title: "Login",
    description: "Login",
    component: Login,
    path: "/login",
    isEnabled: true,
    appendDivider: true,
  },
];
