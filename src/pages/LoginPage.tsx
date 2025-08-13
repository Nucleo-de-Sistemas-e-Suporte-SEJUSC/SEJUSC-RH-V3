import { Link } from "react-router";
import FormLogin from "@/feature/Login/components/FormLogin";
import Sejusc from "@/assets/sejusc-rh.png";

export default function LoginPage() {
  return (
    <main className="bg-[url(./assets/background.png)] bg-cover bg-no-repeat min-h-screen flex flex-col gap-8 items-center justify-around">
      <div>
        <img height={180} width={180} src={Sejusc} alt="sejusc-rh" />
      </div>
      <div>
        <FormLogin />
      </div>
      <Link
        className="text-lg text-slate-200 underline justify-self-end"
        to={"/desenvolvido"}
      >
        Desenvolvido pela Gerência da Tecnlogia de Informação - SEJUSC
      </Link>
    </main>
  );
}
