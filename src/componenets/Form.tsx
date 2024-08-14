import { useMultiForm } from "../hooks/useMultiForm";
import { Data } from "../model/Data";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Autocomplete from "./AutoComplete";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSwitch } from "../hooks/useSwitch";
const Form: React.FC = () => {
  const { prevPage, nextPage, currentStep, setPage } = useMultiForm(4);
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
  const { mode, handleSwitch } = useSwitch();
  const [data, setData] = useState<Data>();
  const [buttonMode, setButtonMode] = useState(true);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "family",
  });

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control,
    name: "documents",
  });

  const { errors } = formState;

  const onSubmit = (data: Data) => {
    setData(data);
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
    let city = "";
    let state = "";
    let country = "";

    if (addressParts.length === 3) {
      [city, state, country] = addressParts;
    } else if (addressParts.length === 2) {
      [state, country] = addressParts;
    }
    setValue("city", city);
    setValue("state", state);
    setValue("country", country);
  };
  const renderData = () => {
    if (data) {
      return (
        <div className="data-container">
          <div className="user-info">
            <h1>USER</h1>
            <div className="info">
              <h6>Name: {data.name}</h6>
              <h6>Age: {data.age}</h6>
              <h6>Contact: {data.contact}</h6>
              <h6>Email: {data.email}</h6>
            </div>
            <button
              onClick={() => {
                setPage(1);
                handleSwitch();
              }}
            >
              Edit
            </button>
          </div>
          <hr />
          <div className="family-info">
            <h1>Family</h1>
            <div className="info">
              {data.family && data.family.length > 0 ? (
                data.family.map((member, index) => (
                  <div key={index} className="family-member">
                    {Object.entries(member).map(([key, value]) => (
                      <h6 key={key} className="data-item">
                        {key}: {value}
                      </h6>
                    ))}
                  </div>
                ))
              ) : (
                <p>No family data available</p>
              )}
            </div>
            <button
              onClick={() => {
                setPage(2);
                handleSwitch();
              }}
            >
              Edit
            </button>
          </div>
          <hr />
          <div className="address-info">
            <h1>Address</h1>
            <div className="info">
              <h6>City: {data.city}</h6>
              <h6>State: {data.state}</h6>
              <h6>Country: {data.country}</h6>
              <h6>Pincode: {data.pincode}</h6>
            </div>
            <button
              onClick={() => {
                setPage(3);
                handleSwitch();
              }}
            >
              Edit
            </button>
          </div>
          <hr />
          <div className="upload-info">
            <h6>
              Image: {data.image ? <span>Uploaded</span> : "Not Uploaded"}
            </h6>
            <button
              onClick={() => {
                setPage(4);
                handleSwitch();
              }}
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step step-1">
            <Controller
              name="name"
              rules={{ required: "Name is required" }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.name ? "error" : ""}`}
                    type="text"
                    placeholder="Name"
                    {...field}
                  />
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}
                </>
              )}
            />
            <Controller
              name="age"
              rules={{
                required: "Age is required",
                min: {
                  value: 18,
                  message: "You must be 18 years old",
                },
                max: {
                  value: 100,
                  message: "You must be less than 100 years old",
                },
              }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.age ? "error" : ""}`}
                    type="number"
                    placeholder="Age"
                    {...field}
                  />
                  {errors.age && (
                    <p className="error-message">{errors.age.message}</p>
                  )}
                </>
              )}
            />
            <Controller
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.email ? "error" : ""}`}
                    type="text"
                    placeholder="Email"
                    {...field}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}
                </>
              )}
            />
            <Controller
              name="contact"
              rules={{
                required: "Contact Number is required",
                minLength: {
                  value: 10,
                  message: "Contact Number must be at least 10 characters long",
                },
                maxLength: {
                  value: 10,
                  message: "Contact Number should be 10 characters long",
                },
              }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.contact ? "error" : ""}`}
                    type="number"
                    placeholder="Contact Number"
                    {...field}
                  />
                  {errors.contact && (
                    <p className="error-message">{errors.contact.message}</p>
                  )}
                </>
              )}
            />
            {buttonMode && (
              <>
                {" "}
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
            )}
            {!buttonMode && (
              <>
                <button
                  className="form-button form-buttonfNe-cancel"
                  onClick={() => handleSwitch()}
                >
                  Cancel
                </button>
                <button
                  className="form-button form-button-update"
                  onClick={() => {
                    handleSubmit((data) => {
                      console.log(data);
                      onSubmit(data);
                      handleSwitch();
                    })();
                  }}
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
            {fields.map((item, index) => (
              <div key={item.id} className="family-member">
                <Controller
                  rules={{ required: "Family Member Name is required" }}
                  name={`family.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className={`form-input ${
                          errors.family?.[index]?.name ? "error" : ""
                        }`}
                        type="text"
                        placeholder="Family Member Name"
                        {...field}
                      />
                      {errors.family?.[index]?.name && (
                        <p className="error-message">
                          {errors.family[index].name.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <Controller
                  name={`family.${index}.age`}
                  rules={{
                    required: "Age is required",
                    min: {
                      value: 18,
                      message: "You must be 18 years old",
                    },
                    max: {
                      value: 100,
                      message: "You must be less than 100 years old",
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className={`form-input ${
                          errors.family?.[index]?.age ? "error" : ""
                        }`}
                        type="number"
                        placeholder="Family Member Age"
                        {...field}
                      />
                      {errors.family?.[index]?.age && (
                        <p className="error-message">
                          {errors.family[index].age.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <Controller
                  name={`family.${index}.contact`}
                  rules={{
                    required: "Contact Number is required",
                    minLength: {
                      value: 10,
                      message:
                        "Contact Number must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 10,
                      message: "Contact Number should be 10 characters long",
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        className={`form-input ${
                          errors.family?.[index]?.contact ? "error" : ""
                        }`}
                        type="text"
                        placeholder="Contact"
                        {...field}
                      />
                      {errors.family?.[index]?.contact && (
                        <p className="error-message">
                          {errors.family[index].contact.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <DeleteIcon
                  className="form-button remove-button"
                  onClick={() => {
                    if (fields.length > 1) {
                      remove(index);
                    } else {
                      alert("Must fill cannot be deleted");
                    }
                  }}
                />
              </div>
            ))}
            {buttonMode && (
              <>
                {" "}
                <button
                  type="button"
                  className="form-button add-button"
                  onClick={() => {
                    handleSubmit(onSubmit);
                    if (errors.family) {
                      alert("Please fill all the fields before adding more");
                    } else {
                      append({ name: "", age: "", contact: "" });
                    }
                  }}
                >
                  Add
                </button>
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
            )}
            {!buttonMode && (
              <>
                <button
                  className="form-button form-button-cancel"
                  onClick={() => handleSwitch()}
                >
                  Cancel
                </button>
                <button
                  className="form-button form-button-update"
                  onClick={() => {
                    handleSubmit((data) => {
                      onSubmit(data);
                      handleSwitch();
                    })();
                  }}
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
            <Autocomplete onSelect={handleAddressSelect} />
            <Controller
              name="city"
              rules={{ required: "City is required" }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.city ? "error" : ""}`}
                    type="text"
                    placeholder="City"
                    {...field}
                  />
                  {errors.city && (
                    <p className="error-message">{errors.city.message}</p>
                  )}
                </>
              )}
            />
            <Controller
              name="state"
              rules={{ required: "State is required" }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.state ? "error" : ""}`}
                    type="text"
                    placeholder="State"
                    {...field}
                  />
                  {errors.state && (
                    <p className="error-message">{errors.state.message}</p>
                  )}
                </>
              )}
            />
            <Controller
              name="country"
              rules={{ required: "Country is required" }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.country ? "error" : ""}`}
                    type="text"
                    placeholder="Country"
                    {...field}
                  />
                  {errors.country && (
                    <p className="error-message">{errors.country.message}</p>
                  )}
                </>
              )}
            />
            <Controller
              name="pincode"
              rules={{ required: "Pincode is required" }}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${errors.pincode ? "error" : ""}`}
                    type="number"
                    placeholder="Pincode"
                    {...field}
                  />
                  {errors.pincode && (
                    <p className="error-message">{errors.pincode.message}</p>
                  )}
                </>
              )}
            />
            {buttonMode && (
              <>
                {" "}
                <button
                  type="button"
                  className="form-button add-button"
                  onClick={() => {
                    handleSubmit((data) => {
                      onSubmit(data);
                    })();
                  }}
                >
                  Add
                </button>
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
            )}
            {!buttonMode && (
              <>
                <button
                  className="form-button form-button-cancel"
                  onClick={() => handleSwitch()}
                >
                  Cancel
                </button>
                <button
                  className="form-button form-button-update"
                  onClick={() => {
                    handleSubmit((data) => {
                      console.log(data);
                      onSubmit(data);
                      handleSwitch();
                    })();
                  }}
                >
                  Update
                </button>
              </>
            )}
          </div>
        );
      case 4:
        return (
          <div className="step step-4 upload-input">
            <label
              htmlFor="image"
              className="drop-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Controller
                control={control}
                name="image"
                render={() => (
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    className="image-input"
                    hidden
                    multiple
                  />
                )}
              />
              <div id="img-view" className="image-preview">
                <img src={selectedImage} alt="Selected Preview" />
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
            {buttonMode && (
              <>
                <button
                  type="button"
                  onClick={() => appendDocument({ number: "" })}
                >
                  Add
                </button>

                <button
                  type="button"
                  className="form-button prev-button"
                  onClick={prevPage}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="form-button submit-button"
                  onClick={() => {
                    handleSubmit(onSubmit)();
                    handleSwitch();
                    setButtonMode(false);
                  }}
                >
                  Submit
                </button>
              </>
            )}
            {!buttonMode && (
              <>
                <button className="form-button" onClick={() => handleSwitch()}>
                  Cancel
                </button>
                <button
                  className="form-button"
                  onClick={() => {
                    handleSubmit((data) => {
                      console.log(data);
                      onSubmit(data);
                      handleSwitch();
                    })();
                  }}
                >
                  Update
                </button>
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {mode === true && renderStep()}
      {mode === false && renderData()}
    </form>
  );
};

export default Form;
