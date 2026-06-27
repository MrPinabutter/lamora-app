"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { requestProductImageUploadAction } from "@/server/actions/admin-product-upload.actions";
import { Button } from "@/shared/components/atoms/Button";
import { Text } from "@/shared/components/atoms/Text";

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 5 * 1024 * 1024;

const CONTENT_TYPE_BY_MIME: Record<string, "image/jpeg" | "image/png" | "image/webp"> = {
  "image/jpeg": "image/jpeg",
  "image/jpg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

interface ImageUploaderProps {
  onAdd: (url: string) => void;
}

export function ImageUploader({ onAdd }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem.");
      return;
    }
    const contentType = CONTENT_TYPE_BY_MIME[file.type];
    if (!contentType) {
      setError("Use JPG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("A imagem deve ter no máximo 5 MB.");
      return;
    }

    setUploading(true);
    try {
      const presign = await requestProductImageUploadAction({ contentType });
      if (!presign.ok) {
        setError(presign.error);
        return;
      }

      const upload = await fetch(presign.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: file,
      });
      if (!upload.ok) {
        setError("Falha ao enviar a imagem. Tente novamente.");
        return;
      }

      onAdd(presign.publicUrl);
    } catch {
      setError("Falha ao enviar a imagem. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Text variant="caption" as="p">
        Envie JPG, PNG ou WebP (até 5 MB). A imagem é armazenada no bucket S3.
      </Text>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        aria-hidden
        onChange={handleSelect}
        disabled={uploading}
      />
      <Button
        type="button"
        variant="secondary"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="shrink-0"
      >
        <Upload className="size-4" aria-hidden />
        {uploading ? "Baixando..." : "Selecionar imagem"}
      </Button>
      {error ? (
        <Text variant="caption" tone="accent" as="p" role="alert">
          {error}
        </Text>
      ) : null}
    </div>
  );
}
