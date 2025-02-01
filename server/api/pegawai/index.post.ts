import { z } from "zod";
import { Pegawai } from "~~/server/models";

const registerSchema = z
  .object({
    nama: z.string({message: "Nama wajib diisi"}),
    jenisKelamin: z.string({message: "Jenis kelamin wajib diisi"}),
    tanggalLahir: z.string({message: "Tanggal lahir wajib diisi"}),
  });

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, registerSchema);
  return await Pegawai.create(data);
});
