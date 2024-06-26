import { useState, useEffect } from "react";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import { DataRekamMedis } from "../model/dataRekamMedis";
import { FormDataRekamMedis } from "../../../components/manage/formDataRekamMedis";

export default function TambahDataRekamMedis() {
  const [, setData] = useState([]);

  useEffect(() => {
    DataRekamMedis.getDataRekamMedis().then((data) => setData(data));
  }, []);

  return (
    <div className=" font-primary">
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Tambah Data Sakit Polisi"
        userName="Daden Kasandi"
        userStatus="Kepala Polisi"
        profilePicture="/logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4 pb-10 ">
        <FormDataRekamMedis />
      </main>
    </div>
  );
}
