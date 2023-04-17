import { Type, Kind } from "@fastify/type-provider-typebox";

export const StringEnum = <T extends string[]>(values: [...T], defaultValue?: T[number]) => {
	return Type.Unsafe<T[number]>({ type: "string", enum: values, default: defaultValue });
};

export const BufferType = Type.Unsafe<Buffer>({ [Kind]: "buffer" });
