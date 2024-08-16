import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Data } from "../model/Data";

interface PersonalFormProps {
  control: Control<Data> | undefined;
  errors: FieldErrors<Data>;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ control, errors }) => {
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
            message: "Contact Number must be 10 digits long",
          },
          maxLength: {
            value: 10,
            message: "Contact Number must be 10 digits long",
          },
        }}
        control={control}
        render={({ field }) => (
          <>
            <input
              className={`form-input ${errors.contact ? "error" : ""}`}
              type="text"
              placeholder="Contact Number"
              {...field}
            />
            {errors.contact && (
              <p className="error-message">{errors.contact.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default PersonalForm;
