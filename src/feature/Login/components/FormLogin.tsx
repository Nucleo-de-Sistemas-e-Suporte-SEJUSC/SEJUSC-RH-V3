import { Eye, EyeClosed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useFormLogin from "../hooks/useFormLogin";

export default function FormLogin() {
  const {
    form,
    isPending,
    passwordVisibility,
    setPasswordVisibility,
    onSubmit,
  } = useFormLogin();

  return (
    <Card className="min-w-md bg-sky-200/20 p-5">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="matricula"
              render={({ field }) => {
                const handelMatriculaChange = ({
                  currentTarget,
                }: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = currentTarget;
                  field.onChange(value);
                };

                return (
                  <FormItem>
                    <FormLabel
                      htmlFor="matricula"
                      className="text-lg text-slate-100"
                    >
                      Matrícula
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="matricula"
                        className="rounded bg-slate-200 p-1.5 font-semibold text-slate-800"
                        placeholder="000.000-0 A"
                        autoComplete="current-password"
                        {...field}
                        onChange={handelMatriculaChange}
                      />
                    </FormControl>
                    <FormMessage className="font-medium text-red-800" />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const handelPasswordChange = ({
                  currentTarget,
                }: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = currentTarget;
                  field.onChange(value);
                };

                return (
                  <FormItem>
                    <FormLabel
                      htmlFor="password"
                      className="text-lg text-slate-100"
                    >
                      Senha
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={passwordVisibility ? "text" : "password"}
                          className="rounded bg-slate-200 p-1.5 font-semibold text-slate-800"
                          placeholder="Abc@1234"
                          autoComplete="current-password"
                          {...field}
                          onChange={handelPasswordChange}
                          value={field.value}
                        />
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="absolute right-0 bottom-0 cursor-pointer p-1 hover:bg-slate-200"
                          onClick={() => setPasswordVisibility((prev) => !prev)}
                        >
                          {passwordVisibility ? <Eye /> : <EyeClosed />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="font-medium text-red-800" />
                  </FormItem>
                );
              }}
            />
          </div>
          <CardFooter className="self-center">
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer bg-sky-900 px-10 py-2 font-semibold tracking-wider text-slate-100 uppercase duration-200 ease-in hover:bg-sky-950"
            >
              {isPending ? "Entrando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
