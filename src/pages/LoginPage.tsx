import { Link } from "react-router";
import FormLogin from "@/feature/Login/components/FormLogin";

export default function LoginPage() {
  return (
    <main className="bg-[url(./assets/background.png)] bg-cover bg-no-repeat min-h-screen flex flex-col py-5">
      <div className="grow flex flex-col items-center gap-14 mt-56">
        <h1 className="text-2xl text-center text-slate-100 font-semibold max-w-md">
          Bem-Vindo ao Sistema de Gestão da Gerência de Recursos Humanos da
          SEJUSC, para continuar é necessário realizar o login.
        </h1>
        <FormLogin />
      </div>
      <div className="grow flex justify-center items-end">
        <Link className="text-lg text-slate-200 underline" to={"/desenvolvido"}>
          Desenvolvido pela Gerência da Tecnlogia de Informação - SEJUSC
        </Link>
      </div>
    </main>
  );
}
