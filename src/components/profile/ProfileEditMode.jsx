import React from "react";
import { Formik, Field, Form } from "formik";

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

  return (
    <div className="edit-mode">
      <div className="edit-mode__form">
        <Formik
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
            console.log(resultValues);
            props.updateStatus(values.status);
            props.updateProfileThunkCreator(resultValues);
            if (values.file !== null) {
              props.updatePhoto(values.file);
            }
          }}
        >
          {(props) => (
            <Form>
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
                  />
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
                  className="edit-profile-mode__button-save"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button onClick={() => props.onToggleEditMode(false)}>
        Back to profile
      </button>
    </div>
  );
};
