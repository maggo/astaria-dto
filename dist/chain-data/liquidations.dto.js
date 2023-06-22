import { z } from "zod";
import { StackSlotSchema } from "./common/stack-slot";
import { Uint256Schema } from "../common/number";
export const Liquidation = z.object({
    collateralId: Uint256Schema,
    stack: z.array(StackSlotSchema),
    position: z.number().int().min(0).max(4),
});
export const LiquidationsResponseSchema = z.object({
    results: z.array(Liquidation),
    count: z.number().int().min(0).max(100),
});
//# sourceMappingURL=liquidations.dto.js.map