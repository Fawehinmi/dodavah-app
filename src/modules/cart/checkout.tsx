import React, { useEffect } from "react";
import ApButton from "../../components/button";
import { useCartState } from "./context";
import { Form, Formik, FormikProps } from "formik";
import { useProfileState } from "../profile/context";
import ApTextInput from "../../components/input/TextInput";
import { useRouter } from "next/router";

const Checkout = () => {
  const { handleCheckout } = useCartState();
  const { profile, fetchProfilePage } = useProfileState();
  const router = useRouter();

  useEffect(() => {
    fetchProfilePage();
  }, []);

  useEffect(() => {
    console.log(profile, "Profile");
  }, [profile]);

  const handleSubmit = async (values: any) => {
    const rs = await handleCheckout(values);
    if (rs) router.push(rs);
  };
  return (
    <div>
      <Formik
        initialValues={{
          address: profile?.address || "",
          email: profile?.email || "",
          contactPhone: profile?.phoneNumber || "",
          contactName: profile?.fullName || "",
        }}
        // validationSchema={PasswordChangeSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form className="">
            <div className="my-2">
              <ApTextInput
                label="Email "
                name="email"
                type="text"
                className="py-2"
                labelClassName="text-sm my-1"
              />
            </div>

            <div className="my-2">
              <ApTextInput
                label="Contact Name"
                name="contactName"
                type="text"
                className="py-2"
                labelClassName="text-sm my-1"
              />
            </div>
            <div className="my-2">
              <ApTextInput
                label="Contact Phone"
                name="contactPhone"
                type="text"
                className="py-2"
                labelClassName="text-sm my-1"
              />
            </div>
            <div className="my-2">
              <ApTextInput
                label="Address"
                name="address"
                type="text"
                className="py-2 font-semibold"
                labelClassName="text-sm my-1"
              />
            </div>

            <ApButton
              className="w-full py-2 bg-rose-500 text-white rounded-lg my-2 hover:bg-rose-600 active:bg-rose-600 active:text-white focus:bg-rose-600"
              name="Checkout"
              // loading={loading}
              htmlType="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
