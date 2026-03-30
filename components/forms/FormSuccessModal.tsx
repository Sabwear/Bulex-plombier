"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo } from "react";
import { getPublicPhoneE164Digits } from "@/config/public-phone";
import { buildWhatsAppHref } from "@/lib/whatsappPrefill";

export type FormSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  locale: "fr" | "nl";
  /** Address where the confirmation email was sent */
  userEmail: string;
  /** Plain-text copy of the submission — opens WhatsApp with the same info as the e-mail */
  whatsappPrefillText?: string;
};

export default function FormSuccessModal({
  open,
  onClose,
  locale,
  userEmail,
  whatsappPrefillText,
}: FormSuccessModalProps) {
  const waHref = useMemo(() => {
    if (whatsappPrefillText?.trim()) {
      return buildWhatsAppHref(whatsappPrefillText);
    }
    return `https://wa.me/${getPublicPhoneE164Digits()}`;
  }, [whatsappPrefillText]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const t =
    locale === "nl"
      ? {
          title: "Aanvraag verzonden",
          p1: "Bedankt voor uw bericht — alles is goed ontvangen.",
          p2Before: "U ontvangt een bevestigingsmail met een kopie van uw aanvraag op ",
          p2After: " (controleer eventueel uw spam).",
          p3: "We nemen zo snel mogelijk contact met u op.",
          waLabel: "Voor een snellere reactie kunt u ons ook bereiken via WhatsApp:",
          waBtn: "Open WhatsApp",
          close: "Sluiten",
        }
      : {
          title: "Envoi réussi",
          p1: "Merci — votre demande a bien été transmise.",
          p2Before: "Vous recevrez un e-mail de confirmation avec une copie de votre message à l’adresse ",
          p2After: " (pensez à vérifier vos courriers indésirables).",
          p3: "Notre équipe vous recontactera dans les plus brefs délais.",
          waLabel: "Pour une réponse plus rapide, vous pouvez aussi nous écrire sur WhatsApp :",
          waBtn: "Ouvrir WhatsApp",
          close: "Fermer",
        };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-success-modal-title"
        className="relative w-full max-w-md rounded-2xl border bg-white p-6 shadow-2xl"
        style={{ borderColor: "var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
          style={{ background: "rgba(34, 197, 94, 0.15)", color: "rgb(22, 101, 52)" }}
          aria-hidden
        >
          ✓
        </div>
        <h2
          id="form-success-modal-title"
          className="text-xl font-semibold"
          style={{ color: "var(--text-heading)", marginBottom: "0.75rem" }}
        >
          {t.title}
        </h2>
        <p style={{ color: "var(--text-body)", fontSize: "0.95rem", marginBottom: "0.65rem" }}>{t.p1}</p>
        <p style={{ color: "var(--text-body)", fontSize: "0.95rem", marginBottom: "0.65rem" }}>
          {t.p2Before}
          <strong style={{ color: "var(--text-heading)" }}>{userEmail}</strong>
          {t.p2After}
        </p>
        <p style={{ color: "var(--text-body)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>{t.p3}</p>

        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(37, 211, 102, 0.08)", border: "1px solid rgba(37, 211, 102, 0.35)" }}
        >
          <p style={{ fontSize: "0.88rem", color: "var(--text-heading)", marginBottom: "0.75rem", fontWeight: 600 }}>
            {t.waLabel}
          </p>
          <Link href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", background: "#25D366", borderColor: "#25D366" }}>
            {t.waBtn}
          </Link>
        </div>

        <button type="button" className="btn btn-outline mt-4 w-full" onClick={onClose}>
          {t.close}
        </button>
      </div>
    </div>
  );
}
