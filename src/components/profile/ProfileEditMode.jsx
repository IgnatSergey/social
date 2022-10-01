import React from "react";
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { validRequired } from "../common/validators/validators";

export const ProfileEditMode = (props) => {
  const contactsArray = [
    "facebook",
    "website",
    "vk",
    "twitter",
    "instagram",
    "youtube",
    "github",
    "mainLink",
  ];

  const [disabledSaveButton, setDisabledSaveButton] = useState(true);

  useEffect(() => {
    return () => {
      props.setErrorMessageProfile(null);
    };
  }, []);

  return (
    <div className="edit-mode">
      <div className="edit-mode__form">
        <Formik
          disabledSaveButton={disabledSaveButton}
          initialValues={{
            ...props.profile,
            ...props.profile.contacts,
            status: props.status,
            file: null,
          }}
          onSubmit={(values) => {
            let resultValues = {};
            let contacts = {};
            let valluesArray = Object.entries(values);
            valluesArray.map(([key, value]) => {
              if (value === null) {
                value = "";
              }
              if (contactsArray.some((contact) => contact === key)) {
                contacts = { ...contacts, [key]: value };
              }
              resultValues = {
                ...resultValues,
                [key]: value,
                contacts: { ...contacts },
              };
            });
            props.updateStatus(values.status);
            props.updateProfileThunkCreator(resultValues);
            if (values.file !== null) {
              props.updatePhoto(values.file);
            }
            setDisabledSaveButton(true);
          }}
        >
          {(props) => (
            <Form onChange={() => setDisabledSaveButton(false)}>
              <div className="edit-profile-mode__list">
                <div className="edit-profile-mode__list-item">
                  <label
                    className="edit-profile-mode__list-label"
                    htmlFor="fullName"
                  >
                    Name:
                  </label>
                  <Field
                    className="edit-profile-mode__list-input"
                    name="fullName"
                    id="fullName"
                    type="text"
                    component="input"
                    validate={validRequired}
                  />
                  {props.errors.fullName && props.touched.fullName && (
                    <div className="error">{props.errors.fullName}</div>
                  )}
                </div>
                <div className="edit-profile-mode__list-item">
                  <label
                    className="edit-profile-mode__list-label"
                    htmlFor="status"
                  >
                    Status:
                  </label>
                  <Field
                    className="edit-profile-mode__list-input edit-profile-mode__list-textarea"
                    name="status"
                    id="status"
                    component="textarea"
                  />
                </div>
                <div className="edit-profile-mode__list-item">
                  <label
                    className="edit-profile-mode__list-label"
                    htmlFor="lookingForAJob"
                  >
                    Looking for a job:
                  </label>
                  <Field
                    type="checkbox"
                    name="lookingForAJob"
                    id="lookingForAJob"
                    component="input"
                  />
                </div>
                <div className="edit-profile-mode__list-item">
                  <label
                    className="edit-profile-mode__list-label"
                    htmlFor="lookingForAJobDescription"
                  >
                    Looking for a job description:
                  </label>
                  <Field
                    className="edit-profile-mode__list-input"
                    name="lookingForAJobDescription"
                    type="text"
                    id="lookingForAJobDescription"
                    component="input"
                  />
                </div>
                <fieldset>
                  <legend>Contacts</legend>
                  {contactsArray.map((key, index) => {
                    return (
                      <div key={index} className="edit-profile-mode__list-item">
                        <label
                          className="edit-profile-mode__list-label"
                          htmlFor={key}
                        >
                          {key}:
                        </label>
                        <Field
                          className="edit-profile-mode__list-input"
                          name={key}
                          type="text"
                          id={key}
                          component="input"
                        />
                      </div>
                    );
                  })}
                </fieldset>
                <div className="edit-profile-mode__list-item-photo">
                  <label
                    className="edit-profile-mode__list-label-photo"
                    htmlFor="loadPhoto"
                    tabIndex={0}
                  >
                    Select avatar
                  </label>
                  <div>
                    {props.values.file === null
                      ? "file not selected"
                      : props.values.file.name}
                  </div>
                  <input
                    className="edit-profile-mode__input-photo visually-hidden"
                    id="loadPhoto"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      props.setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </div>
              </div>
              <div className="edit-profile-mode__button-save-wrapper">
                <button
                  disabled={disabledSaveButton}
                  className="edit-profile-mode__button-save"
                  type="submit"
                >
                  Save changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {props.errorMessage && (
          <div className="error">{props.errorMessage}</div>
        )}
      </div>
      <button onClick={() => props.onToggleEditMode(false)}>
        Back to profile
      </button>
    </div>
  );
};
