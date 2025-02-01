import { Pegawai } from "~~/server/models";

export default defineMyEventHandler(async (event) => {
  const params = useGridParam(event)
  const data = await Pegawai.findAll(params);
  const count = await Pegawai.count({ where: params.where ?? null });
  return {
    data, count
  };
})