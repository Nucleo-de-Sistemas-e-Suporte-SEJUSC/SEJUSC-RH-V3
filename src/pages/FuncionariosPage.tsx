import React from "react";
import Header from "@/shared/Header";
import Button from "@/shared/Button";
import ListOfServidores from "@/feature/Funcionarios/components/ListOfServidores";
import ListOfEstagiarios from "@/feature/Funcionarios/components/ListOfEstagiarios";
import FilterFields from "@/feature/Funcionarios/components/FilterFields";
import FormCreateServidor from "@/feature/Funcionarios/components/FormCreateServidor";
import FormCreateEstagiario from "@/feature/Funcionarios/components/FormCreateEstagiario";
import FormUpdateServidor from "@/feature/Funcionarios/components/FormUpdateServidor";
import FormUpdateEstagiario from "@/feature/Funcionarios/components/FormUpdateEstagiario";
import FormAnexarServidor from "@/feature/Funcionarios/components/FormAnexarServidor";
import FormAnexarEstagiario from "@/feature/Funcionarios/components/FormAnexarEstagiario";
import type { IEstagiario, IServidor } from "@/interfaces";
import { api } from "@/api/axios";

export default function FuncionariosPage() {
  const [selectedEmployee, setSelectedEmployee] = React.useState("servidores");
  const [isModalOpen, setIsModalOpen] = React.useState<{
    servidor: IServidor | null;
    estagiario: IEstagiario | null;
    modal: boolean;
    action: string | null;
  }>({
    servidor: null,
    estagiario: null,
    modal: false,
    action: null,
  });
  const [filterOptions, setFilterOptions] = React.useState({
    setorSearch: "",
    setorSelect: "",
    checkbox: "ativos",
    search: "",
  });
  const [archivedEmployees, setArchivedEmployees] = React.useState<{
    servidores: IServidor[] | null;
    estagiarios: IEstagiario[] | null;
  }>({
    servidores: null,
    estagiarios: null,
  });
  const [activeEmployees, setActiveEmployees] = React.useState<{
    servidores: IServidor[] | null;
    estagiarios: IEstagiario[] | null;
  }>({
    servidores: null,
    estagiarios: null,
  });
  const { checkbox } = filterOptions;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [servidoresRes, estagiariosRes] = await Promise.all([
          api.get("/servidores"),
          api.get("/estagiarios"),
        ]);
        setActiveEmployees((prev) => ({
          ...prev,
          servidores: [...servidoresRes.data.servidores],
          estagiarios: [...estagiariosRes.data.estagiarios],
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedEmployee === "servidores") {
          const response = await api.get(`/${selectedEmployee}/arquivados`);
          const employee = response.data[selectedEmployee];
          setArchivedEmployees((prev) => ({
            ...prev,
            servidores: [...employee],
          }));
          return;
        }
        const response = await api.get(`/${selectedEmployee}/arquivados`);
        const employee = response.data[selectedEmployee];
        setArchivedEmployees((prev) => ({
          ...prev,
          estagiarios: [...employee],
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedEmployee]);

  return (
    <main className="flex flex-col gap-5 py-5 pr-10 overflow-scroll">
      {isModalOpen.modal ? (
        <>
          {selectedEmployee === "servidores" ? (
            <>
              {isModalOpen.servidor ? (
                <>
                  {isModalOpen.action === "atualizar" && (
                    <FormUpdateServidor
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                  {isModalOpen.action === "anexar" && (
                    <FormAnexarServidor
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                </>
              ) : (
                <FormCreateServidor setIsModalOpen={setIsModalOpen} />
              )}
            </>
          ) : (
            <>
              {isModalOpen.estagiario ? (
                <>
                  {isModalOpen.action === "atualizar" && (
                    <FormUpdateEstagiario
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                  {isModalOpen.action === "anexar" && (
                    <FormAnexarEstagiario
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                </>
              ) : (
                <FormCreateEstagiario setIsModalOpen={setIsModalOpen} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <Header
              label="Lista de Funcionários"
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
            />
            <div className="self-center">
              <Button
                onClick={() =>
                  setIsModalOpen({
                    servidor: null,
                    estagiario: null,
                    modal: true,
                    action: null,
                  })
                }
              >
                {selectedEmployee === "servidores"
                  ? "CRIAR SERVIDOR"
                  : "CRIAR ESTAGIÁRIO"}
              </Button>
            </div>
          </div>
          <FilterFields
            selectedEmployee={selectedEmployee}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />

          {selectedEmployee === "servidores" ? (
            <ListOfServidores
              servidores={
                checkbox === "ativos"
                  ? activeEmployees.servidores
                  : archivedEmployees.servidores
              }
              filterOptions={filterOptions}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <ListOfEstagiarios
              estagiarios={
                checkbox === "ativos"
                  ? activeEmployees.estagiarios
                  : archivedEmployees.estagiarios
              }
              filterOptions={filterOptions}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </>
      )}
    </main>
  );
}
