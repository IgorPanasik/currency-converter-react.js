import z from 'zod';

export const RatesSchema = z.object({
	rates: z.record(z.string(), z.number()),
});

export const AmountSchema = z.string().regex(/^\d*$/, {
	message: 'Please enter only numbers',
});

export type RatesResponse = z.infer<typeof RatesSchema>;
export type AmountInput = z.infer<typeof AmountSchema>;
