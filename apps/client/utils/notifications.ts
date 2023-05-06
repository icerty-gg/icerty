import { ToastOptions, toast } from "react-toastify";

const defaultOptions: ToastOptions = {
	position: "top-right",
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
	theme: "colored",
};

export const notify = (text: string, type: "success" | "error") => {
	switch (type) {
		case "success":
			toast.success(text, defaultOptions);
			break;

		case "error":
			toast.error(text, defaultOptions);
			break;
	}
};
