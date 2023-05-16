import { NewOfferForm } from "./new-offer-form";

const NewOfferPage = () => {
	return (
		<div className="mx-auto flex w-full max-w-[45rem] flex-col gap-6 rounded-md bg-primaryWhite p-4">
			<NewOfferForm />
		</div>
	);
};

export default NewOfferPage;
