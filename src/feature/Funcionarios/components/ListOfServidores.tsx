import React from "react";

import type { IEstagiario, IServidor } from "@/interfaces";
import { Button } from "@/shared";

import useListOfServidores from "../hooks/useListOfServidores";

type ListOfServidoresProps = {
  servidores: IServidor[] | null;
  filterOptions: {
    setorSearch: string;
    setorSelect: string;
    checkbox: string;
    search: string;
  };
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{
      servidor: IServidor | null;
      estagiario: IEstagiario | null;
      modal: boolean;
      action: string | null;
    }>
  >;
};

export default function ListOfServidores({
  servidores,
  filterOptions,
  setIsModalOpen,
}: ListOfServidoresProps) {
  const { checkbox } = filterOptions;
  const [isLoading, setIsLoading] = React.useState<{
    id: number | null;
    load: boolean;
    action: string | null;
  }>({
    id: null,
    load: false,
    action: null,
  });

  const {
    handleActiveServidor,
    handleArchiveServidor,
    generateFichaFuncional,
    filterServidores,
  } = useListOfServidores(servidores, filterOptions, setIsLoading);

  return (
    <div className="grid max-h-[624px] grid-cols-3 gap-4 overflow-y-scroll rounded">
      {filterServidores()?.map((servidor) => (
        <div
          key={servidor.id}
          className="flex flex-col justify-between gap-2.5 rounded bg-gray-100 p-3 text-slate-900"
        >
          <div>
            <h3 className="text-2xl font-medium">{servidor.nome}</h3>
            <p className="text-lg text-slate-700">{servidor.setor}</p>
          </div>
          <div className="flex gap-2">
            <Button
              className="cursor-pointer rounded-full border-2 border-sky-950 px-4 py-1.5 text-sm font-bold tracking-wider text-sky-950 uppercase duration-200 ease-in hover:bg-sky-950 hover:text-sky-100"
              onClick={() => {
                if (checkbox === "ativos") {
                  handleArchiveServidor(servidor.id!);
                  return;
                }
                handleActiveServidor(servidor.id!);
              }}
            >
              {checkbox === "ativos" ? (
                <p>
                  {isLoading.load &&
                  isLoading.id === servidor.id &&
                  isLoading.action === "arquivar"
                    ? "Arquivando"
                    : "Arquivar"}
                </p>
              ) : (
                <p>
                  {isLoading.load &&
                  isLoading.id === servidor.id &&
                  isLoading.action === "desarquivar"
                    ? "Desarquivando"
                    : "Desarquivar"}
                </p>
              )}
            </Button>

            {checkbox === "ativos" && (
              <>
                <Button
                  className="cursor-pointer rounded-full border-2 border-sky-950 px-4 py-1.5 text-sm font-bold tracking-wider text-sky-950 uppercase duration-200 ease-in hover:bg-sky-950 hover:text-sky-100"
                  onClick={() =>
                    setIsModalOpen({
                      servidor: servidor,
                      estagiario: null,
                      modal: true,
                      action: "atualizar",
                    })
                  }
                >
                  Atualizar
                </Button>
                <Button
                  className="cursor-pointer rounded-full border-2 border-sky-950 px-4 py-1.5 text-sm font-bold tracking-wider text-sky-950 uppercase duration-200 ease-in hover:bg-sky-950 hover:text-sky-100"
                  onClick={() =>
                    setIsModalOpen({
                      servidor: servidor,
                      estagiario: null,
                      modal: true,
                      action: "anexar",
                    })
                  }
                >
                  Anexar
                </Button>
                <Button
                  className="cursor-pointer rounded-full border-2 border-sky-950 px-4 py-1.5 text-sm font-bold tracking-wider text-sky-950 uppercase duration-200 ease-in hover:bg-sky-950 hover:text-sky-100"
                  onClick={() => generateFichaFuncional(servidor.id!)}
                >
                  {isLoading.load ? (
                    <p>
                      {isLoading.id === servidor.id &&
                      isLoading.action === "ficha"
                        ? "Gerando"
                        : "Ficha"}
                    </p>
                  ) : (
                    "Ficha"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
