import { toast } from "react-toastify";

export const notify = (text: string, type: string) => {
	switch (type) {
		case "success":
			toast.success(text, {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: "colored",
			});
			break;

		case "error":
			toast.error(text, {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: "colored",
			});
			break;
	}
};
