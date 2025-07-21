import Button from "@/shared/Button";
import Input from "@/shared/Input";
import { useFormLogin } from "../hooks/useFormLogin";
import { Eye, EyeClosed } from 'lucide-react'

export default function FormLogin() {
    const {
        credentials,
        passwordVisibility,
        setPasswordVisibility,
        handelMatriculaChange,
        handelPasswordChange,
        handleSubmit
    } = useFormLogin()
    const { matricula, password } = credentials

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-8 bg-slate-300 rounded-md min-w-lg">
            <Input
                id="matricula"
                label="Matrícula"
                placeholder="000.000-0 A"
                value={matricula}
                onChange={handelMatriculaChange}
            />
            <div className="relative">
                <Input
                    id="password"
                    label="Senha"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Abc@1234"
                    value={password}
                    onChange={handelPasswordChange}
                    maxLength={13}
                />
                <button
                    type="button"
                    className="absolute bottom-1 right-1 cursor-pointer p-1"
                    onClick={() => setPasswordVisibility((prev) => !prev)}
                >
                    {passwordVisibility ? <Eye /> : <EyeClosed />}
                </button>
            </div>
            <Button
                className="self-center mt-4"
            >
                Entrar
            </Button>
        </form>
    )
}