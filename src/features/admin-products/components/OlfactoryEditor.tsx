"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Text } from "@/shared/components/atoms/Text";
import { Field } from "@/shared/components/molecules/Field";
import { NOTE_TIER_LABELS } from "@/shared/lib/constants";
import type { AdminOlfactoryInput } from "../schemas/admin-product.schema";

interface OlfactoryEditorProps {
  notes: AdminOlfactoryInput[];
  onAdd: () => void;
  onUpdate: (index: number, value: Partial<AdminOlfactoryInput>) => void;
  onRemove: (index: number) => void;
  /** Erro agregado para o campo `olfactory` (validação Zod). */
  error?: string;
}

const TIER_OPTIONS = Object.entries(NOTE_TIER_LABELS) as Array<
  [AdminOlfactoryInput["tier"], string]
>;

export function OlfactoryEditor({
  notes,
  onAdd,
  onUpdate,
  onRemove,
  error,
}: OlfactoryEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <Text variant="eyebrow">Pirâmide olfativa</Text>
          <Text variant="caption" as="p">
            Apenas para perfumes — topo, coração e fundo com intensidade 1 a 5.
          </Text>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={onAdd}>
          <Plus className="size-4" aria-hidden />
          Adicionar nota
        </Button>
      </div>

      {error ? (
        <Text variant="caption" tone="accent" as="p" role="alert">
          {error}
        </Text>
      ) : null}

      {notes.length === 0 ? (
        <div className="border-border rounded-md border border-dashed p-6 text-center">
          <Text variant="caption" as="p">
            Nenhuma nota cadastrada.
          </Text>
        </div>
      ) : (
        <ul className="space-y-3">
          {notes.map((note, index) => (
            <li
              key={index}
              className="border-border bg-surface rounded-md border p-4"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_120px_auto]">
                <Field
                  label="Nota"
                  htmlFor={`olfactory-name-${index}`}
                >
                  <Input
                    id={`olfactory-name-${index}`}
                    value={note.name}
                    onChange={(event) =>
                      onUpdate(index, { name: event.target.value })
                    }
                  />
                </Field>
                <Field
                  label="Camada"
                  htmlFor={`olfactory-tier-${index}`}
                >
                  <select
                    id={`olfactory-tier-${index}`}
                    value={note.tier}
                    onChange={(event) =>
                      onUpdate(index, {
                        tier: event.target
                          .value as AdminOlfactoryInput["tier"],
                      })
                    }
                    className="border-border bg-surface text-foreground focus-visible:ring-primary h-11 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {TIER_OPTIONS.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Intensidade"
                  htmlFor={`olfactory-intensity-${index}`}
                >
                  <Input
                    id={`olfactory-intensity-${index}`}
                    type="number"
                    min={1}
                    max={5}
                    value={note.intensity}
                    onChange={(event) =>
                      onUpdate(index, {
                        intensity: Number(event.target.value),
                      })
                    }
                  />
                </Field>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                    aria-label="Remover nota"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
