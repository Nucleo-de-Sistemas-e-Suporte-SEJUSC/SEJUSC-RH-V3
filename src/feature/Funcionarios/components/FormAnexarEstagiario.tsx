import React from "react"
import Button from "@/shared/Button"
import type { IEstagiario, IServidor } from "@/interfaces"
import { toast } from "sonner"
import { api } from "@/api/axios"

type FormAnexarEstagiarioProps = {
    isModalOpen: {
        servidor: IServidor | null,
        estagiario: IEstagiario | null,
        modal: boolean
    }
    setIsModalOpen: React.Dispatch<React.SetStateAction<{
        servidor: IServidor | null,
        estagiario: IEstagiario | null,
        modal: boolean,
        action: string | null
    }>>
}

type UploadData = {
    estagiarioId: number | null;
    files: Record<string, File | null>;
};

export default function FormAnexarEstagiario({ isModalOpen, setIsModalOpen }: FormAnexarEstagiarioProps) {
    const { estagiario } = isModalOpen

    const [uploadData, setUploadData] = React.useState<UploadData>({
        estagiarioId: estagiario?.id as number | null,
        files: {
            'RG': null,
            'CPF': null,
            'TITULO_ELEITOR': null,
            'PIS_PASEP': null,
            'CERTIDAO_RESERVISTA': null,
            'COMPROVANTE_ESCOLARIDADE': null,
            'FOTO_3X4': null,
            'CERTIDAO_NASCIMENTO': null,
            'CURRICULO': null,
        }
    });

    const { files, estagiarioId } = uploadData

    const handleFileChange = (tipoDocumento: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.currentTarget.files?.[0];
        setUploadData((prevValues) => ({
            ...prevValues,
            files: {
                ...prevValues.files,
                [tipoDocumento]: newFile || null
            }
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData();
        let hasFiles = false;

        for (const tipoDocumento in files) {
            const file = files[tipoDocumento];

            if (file) {
                formData.append('files', file);
                formData.append('tipos_documento', tipoDocumento);
                hasFiles = true;
            }
        }

        if (!hasFiles) {
            toast.error('Nenhum arquivo selecionado.');
            return;
        }

        if (estagiarioId) {
            formData.append('estagiario_id', estagiarioId.toString());
        }

        try {
            await api.post('/documentos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Upload realizado com sucesso!');
            setUploadData((prevValues) => ({
                ...prevValues,
                files: {
                    ...Object.keys(prevValues.files).reduce((acc, key) => ({ ...acc, [key]: null }), {})
                }
            }));
        } catch (error) {
            toast.error('Não foi possível anexar documentos.');
            console.error('Erro ao anexar documento(s)', error);
        }
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">
                {`Estagiário: ${estagiario?.nome}`}
            </h1>
            <h3 className="font-semibold text-2xl border-b-2 mb-4">Documentos</h3>
            <form>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >RG
                            <input
                                id="rg"
                                type="file"
                                name="rh"
                                onChange={(event) => handleFileChange('RG', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >CPF
                            <input
                                id="cpf"
                                type="file"
                                name="cpf"
                                onChange={(event) => handleFileChange('CPF', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >Título de Eleitor
                            <input
                                id="tituloEleitor"
                                type="file"
                                name="tituloEleitor"
                                onChange={(event) => handleFileChange('TITULO_ELEITOR', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >PIS/PASED
                            <input
                                id="pis/pased"
                                type="file"
                                name="pis/pased"
                                onChange={(event) => handleFileChange('PIS_PASEP', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >Certidao Reservista
                            <input
                                id="certidaoReservista"
                                type="file"
                                name="certidaoReservista"
                                onChange={(event) => handleFileChange('CERTIDAO_RESERVISTA', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >Comprovante Escolaridade
                            <input
                                id="comprovanteEscolaridade"
                                type="file"
                                name="comprovanteEscolaridade"
                                onChange={(event) => handleFileChange('COMPROVANTE_ESCOLARIDADE', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >Foto 3x4
                            <input
                                id="foto3x4"
                                type="file"
                                name="foto3x4"
                                onChange={(event) => handleFileChange('FOTO_3X4', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >Certidão de Nascimento
                            <input
                                id="certidaoNascimento"
                                type="file"
                                name="certidaoNascimento"
                                onChange={(event) => handleFileChange('CERTIDAO_NASCIMENTO', event)}
                            />
                        </label>
                        <label
                            className="flex grow justify-between rounded p-1.5 hover:cursor-pointer hover:bg-slate-300 ease-in duration-100 text-slate-800 font-medium"
                        >Currículo
                            <input
                                id="curriculo"
                                type="file"
                                name="curriculo"
                                onChange={(event) => handleFileChange('CURRICULO', event)}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        onClick={handleSubmit}
                    >
                        Anexar Documentos
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setIsModalOpen({ servidor: null, estagiario: null, modal: false, action: null })}
                    >
                        Cancelar
                    </Button>
                </div>
            </form >
        </div>
    )
}