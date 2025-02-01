import { User } from "~~/server/models";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id ?? 1;
  const data = await User.findOne({ where: { id: id } });
  return data;
});
