import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import ApTextInput from "../../components/input/TextInput";
import ApButton from "../../components/button";
import { useCreateSignUp } from "./gql/query";
import { toastSvc } from "../../services";
const FormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
});

interface IProps {
  setPage: (page: "signIn" | "signUp") => void;
  onDissmiss: () => void;
}
export const SignupPage: React.FC<IProps> = ({ setPage, onDissmiss }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [signUp, {}] = useCreateSignUp((res: any) => {
    onDissmiss();
  });

  const handleSubmit = async (values: any) => {
    toastSvc.success("clicked");
    delete values.confirmPassword;
    signUp({ variables: { user: values } });
  };
  return (
    <div>
      <div className="text-center my-3">
        <h3 className="font-semibold text-lg">Sign Up</h3>
      </div>

      <div className="px-3 mt-3">
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            username: "",
            phoneNumber: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className="">
              <div>
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
                  label="Username"
                  name="username"
                  type="text"
                  className="py-2"
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
                  label="Email Address"
                  name="email"
                  type="text"
                  className="py-2"
                  labelClassName="text-sm my-1"
                />
              </div>
              <div className="my-2">
                <ApTextInput
                  label="Password"
                  name="password"
                  type="password"
                  className="py-2"
                  labelClassName="text-sm my-1"
                />
              </div>
              <div className="my-2">
                <ApTextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  className="py-2"
                  labelClassName="text-sm my-1"
                />
              </div>

              <div className={`flex justify-center my-2 items-center`}>
                <p className="text-center">
                  Already have an account?
                  <span
                    onClick={() => setPage("signIn")}
                    className="cursor-pointer text-blue-700 px-1"
                  >
                    Sign in
                  </span>
                </p>
              </div>

              <ApButton
                className="w-full py-2 bg-rose-500 text-white rounded-lg my-2 hover:bg-rose-600 active:bg-rose-600 active:text-white focus:bg-rose-600"
                name="Sign Up"
                loading={loading}
                htmlType="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
