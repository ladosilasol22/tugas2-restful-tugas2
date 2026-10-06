const model = require("../models/wasteDepositsModel");

const jenisSampahValid = [
  "plastik",
  "kertas",
  "logam",
  "kaca"
];

const getAllWasteDeposits = (req, res) => {
  const { jenisSampah } = req.query;

  if (jenisSampah) {
    if (!jenisSampahValid.includes(jenisSampah.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message:
          "Jenis sampah tidak valid. Pilihan: plastik, kertas, logam, kaca"
      });
    }

    return res.status(200).json({
      success: true,
      data: model.getByJenisSampah(jenisSampah)
    });
  }

  res.status(200).json({
    success: true,
    data: model.getAll()
  });
};

const getWasteDepositById = (req, res) => {
  const { id } = req.params;

  const data = model.getById(id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Data nasabah tidak ditemukan"
    });
  }

  res.status(200).json({
    success: true,
    data
  });
};

const createWasteDeposit = (req, res) => {
  const {
    namaNasabah,
    jenisSampah,
    beratKg,
    hargaPerKg,
    tanggalSetor
  } = req.body;

  if (
    !namaNasabah ||
    !jenisSampah ||
    beratKg === undefined ||
    hargaPerKg === undefined ||
    !tanggalSetor
  ) {
    return res.status(400).json({
      success: false,
      message:
        "namaNasabah, jenisSampah, beratKg, hargaPerKg, dan tanggalSetor wajib diisi"
    });
  }

  if (!jenisSampahValid.includes(jenisSampah.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message:
        "Jenis sampah tidak valid. Pilihan: plastik, kertas, logam, kaca"
    });
  }

  if (Number(beratKg) <= 0) {
    return res.status(400).json({
      success: false,
      message: "beratKg harus lebih dari 0"
    });
  }

  if (Number(hargaPerKg) <= 0) {
    return res.status(400).json({
      success: false,
      message: "hargaPerKg harus lebih dari 0"
    });
  }

  const newData = model.create({
    namaNasabah,
    jenisSampah: jenisSampah.toLowerCase(),
    beratKg: Number(beratKg),
    hargaPerKg: Number(hargaPerKg),
    tanggalSetor
  });

  res.status(201).json({
    success: true,
    message: "Data setoran berhasil ditambahkan",
    data: newData
  });
};

const updateWasteDeposit = (req, res) => {
  const { id } = req.params;

  const existingData = model.getById(id);

  if (!existingData) {
    return res.status(404).json({
      success: false,
      message: "Data nasabah tidak ditemukan"
    });
  }

  const {
    namaNasabah,
    jenisSampah,
    beratKg,
    hargaPerKg,
    tanggalSetor
  } = req.body;

  if (jenisSampah) {
    if (!jenisSampahValid.includes(jenisSampah.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message:
          "Jenis sampah tidak valid. Pilihan: plastik, kertas, logam, kaca"
      });
    }
  }

  if (beratKg !== undefined && Number(beratKg) <= 0) {
    return res.status(400).json({
      success: false,
      message: "beratKg harus lebih dari 0"
    });
  }

  if (hargaPerKg !== undefined && Number(hargaPerKg) <= 0) {
    return res.status(400).json({
      success: false,
      message: "hargaPerKg harus lebih dari 0"
    });
  }

  const updatedData = model.update(id, {
    ...(namaNasabah !== undefined && { namaNasabah }),
    ...(jenisSampah !== undefined && {
      jenisSampah: jenisSampah.toLowerCase()
    }),
    ...(beratKg !== undefined && {
      beratKg: Number(beratKg)
    }),
    ...(hargaPerKg !== undefined && {
      hargaPerKg: Number(hargaPerKg)
    }),
    ...(tanggalSetor !== undefined && {
      tanggalSetor
    })
  });

  res.status(200).json({
    success: true,
    message: "Data setoran berhasil diperbarui",
    data: updatedData
  });
};

const deleteWasteDeposit = (req, res) => {
  const { id } = req.params;

  const deletedData = model.remove(id);

  if (!deletedData) {
    return res.status(404).json({
      success: false,
      message: "Data nasabah tidak ditemukan"
    });
  }

  res.status(200).json({
    success: true,
    message: "Data setoran berhasil dihapus",
    data: deletedData
  });
};

module.exports = {
  getAllWasteDeposits,
  getWasteDepositById,
  createWasteDeposit,
  updateWasteDeposit,
  deleteWasteDeposit
};