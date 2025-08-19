import { Link } from "react-router";

import SejuscRH from "@/assets/sejusc-rh.png";
import FormLogin from "@/feature/Login/components/FormLogin";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[url(./assets/background.png)] bg-cover bg-no-repeat py-14">
      <div className="flex grow flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-6">
          <img src={SejuscRH} alt="SEJUSC RH" width={160} height={160} />
          <h1 className="max-w-md text-center text-2xl font-semibold text-slate-100">
            Bem-Vindo ao Sistema de Gestão da Gerência de Recursos Humanos da
            SEJUSC, para continuar é necessário realizar o login.
          </h1>
        </div>
        <FormLogin />
      </div>
      <div className="flex grow items-end justify-center">
        <Link className="text-lg text-slate-200 underline" to={"/desenvolvido"}>
          Desenvolvido pela Gerência da Tecnlogia de Informação - SEJUSC
        </Link>
      </div>
    </main>
  );
}
