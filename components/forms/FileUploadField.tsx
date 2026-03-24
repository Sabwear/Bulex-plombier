"use client";

import { useCallback, useId, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import styles from "./FileUploadField.module.css";

const DEFAULT_MAX_FILES = 5;
const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT =
  "image/jpeg,image/png,image/gif,image/webp,application/pdf,.jpg,.jpeg,.png,.gif,.webp,.pdf";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "",
]);

function formatBytes(n: number): string {
  if (n < 1024) return `${n} o`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} Ko`;
  return `${(n / (1024 * 1024)).toFixed(1)} Mo`;
}

function isAllowedFile(f: File): boolean {
  const t = (f.type || "").toLowerCase();
  if (!t) {
    const name = f.name.toLowerCase();
    return /\.(jpe?g|png|gif|webp|pdf)$/i.test(name);
  }
  return ALLOWED_MIME.has(t);
}

const copy = {
  fr: {
    browse: "Parcourir les fichiers",
    selected: (n: number, max: number) =>
      `${n} / ${max} fichier${max > 1 ? "s" : ""} sélectionné${n !== 1 ? "s" : ""}`,
    errOversize: (maxLabel: string) => `Un ou plusieurs fichiers dépassent ${maxLabel}.`,
    errType: "Format non accepté (images ou PDF uniquement).",
    errDup: "Fichier déjà ajouté.",
    errCap: (max: number) => `Maximum ${max} fichiers.`,
    remove: (name: string) => `Retirer ${name}`,
  },
  nl: {
    browse: "Bestanden kiezen",
    selected: (n: number, max: number) =>
      `${n} / ${max} bestand${max !== 1 ? "en" : ""} geselecteerd`,
    errOversize: (maxLabel: string) => `Een of meer bestanden zijn groter dan ${maxLabel}.`,
    errType: "Niet-toegestaan type (alleen afbeeldingen of PDF).",
    errDup: "Bestand staat al in de lijst.",
    errCap: (max: number) => `Maximaal ${max} bestanden.`,
    remove: (name: string) => `${name} verwijderen`,
  },
} as const;

export type FileUploadFieldProps = {
  variant?: "light" | "dark";
  language?: "fr" | "nl";
  id?: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  title: string;
  dropHint: string;
  formatsHint: string;
  maxFiles?: number;
  maxBytesPerFile?: number;
};

export default function FileUploadField({
  variant = "light",
  language = "fr",
  id: idProp,
  files,
  onFilesChange,
  title,
  dropHint,
  formatsHint,
  maxFiles = DEFAULT_MAX_FILES,
  maxBytesPerFile = DEFAULT_MAX_BYTES,
}: FileUploadFieldProps) {
  const t = copy[language];
  const reactId = useId();
  const inputId = idProp ?? `file-upload-${reactId}`;
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const zoneClass =
    variant === "dark"
      ? `${styles.zoneDark} ${dragActive ? styles.zoneActive : ""}`
      : `${styles.zoneLight} ${dragActive ? styles.zoneActive : ""}`;

  const textClass = variant === "dark" ? styles.textDark : styles.textLight;

  const processIncoming = useCallback(
    (incoming: File[]) => {
      setLocalError(null);
      if (incoming.length === 0) return;

      const errors: string[] = [];
      let next = [...files];
      let skippedOversize = 0;
      let skippedType = 0;
      let skippedDup = 0;
      let skippedCap = 0;

      for (const f of incoming) {
        if (next.length >= maxFiles) {
          skippedCap++;
          break;
        }
        if (f.size > maxBytesPerFile) {
          skippedOversize++;
          continue;
        }
        if (!isAllowedFile(f)) {
          skippedType++;
          continue;
        }
        const dup = next.some((x) => x.name === f.name && x.size === f.size && x.lastModified === f.lastModified);
        if (dup) {
          skippedDup++;
          continue;
        }
        next.push(f);
      }

      const maxLabel = formatBytes(maxBytesPerFile);
      if (skippedOversize) errors.push(t.errOversize(maxLabel));
      if (skippedType) errors.push(t.errType);
      if (skippedDup) errors.push(t.errDup);
      if (skippedCap) errors.push(t.errCap(maxFiles));

      onFilesChange(next);
      if (errors.length) setLocalError(errors[0] ?? null);
    },
    [files, maxBytesPerFile, maxFiles, onFilesChange]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (list?.length) processIncoming(Array.from(list));
    e.target.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files);
    processIncoming(dropped);
  };

  const removeAt = (index: number) => {
    setLocalError(null);
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.labelRow}>
        <label className={styles.labelTitle} htmlFor={inputId} style={variant === "dark" ? { color: "#f0fdfa" } : undefined}>
          {title}
        </label>
        <span className={styles.labelHint} style={variant === "dark" ? { color: "rgba(234,246,247,0.78)" } : { color: "var(--text-muted)" }}>
          {formatsHint}
        </span>
      </div>

      <div
        className={zoneClass}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          id={inputId}
          type="file"
          name="attachments"
          multiple
          accept={ACCEPT}
          className={styles.hiddenInput}
          onChange={onInputChange}
          onClick={(e) => e.stopPropagation()}
          aria-describedby={`${inputId}-hint`}
        />
        <div className={`${styles.iconCircle} ${variant === "dark" ? styles.circleDark : styles.circleLight}`}>
          <ImagePlus size={22} strokeWidth={2} aria-hidden />
        </div>
        <div className={`${styles.zoneText} ${textClass}`}>
          <div className={styles.zonePrimary}>{dropHint}</div>
          <div id={`${inputId}-hint`} className={styles.zoneSecondary}>
            {formatsHint}
          </div>
          <span className={`${styles.browseBtn} ${variant === "dark" ? styles.browseDark : styles.browseLight}`}>
            <Upload size={14} style={{ marginRight: 6 }} aria-hidden />
            {t.browse}
          </span>
        </div>
      </div>

      <div className={`${styles.counter} ${variant === "dark" ? styles.counterDark : styles.counterLight}`}>
        {t.selected(files.length, maxFiles)}
      </div>

      {localError ? (
        <p className={`${styles.error} ${variant === "dark" ? styles.errorDark : styles.errorLight}`} role="alert">
          {localError}
        </p>
      ) : null}

      {files.length > 0 ? (
        <ul className={styles.fileList}>
          {files.map((f, i) => (
            <li key={`${f.name}-${f.size}-${f.lastModified}-${i}`} className={`${styles.fileRow} ${variant === "dark" ? styles.rowDark : styles.rowLight}`}>
              <div className={styles.fileMeta}>
                <div className={styles.fileName}>{f.name}</div>
                <div className={styles.fileSize}>{formatBytes(f.size)}</div>
              </div>
              <button
                type="button"
                className={`${styles.remove} ${variant === "dark" ? styles.removeDark : styles.removeLight}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(i);
                }}
                aria-label={t.remove(f.name)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
