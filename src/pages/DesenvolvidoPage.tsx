import Yuri from "@/assets/yuri.png";
import Felipe from "@/assets/felipe.png";
import Nathalia from "@/assets/nathalia.png";
import Boss from "@/assets/boss.png";

const employees = [
  {
    id: 1,
    img: Boss,
    name: "Gabriel Nery",
    description: "Gerente de Tecnologia da Informação",
  },
  {
    id: 2,
    img: Yuri,
    name: "Yuri Odilon",
    description: "Desenvolvedor Front-End",
  },
  {
    id: 3,
    img: Felipe,
    name: "Felipe Robson",
    description: "Desenvolvedor Back-End",
  },
  {
    id: 4,
    img: Nathalia,
    name: "Nathalia Alencar",
    description: "Desenvolvedora Front-End | Power BI",
  },
];

export default function DesenvolvidoPage() {
  return (
    <main className="bg-[url(./assets/background.png)] bg-cover bg-no-repeat min-h-screen flex flex-col gap-8 items-center justify-center">
      <div className="flex gap-6 max-w-6xl">
        {employees.map(({ id, img, name, description }) => (
          <div
            key={id}
            className="flex flex-col gap-4 py-3.5 px-1 items-center text-center bg-sky-900 rounded-2xl overflow-hidden"
          >
            <div className="rounded-xl overflow-hidden">
              <img src={img} alt={name} />
            </div>
            <div>
              <h1 className="text-2xl text-slate-200 font-semibold">{name}</h1>
              <p className="text-md text-balance text-slate-300">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
