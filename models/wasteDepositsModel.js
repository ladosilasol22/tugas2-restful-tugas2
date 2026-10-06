let wasteDeposits = [
  {
    id: 1,
    namaNasabah: "Aldo",
    jenisSampah: "plastik",
    beratKg: 5.5,
    hargaPerKg: 3000,
    tanggalSetor: "2026-09-01"
  },
  {
    id: 2,
    namaNasabah: "Amanda",
    jenisSampah: "kertas",
    beratKg: 10,
    hargaPerKg: 2000,
    tanggalSetor: "2026-09-02"
  },
  {
    id: 3,
    namaNasabah: "Anugrah",
    jenisSampah: "logam",
    beratKg: 3,
    hargaPerKg: 8000,
    tanggalSetor: "2026-09-03"
  }
];

const getAll = () => {
  return wasteDeposits;
};

const getById = (id) => {
  return wasteDeposits.find((item) => item.id === Number(id));
};

const getByJenisSampah = (jenisSampah) => {
  return wasteDeposits.filter(
    (item) =>
      item.jenisSampah.toLowerCase() === jenisSampah.toLowerCase()
  );
};

const create = (data) => {
  const newId =
    wasteDeposits.length > 0
      ? Math.max(...wasteDeposits.map((item) => item.id)) + 1
      : 1;

  const newData = {
    id: newId,
    ...data
  };

  wasteDeposits.push(newData);

  return newData;
};

const update = (id, data) => {
  const index = wasteDeposits.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  wasteDeposits[index] = {
    ...wasteDeposits[index],
    ...data,
    id: Number(id)
  };

  return wasteDeposits[index];
};

const remove = (id) => {
  const index = wasteDeposits.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  const deleted = wasteDeposits.splice(index, 1);

  return deleted[0];
};

module.exports = {
  getAll,
  getById,
  getByJenisSampah,
  create,
  update,
  remove
};