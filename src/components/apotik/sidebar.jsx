import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoMdArrowDropleft } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { BsCapsulePill } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import useAxios from "../../useAxios";
import useClearTokensOnUnload from "../../useClearTokensOnUnload";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  useClearTokensOnUnload();

  const Menus = [
    { title: "Dashboard", path: "/apotek" },
    {
      title: "Tambah Obat",
      path: "/apotek/tambah-obat",
      icon: <BsCapsulePill />,
    },
    {
      title: "Pengingat",
      path: "/apotek/pengingat",
      icon: <MdOutlineNotificationsActive />,
    },
    {
      title: "Laporan",
      path: "/apotek/laporan-apotek",
      icon: <MdLibraryBooks />,
    },
  ];

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await axiosInstance.delete("/logout", {
        data: { refreshToken: refreshToken },
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <>
      <div
        className={`bg-primary-600 h-screen left-0 py-5 pt-8 font-poppins ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        {/* Title */}
        <IoMdArrowDropleft
          className={`bg-transparent right-5 text-white text-3xl rounded-full absolute top-9 cursor-pointer ${
            !open && "rotate-180 right-8"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex px-5">
          <img
            src="/logo.png"
            className={`w-10 h-10 cursor-pointer block float-left mr-3 duration-500 ${
              !open && "hidden"
            }`}
          />
          <h1
            className={`text-white text-2xl origin-left font-bold duration-500 mt-[0.20rem] ${
              !open && "hidden"
            }`}
          >
            ISENA FKTP
          </h1>
        </div>

        {/* Sub Menu */}
        <ul className="pt-10">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-white flex items-center gap-x-4 cursor-pointer p-3 ${
                location.pathname === menu.path
                  ? "bg-primary-300 text-primary-600"
                  : "hover:bg-primary-300 hover:text-primary-600"
              } px-5 ${menu.spacing ? "mt-9" : "mt-2"}`}
              onClick={() => navigate(menu.path)}
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <GoHomeFill />}
              </span>
              <span
                className={`text-lg font-medium flex-1 ${!open && "hidden"}`}
              >
                {menu.title}
              </span>
            </li>
          ))}
          {/* Logout Button */}
          <li
            className={`text-white flex items-center gap-x-4 cursor-pointer p-3 mt-9 hover:bg-primary-300 hover:text-primary-600 px-5`}
            onClick={handleLogout}
          >
            <span className="text-2xl block float-left">
              <CgLogOut />
            </span>
            <span className={`text-lg font-medium flex-1 ${!open && "hidden"}`}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
