import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/SideMenu/SideBar";
import { FooterPublicRoutes } from "./components/Footer/footer";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { setTokenFromSession } from "./store/auth/authSlice";

// Pages
import { Login } from "./pages/login/login";
import { DataMajelis } from "./pages/dataMajelis/DataMajelis";
import { DataPeminjam } from "./pages/dataPeminjam/DataPeminjam";
import { DataKegiatan } from "./pages/dataKegiatan/DataKegiatan";
import { DataRuangan } from "./pages/dataRuangan/DataRuangan";
import { PeminjamanRuangan } from "./pages/formPeminjaman/PeminjamanRuangan";
import { Approval } from "./pages/approval/Approval";
import { ManageMajelis } from "./pages/dataMajelis/ManageMajelis";
import { ManagePeminjam } from "./pages/dataPeminjam/ManageDataPeminjam";
import { ManageKegiatan } from "./pages/dataKegiatan/ManageDataKegiatan";
import { ManageRuangan } from "./pages/dataRuangan/ManageRuangan";
import { ManagePeminjamanRuangan } from "./pages/formPeminjaman/ManagePeminjamanRuangan";
import { DetailApproval } from "./pages/approval/DetailApproval";
import { RequireAuth } from "./routes/RequireAuth";
import { KriteriadanSubKriteria } from "./pages/kriteria-dans-subkriteria";
import { ManageKriteriadanSubKriteria } from "./pages/kriteria-dans-subkriteria/ManageKriteriadanSubKriteria";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    dispatch(setTokenFromSession());
  }, [dispatch]);

  return (
    <div style={{ display: "flex" }}>
      {!isLoginPage && <Sidebar />}

      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <main style={{ padding: 20, flex: 1, overflowY: "auto" }}>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Route */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Navigate to="/master-data/data-majelis" replace />} />
              <Route path="/master-data/data-majelis" element={<DataMajelis />} />
              <Route path="/master-data/data-peminjam" element={<DataPeminjam />} />
              <Route path="/master-data/data-kegiatan" element={<DataKegiatan />} />
              <Route path="/master-data/data-ruangan" element={<DataRuangan />} />
              <Route path="/pinjam-ruangan/form-peminjaman" element={<PeminjamanRuangan />} />
              <Route path="/pinjam-ruangan/approval" element={<Approval />} />
              <Route path="/manage-majelis" element={<ManageMajelis />} />
              <Route path="/manage-peminjam" element={<ManagePeminjam />} />
              <Route path="/manage-kegiatan" element={<ManageKegiatan />} />
              <Route path="/manage-ruangan" element={<ManageRuangan />} />
              <Route path="/manage-peminjaman-ruangan" element={<ManagePeminjamanRuangan />} />
              <Route path="/detail-approval" element={<DetailApproval />} />
              <Route path="/kriteria-sub-kriteria" element={<KriteriadanSubKriteria />} />
              <Route path="/kriteria-sub-kriteria/manage-data" element={<ManageKriteriadanSubKriteria />} />
            </Route>

            {/* Catch all: redirect unknown routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <FooterPublicRoutes />
      </div>
    </div>
  );
}

export default App;
