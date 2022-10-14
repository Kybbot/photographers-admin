import { z } from "zod";

export const LocalStorageTokenSchema = z
	.object({
		accessToken: z.string(),
	})
	.nullable();

export type LocalStorageTokenType = z.infer<typeof LocalStorageTokenSchema>;

export const TokenPayloadSchema = z.object({
	login: z.string(),
	iat: z.number(),
	exp: z.number(),
});

export type observerType = (isLogged: boolean) => void;
