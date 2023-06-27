import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { toastSvc } from "../../../services";
import { profileFragment } from "./fragment";

const PROFILE_PAGE = gql`
  query Profile {
    currentUser {
      ...userProfile
    }
  }
  ${profileFragment}
`;

export const useProfilePage = (onCompleted: any) => {
  return useLazyQuery(PROFILE_PAGE, {
    fetchPolicy: "network-only",

    onCompleted: (res) => {
      if (res.currentUser) {
        onCompleted(res.currentUser);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const UPDATE_PROFILE = gql`
  mutation updateAccount($account: UpdateAccountInput!) {
    updateAccount(account: $account) {
      ...userProfile
    }
  }
  ${profileFragment}
`;

export const useUpdateProfile = (callback: any) => {
  return useMutation(UPDATE_PROFILE, {
    onCompleted: (res) => {
      if (res?.updateAccount) {
        callback(res.updateAccount);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
