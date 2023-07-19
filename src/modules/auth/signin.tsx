import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import ApTextInput from "../../components/input/TextInput";
import ApButton from "../../components/button";
import { toastSvc } from "../../services";
import Image from "next/image";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
});

interface IProps {
  setPage: (page: "signIn" | "signUp") => void;
  onDissmiss: () => void;
}

export const SigninPage: React.FC<IProps> = ({ setPage, onDissmiss }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<{ show: boolean; error?: string }>({
    show: false,
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!result?.error) {
      onDissmiss();
      return;
    } else {
      toastSvc.error(result.error);
    }

    setTimeout(() => {
      setLoading(false);
      setError({ show: true, error: result.error });
    }, 2000);

    setTimeout(() => {
      setError({ show: false });
    }, 5000);
  };
  return (
    <div className="">
      <div className="text-center my-3">
        <h1 className="font-semibold text-lg">Welcome back</h1>
        <p>Welcome back! Please enter your details</p>
      </div>

      <div className="px-3 mt-5">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className="">
              <div className="my-2">
                <ApTextInput
                  label="Email"
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

              <div className={`flex justify-center mb-2 mt-4 items-center`}>
                <p className="text-center">
                  Don't have an account?
                  <span
                    onClick={() => setPage("signUp")}
                    className="cursor-pointer text-blue-700 px-1"
                  >
                    Sign up
                  </span>
                </p>
              </div>

              <ApButton
                className="w-full py-2 bg-rose-500 text-white rounded-lg my-2 hover:bg-rose-600 active:bg-rose-600 active:text-white focus:bg-rose-600"
                name="Sign In"
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
