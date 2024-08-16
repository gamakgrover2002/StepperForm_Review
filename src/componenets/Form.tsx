import React, { useState } from "react";
import { useMultiForm } from "../hooks/useMultiForm";
import { Data } from "../model/Data";
import { useForm, useFieldArray } from "react-hook-form";

import PersonalForm from "./personalForm";
import UploadForm from "./uploadForm";
import FamilyForm from "./familyForm";
import AddressForm from "./addressForm";
import SubmissionSuccessful from "./submitSuccessful";

const Form: React.FC = () => {
  const { prevPage, nextPage, currentStep, setPage } = useMultiForm(5);
  const { control, handleSubmit, formState, setValue } = useForm<Data>({
    defaultValues: {
      name: "",
      age: "",
      email: "",
      contact: "",
      family: [{ name: "", age: "", contact: "" }],
      city: "",
      state: "",
      country: "",
      pincode: "",
      image: "",
      documents: [],
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>(
    "https://static.thenounproject.com/png/49665-200.png"
  );

  const { fields, append, remove } = useFieldArray({ control, name: "family" });
  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({ control, name: "documents" });
  const { errors } = formState;

  const [buttonMode, setButtonMode] = useState<"standard" | "edit">("standard");
  const [editSection, setEditSection] = useState<
    "personal" | "family" | "address" | "upload" | null
  >(null);

  const onSubmit = (data: Data) => {
    console.log(data);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setValue("image", imageUrl);
    }
  };

  const handleAddressSelect = (address: string) => {
    const addressParts = address.split(",");
    const [city, state, country] = addressParts.map((part) => part.trim());
    setValue("city", city || "");
    setValue("state", state || "");
    setValue("country", country || "");
  };

  const handleEditMode = (
    section: "personal" | "family" | "address" | "upload"
  ) => {
    setEditSection(section);
    setButtonMode("edit");
  };

  const handleCancelEdit = () => {
    setButtonMode("standard");
    setEditSection(null);
    setPage(5); // Navigate to the review step
  };

  const handleUpdate = () => {
    setButtonMode("standard");
    setEditSection(null);
    handleSubmit((data) => {
      onSubmit(data);
      setPage(5);
    })();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step step-1">
            <PersonalForm control={control} errors={errors} />
            {buttonMode === "standard" ? (
              <>
                <button
                  className="form-button prev-button"
                  type="button"
                  onClick={prevPage}
                >
                  Prev
                </button>
                <button
                  className="form-button next-button"
                  type="button"
                  onClick={() => {
                    handleSubmit((data) => {
                      onSubmit(data);
                      nextPage();
                    })();
                  }}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  className="form-button cancel-button"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="form-button update-button"
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="step step-2">
            <FamilyForm
              onSubmit={onSubmit}
              control={control}
              errors={errors}
              fields={fields}
              remove={remove}
              append={append}
              handleSubmit={handleSubmit}
            />
            {buttonMode === "standard" ? (
              <>
                <button
                  type="button"
                  className="form-button prev-button"
                  onClick={prevPage}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="form-button next-button"
                  onClick={() => {
                    handleSubmit((data) => {
                      onSubmit(data);
                      nextPage();
                    })();
                  }}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  className="form-button cancel-button"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="form-button update-button"
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="step step-3">
            <AddressForm
              control={control}
              errors={errors}
              handleAddressSelect={handleAddressSelect}
            />
            {buttonMode === "standard" ? (
              <>
                <button
                  type="button"
                  className="form-button prev-button"
                  onClick={prevPage}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="form-button next-button"
                  onClick={() => {
                    handleSubmit((data) => {
                      onSubmit(data);
                      nextPage();
                    })();
                  }}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  className="form-button cancel-button"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="form-button update-button"
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </>
            )}
          </div>
        );

      case 4:
        return (
          <div className="step step-4">
            <UploadForm
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              documentFields={documentFields}
              appendDocument={appendDocument}
              removeDocument={removeDocument}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
            {buttonMode === "standard" ? (
              <>
                <button
                  type="button"
                  className="form-button prev-button"
                  onClick={prevPage}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="form-button next-button"
                  onClick={() => {
                    handleSubmit((data) => {
                      onSubmit(data);
                      nextPage();
                    })();
                  }}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <button
                  className="form-button cancel-button"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="form-button update-button"
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </>
            )}
          </div>
        );
      case 5:
        return (
          <div className="step step-5">
            <h2>Review Your Information</h2>
            <section>
              <h3>Personal Information</h3>
              {editSection === "personal" ? (
                <PersonalForm control={control} errors={errors} />
              ) : (
                <>
                  <PersonalForm control={control} errors={errors} />
                  <button
                    className="form-button edit-button"
                    type="button"
                    onClick={() => {
                      handleEditMode("personal");
                      setPage(1); // Go to the personal step for editing
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </section>
            <section>
              <h3>Family Information</h3>
              {editSection === "family" ? (
                <FamilyForm
                  readOnly={true}
                  control={control}
                  errors={errors}
                  fields={fields}
                  remove={remove}
                  onSubmit={onSubmit}
                  append={append}
                />
              ) : (
                <>
                  <FamilyForm
                    append={append}
                    onSubmit={onSubmit}
                    control={control}
                    errors={errors}
                    fields={fields}
                    remove={remove}
                  />
                  <button
                    className="form-button edit-button"
                    type="button"
                    onClick={() => {
                      handleEditMode("family");
                      setPage(2);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </section>
            <section>
              <h3>Address Information</h3>
              {editSection === "address" ? (
                <AddressForm
                  readOnly={true}
                  control={control}
                  errors={errors}
                  handleAddressSelect={handleAddressSelect}
                />
              ) : (
                <>
                  <AddressForm
                    control={control}
                    errors={errors}
                    handleAddressSelect={handleAddressSelect}
                  />
                  <button
                    className="form-button edit-button"
                    type="button"
                    onClick={() => {
                      handleEditMode("address");
                      setPage(3);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </section>
            <section>
              <h3>Document Information</h3>
              <button
                className="form-button edit-button"
                type="button"
                onClick={() => {
                  handleEditMode("upload");
                  setPage(4);
                }}
              >
                Edit
              </button>
            </section>

            <button
              onClick={() => {
                handleSubmit((data) => {
                  onSubmit(data);
                  nextPage();
                })();
              }}
            >
              Submit
            </button>
          </div>
        );

      case 6:
        return (
          <div>
            <SubmissionSuccessful />
          </div>
        );
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {renderStep()}
    </form>
  );
};

export default Form;
