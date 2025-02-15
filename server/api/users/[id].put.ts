import { z } from "zod";
import { User } from "~~/server/models";
import {Op} from 'sequelize'
import { UserType } from "~~/types/user";

const validation = z.object({
  fullName: z.string().trim().min(1, { message: "Full name wajib diisi" }),
  username: z
      .string({ message: "Username wajib diisi" })
      .trim()
      .min(1, { message: "Username wajib diisi" })
      .refine(
        async (data) => {
          const user = await User.findOne({
            where: {
              username: data,
            }
          });
          const mySelf = user?.username === data;
          console.log({user})
          console.log(!!user)
          return !user || !mySelf
        },
        {
          message: "username telah dipakai",
        }
      ),
  role: z.coerce.number({ message: "Role wajib diisi" }),
});

export default defineMyEventHandler(async (event) => {
  const data = await useValidatedBody(event, validation);
  const id = event.context.params!.id;
  const user = await User.findByPk(id);
  if (user) {
    user.set(data);
    await user.save();
    return user.toJSON();
  }
  return createError({
    statusCode: 404,
    message: "User not found",
  });
});
