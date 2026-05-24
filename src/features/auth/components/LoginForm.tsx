"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Field } from "@/shared/components/molecules/Field";
import { loginAction } from "@/server/actions/auth.actions";
import { loginSchema, type LoginInput } from "../schemas/login.schema";

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const [pending, startTransition] = useTransition();
  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await loginAction(values);
      if (!result) return;
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
      if (result.fieldErrors) {
        for (const [key, msgs] of Object.entries(result.fieldErrors)) {
          if (msgs?.[0]) {
            form.setError(key as keyof LoginInput, { message: msgs[0] });
          }
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Field
        label="E-mail"
        htmlFor="login-email"
        error={errors.email?.message}
      >
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          {...form.register("email")}
        />
      </Field>

      <Field
        label="Senha"
        htmlFor="login-password"
        error={errors.password?.message}
      >
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
        />
      </Field>

      {errors.root?.message ? (
        <p role="alert" className="text-accent text-xs">
          {errors.root.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
