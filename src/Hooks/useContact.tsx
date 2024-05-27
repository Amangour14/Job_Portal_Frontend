import { useSnackbar } from "notistack";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../Services/http-service/axios-service";
import { Contact } from "../utils/Types";

type IUseContact = UseMutateFunction<
  Contact,
  unknown,
  {
    email: string;
    name: string;
    message: string;
  },
  unknown
>;

async function postContact(email: string, message: string, name: string) {
  const userString = localStorage.getItem("user");
  const users = userString ? JSON.parse(userString) : null;
  const config = {
    url: `/postContact`,
    payload: { email, message, name },
    token: users.token,
  };
  const response = await postAPI(config);
  return response?.data;
}

export function useContact(): IUseContact {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: ContactInMutation } = useMutation<
    Contact,
    unknown,
    { email: string; name: string; message: string },
    unknown
  >(({ email, message, name }) => postContact(email, message, name), {
    onSuccess: () => {
      queryClient.invalidateQueries("contactuser");
      enqueueSnackbar("`Message send successfully`", {
        variant: "success",
      });
      navigate("/");
    },
    onError: () => {
      enqueueSnackbar("Ops..Something went wrong. Try again!", {
        variant: "error",
      });
    },
  });

  return ContactInMutation;
}
