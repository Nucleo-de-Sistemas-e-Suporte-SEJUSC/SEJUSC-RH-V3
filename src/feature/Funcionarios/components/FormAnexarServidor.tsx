import React, { type FormEvent } from "react"
import Button from "@/shared/Button"
import type { IEstagiario, IServidor } from "@/interfaces"
import { api } from "@/api/axios"
import { toast } from "sonner"

type FormAnexarServidorProps = {
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
    funcionarioId: number | null;
    files: Record<string, File | null>;
};

export default function FormAnexarServidor({ isModalOpen, setIsModalOpen }: FormAnexarServidorProps) {
    const { servidor } = isModalOpen

    // Estado com a nova estrutura de objeto
    const [uploadData, setUploadData] = React.useState<UploadData>({
        funcionarioId: servidor?.id as number | null,
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

    const { files, funcionarioId } = uploadData

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

    const handleSubmit = async (event: FormEvent) => {
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

        if (funcionarioId) {
            formData.append('funcionario_id', funcionarioId.toString());
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
        <div>
            <h1 className="text-4xl text-sky-950 font-semibold pb-8">
                {`Servidor: ${servidor?.nome}`}
            </h1>
            <form>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <label
                                    htmlFor="rg"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >RG</label>
                                <input
                                    id="rg"
                                    type="file"
                                    name="rh"
                                    onChange={(event) => handleFileChange('RG', event)}
                                />
                            </div>
                            <div className="grow">
                                <label
                                    htmlFor="cpf"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >CPF</label>
                                <input
                                    id="cpf"
                                    type="file"
                                    name="cpf"
                                    onChange={(event) => handleFileChange('CPF', event)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <label
                                    htmlFor="tituloEleitor"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >Título de Eleitor</label>
                                <input
                                    id="tituloEleitor"
                                    type="file"
                                    name="tituloEleitor"
                                    onChange={(event) => handleFileChange('TITULO_ELEITOR', event)}
                                />
                            </div>
                            <div className="grow">
                                <label
                                    htmlFor="pis/pased"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >PIS/PASED</label>
                                <input
                                    id="pis/pased"
                                    type="file"
                                    name="pis/pased"
                                    onChange={(event) => handleFileChange('PIS_PASEP', event)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <label
                                    htmlFor="certidaoReservista"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >Certidao Reservista</label>
                                <input
                                    id="certidaoReservista"
                                    type="file"
                                    name="certidaoReservista"
                                    onChange={(event) => handleFileChange('CERTIDAO_RESERVISTA', event)}
                                />
                            </div>
                            <div className="grow">
                                <label
                                    htmlFor="comprovanteEscolaridade"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >Comprovante Escolaridade</label>
                                <input
                                    id="comprovanteEscolaridade"
                                    type="file"
                                    name="comprovanteEscolaridade"
                                    onChange={(event) => handleFileChange('COMPROVANTE_ESCOLARIDADE', event)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <label
                                    htmlFor="foto3x4"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >Foto 3x4</label>
                                <input
                                    id="foto3x4"
                                    type="file"
                                    name="foto3x4"
                                    onChange={(event) => handleFileChange('FOTO_3X4', event)}
                                />
                            </div>
                            <div className="grow">
                                <label
                                    htmlFor="certidaoNascimento"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >Certidão de Nascimento</label>
                                <input
                                    id="certidaoNascimento"
                                    type="file"
                                    name="certidaoNascimento"
                                    onChange={(event) => handleFileChange('CERTIDAO_NASCIMENTO', event)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <label
                                    htmlFor="curriculo"
                                    className="flex flex-col gap-1.5 text-slate-800 font-medium"
                                >Currículo</label>
                                <input
                                    id="curriculo"
                                    type="file"
                                    name="curriculo"
                                    onChange={(event) => handleFileChange('CURRICULO', event)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleSubmit}
                        >
                            Anexar Servidor
                        </Button>
                        <Button
                            onClick={() => setIsModalOpen({ servidor: null, estagiario: null, modal: false, action: null })}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}