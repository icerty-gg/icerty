export const POSITIVE_NUMBER_REGEX = /^(?!0)[0-9]*$/;

export const parsePositiveNumberSearchParam = (param: string | string[] | undefined) => {
	if (typeof param !== "string" || !POSITIVE_NUMBER_REGEX.test(param)) {
		return undefined;
	} else {
		const onlyPositiveNumber = parseInt(param);

		return onlyPositiveNumber;
	}
};
