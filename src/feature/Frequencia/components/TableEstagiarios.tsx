import React from "react";
import { Button } from "@/shared";
import type { IFilterOptions } from "@/interfaces";
import { Square, SquareCheck } from "lucide-react";
import useTableEstagiarios from "../hooks/useTableEstagiarios";

type TableProps = {
  selectedEmployee: string;
  filterOptions: IFilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
};

export default function TableEstagiarios({
  selectedEmployee,
  filterOptions,
  setFilterOptions,
}: TableProps) {
  const { checkbox, search, month } = filterOptions;

  React.useEffect(() => {
    setFilterOptions((prevFilters) => ({
      ...prevFilters,
      checkbox: "setores",
    }));
  }, [selectedEmployee, setFilterOptions]);

  const {
    selectedEstagiarios,
    selectedSetoresEstagiarios,
    filterEstagiario,
    filterSetoresEstagiario,
    isLoading,
    handleToggleListOfEstagiarios,
    handleToggleListOfSetoresEstagiarios,
    convertEstagiariosToPdf,
    convertSetoresEstagiariosToPdf,
  } = useTableEstagiarios(search, month);

  return (
    <>
      <div className="rounded overflow-x-hidden shadow-md">
        <table className="text-center text-slate-700 w-full table-fixed">
          {checkbox === "setores" && (
            <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
              <tr className="*:px-2 *:py-2">
                <th scope="col">Setor</th>
                <th scope="col">Funcionários</th>
                <th scope="col">Selecionar</th>
              </tr>
            </thead>
          )}
          {checkbox === "estagiarios" && (
            <thead className="bg-sky-950 text-slate-200 uppercase text-xl tracking-wider">
              <tr className="*:px-2 *:py-2">
                <th scope="col">Nome</th>
                <th scope="col">Setor</th>
                <th scope="col">Selecionar</th>
              </tr>
            </thead>
          )}

          <tbody className="bg-slate-100 divide-y divide-gray-300">
            {checkbox === "setores" &&
              filterSetoresEstagiario()?.map((setor) => (
                <tr key={setor.id} className="*:px-6 *:py-4 *:text-lg">
                  <td
                    className="max-w-[120px] truncate whitespace-nowrap overflow-hidden"
                    title={setor.lotacao}
                  >
                    {setor.lotacao}
                  </td>
                  <td>{setor.quantidade}</td>
                  <td className="flex justify-center">
                    <button
                      className="cursor-pointer"
                      onClick={() =>
                        handleToggleListOfSetoresEstagiarios(setor)
                      }
                    >
                      {selectedSetoresEstagiarios.some(
                        ({ id }) => id === setor.id
                      ) ? (
                        <SquareCheck />
                      ) : (
                        <Square />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {checkbox === "estagiarios" &&
              filterEstagiario()?.map((estagiario) => (
                <tr key={estagiario.id} className="*:px-6 *:py-4 *:text-lg">
                  <td>{estagiario.nome}</td>
                  <td
                    className="max-w-[120px] truncate whitespace-nowrap overflow-hidden"
                    title={estagiario.setor}
                  >
                    {estagiario.setor}
                  </td>
                  <td className="flex justify-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => handleToggleListOfEstagiarios(estagiario)}
                    >
                      {selectedEstagiarios.some(
                        ({ id }) => id === estagiario.id
                      ) ? (
                        <SquareCheck />
                      ) : (
                        <Square />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="self-end">
        <Button
          disabled={isLoading}
          onClick={() => {
            if (checkbox === "setores") {
              convertSetoresEstagiariosToPdf();
            } else {
              convertEstagiariosToPdf();
            }
          }}
        >
          {isLoading ? "Gerando..." : "Gerar Selecionados"}
        </Button>
      </div>
    </>
  );
}
