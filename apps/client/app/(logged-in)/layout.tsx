import { ReactNode } from "react";

import { LoggedRoute } from "../../components/common/logged-route";

interface Props {
	children: ReactNode;
}

const LoggedLayout = ({ children }: Props) => {
	return <LoggedRoute>{children}</LoggedRoute>;
};

export default LoggedLayout;
