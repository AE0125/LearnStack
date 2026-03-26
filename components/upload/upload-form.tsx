"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("File uploaded successfully!")
        setFile(null)
        // Reset file input
        const fileInput = document.getElementById("file-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        toast.error(data.error || "Failed to upload file")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select File</CardTitle>
        <CardDescription>Choose a file from your computer to upload.</CardDescription>
      </CardHeader>
      <form onSubmit={handleUpload}>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
              className="cursor-pointer"
            />
          </div>
          {file && (
            <div className="mt-4 text-sm text-muted-foreground">
              Selected: <span className="font-medium text-foreground">{file.name}</span> (
              {(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!file || uploading} className="w-full">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload to MinIO
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
