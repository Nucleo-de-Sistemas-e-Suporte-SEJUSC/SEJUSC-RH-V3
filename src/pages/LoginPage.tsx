import FormLogin from "@/feature/Login/components/FormLogin";

export default function LoginPage() {
    return (
        <main className="bg-[url(./assets/background.png)] bg-cover bg-no-repeat min-h-screen flex flex-col gap-8 items-center justify-center">
            <h1 className="text-6xl font-semibold tracking-widest text-slate-100">Login</h1>
            <FormLogin />
        </main>
    )
}