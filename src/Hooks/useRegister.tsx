import { useSnackbar } from "notistack";
import { UseMutateFunction, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResponseError } from "../utils/Errors/ResponseError";
import { postAPI } from "../http-service/axios-service";

type User = {
  email: string;
  password: string;
};
async function signUp(email: string, password: string): Promise<User> {
  const config = {
    url: `/auth/create-user`,
    payload: { email, password },
  };
  const response = await postAPI(config);

  if (response.status !== 201)
    throw new ResponseError("Failed on sign up request", response?.data);
  return response.data;
}

type IUseSignUp = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useSignUp(): IUseSignUp {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signUpMutation } = useMutation<
    User,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => signUp(email, password), {
    onSuccess: () => {
      enqueueSnackbar(
        "User has been successfully registerd, please log in...",
        {
          variant: "success",
        }
      );
      navigate("/login");
    },
    onError: () => {
      enqueueSnackbar("Ops..Email is already taken. Try again!", {
        variant: "error",
      });
    },
  });

  return signUpMutation;
}
