import { useState } from "react";
import Sidebar_Klinik from "../../components/klinik/sidebar_klinik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/header";
import Sidebar_Dokter from "../../components/klinik/sidebar_dokter";

const MySwal = withReactContent(Swal);

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

const saveData = () => {
  MySwal.fire("Tersimpan!", "Data Anda telah disimpan.", "success");
};

const cancelData = () => {
  MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
};

export default function Dokter() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [jenisObat, setJenisObat] = useState([""]);
  const [diagnosa, setDiagnosa] = useState([""]);

  const addJenisObat = () => {
    if (jenisObat.length < 5) {
      setJenisObat([...jenisObat, ""]);
    }
  };

  const removeJenisObat = (index) => {
    if (jenisObat.length > 1) {
      const newJenisObat = [...jenisObat];
      newJenisObat.splice(index, 1);
      setJenisObat(newJenisObat);
    }
  };
  const addDiagnosa = () => {
    if (diagnosa.length < 5) {
      setDiagnosa([...diagnosa, ""]);
    }
  };

  const removeDiagnosa = (index) => {
    if (diagnosa.length > 1) {
      const newDiagnosa = [...diagnosa];
      newDiagnosa.splice(index, 1);
      setDiagnosa(newDiagnosa);
    }
  };

  const AllergyForm = () => {
    const [selectedFood, setSelectedFood] = useState('');
  
    const handleSelectChange = (event) => {
      setSelectedFood(event.target.value);
    };
  }
  
  return (
    <>
      <div className="fixed z-50">
        <Sidebar_Dokter />
      </div>
      <Header
        title="Pendaftaran Pelayanan Pasien"
        userName="Muhamad Halimudin Nova"
        userStatus="Dokter Poli Umum"
        profilePicture="logo.png"
      />
      <div className="py-5 bg-primary-600 shadow-lg flex-none text-start rounded-lg ml-28 mr-14 mt-5">
        <h1 className="ml-10 text-white font-secondary-Karla font-bold text-xl ">
          Selamat Pagi Petugas Administrasi
        </h1>
        <h1 className="ml-10 text-white font-secondary-Karla font-medium ">
          Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
        </h1>
      </div>

      <div className="bg-primary-600 mx-auto shadow-lg flex justify-center items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="flex w-auto text-white font-primary-Poppins font-bold text-2xl ">
          PENDAFTARAN PASIEN
        </h1>
      </div>

      <div className="border border-primary-600 mx-auto shadow-lg flex items-center text-center w-[80%] rounded ml-44 py-5">
        <form className="w-full mx-8 space-y-4">
          <div className="flex justify-around">
            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Poli
              </label>
              <select
                name="Poli"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Poli Umum">Poli Umum</option>
                <option value="Poli Gigi">Poli Gigi</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Penyakit
              </label>
              <select
                name="Penyakit"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Penyakit Sedikit">Penyakit Sedikit</option>
                <option value="Penyakit Terbanyak">Penyakit Terbanyak</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Status Pasien
              </label>
              <select
                name="Status"
                className="p-1 w-32 rounded-md border border-black font-secondary-Karla font-medium text-black"
              >
                <option value=""></option>
                <option value="Polri">Polri</option>
                <option value="PNS">PNS</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Mandiri">Mandiri</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Tanggal
              </label>
              <input
                type="date"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </form>
      </div>

      <div className=" bg-primary-600 mx-auto shadow-lg flex-none items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="text-white font-primary-Poppins flex justify-center font-bold text-2xl ">
          KUNJUNGAN
        </h1>
      </div>


      {/* Form Pengajuan */}
      <div className="grid grid-cols-2 mx-auto items-baseline container mr-44">
        <div className="grid grid-cols-1 mt-7 mx-auto ml-44 gap-7 items-baseline container w-[80%]">
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
                    name="Perawatan"
                    className="p-1 rounded-md  flex-[70%] pr-20 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  >
                    <option value=""></option>
                    <option value="rawat jalan">Rawat Jalan</option>
                    <option value="rawat inap">Rawat Inap</option>
                    <option value="Promotif Preventif">
                      Promotif Preventif
                    </option>
                  </select>
                </div>
                <div className="flex items-center space-x-5 mr-14">
                  <label className="text-black font-secondary-Karla font-bold flex-[30%]">
                    Jenis Kunjungan
                  </label>
                  <select
                    name="Perawatan"
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
                  <input
                    type="text"
                    name="poli"
                    className="p-1 h-9 flex-[70%] rounded-md text-left bg-white border border-black focus:outline-none"
                    placeholder=""
                  />
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
                  <textarea
                    name="keterangan"
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


            {/* Form DIagnosa */}
            <div className="py-6">
              <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
                <h1 className="text-white font-primary-Poppins font-bold text-xl ">
                  Diagnosa
                </h1>
              </div>
              <div className=" border border-primary-600 shadow-lg rounded-b-lg">
                <form className="space-y-3 p-4 mx-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Diagnosa :
                      </label>
                      <div className="flex flex-col space-y-4 w-full">
                        {diagnosa.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 w-full">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newDiagnosa = [...diagnosa];
                                newDiagnosa[index] = e.target.value;
                                setDiagnosa(newDiagnosa);
                              }}
                              className="p-2 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500 w-full"
                              placeholder="Keterangan....."
                            />
                            <button
                              type="button"
                              onClick={() => removeDiagnosa(index)}
                              className={`bg-error-600 text-white px-3 py-1 rounded hover:bg-red-600 ${diagnosa.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                              disabled={diagnosa.length <= 1}
                            >
                              -
                            </button>
                            {index === diagnosa.length - 1 && diagnosa.length < 5 && (
                              <button
                                type="button"
                                onClick={addDiagnosa}
                                className="bg-success-600 text-white px-3 py-1 rounded hover:bg-blue-600"
                              >
                                +
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <label className="text-black font-secondary-Karla font-bold w-40">
                      Kesadaran :
                    </label>
                    <select
                      name="Kesadaran"
                      className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                    >
                      <option value=""></option>
                      <option value="Compos Mentis">Compos Mentis</option>
                      <option value="Somnolence">Somnolence</option>
                      <option value="Sopor">Sopor</option>
                      <option value="Coma">Coma</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-5">
                    <label className="text-black font-secondary-Karla font-bold w-40">
                      Suhu :
                    </label>
                    <input
                      type="text"
                      name="Suhu"
                      placeholder="C'"
                      className="p-2 h-10 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[30px] rounded hover:bg-emerald-950"
                      onClick={handleSave}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="bg-error-700 text-white px-4 py-1 my-[30px] rounded hover:bg-gray-600"
                      onClick={handleCancel}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>

            
            {/* Form Pemeriksaan */}
            <div>
              <div className="">
                <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
                  <h1 className="text-white font-primary-Poppins font-bold text-xl   ">
                    Pemeriksaan
                  </h1>
                </div>
                <div className=" border border-primary-600 shadow-lg rounded-b-lg">
                  <form className="-space-y-12 w-full ml-9 left-10 right-24 pr-20 ">
                    <div className="flex items-center space-x-6 pb-14 pt-3">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Kasus KLL
                      </label>
                      <input
                        type="checkbox"
                        name="Kasus KLL"
                        className="p-3 left-24 rounded-sm bg-white border border-black focus:outline-none "
                        placeholder="   "
                      />
                      <span className=" text-black font-bold font-secondary">
                        Kecelakaan Lalu Lintas
                      </span>
                    </div>

                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-44 ">
                        Nama Dokter :
                      </label>
                      <select
                        name="Nama Dokter"
                        className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Dr. Ira Atmi Indiyanti">
                          Dr. Ira Atmi Indiyanti
                        </option>
                        <option value="Dr. Lita Yuliati">
                          Dr. Lita Yuliati
                        </option>
                        <option value="Drg. Liem Frisca Anatasia">
                          Drg. Liem Frisca Anatasia
                        </option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-14 text-black font-secondary-Karla font-bold w-44 ">
                        Pelayanan Non Medis :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2 w-full rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className=" text-black font-secondary-Karla font-bold w-44">
                        Status Pulang :
                      </label>
                      <select
                        name="Status Pulang"
                        className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Meninggal">Meninggal</option>
                        <option value="Berobat Jalan">Berobat jalan</option>
                        <option value="Rujukan">Rujukan</option>
                      </select>
                    </div>
                    <div className="flex space-x-4 pt-20 pb-5">
                      <button
                        type="button"
                        className="bg-blue-500 bg-success-600 text-white px-4 py-1  rounded hover:bg-emerald-950"
                        onClick={handleSave}
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        className=" bg-error-700 text-white px-4 py-1  rounded hover:bg-gray-600"
                        onClick={handleCancel}
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Form Obat */}
        <div className="grid grid-cols mx-auto ml-24 gap-5 items-baseline container w-[80%]">
          <div>
            <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
              <h1 className="text-white font-primary-Poppins font-bold text-xl space-y-7">
                Obat
              </h1>
            </div>
            <div className=" border border-primary-600 shadow-lg rounded-b-lg">
              <form className="space-y-3 p-4 w-full">
                <div className="flex items-center space-x-4 ">
                  <label className=" text-black font-secondary-Karla font-bold w-[120px]">
                    Jenis Obat
                  </label>
                  <div className="flex flex-col space-y-4">
                    {jenisObat.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newJenisObat = [...jenisObat];
                            newJenisObat[index] = e.target.value;
                            setJenisObat(newJenisObat);
                          }}
                          className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                          placeholder="Keterangan....."
                        />
                        <button
                          type="button"
                          onClick={() => removeJenisObat(index)}
                          className={`bg-error-600 text-white px-3 py-1 rounded hover:bg-red-600 ${jenisObat.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          disabled={jenisObat.length <= 1}
                        >
                          -
                        </button>
                        {index === jenisObat.length - 1 && jenisObat.length < 5 && (
                          <button
                            type="button"
                            onClick={addJenisObat}
                            className="bg-success-600 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Dosis :
                  </label>
                  <textarea
                    type="Text"
                    name="Dosis"
                    placeholder=" Keterangan....."
                    className="p-2 h-24 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    BMHP :
                  </label>
                  <textarea
                    type="text"
                    name="BMHP"
                    placeholder=" Keterangan....."
                    className="p-2 h-24 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[30px] rounded  hover:bg-emerald-950"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-error-700 text-white px-4 py-1 my-[30px] rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>


            {/* Form Riwayat Alergi */}
            <div className="mt-5">
              <div className=" bg-primary-600 shadow-lg rounded-t-lg py-2 justify-center flex items-center">
                <h1 className="text-white font-primary-Poppins font-bold text-xl ">
                  Riwayat Alergi
                </h1>
              </div>
              <div className=" border border-primary-600  shadow-lg rounded-lg">
                <form className="space-y-3 py-10 ml-10 pr-10">
                  <div className="flex items-center space-x-5">
                    <label className="text-black font-secondary-Karla font-bold w-40">
                      Makanan :
                    </label>
                    <select
                      name="Makanan"
                      className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                    >
                      <option value=""></option>
                      <option value="Tidak ada">Tidak ada</option>
                      <option value="Seafood">Seafood</option>
                      <option value="Gandum">Gandum</option>
                      <option value="Susu Sapi">Susu Sapi</option>
                      <option value="Kacang-Kacangan">Kacang-Kacangan</option>
                      <option value="Makanan Lainnya">Makanan Lainnya</option>
                    </select>
                  </div>
                  <div className="">
                  <input
                      type="text"
                      name="Prognosa"
                      className="p-2 rounded-md w-80 ml-32 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      placeholder="Keterangan.... "
                    />
                    </div>

                  <div className="flex items-center space-x-5">
                    <label className="text-black font-secondary-Karla font-bold w-40">
                      Udara :
                    </label>
                    <select
                      name="Udara"
                      className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                    >
                      <option value=""></option>
                      <option value="Tidak ada">Tidak ada</option>
                      <option value="Udara panas">Udara Panas</option>
                      <option value="Udara Dingin">Udara Dingin</option>
                      <option value="Udara Kotor">Udara Kotor</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
                    <label className="text-black font-secondary-Karla font-bold w-40">
                      Obat :
                    </label>
                      <select
                        name="Obat"
                        className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Antibiotik">Antibiotik</option>
                        <option value="Antiinflamasi">Antiinflamasi</option>
                        <option value="Non Steroid">Non Steroid</option>
                        <option value="Kortikosteroid">Kortikosteroid</option>
                        <option value="Insulin">Insulin</option>
                        <option value="Obat-Obatan lainnya">Obat-Obatan lainnya</option>
                      </select>
                    </div>
                    <div className="">
                  <input
                      type="text"
                      name="Prognosa"
                      className="p-2 rounded-md w-80 ml-32 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      placeholder="Keterangan.... "
                    />
                  </div>

                  <div className="flex items-center space-x-5">
                    <label className="text-black font-secondary-Karla font-bold w-40">
                      Prognosa
                    </label>
                    <input
                      type="text"
                      name="Prognosa"
                      className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      placeholder=" "
                    />
                  </div>

                  <div className="flex space-x-4  ">
                    <button
                      type="button"
                      className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-emerald-950 "
                      onClick={handleSave}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="bbg-gray-500 bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600 "
                      onClick={handleCancel}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>


          {/* Form Tekanan Darah */}
          <div className="">
            <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
              <h1 className="text-white font-primary-Poppins font-bold text-xl">
                Tekanan Darah
              </h1>
            </div>
            <div className=" border border-primary-600 shadow-lg rounded-b-lg">
              <form className="space-y-3 py-4 ml-10 pr-10">
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Sistole :
                  </label>
                  <input
                    type="text"
                    name="sistol"
                    placeholder="   mmhg"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Distole :
                  </label>
                  <input
                    type="text"
                    name="distol"
                    placeholder="   mmhg"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Respiratory :
                  </label>
                  <input
                    type="text"
                    name="respiratory"
                    placeholder="   /Menit"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Heart Rate :
                  </label>
                  <input
                    type="text"
                    name="heart_rate"
                    placeholder="   Bpm"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded  hover:bg-emerald-950"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>

           {/* Form Keadaan Fisik */}
          <div className="">
            <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
              <h1 className="text-white font-primary-Poppins font-bold text-xl">
                Keadaan Fisik
              </h1>
            </div>
            <div className=" border border-primary-600 shadow-lg rounded-b-lg">
              <form className="space-y-3 py-4 ml-10 pr-10">
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Berat badan :
                  </label>
                  <input
                    type="text"
                    name="Berat Badan"
                    placeholder="   mmhg"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Tinggi Badan :
                  </label>
                  <input
                    type="text"
                    name="Tinggi Badan"
                    placeholder="   mmhg"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    Lingkar Perut
                  </label>
                  <input
                    type="text"
                    name="Lingkar Perut"
                    placeholder="   /Menit"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <label className="text-black font-secondary-Karla font-bold w-40">
                    IMT (BB/BT) :
                  </label>
                  <input
                    type="text"
                    name="IMT (BB/BT)"
                    placeholder="   Bpm"
                    className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-emerald-950"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}