import { z } from "zod";
import { User } from "~~/server/models";

const registerSchema = z
  .object({
    username: z.string({message: "Username wajib diisi"}),
    password: z.string({message: "Password wajib diisi"}).min(5, {message: "Password minimal 5 karakter"}),
    confirmPassword: z.string({message: "Konfirmasi password wajib diisi"}).min(5, {message: "Password minimal 5 karakter"}),
    role: z.coerce.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi Password tidak sama",
    path: ["confirmPassword"]
  });

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, registerSchema);
  return await User.create(data);
});
