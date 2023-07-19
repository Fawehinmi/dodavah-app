import React, { useEffect, useState } from "react";
import { useProfileState } from "./context";
import helper from "../../helper";
import ApButton from "../../components/button";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import ApTextInput from "../../components/input/TextInput";
import ApLoader from "../../components/spinner";

const PasswordChangeSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
      "Invalid password"
    ),
  confirmNewPassword: Yup.string()
    .required("Please Confirm your password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
const ProfilePage = () => {
  const { fetchProfilePage, profile, loading } = useProfileState();

  const [showEditProfileModal, setShowEditProfileModal] =
    useState<boolean>(false);

  const handleChangePassword = async (values: any) => {
    delete values.confirmNewPassword;
  };

  useEffect(() => {
    fetchProfilePage();
  }, []);

  return (
    <div className="relative">
      {loading && (
        <div className="w-full h-96 flex items-center justify-center">
          <ApLoader />
        </div>
      )}

      {!loading && (
        <>
          {showEditProfileModal && (
            <div
              onClick={() => setShowEditProfileModal(false)}
              className="w-full h-full absolute bg-black opacity-50"
            ></div>
          )}
          {showEditProfileModal && (
            <div className=" absolute  top-20 p-2 w-full">
              <div className="mx-4 bg-white px-3 py-3 ">
                <div className="flex justify-between">
                  <div></div>
                  <p className="font-semibold">Personal Information</p>
                  <p onClick={() => setShowEditProfileModal(false)}>X</p>
                </div>
                <Formik
                  initialValues={{
                    firstName: profile?.firstName || "",
                    lastName: profile?.lastName || "",
                    email: profile?.email || "",
                    phoneNumber: profile?.phoneNumber || "",
                  }}
                  validationSchema={PasswordChangeSchema}
                  onSubmit={handleChangePassword}
                >
                  {(props: FormikProps<any>) => (
                    <Form className="">
                      <div className="my-2">
                        <ApTextInput
                          label="First Name"
                          name="firstName"
                          type="text"
                          className="py-2"
                          labelClassName="text-sm my-1"
                        />
                      </div>

                      <div className="my-2">
                        <ApTextInput
                          label="Last Name"
                          name="lastName"
                          type="text"
                          className="py-2"
                          labelClassName="text-sm my-1"
                        />
                      </div>
                      <div className="my-2">
                        <ApTextInput
                          label="Email"
                          name="email"
                          type="text"
                          className="py-2 font-semibold"
                          disabled
                          labelClassName="text-sm my-1"
                        />
                      </div>
                      <div className="my-2">
                        <ApTextInput
                          label="Phone Number"
                          name="phoneNumber"
                          type="text"
                          className="py-2"
                          labelClassName="text-sm my-1"
                        />
                      </div>
                      <div className="my-2">
                        <ApTextInput
                          label="Address"
                          name="address"
                          type="textarea"
                          className="py-2"
                          labelClassName="text-sm my-1"
                        />
                      </div>

                      <ApButton
                        className="w-full py-2 bg-rose-500 text-white rounded-lg my-2 hover:bg-rose-600 active:bg-rose-600 active:text-white focus:bg-rose-600"
                        name="Save changes"
                        // loading={loading}
                        htmlType="submit"
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
          <div className="flex  w-full justify-center pt-3">
            <div className="flex items-center justify-center h-20 w-20 bg-gray-200 rounded-full">
              <p className="text-rose-500 font-bold text-lg">
                {helper.shortName(profile?.fullName)}
              </p>
            </div>
          </div>
          <p className="text-center font-semibold">{profile?.fullName}</p>
          <div className="px-3">
            <div className="flex justify-between mb-2 items-end">
              <p className="font-semibold">Personal Information</p>
              <ApButton
                className="bg-rose-500 text-white rounded-md py-1 px-2"
                name="Edit"
                onClick={() => setShowEditProfileModal(true)}
              />
            </div>

            <div className="flex justify-between bg-gray-100 px-2 mb-2 rounded-sm py-2">
              <p>First Name : </p>
              <p className="">{profile?.firstName}</p>
            </div>
            <div className="flex justify-between bg-gray-100 px-2 my-2 rounded-sm py-2">
              <p>Last Name : </p>
              <p className="">{profile?.lastName}</p>
            </div>
            <div className="flex justify-between bg-gray-100 px-2 my-2 rounded-sm py-2">
              <p>Email : </p>
              <p className="">{profile?.email}</p>
            </div>
          </div>
          <div className="px-3 my-2">
            <p className="font-semibold mb-2">Contact Information</p>
            <div className="flex justify-between bg-gray-100 px-2 mb-2 rounded-sm py-2">
              <p>Contact Phone : </p>
              <p className="">{profile?.phoneNumber}</p>
            </div>
            <div className="bg-gray-100 px-2 mb-2 rounded-sm py-2">
              <p>Address : No 6 Aworan Jesu Street, pipeline ilorin</p>
            </div>
          </div>
          {!showEditProfileModal && (
            <div className="px-3 my-2 mb-40">
              <p className="font-semibold">Security</p>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmNewPassword: "",
                }}
                validationSchema={PasswordChangeSchema}
                onSubmit={handleChangePassword}
              >
                {(props: FormikProps<any>) => (
                  <Form className="">
                    <div className="my-2">
                      <ApTextInput
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                        className="py-2"
                        labelClassName="text-sm my-1"
                      />
                    </div>

                    <div className="my-2">
                      <ApTextInput
                        label="New Password"
                        name="newPassword"
                        type="password"
                        className="py-2"
                        labelClassName="text-sm my-1"
                      />
                    </div>
                    <div className="my-2">
                      <ApTextInput
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        type="password"
                        className="py-2"
                        labelClassName="text-sm my-1"
                      />
                    </div>

                    <p className="text-sm font-semibold">
                      * Note Password must contain at least one uppercase
                      letter, one lowercase letter, one number and one special
                      character
                    </p>

                    <ApButton
                      className="w-full py-2 bg-rose-500 text-white rounded-lg my-2 hover:bg-rose-600 active:bg-rose-600 active:text-white focus:bg-rose-600"
                      name="Change Password"
                      // loading={loading}
                      htmlType="submit"
                    />

                    <ApButton
                      htmlType="button"
                      className="w-full my-2"
                      name="Reset password "
                    />
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
