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
          const user = await User.findOne({
            where: {
              username: data
            }
          });
          console.log({ user })
          console.log(!!user)
          return !user
        },
        {
          message: "username telah dipakai",
        }
      ),
    role: z.coerce.number({ message: "Pilih role" }),
  })

export default defineMyEventHandler(
  async (event) => {
    const id = event.context.params!.id;
    const data = await useValidatedBody(event, registerSchema);
    const user = await User.findByPk(id);
    if (user) {
      user.set(data);
      await user.save();
      return user.toJSON()

    }
    return createError({
      statusCode: 404,
      message: "User not found"
    })
  },
  "*"
);
