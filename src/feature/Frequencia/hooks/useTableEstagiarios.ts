import React from "react";
import { toast } from "sonner";

import { api } from "@/api/axios";

import type { IEstagiario, ISetorEstagiario } from "../interfaces";

export default function useTableEstagiarios(search: string, month: string) {
  const [selectedSetoresEstagiarios, setSelectedSetoresEstagiarios] =
    React.useState<ISetorEstagiario[]>([]);
  const [selectedEstagiarios, setSelectedEstagiarios] = React.useState<
    IEstagiario[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [estagiario, setEstagiario] = React.useState<{
    setores: ISetorEstagiario[] | null;
    estagiarios: IEstagiario[] | null;
  }>({
    setores: null,
    estagiarios: null,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [setoresRes, estagiariosRes] = await Promise.all([
          api.get("/setor/estagiarios"),
          api.get("/estagiarios"),
        ]);
        setEstagiario((prev) => ({
          ...prev,
          setores: [...setoresRes.data.setores],
          estagiarios: estagiariosRes.data.estagiarios,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const downloadMultiEstagiariosZip = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/estagiarios/pdf/download-zip/${month}`, {
        responseType: "blob",
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `frequencia_mensal_${month}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log("Erro ao baixar arquivo zip: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMultiSetoresEstagiarioZip = async (month: string) => {
    try {
      setIsLoading(true);
      await api
        .get(
          `/setores/estagiarios/pdf/download-zip-multiestagiarios/${month}`,
          { responseType: "blob" },
        )
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/zip" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `frequencias__multiestagiarios${month}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.log("Erro ao baixar o arquivo ZIP:", error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSetorEstagiarioZip = async (setor: string, month: string) => {
    try {
      setIsLoading(true);
      await api
        .get(`/setores/estagiarios/${setor.replace(/\//g, "_")}/${month}`, {
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/zip" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `frequencia_mensal_${setor.replace(/\//g, "_")}_${month}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.log("Erro ao baixar o arquivo ZIP:", error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertSetoresEstagiariosToPdf = async () => {
    if (selectedSetoresEstagiarios.length === 0) {
      toast.error("Nenhum setor foi selecionado");
      return;
    }

    const selectedSetoresFormatted = selectedSetoresEstagiarios.map(
      ({ lotacao }) => {
        return lotacao.toLowerCase();
      },
    );

    try {
      setIsLoading(true);
      await api.post(`/setores/estagiar/pdf`, {
        setores: selectedSetoresFormatted,
        mes: month,
      });

      if (selectedSetoresFormatted.length > 1) {
        await downloadMultiSetoresEstagiarioZip(month);
        return;
      }

      await downloadSetorEstagiarioZip(selectedSetoresFormatted[0], month);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertEstagiariosToPdf = async () => {
    if (selectedEstagiarios.length === 0) {
      toast.error("Nenhum estagiario foi selecionado");
      return;
    }

    const listOfIdEstagiario = selectedEstagiarios.map((estagiario) => {
      return estagiario.id;
    });

    try {
      setIsLoading(true);
      const response = await api.post("/estagiario/pdf", {
        estagiarios: listOfIdEstagiario,
        mes: month,
      });
      if (response.status === 200) {
        downloadMultiEstagiariosZip();
        return;
      }
    } catch (error) {
      console.log("Erro ao gerar estagiarios zip: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleListOfSetoresEstagiarios = (setor: ISetorEstagiario) => {
    const isSetorAlreadySelected = selectedSetoresEstagiarios.some(
      ({ id }) => id === setor.id,
    );

    if (isSetorAlreadySelected) {
      setSelectedSetoresEstagiarios((prevSetores) =>
        prevSetores.filter(({ id }) => id !== setor.id),
      );
      return;
    }

    setSelectedSetoresEstagiarios((prevSetores) => {
      if (prevSetores.length >= 10) {
        toast.warning(
          "Máximo permitido é 10 setores ou funcionários selecionados",
        );
        return [...prevSetores.slice(1), setor];
      }

      return [...prevSetores, setor];
    });
  };

  const handleToggleListOfEstagiarios = (estagiario: IEstagiario) => {
    const isEstagiarioAlreadySelected = selectedEstagiarios.some(
      ({ id }) => id === estagiario.id,
    );

    if (isEstagiarioAlreadySelected) {
      setSelectedEstagiarios((prevEstagiarios) =>
        prevEstagiarios.filter(({ id }) => id !== estagiario.id),
      );
      return;
    }

    setSelectedEstagiarios((prevEstagiarios) => {
      if (prevEstagiarios.length >= 10) {
        toast.warning(
          "Máximo permitido é 10 setores ou funcionários selecionados",
        );
        return [...prevEstagiarios.slice(1), estagiario];
      }

      return [...prevEstagiarios, estagiario];
    });
  };

  const filterSetoresEstagiario = (): ISetorEstagiario[] | undefined => {
    if (estagiario.setores) {
      let filteredListOfSetores = estagiario.setores;

      if (search) {
        filteredListOfSetores = filteredListOfSetores?.filter((setor) => {
          return setor.lotacao.includes(search);
        });
      }
      return filteredListOfSetores;
    }
  };

  const filterEstagiario = (): IEstagiario[] | undefined => {
    if (estagiario.estagiarios) {
      let filteredListOfServidores = estagiario.estagiarios;

      if (search) {
        filteredListOfServidores = filteredListOfServidores?.filter(
          (estagiario) => {
            return estagiario.nome.includes(search);
          },
        );
      }
      return filteredListOfServidores;
    }
  };

  return {
    selectedEstagiarios,
    selectedSetoresEstagiarios,
    filterEstagiario,
    filterSetoresEstagiario,
    isLoading,
    handleToggleListOfEstagiarios,
    handleToggleListOfSetoresEstagiarios,
    convertEstagiariosToPdf,
    convertSetoresEstagiariosToPdf,
  };
}
