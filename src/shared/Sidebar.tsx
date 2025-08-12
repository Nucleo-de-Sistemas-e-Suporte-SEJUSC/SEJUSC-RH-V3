import type React from "react";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/interfaces";
import {
  ChartPie,
  Folder,
  History,
  LogOut,
  PanelRightOpen,
  RefreshCw,
} from "lucide-react";

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

  return (
    <aside
      className={`flex flex-col p-4 bg-sky-950 rounded-r-4xl shadow-2xl ${
        isSideBarOpen ? "" : "max-w-max"
      }`}
    >
      <button
        onClick={handleOpenSideBar}
        className="group flex text-xl bg-sky-950 cursor-pointer p-2"
      >
        <PanelRightOpen
          size={32}
          className={`text-slate-200 group-hover:text-slate-400 transition-all ${
            isSideBarOpen ? "" : "rotate-180 duration-200"
          } duration-200`}
        />
      </button>

      <div className="group flex items-center gap-4 p-2 text-slate-200 text-2xl grow-1">
        {isSideBarOpen ? (
          <div className="flex gap-2 items-center">
            <span className="bg-white px-1 py-[3px] rounded-[80%] text-sky-950 text-xl font-bold">{`${
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
            <span className="bg-white px-1 py-[4px] rounded-[80%] text-sky-950 text-xl font-bold">{`${
              storedUser.nome.split(" ")[0][0]
            }${storedUser.nome.split(" ")[1][0]}`}</span>
          </div>
        )}
      </div>

      <div className="grow-5">
        <div className="flex flex-col gap-6">
          <Link
            to={"/dashboard"}
            className="group flex items-center gap-4 p-2 text-slate-200 text-2xl hover:text-slate-400 transition-colors duration-200"
          >
            <ChartPie
              size={32}
              className="text-slate-200 group-hover:text-slate-400 transition-colors"
            />
            {isSideBarOpen && "Dashboard"}
          </Link>

          <Link
            to={"/frequencia"}
            className="group flex items-center gap-4 p-2 text-slate-200 text-2xl hover:text-slate-400 transition-colors duration-200"
          >
            <RefreshCw
              size={32}
              className="text-slate-200 group-hover:text-slate-400 transition-colors"
            />
            {isSideBarOpen && "Frequência"}
          </Link>

          <Link
            to={"/funcionarios"}
            className="group flex items-center gap-4 p-2 text-slate-200 text-2xl hover:text-slate-400 transition-colors duration-200"
          >
            <Folder
              size={32}
              className="text-slate-200 group-hover:text-slate-400 transition-colors"
            />
            {isSideBarOpen && "Funcionários"}
          </Link>

          <Link
            to={"/alteracoes"}
            className="group flex items-center gap-4 p-2 text-slate-200 text-2xl hover:text-slate-400 transition-colors duration-200"
          >
            <History
              size={32}
              className="text-slate-200 group-hover:text-slate-400 transition-colors"
            />
            {isSideBarOpen && "Alterações"}
          </Link>
        </div>
      </div>

      <button
        onClick={() => logout()}
        className="group flex text-xl bg-sky-950 cursor-pointer p-2"
      >
        {isSideBarOpen ? (
          <div className="flex items-center gap-4">
            <LogOut
              size={32}
              className="text-slate-200 group-hover:text-slate-400 transition-colors duration-100"
            />
            <span className="text-slate-200 text-xl">Sair da conta</span>
          </div>
        ) : (
          <LogOut
            size={32}
            className="text-slate-200 group-hover:text-slate-400 transition-colors duration-100"
          />
        )}
      </button>
    </aside>
  );
}
