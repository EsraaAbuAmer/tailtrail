import { useState, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { UploadBox } from './ImageUploader.styles';

interface ImageUploaderProps {
  maxFiles?: number;
  onChange: (files: File[]) => void;
}

export const ImageUploader = ({ maxFiles = 5, onChange }: ImageUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const validFiles = Array.from(newFiles).slice(0, maxFiles - files.length);
      const updated = [...files, ...validFiles];

      setFiles(updated);
      onChange(updated);

      const urls = validFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...urls]);
    },
    [files, maxFiles, onChange],
  );

  const handleDelete = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onChange(newFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => handleFiles((e.target as HTMLInputElement).files);
    input.click();
  };

  return (
    <Box>
      <UploadBox onClick={handleClick} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="body2" color="text.secondary">
          Click or drag to upload (max {maxFiles})
        </Typography>
      </UploadBox>

      {previews.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          {previews.map((src, idx) => (
            <Box
              key={idx}
              position="relative"
              width={100}
              height={100}
              borderRadius={2}
              overflow="hidden"
              border="1px solid #ddd"
            >
              <img
                src={src}
                alt={`preview-${idx}`}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
              />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(idx);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
