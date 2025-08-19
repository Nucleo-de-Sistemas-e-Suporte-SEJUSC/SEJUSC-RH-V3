import React from "react";
import { Link, useLocation } from "react-router";
import useAuth from "@/context/useAuth";
import type { User } from "@/interfaces";
import {
  ChartPie,
  Folder,
  History,
  LogOut,
  PanelRightOpen,
  RefreshCw,
} from "lucide-react";
import Logo from "@/assets/logo.png";

type SidebarProps = React.ComponentProps<"aside"> & {
  handleOpenSideBar: () => void;
  isSideBarOpen: boolean;
};

export default function Sidebar({
  handleOpenSideBar,
  isSideBarOpen,
}: SidebarProps) {
  const { logout } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user")!) as User;
  const location = useLocation();
  const path =
    location.pathname === "/frequencia" ||
    location.pathname === "/historico" ||
    location.pathname === "/dashboard";

  return (
    <aside
      className={`relative flex flex-col rounded-r-4xl bg-sky-950 p-4 shadow-2xl ${
        isSideBarOpen ? "" : "max-w-max"
      }`}
    >
      {path && (
        <img
          className={`absolute bottom-0 ${isSideBarOpen ? "left-72" : "left-24"} `}
          height={94}
          width={94}
          src={Logo}
          alt="sejusc-rh"
        />
      )}

      <button
        onClick={handleOpenSideBar}
        className="group flex cursor-pointer bg-sky-950 p-2 text-xl"
      >
        <PanelRightOpen
          size={32}
          className={`text-slate-200 transition-all group-hover:text-slate-400 ${
            isSideBarOpen ? "" : "rotate-180 duration-200"
          } duration-200`}
        />
      </button>

      <div className="group flex grow-1 items-center gap-4 p-2 text-2xl text-slate-200">
        {isSideBarOpen ? (
          <div className="flex items-center gap-2">
            <span className="rounded-[80%] bg-white px-1 py-[3px] text-xl font-bold text-sky-950">{`${
              storedUser.nome.split(" ")[0][0]
            }${storedUser.nome.split(" ")[1][0]}`}</span>
            <div className="flex flex-col">
              <span>{storedUser.cargo.toUpperCase()}</span>
              <span className="text-sm">{`${storedUser.nome.split(" ")[0]} ${
                storedUser.nome.split(" ")[1]
              }`}</span>
            </div>
          </div>
        ) : (
          <div className="py-2.5">
            <span className="rounded-[80%] bg-white px-1 py-[4px] text-xl font-bold text-sky-950">{`${
              storedUser.nome.split(" ")[0][0]
            }${storedUser.nome.split(" ")[1][0]}`}</span>
          </div>
        )}
      </div>

      <div className="grow-5">
        <div className="flex flex-col gap-6">
          <Link
            to={"/dashboard"}
            className="group flex items-center gap-4 p-2 text-2xl text-slate-200 transition-colors duration-200 hover:text-slate-400"
          >
            <ChartPie
              size={32}
              className="text-slate-200 transition-colors group-hover:text-slate-400"
            />
            {isSideBarOpen && "Dashboard"}
          </Link>

          <Link
            to={"/frequencia"}
            className="group flex items-center gap-4 p-2 text-2xl text-slate-200 transition-colors duration-200 hover:text-slate-400"
          >
            <RefreshCw
              size={32}
              className="text-slate-200 transition-colors group-hover:text-slate-400"
            />
            {isSideBarOpen && "Frequência"}
          </Link>

          <Link
            to={"/funcionarios"}
            className="group flex items-center gap-4 p-2 text-2xl text-slate-200 transition-colors duration-200 hover:text-slate-400"
          >
            <Folder
              size={32}
              className="text-slate-200 transition-colors group-hover:text-slate-400"
            />
            {isSideBarOpen && "Funcionários"}
          </Link>

          <Link
            to={"/historico"}
            className="group flex items-center gap-4 p-2 text-2xl text-slate-200 transition-colors duration-200 hover:text-slate-400"
          >
            <History
              size={32}
              className="text-slate-200 transition-colors group-hover:text-slate-400"
            />
            {isSideBarOpen && "Histórico"}
          </Link>
        </div>
      </div>

      <button
        onClick={() => logout()}
        className="group flex cursor-pointer bg-sky-950 p-2 text-xl"
      >
        {isSideBarOpen ? (
          <div className="flex items-center gap-4">
            <LogOut
              size={32}
              className="text-slate-200 transition-colors duration-100 group-hover:text-slate-400"
            />
            <span className="text-xl text-slate-200">Sair da conta</span>
          </div>
        ) : (
          <LogOut
            size={32}
            className="text-slate-200 transition-colors duration-100 group-hover:text-slate-400"
          />
        )}
      </button>
    </aside>
  );
}
