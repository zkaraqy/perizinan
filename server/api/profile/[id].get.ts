import { User } from "~~/server/models";

export default defineMyEventHandler(async (event) => {
  const id = event.context.params!.id;
  return await User.findByPk(id)
})
