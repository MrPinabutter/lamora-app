"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { type Resolver, useForm, useWatch } from "react-hook-form";
import { Button } from "@/shared/components/atoms/Button";
import { CurrencyInput } from "@/shared/components/atoms/CurrencyInput";
import { Input } from "@/shared/components/atoms/Input";
import { Text } from "@/shared/components/atoms/Text";
import { Field } from "@/shared/components/molecules/Field";
import { CATEGORY_LABELS } from "@/shared/lib/constants";
import {
  createProductAction,
  updateProductAction,
} from "@/server/actions/admin-product.actions";
import {
  adminProductSchema,
  type AdminProductInput,
} from "../schemas/admin-product.schema";
import { ImageReorder } from "./ImageReorder";
import { ImageUploader } from "./ImageUploader";
import { OlfactoryEditor } from "./OlfactoryEditor";

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  defaults: AdminProductInput;
}

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS) as Array<
  [AdminProductInput["category"], string]
>;

const SELECT_CLASSES =
  "border-border bg-surface text-foreground focus-visible:ring-primary h-11 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none";

const TEXTAREA_CLASSES =
  "border-border bg-surface text-foreground focus-visible:ring-primary min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none";

export function ProductForm({ mode, productId, defaults }: ProductFormProps) {
  const router = useRouter();
  const form = useForm<AdminProductInput>({
    resolver: zodResolver(
      adminProductSchema,
    ) as unknown as Resolver<AdminProductInput>,
    defaultValues: defaults,
  });
  const [pending, startTransition] = useTransition();
  const { errors, isDirty } = form.formState;

  const category = useWatch({ control: form.control, name: "category" });
  const price = useWatch({ control: form.control, name: "price" });
  const stock = useWatch({ control: form.control, name: "stock" });
  const images = useWatch({ control: form.control, name: "images" });
  const olfactory = useWatch({ control: form.control, name: "olfactory" });

  const handleAddImage = (url: string) => {
    const isFirst = images.length === 0;
    form.setValue(
      "images",
      [...images, { url, position: images.length, isPrimary: isFirst }],
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleMoveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    if (!moved) return;
    next.splice(to, 0, moved);
    form.setValue(
      "images",
      next.map((image, index) => ({ ...image, position: index })),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleSetPrimary = (index: number) => {
    form.setValue(
      "images",
      images.map((image, i) => ({ ...image, isPrimary: i === index })),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleRemoveImage = (index: number) => {
    const filtered = images.filter((_, i) => i !== index);
    const hasPrimary = filtered.some((image) => image.isPrimary);
    const next = filtered.map((image, i) => ({
      ...image,
      position: i,
      isPrimary: hasPrimary ? image.isPrimary : i === 0,
    }));
    form.setValue("images", next, { shouldDirty: true, shouldValidate: true });
  };

  const handlePriceChange = (value: number) => {
    form.setValue("price", value, { shouldDirty: true, shouldValidate: true });
  };

  const handleStockChange = (rawValue: string) => {
    const digits = rawValue.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
    const value = digits === "" ? 0 : Number.parseInt(digits, 10);
    form.setValue("stock", value, { shouldDirty: true, shouldValidate: true });
  };

  const handleAddNote = () => {
    form.setValue(
      "olfactory",
      [...olfactory, { name: "", tier: "TOPO", intensity: 3 }],
      { shouldDirty: true },
    );
  };

  const handleUpdateNote = (
    index: number,
    value: Partial<AdminProductInput["olfactory"][number]>,
  ) => {
    form.setValue(
      "olfactory",
      olfactory.map((note, i) => (i === index ? { ...note, ...value } : note)),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleRemoveNote = (index: number) => {
    form.setValue(
      "olfactory",
      olfactory.filter((_, i) => i !== index),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const payload: AdminProductInput = {
        ...values,
        olfactory: values.category === "PERFUME" ? values.olfactory : [],
      };
      const result =
        mode === "create"
          ? await createProductAction(payload)
          : await updateProductAction(productId ?? "", payload);

      if (result.ok) {
        router.push("/admin/produtos");
        router.refresh();
        return;
      }
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
      if (result.fieldErrors) {
        for (const [key, msgs] of Object.entries(result.fieldErrors)) {
          if (msgs?.[0]) {
            form.setError(key as keyof AdminProductInput, {
              message: msgs[0],
            });
          }
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          label="Nome"
          htmlFor="product-name"
          error={errors.name?.message}
        >
          <Input id="product-name" {...form.register("name")} />
        </Field>
        <Field
          label="Marca"
          htmlFor="product-brand"
          error={errors.brand?.message}
        >
          <Input id="product-brand" {...form.register("brand")} />
        </Field>
        <Field
          label="Slug"
          htmlFor="product-slug"
          hint="Aparece na URL pública."
          error={errors.slug?.message}
        >
          <Input id="product-slug" {...form.register("slug")} />
        </Field>
        <Field
          label="Categoria"
          htmlFor="product-category"
          error={errors.category?.message}
        >
          <select
            id="product-category"
            className={SELECT_CLASSES}
            {...form.register("category")}
          >
            {CATEGORY_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Preço"
          htmlFor="product-price"
          error={errors.price?.message}
        >
          <CurrencyInput
            id="product-price"
            value={price}
            onValueChange={handlePriceChange}
          />
        </Field>
        <Field
          label="Estoque"
          htmlFor="product-stock"
          error={errors.stock?.message}
        >
          <Input
            id="product-stock"
            type="text"
            inputMode="numeric"
            value={String(stock)}
            onChange={(event) => handleStockChange(event.target.value)}
          />
        </Field>
      </section>

      <section className="space-y-6">
        <Field
          label="Descrição breve"
          htmlFor="product-short-desc"
          hint="Aparece nos cards de listagem."
          error={errors.shortDesc?.message}
        >
          <textarea
            id="product-short-desc"
            className={TEXTAREA_CLASSES}
            {...form.register("shortDesc")}
          />
        </Field>
        <Field
          label="Descrição completa"
          htmlFor="product-full-desc"
          error={errors.fullDesc?.message}
        >
          <textarea
            id="product-full-desc"
            className={TEXTAREA_CLASSES}
            {...form.register("fullDesc")}
          />
        </Field>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <Text variant="eyebrow">Imagens</Text>
          <Text variant="caption" as="p">
            Reordene e defina a imagem principal. A primeira da lista também é
            usada como capa na ausência de uma marcada.
          </Text>
        </div>
        <ImageUploader onAdd={handleAddImage} />
        <ImageReorder
          images={images}
          onMove={handleMoveImage}
          onSetPrimary={handleSetPrimary}
          onRemove={handleRemoveImage}
        />
        {errors.images?.message ? (
          <Text variant="caption" tone="accent" as="p" role="alert">
            {errors.images.message}
          </Text>
        ) : null}
      </section>

      {category === "PERFUME" ? (
        <OlfactoryEditor
          notes={olfactory}
          onAdd={handleAddNote}
          onUpdate={handleUpdateNote}
          onRemove={handleRemoveNote}
          error={errors.olfactory?.message}
        />
      ) : null}

      {errors.root?.message ? (
        <Text variant="caption" tone="accent" as="p" role="alert">
          {errors.root.message}
        </Text>
      ) : null}

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/produtos")}
          disabled={pending}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={pending || (mode === "edit" && !isDirty)}
        >
          {pending
            ? "Salvando…"
            : mode === "create"
              ? "Criar produto"
              : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
