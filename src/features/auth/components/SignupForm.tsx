"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Field } from "@/shared/components/molecules/Field";
import { signupAction } from "@/server/actions/auth.actions";
import { signupSchema } from "../schemas/signup.schema";
import { LgpdConsent } from "./LgpdConsent";

// Tipo do que os inputs HTML produzem (strings, boolean p/ checkbox). O Zod
// transforma para `SignupInput` (com `Date` e `true`) no submit + no servidor.
interface SignupFormValues {
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  lgpdConsent: boolean;
}

export function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema) as unknown as Resolver<SignupFormValues>,
    defaultValues: {
      email: "",
      password: "",
      birthDate: "",
      phone: "",
      lgpdConsent: false,
    },
  });
  const [pending, startTransition] = useTransition();
  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await signupAction(values);
      if (!result) return;
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
      if (result.fieldErrors) {
        for (const [key, msgs] of Object.entries(result.fieldErrors)) {
          if (msgs?.[0]) {
            form.setError(key as keyof SignupFormValues, {
              message: msgs[0],
            });
          }
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Field
        label="E-mail"
        htmlFor="signup-email"
        error={errors.email?.message}
      >
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          {...form.register("email")}
        />
      </Field>

      <Field
        label="Senha"
        htmlFor="signup-password"
        hint="Mínimo de 8 caracteres."
        error={errors.password?.message}
      >
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          {...form.register("password")}
        />
      </Field>

      <Field
        label="Data de nascimento"
        htmlFor="signup-birthdate"
        error={errors.birthDate?.message}
      >
        <Input
          id="signup-birthdate"
          type="date"
          {...form.register("birthDate")}
        />
      </Field>

      <Field
        label="Telefone"
        htmlFor="signup-phone"
        hint="DDD + número, somente dígitos."
        error={errors.phone?.message}
      >
        <Input
          id="signup-phone"
          type="tel"
          inputMode="numeric"
          placeholder="85999999999"
          autoComplete="tel"
          {...form.register("phone")}
        />
      </Field>

      <LgpdConsent
        id="signup-consent"
        error={errors.lgpdConsent?.message}
        {...form.register("lgpdConsent")}
      />

      {errors.root?.message ? (
        <p role="alert" className="text-accent text-xs">
          {errors.root.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Criando conta…" : "Criar conta"}
      </Button>
    </form>
  );
}
