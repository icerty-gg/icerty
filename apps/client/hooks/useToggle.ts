import { useState } from "react";

export const useToggle = (defaultToggle = false) => {
	const [isToggled, setIsToggled] = useState(defaultToggle);

	const toggleHandler = () => setIsToggled((prev) => !prev);

	return [isToggled, toggleHandler] as const;
};
