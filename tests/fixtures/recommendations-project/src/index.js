import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.email()
});

export async function loadAdapter() {
  return import(process.env.ADAPTER_PACKAGE ?? 'maybe-adapter');
}
