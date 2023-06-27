import { useSession } from "next-auth/react";
import React, { createContext, useState } from "react";
import {
  useCreateCategory,
  // useDeleteCategory,
  useCategoryPage,
  // useUpdateCategory,
} from "./gql/query";
import { ICategory, ICategoryFilter } from "./model";

interface ICategoryState {
  loading: boolean;
  // product: ICategory;
  categories: ICategory[];
  totalRecords: number;
  fetchCategoryPage: (page: ICategoryFilter) => void;
  // deleteCategory: (prodId?: string) => void;
  saveCategory: (values: any, id?: string) => Promise<ICategory>;
}

const CategoryContext = createContext<ICategoryState>({
  loading: false,
  // product: {} as any,
  categories: [],
  totalRecords: 0,
  fetchCategoryPage(page) {},
  // deleteCategory(prodId) {},
  saveCategory(values, id) {
    return null as any;
  },
});

export const useCategoryState = () => {
  const context = React.useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

const limit = 10;

export const CategoryContextProvider: React.FC<IProps> = ({ children }) => {
  // const [product, setCategory] = useState<ICategory>() as any;
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [fetchPageQuery, {}] = useCategoryPage((res: any) => {
    setCategories(res.data);
    setTotalRecords(res.totalRecords);
  });

  // const deleteQuery = useDeleteCategory((res: any) => {
  //   toastSvc.success("Category deleted");
  // });

  // const updateQuery = useUpdateCategory((res: any) => {
  //   toastSvc.success("Category Updated");
  // });

  const createQuery = useCreateCategory((res: any) => {});

  const fetchCategoryPage = (page: ICategoryFilter) => {
    fetchPageQuery({
      variables: {
        page: {
          ...page,
          take: page?.take || limit,
        },
      },
    });
  };

  const createCategory = async (product: ICategory) => {
    const res = await createQuery[0]({
      variables: {
        product,
      },
    });
    const prod = res?.data?.createCategory;
    if (prod) {
      setCategories([prod, ...categories]);
      setTotalRecords(totalRecords + 1);
      return prod;
    }
  };

  // const updateCategory = (id: string, product: ICategory) => {
  //   return updateQuery[0]({
  //     variables: {
  //       id,
  //       product,
  //     },
  //   }).then((res) => {
  //     const prod = res.data?.updateCategory;
  //     if (prod) {
  //       setCategorys(
  //         categories.map((product) => (product._id == prod._id ? prod : product))
  //       );
  //       return prod;
  //     }
  //   });
  // };

  const saveCategory = (values: ICategory, id?: string): Promise<ICategory> => {
    if (id) {
      return new Promise((resolve, reject) => {
        // let req = u(values);
        // resolve(req);
      });
    } else {
      return new Promise((resolve, reject) => {
        let req = createCategory(values);

        resolve(req);
      });
    }
  };

  // const deleteCategoryPage = (prodId?: string) => {
  //   ApConfirm({
  //     message: "Delete Category",
  //     callback: (rs: any) => {
  //       if (rs) {
  //         setLoading(true);
  //         deleteQuery[0]({ variables: { id: prodId } })
  //           .then((rs) => {
  //             if (rs.data.deleteCategory) {
  //               setCategorys(categories.filter((item) => item._id !== prodId));
  //             }
  //           })
  //           .finally(() => {
  //             setLoading(false);
  //           });
  //       }
  //     },
  //   });
  // };

  return (
    <CategoryContext.Provider
      value={{
        loading,
        categories,
        fetchCategoryPage,
        totalRecords,
        // deleteCategoryPage,
        saveCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
