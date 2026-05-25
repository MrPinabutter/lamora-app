"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Text } from "@/shared/components/atoms/Text";
import { Field } from "@/shared/components/molecules/Field";
import { updateProfileAction } from "@/server/actions/profile.actions";
import { profileSchema } from "../schemas/profile.schema";

interface ProfileFormDefaults {
  email: string;
  /** ISO date string yyyy-mm-dd (formato do <input type="date">). */
  birthDate: string;
  phone: string;
}

interface ProfileFormProps {
  defaults: ProfileFormDefaults;
}

interface ProfileFormValues {
  email: string;
  birthDate: string;
  phone: string;
}

export function ProfileForm({ defaults }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(
      profileSchema,
    ) as unknown as Resolver<ProfileFormValues>,
    defaultValues: defaults,
  });
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((values) => {
    setSuccess(false);
    startTransition(async () => {
      const result = await updateProfileAction(values);
      if (result.ok) {
        setSuccess(true);
        form.reset(values);
        return;
      }
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
      if (result.fieldErrors) {
        for (const [key, msgs] of Object.entries(result.fieldErrors)) {
          if (msgs?.[0]) {
            form.setError(key as keyof ProfileFormValues, {
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
        htmlFor="profile-email"
        error={errors.email?.message}
      >
        <Input
          id="profile-email"
          type="email"
          autoComplete="email"
          {...form.register("email")}
        />
      </Field>

      <Field
        label="Data de nascimento"
        htmlFor="profile-birthdate"
        error={errors.birthDate?.message}
      >
        <Input
          id="profile-birthdate"
          type="date"
          {...form.register("birthDate")}
        />
      </Field>

      <Field
        label="Telefone"
        htmlFor="profile-phone"
        hint="DDD + número, somente dígitos."
        error={errors.phone?.message}
      >
        <Input
          id="profile-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          {...form.register("phone")}
        />
      </Field>

      {errors.root?.message ? (
        <Text variant="caption" tone="accent" as="p" role="alert">
          {errors.root.message}
        </Text>
      ) : null}

      {success ? (
        <Text variant="caption" as="p" role="status">
          Perfil atualizado.
        </Text>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Salvando…" : "Salvar alterações"}
      </Button>
    </form>
  );
}
