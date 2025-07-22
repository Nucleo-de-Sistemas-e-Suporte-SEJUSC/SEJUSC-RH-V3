import React from "react"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"
import { api } from "@/api/axios"
import { toast } from "sonner"
import { useAuth } from '@/context/AuthContext'
import type { ICredential } from "../interface"
import type { User } from "@/feature/entities/IUser"

export function useFormLogin() {
    const { login } = useAuth()
    React.useEffect(() => {
        localStorage.removeItem("user");
    }, [])
    const navigate = useNavigate()
    const [credentials, setCredentials] = React.useState<ICredential>({
        matricula: '',
        password: ''
    })
    const [passwordVisibility, setPasswordVisibility] = React.useState(false)
    const { matricula, password } = credentials

    const handelMatriculaChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = currentTarget
        const sanitizedMatricula = value.replace(/[^a-zA-Z0-9]/g, '')
        const digits = sanitizedMatricula.slice(0, 7)
        const letter = sanitizedMatricula.slice(7, 8).toUpperCase()

        let formattedMatricula = digits
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2-$3')

        if (letter) {
            formattedMatricula += ` ${letter}`
        }
        setCredentials((prev) => ({
            ...prev,
            matricula: formattedMatricula
        }))
    }

    const handelPasswordChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = currentTarget
        setCredentials((prev) => ({
            ...prev,
            password: value
        }))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await api.post('/login', {
                matricula: matricula,
                senha: password
            })
            const user = response.data as User
            const storedUser = {
                nome: user.nome,
                role: user.role,
                cargo: user.cargo,
            }

            localStorage.setItem("user", JSON.stringify(storedUser));
            toast.success("Usuário autenticado!");
            login(storedUser)
            navigate("/frequencia");
        } catch (error) {
            if (error instanceof AxiosError) {
                const { response } = error
                if (response?.status === 404) {
                    toast.error('Error 404', {
                        description: 'Usuário não encontrado.'
                    })
                    return
                }
                if (response?.status === 401) {
                    toast.error('Error 401', {
                        description: 'Usuário não autorizado.'
                    })
                    return
                }
                toast.error('Error HTTP', {
                    description: response?.data?.message || 'Erro inesperado.'
                })
            }
        }
    }

    return {
        credentials,
        passwordVisibility,
        setPasswordVisibility,
        handelMatriculaChange,
        handelPasswordChange,
        handleSubmit
    }
}