"use client";

import { useState, useTransition } from "react";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Text } from "@/shared/components/atoms/Text";
import { Field } from "@/shared/components/molecules/Field";
import { Modal } from "@/shared/components/organisms/Modal/Modal";
import { deleteAccountAction } from "@/server/actions/profile.actions";

const CONFIRM_PHRASE = "EXCLUIR";

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (pending) return;
    setOpen(false);
    setConfirmation("");
    setError(null);
  };

  const handleConfirm = () => {
    if (confirmation !== CONFIRM_PHRASE) {
      setError(`Digite ${CONFIRM_PHRASE} para confirmar.`);
      return;
    }
    setError(null);
    startTransition(async () => {
      await deleteAccountAction();
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpen(true)}
        className="border-accent/40 text-accent hover:bg-accent/5"
      >
        Excluir minha conta
      </Button>

      <Modal open={open} onClose={handleClose} title="Excluir conta">
        <div className="space-y-5">
          <Text variant="body" as="p">
            A exclusão é definitiva: seus dados pessoais são anonimizados (LGPD)
            e você não conseguirá mais entrar com este e-mail.
          </Text>
          <Field
            label={`Digite ${CONFIRM_PHRASE} para confirmar`}
            htmlFor="delete-confirmation"
            error={error ?? undefined}
          >
            <Input
              id="delete-confirmation"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </Field>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={pending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={pending || confirmation !== CONFIRM_PHRASE}
            >
              {pending ? "Excluindo…" : "Excluir definitivamente"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
