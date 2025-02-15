import { User } from "~~/server/models";
import { UserType } from "~~/types/user";

export default defineMyEventHandler(async (event) => {
  const params = useGridParam(event)
  const data = await User.findAll(params);
  const count = await User.count({ where: params.where ?? null });
  return {
    data, count
  };
}, [UserType.ROLE_ADMIN]) 