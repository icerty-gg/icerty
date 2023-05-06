import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import {
	FieldValues,
	FormProvider,
	UseFormHandleSubmit,
	UseFormProps,
	UseFormReturn,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import { TypeOf, ZodSchema } from "zod";

interface Props<T extends FieldValues> extends Omit<ComponentProps<"form">, "onSubmit"> {
	form: UseFormReturn<T>;
	onSubmit: ReturnType<UseFormHandleSubmit<T>>;
}

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	className,
	...props
}: Props<T>) => (
	<FormProvider {...form}>
		<form onSubmit={onSubmit} {...props}>
			<fieldset disabled={form.formState.isSubmitting} className={className}>
				{children}
			</fieldset>
		</form>
	</FormProvider>
);

interface UseZodFormProps<Z extends ZodSchema>
	extends Exclude<UseFormProps<TypeOf<Z>>, "resolver"> {
	schema: Z;
}

export const useZodForm = <Z extends ZodSchema>({ schema, ...formProps }: UseZodFormProps<Z>) =>
	useForm({
		...formProps,
		resolver: zodResolver(schema),
	});
