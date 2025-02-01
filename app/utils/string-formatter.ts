export const capitalizeWords = (phrase: string) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function formatISODate(isoString: string): string {
  const date = new Date(isoString);

  // Ambil komponen tanggal, bulan, tahun, jam, menit, dan detik
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format tanggal yang mudah dibaca
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}