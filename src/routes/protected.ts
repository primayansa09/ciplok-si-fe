import { ManageMajelis } from "../pages/dataMajelis/ManageMajelis";
import {ManageJemaat} from "../pages/dataJemaat/ManageDataJemaat";
import { DetailApproval } from "../pages/approval/DetailApproval";
import { Login } from "../pages/login/login";
import { Route } from "../types/route";
import { ManageKriteriadanSubKriteria } from "../pages/kriteria-dans-subkriteria/ManageKriteriadanSubKriteria";

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
    key: "manage-jemaat",
    title: "Jemaat",
    description: "Jemaat",
    component: ManageJemaat,
    path: "/manage-jemaat",
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
  {
    key: "manage-kriteria-sub-krtiteria",
    title: "Manage Kriteria dan Sub Kriteria",
    description: "Manage Kriteria dan Sub Kriteria",
    component: ManageKriteriadanSubKriteria,
    path: "/kriteria-sub-kriteria/manage-data",
    isEnabled: true,
    appendDivider: true,
  },
];
