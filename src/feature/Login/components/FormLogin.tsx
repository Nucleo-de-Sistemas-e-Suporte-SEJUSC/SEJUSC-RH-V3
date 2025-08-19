import { Button } from "@/shared";
import useFormLogin from "../hooks/useFormLogin";
import { Eye, EyeClosed } from "lucide-react";

export default function FormLogin() {
  const {
    credentials,
    passwordVisibility,
    setPasswordVisibility,
    handelMatriculaChange,
    handelPasswordChange,
    handleSubmit,
  } = useFormLogin();
  const { matricula, password } = credentials;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-lg flex-col gap-4 rounded-md bg-sky-200/20 px-5 py-8"
    >
      <div>
        <label className="flex flex-col gap-1.5 font-medium text-slate-100">
          Matrícula
          <input
            type="text"
            id="matricula"
            name="matricula"
            className="rounded border-2 border-transparent bg-gray-100 p-1.5 text-lg text-slate-800 duration-200 ease-in outline-none focus:border-2 focus:border-sky-900"
            placeholder="000.000-0 A"
            value={matricula}
            onChange={handelMatriculaChange}
            autoComplete="current-password"
          />
        </label>
      </div>
      <div className="relative">
        <div>
          <label className="flex flex-col gap-1.5 font-medium text-slate-100">
            Senha
            <input
              id="password"
              name="matricula"
              type={passwordVisibility ? "text" : "password"}
              className="rounded border-2 border-transparent bg-gray-100 p-1.5 text-lg text-slate-800 duration-200 ease-in outline-none focus:border-2 focus:border-sky-900"
              placeholder="Abc@1234"
              value={password}
              onChange={handelPasswordChange}
              maxLength={13}
              autoComplete="current-password"
            />
          </label>
        </div>
        <button
          type="button"
          className="absolute right-1 bottom-1 cursor-pointer p-1"
          onClick={() => setPasswordVisibility((prev) => !prev)}
        >
          {passwordVisibility ? <Eye /> : <EyeClosed />}
        </button>
      </div>
      <div className="mt-4 self-center">
        <Button>Entrar</Button>
      </div>
    </form>
  );
}
