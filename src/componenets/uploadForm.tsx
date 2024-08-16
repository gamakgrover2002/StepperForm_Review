import {
  Controller,
  Control,
  FieldErrors,
  FieldArrayWithId,
  UseFieldArrayAppend,
} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { Data } from "../model/Data";
import { useState } from "react";
interface UploadFormProps {
  control: Control<Data>;
  errors: FieldErrors<Data>;
  documentFields: FieldArrayWithId<Data, "documents", "id">[];
  removeDocument: (index: number) => void;
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
  appendDocument: UseFieldArrayAppend<Data, "documents">;
}

const UploadForm: React.FC<UploadFormProps> = ({
  control,
  errors,
  documentFields,
  removeDocument,

  handleDragOver,
  handleDrop,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file)); // Set the image preview
    }
  };
  const [selectedImage, setSelectedImage] = useState<string>(
    "https://static.thenounproject.com/png/49665-200.png"
  );
  return (
    <div className="step step-4 upload-input">
      <label
        htmlFor="image"
        className="drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          className="image-input"
          id="image"
          hidden
          onChange={handleFileChange}
        />
        <div id="img-view" className="image-preview">
          {selectedImage && <img src={selectedImage} alt="Selected Preview" />}
          <p>Drag and Drop Image to Upload</p>
        </div>
      </label>

      {documentFields.map((item, index) => (
        <div key={item.id} className="documents">
          <Controller
            rules={{ required: "Document is required" }}
            name={`documents.${index}.number`}
            control={control}
            render={({ field }) => (
              <>
                <input
                  className={`form-input ${
                    errors.documents?.[index]?.number ? "error" : ""
                  }`}
                  type="file"
                  {...field}
                />
                {errors.documents?.[index]?.number && (
                  <p className="error-message">
                    {errors.documents[index].number.message}
                  </p>
                )}
              </>
            )}
          />
          <DeleteIcon
            className="form-button remove-button"
            onClick={() => removeDocument(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default UploadForm;
