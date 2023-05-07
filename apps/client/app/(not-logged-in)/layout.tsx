import { ReactNode } from "react";

import { UnloggedRoute } from "../../components/common/unlogged-route";

interface Props {
	children: ReactNode;
}

const NotLoggedInLayout = ({ children }: Props) => {
	return <UnloggedRoute>{children}</UnloggedRoute>;
};

export default NotLoggedInLayout;
