import Button from "@/shared/Button";
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
      className="flex flex-col gap-4 px-5 py-8 bg-sky-200/20 rounded-md min-w-lg"
    >
      <div>
        <label className="flex flex-col gap-1.5 text-slate-100 font-medium">
          Matrícula
          <input
            type="text"
            id="matricula"
            name="matricula"
            className="text-lg text-slate-800 p-1.5 bg-gray-100 outline-none rounded border-2 border-transparent focus:border-2 focus:border-sky-900 ease-in duration-200"
            placeholder="000.000-0 A"
            value={matricula}
            onChange={handelMatriculaChange}
          />
        </label>
      </div>
      <div className="relative">
        <div>
          <label className="flex flex-col gap-1.5 text-slate-100 font-medium">
            Senha
            <input
              id="password"
              name="matricula"
              type={passwordVisibility ? "text" : "password"}
              className="text-lg text-slate-800 p-1.5 bg-gray-100 outline-none rounded border-2 border-transparent focus:border-2 focus:border-sky-900 ease-in duration-200"
              placeholder="Abc@1234"
              value={password}
              onChange={handelPasswordChange}
              maxLength={13}
            />
          </label>
        </div>
        <button
          type="button"
          className="absolute bottom-1 right-1 cursor-pointer p-1"
          onClick={() => setPasswordVisibility((prev) => !prev)}
        >
          {passwordVisibility ? <Eye /> : <EyeClosed />}
        </button>
      </div>
      <div className="self-center mt-4">
        <Button>Entrar</Button>
      </div>
    </form>
  );
}
