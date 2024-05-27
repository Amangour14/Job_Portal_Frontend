import { useSnackbar } from "notistack";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../constants/queryKeys";
import { postAPI } from "../Services/http-service/axios-service";

type IUseSignIn = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

type User = {
  email: string;
  password: string;
};

async function signIn(email: string, password: string) {
  const config = {
    url: `/auth/login`,
    payload: { email, password },
  };
  const response = await postAPI(config);
  return response?.data;
}

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signInMutation } = useMutation<
    User,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => signIn(email, password), {
    onSuccess: (data: User) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      enqueueSnackbar("User logged In Successfully!", {
        variant: "success",
      });
      navigate("/");
    },
    onError: () => {
      enqueueSnackbar("Ops..Invalid Crediantial. Try again!", {
        variant: "error",
      });
    },
  });

  return signInMutation;
}
