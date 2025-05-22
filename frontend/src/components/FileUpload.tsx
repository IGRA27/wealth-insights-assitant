"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (files: File[]) => {
    setUploading(true);
    const form = new FormData();
    files.forEach((f) => form.append("files", f));
    try {
      const resp = await fetch("/api/upload-pdfs", {
        method: "POST",
        body: form,
      });
      if (!resp.ok) throw new Error("Error al subir PDFs");
      toast.success("PDFs subidos y reindexados", {
        action: {
          label: "¡Genial!",
          onClick: () => console.log("Clic en ¡Genial!"),
        },
      });
    } catch (err) {
      toast.error("No se pudieron subir los PDFs");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted bg-muted/5"
      }`}
    >
      <input {...getInputProps()} />
      {uploading
        ? "Subiendo y reindexando..."
        : isDragActive
        ? "Suelta los PDFs aquí"
        : "Arrastra PDFs aquí o haz click para seleccionar"}
    </div>
  );
}
