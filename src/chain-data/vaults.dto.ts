import { z } from "zod";
import { AddressSchema, HexSchema, Uint256Schema } from "@astariaxyz/sdk";
import { PaginationParamsSchema, BoolParamSchema } from "../common";

export enum VaultType {
  Solo = "1",
  Public = "2",
}

export const VaultQueryParamsSchema = z.object({
  lp: AddressSchema.optional(),
});

export const WithdrawBalanceSchema = z.object({
  balance: Uint256Schema,
  epoch: Uint256Schema,
  withdrawProxy: HexSchema,
});


export const VaultResponseSchema = z.object({
  vault: AddressSchema,
  vaultBalance: Uint256Schema,//Actually vault shares
  vaultType: z.nativeEnum(VaultType),
  strategist: AddressSchema,
  delegate: AddressSchema,
  depositBalance: Uint256Schema.optional(),
  withdrawBalances: z.array(WithdrawBalanceSchema).optional(),
  //off-chain data
  name: z.string(),
  description: z.string().optional(),
  thesis: z.string().optional(),
  banner: z.string().optional(),
  profile: z.string().optional(),
  strategistName: z.string().optional(),
  isVerified: z.boolean().optional(),
});


export const VaultsQueryParamsSchemaOld = z.object({

  lp: AddressSchema.optional(),

  auth: AddressSchema.optional(),

  verified: BoolParamSchema,

}).merge(PaginationParamsSchema);

export const VaultsQueryParamsSchema = z.object({

  lp: AddressSchema.optional(),

  filter: z.object({

    auth: AddressSchema.optional(),

    verified: BoolParamSchema,

    lp: BoolParamSchema,

  }).default({}),

  include: z.object({

    shutdown: BoolParamSchema,

  }).default({}),

  display: z.object({

    lp: BoolParamSchema,

  }).default({}),

}).merge(PaginationParamsSchema);


export const VaultsResponseSchema = z.object({
  results: z.array(VaultResponseSchema),
  count: z.number().int().positive().max(100),
});


export type WithdrawBalance = z.infer<typeof WithdrawBalanceSchema>;

export type VaultsQueryParams = z.input<typeof VaultsQueryParamsSchema>;
export type VaultsQueryParamsOld = z.input<typeof VaultsQueryParamsSchemaOld>;
export type VaultsResponse = z.input<typeof VaultsResponseSchema>;
export type VaultsParsedResponse = z.infer<typeof VaultsResponseSchema>;

export type VaultQueryParams = z.input<typeof VaultQueryParamsSchema>;
export type VaultResponse = z.input<typeof VaultResponseSchema>;
export type VaultParsedResponse = z.infer<typeof VaultResponseSchema>;
