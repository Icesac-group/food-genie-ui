"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";
import { DropoffOption } from "@/store/deliveryStore";

interface DropoffOptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (dropoff: DropoffOption) => void;
}

const DropoffOptionsModal = ({
  open,
  onOpenChange,
  onSave,
}: DropoffOptionsModalProps) => {
  const [formData, setFormData] = useState({
    option: "",
    instructions: "",
    photo: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const dropoffOptions = [
    "Meet at my door",
    "Leave at door",
    "Meet in lobby",
    "Security/Concierge",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Convert to base64 or URL for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.option || !formData.instructions) {
      alert("Please fill in all required fields");
      return;
    }

    onSave({
      id: crypto.randomUUID(),
      option: formData.option,
      instructions: formData.instructions,
      photo: formData.photo,
    });

    // Reset form
    setFormData({
      option: "",
      instructions: "",
      photo: "",
    });
    setUploadedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-recoleta text-2xl text-[#222021]">
            Dropoff Options
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Select Option */}
          <div>
            <Label className="font-campton text-[#222021] text-sm mb-2 block">
              Select An Option<span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.option}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, option: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Meet at my door" />
              </SelectTrigger>
              <SelectContent>
                {dropoffOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Instructions */}
          <div>
            <Label className="font-campton text-[#868686] text-sm mb-2 block">
              Instructions for delivery person
            </Label>
            <Textarea
              placeholder="Meet at my door"
              value={formData.instructions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  instructions: e.target.value,
                }))
              }
              rows={4}
              className="font-campton resize-none"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <Label className="font-campton text-[#868686] text-sm mb-2 block">
              Add Photo
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              {uploadedFile ? (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-campton text-green-600 font-semibold text-sm mb-1">
                    Upload Successful
                  </p>
                  <p className="font-campton text-[#868686] text-xs">
                    {uploadedFile.name} |{" "}
                    {(uploadedFile.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              ) : (
                <label className="cursor-pointer block text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                  <p className="font-campton text-sm mb-1">
                    <span className="text-[#FF7C36] font-semibold">
                      Click to upload
                    </span>{" "}
                    <span className="text-[#868686]">or drag and drop</span>
                  </p>
                  <p className="font-campton text-[#868686] text-xs">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </label>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-8 py-6"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DropoffOptionsModal;
