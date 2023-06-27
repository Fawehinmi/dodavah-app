import { gql, useMutation } from "@apollo/client";
import { toastSvc } from "../../../services";

const PHONE_SIGN_UP = gql`
  mutation PhoneSignUp($user: PhoneSignUpInput!) {
    phoneSignUp(user: $user)
  }
`;

export const useCreateSignUp = (callback: any) => {
  return useMutation(PHONE_SIGN_UP, {
    onCompleted: (res) => {
      if (res.phoneSignUp) {
        callback(res.phoneSignUp);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
