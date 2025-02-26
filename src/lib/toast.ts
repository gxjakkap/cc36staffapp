import { toast } from "sonner";

export const defaultToastReactQuery = {
  onSuccess() {
    toast.success("Action Done sucessfully!");
  },
  onError(error: { code: string; message: string }) {
    toast.error("Something went wrong, please check your crediential", {
      description: error.message,
    });
  },
};
