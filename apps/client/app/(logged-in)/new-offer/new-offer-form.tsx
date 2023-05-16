"use client";

import { useMutation } from "@tanstack/react-query";
import { ZodiosBodyByPath } from "@zodios/core";
import { BiLockAlt } from "react-icons/bi";

import { Form, useZodForm } from "../../../components/common/form";
import { Input } from "../../../components/common/input";
import { DEFAULT_ERROR_MESSAGE } from "../../../components/providers";
import { Api, SCHEMAS, api } from "../../../utils/api";
import { notify } from "../../../utils/notifications";

type CreateOfferData = ZodiosBodyByPath<Api, "post", "/api/offers/">;

export const NewOfferForm = () => {
	const { mutateAsync: createOffer } = useMutation({
		mutationFn: (data: CreateOfferData) => api.post("/api/offers/", data),
	});

	const form = useZodForm({
		schema: SCHEMAS.postApioffers_Body,
	});

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			await createOffer(data);
		} catch (err) {
			notify(DEFAULT_ERROR_MESSAGE, "error");
		}
	});

	return (
		<Form form={form} onSubmit={onSubmit}>
			<Input
				icon={<BiLockAlt className="text-lg text-gray" />}
				label="Offer name"
				placeholder="Offer name"
				{...form.register("name")}
			/>
		</Form>
	);
};
