"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Text } from "@/shared/components/atoms/Text";

interface ImageUploaderProps {
  // Espaço reservado: futuramente este componente fará upload para um bucket
  // S3 e devolverá a URL final. Por ora, recebemos a URL diretamente.
  onAdd: (url: string) => void;
}

export function ImageUploader({ onAdd }: ImageUploaderProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Cole uma URL antes de adicionar.");
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setError("URL inválida.");
      return;
    }
    onAdd(trimmed);
    setUrl("");
    setError(null);
  };

  return (
    <div className="space-y-2">
      <Text variant="caption" as="p">
        Cole a URL da imagem. (Upload para bucket virá com a integração S3.)
      </Text>
      <div className="flex gap-2">
        <Input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://…"
          aria-label="URL da imagem"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleAdd}
          className="shrink-0"
        >
          <Plus className="size-4" aria-hidden />
          Adicionar
        </Button>
      </div>
      {error ? (
        <Text variant="caption" tone="accent" as="p" role="alert">
          {error}
        </Text>
      ) : null}
    </div>
  );
}
