import { z } from "zod";
import { User } from "~~/server/models";
import { UserType } from "~~/types/user";

const registerSchema = z
  .object({
    fullName: z
      .string({ message: "Full name wajib diisi" })
      .trim()
      .min(1, { message: "Full name wajib diisi" }),
    username: z
      .string({ message: "Username wajib diisi" })
      .trim()
      .min(1, { message: "Username wajib diisi" })
      .refine(
        async (data) => {
          const user = await User.findOne({where: {
            username: data
          }});
          console.log({user})
          console.log(!!user)
          return !user
        },
        {
          message: "username telah dipakai",
        }
      ),
    password: z
      .string({ message: "Password wajib diisi" })
      .trim()
      .min(1, { message: "Password wajib diisi" })
      .min(5, { message: "Password minimal 5 karakter" }),
    confirmPassword: z
      .string({ message: "Konfirmasi password wajib diisi" })
      .trim()
      .min(5, { message: "Password minimal 5 karakter" }),
    role: z.coerce.number({ message: "Pilih role" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi Password tidak sama",
    path: ["confirmPassword"],
  });

export default defineMyEventHandler(
  async (event) => {
    const data = await useValidatedBody(event, registerSchema);
    const user = await User.findByPk(data.username);
    if (user) {
      return createError({
        message: "Username telah ada",
      });
    }
    return await User.create(data);
  },
  [UserType.ROLE_ADMIN]
);
