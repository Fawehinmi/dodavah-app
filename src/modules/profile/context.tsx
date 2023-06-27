import React, { createContext, useState } from "react";
import { toastSvc } from "../../services";
import { useProfilePage, useUpdateProfile } from "./gql/query";
import { IProfile } from "./model";

interface IProfileState {
  loading: boolean;
  profile: IProfile;
  fetchProfilePage: () => void;
  updateProfile: (values: any) => void;
}
const ProfileContext = createContext<IProfileState>({
  loading: true,
  profile: {} as any,
  fetchProfilePage() {},
  updateProfile() {},
});

export const useProfileState = () => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const ProfileContextProvider: React.FC<IProps> = ({ children }) => {
  const [profile, setProfile] = useState<IProfile>({} as any);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchProfile] = useProfilePage((res: any) => {
    setProfile(res);
  });

  const fetchProfilePage = () => {
    setLoading(true);
    setTimeout(() => {
      fetchProfile().finally(() => {
        setLoading(false);
      });
    }, 2000);
  };

  const updateQuery = useUpdateProfile((res: any) => {
    toastSvc.success("Profile updated");
  });

  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });

  const updateProfile = (values: any) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
    };

    if (profile?.id) {
      return updateQuery[0]({
        variables: {
          account: {
            ...payload,
          },
        },
      }).then((rs) => {
        setProfile(rs?.data?.updateAccount);
      });
    }
    return profile;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        fetchProfilePage,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
