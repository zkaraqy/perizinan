import { z } from "zod";
import { User } from "~~/server/models";

const registerSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, registerSchema);
  const user = await User.findOne({ where: { username: data.username } });
  // const confirmPassword = await comparePassword(data.password, user!.password!);
  if (user) {
    const confirmPassword = await comparePassword(data.password, user!.password!);
    if (confirmPassword) {
      const accessToken = encodeAccessToken(user.dataValues, true, event);
      const refreshToken = encodeRefreshToken(user!.id);
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
    return createError({
      statusCode: 422,
      message: "Username atau password salah",
    });
  }
  return createError({
    statusCode: 404,
    message: "No user found",
  });
  // if (confirmPassword) {
  //   const accessToken = encodeAccessToken({ username: user!.username!, id: user!.id });
  //   const refreshToken = encodeRefreshToken(user!.id);
  //   return {
  //     accessToken: accessToken,
  //     refreshToken: refreshToken,
  //   };
  // } else {
  //   return createError({
  //     statusCode: 422,
  //     message: "Username atau password salah",
  //   });
  // }
});
