import { Eye, EyeClosed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import useFormLogin from "../hooks/useFormLogin";
import Term from "./Term";

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
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="term"
                        className="text-slate-200"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="term"
                      className="text-md font-semibold text-slate-200"
                    >
                      Eu aceito o
                    </FormLabel>

                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="cursor-pointer font-semibold text-slate-200 underline underline-offset-2"
                        >
                          termo de política de privacidade.
                        </button>
                      </DialogTrigger>
                      <DialogContent
                        className="min-w-[800px]"
                        aria-describedby={undefined}
                      >
                        <DialogHeader className="items-center">
                          <DialogHeader className="text-2xl font-semibold">
                            <DialogTitle>
                              Política de Privacidade – Sistema SEJUSC RH
                            </DialogTitle>
                          </DialogHeader>
                        </DialogHeader>
                        <ScrollArea className="h-[524px]">
                          <Term />
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
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
