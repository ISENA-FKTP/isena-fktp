import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useAxios from "../../../useAxios";
import TekananDarah from "./TekananDarah";
import KeadaanFisik from "./KeadaanFisik";

export default function Pengajuan() {
  const MySwal = withReactContent(Swal);
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [data, setData] = useState({
    politujuan: "",
    perawatan: "",
    jeniskunjungan: "",
    keluhan: "",
  });
  const [anestesi, setAnestesi] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axiosInstance
      .get(`/pengajuans/dokter/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedData = response.data;
        setData({
          politujuan: fetchedData.politujuan || "",
          perawatan: fetchedData.perawatan || "",
          jeniskunjungan: fetchedData.jeniskunjungan || "",
          keluhan: fetchedData.keluhan || "",
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [axiosInstance, id]);

  const handleSave = () => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan!",
      cancelButtonText: "Tidak, batalkan!",
    }).then((result) => {
      if (result.isConfirmed) {
        saveData();
      }
    });
  };

  const handleCancel = () => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan membatalkan perubahan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, batalkan!",
      cancelButtonText: "Tidak, kembali!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelData();
      }
    });
  };

  const saveData = async () => {
    try {
      await axiosInstance.post("/pelayanans", {
        poli: data.politujuan,
        perawatan: data.perawatan,
        jeniskunjungan: data.jeniskunjungan,
        keluhan: data.keluhan,
        anestesi: anestesi,
        tanggalkunjungan: startDate,
        waktukunjungan: startTime,
        pasienId: id,
      });

      MySwal.fire("Tersimpan!", "Data Anda telah disimpan.", "success");
    } catch (error) {
      MySwal.fire("Error!", error.message, "error");
    }
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  return (
    <div className="grid grid-cols-1 mx-auto gap-7 items-baseline container ">
      <div>
        <div className="h-10 w-full bg-primary-600 shadow-lg rounded-t-lg ">
          <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center py-1">
            Pengajuan
          </h1>
        </div>
        <div className=" w-full border border-primary-600 mx-18 shadow-lg rounded-b-lg">
          <form className="space-y-2 my-7 w-full mx-8 left-10 right-24 ">
            <div className="flex items-center space-x-5 mr-14">
              <label className="text-black font-secondary-Karla font-bold flex-[30%]">
                Perawatan:
              </label>
              <select
                disabled="true"
                name="Perawatan"
                value={data.perawatan}
                onChange={(e) =>
                  setData({ ...data, perawatan: e.target.value })
                }
                className="p-1 rounded-md  flex-[70%] pr-20 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Rawat Jalan">Rawat Jalan</option>
                <option value="Rawat Inap">Rawat Inap</option>
                <option value="Promotif Preventif">Promotif Preventif</option>
              </select>
            </div>
            <div className="flex items-center space-x-5 mr-14">
              <label className="text-black font-secondary-Karla font-bold flex-[30%]">
                Jenis Kunjungan
              </label>
              <select
                disabled="true"
                name="Perawatan"
                value={data.jeniskunjungan}
                onChange={(e) =>
                  setData({ ...data, jeniskunjungan: e.target.value })
                }
                className="p-1 rounded-md flex-[70%] pr-20 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Kunjungan Sakit">Kunjungan Sakit</option>
                <option value="Kunjungan Sehat">Kunjungan Sehat</option>
              </select>
            </div>
            <div className="flex items-center space-x-5 mr-14">
              <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                Poli
              </label>
              <select
                disabled="true"
                name="Poli"
                value={data.politujuan}
                onChange={(e) => setData({ ...data, poli: e.target.value })}
                className="p-1 h-9 flex-[70%] rounded-md text-left bg-white border font-medium border-black focus:outline-none"
              >
                <option value=""></option>
                <option value="Poli Umum">Poli Umum</option>
                <option value="Poli Gigi">Poli Gigi</option>
              </select>
            </div>
            <div className="flex items-center space-x-5 mr-14 ">
              <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                Tanggal Kunjungan
              </label>
              <div className="flex items-center border border-gray-300 rounded flex-[70%]">
                <AiOutlineCalendar className="text-gray-500 m-2" />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="p-2 w-full outline-none"
                  placeholderText="Pilih tanggal"
                />
              </div>
            </div>
            <div className="flex items-center space-x-5 mr-14">
              <label className=" text-black font-secondary-Karla font-bold flex-[30%]"></label>
              <div className="flex items-center border border-gray-300 rounded flex-[70%]">
                <AiOutlineClockCircle className="text-gray-500 m-2" />
                <DatePicker
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="p-2 w-full outline-none"
                  placeholderText="Pilih waktu"
                />
              </div>
            </div>
            <div className="flex items-center space-x-5 mr-14">
              <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                Keluhan
              </label>
              <input
                disabled="true"
                name="keterangan"
                value={data.keluhan}
                onChange={(e) => setData({ ...data, keluhan: e.target.value })}
                className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none flex-[70%]"
                placeholder="Keterangan......"
              />
            </div>

            <div className="flex items-center space-x-5 mr-14">
              <label className=" text-black font-secondary-Karla font-bold flex-[30%]">
                Anamnesa
              </label>
              <textarea
                name="keterangan"
                value={anestesi}
                onChange={(e) => setAnestesi(e.target.value)}
                className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none flex-[70%]"
                placeholder="Keterangan......"
                style={{ width: "51%" }}
              />
            </div>

            <div className="flex space-x-4 pt-5">
              <button
                type="button"
                className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-emerald-950"
                onClick={handleSave}
              >
                Simpan
              </button>
              <button
                type="button"
                className="bg-error-600 text-white px-4 py-1 rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Batal
              </button>
            </div>
          </form>
        </div>

        {/* Form Tekanan Darah */}
        <div className="mt-6">
          <TekananDarah />
        </div>

        {/* Form Keadaan Fisik */}
        <div className="mt-6">
          <KeadaanFisik />
        </div>
      </div>
    </div>
  );
}
