const translations = {
  header: {
    title: "Monitor Udara & UV",
    subtitle: "Data lingkungan real-time di ujung jari Anda.",
  },
  citySelector: {
    label: "Pilih Kota",
    searchPlaceholder: "Cari kota...",
    notFound: "Kota tidak ditemukan.",
  },
  app: {
    showingDataFor: "Menampilkan data untuk",
    lastUpdated: "Terakhir diperbarui pada",
    poweredBy: "Didukung oleh Open-Meteo dan Current UV Index API",
    healthImpact: "Dampak Kesehatan",
    recommendations: "Rekomendasi",
    compareCities: "Bandingkan Kota",
  },
  comparison: {
    title: "Bandingkan Kualitas Udara",
    selectCity: "Pilih kota untuk dibandingkan dengan {cityName}",
    fetching: "Mengambil data perbandingan...",
  },
  levels: {
    uv: {
      low: "Rendah",
      moderate: "Sedang",
      high: "Tinggi",
      veryHigh: "Sangat Tinggi",
      extreme: "Ekstrem",
    },
    aqi: {
      good: "Baik",
      moderate: "Sedang",
      unhealthySensitive: "Tidak Sehat (Sensitif)",
      unhealthy: "Tidak Sehat",
      veryUnhealthy: "Sangat Tidak Sehat",
    },
  },
  metrics: {
    uv: {
      title: "Indeks UV",
      description: "Mengukur kekuatan radiasi UV yang menyebabkan kulit terbakar.",
      details: {
        description: "Indeks UV adalah standar pengukuran internasional untuk tingkat radiasi ultraviolet dari matahari. Skala ini bertujuan untuk membantu masyarakat melindungi diri dari paparan UV yang berlebihan.",
        healthImpact: "Paparan UV yang berlebihan dapat menyebabkan kulit terbakar, penuaan dini pada kulit, kerusakan mata (seperti katarak), dan meningkatkan risiko kanker kulit. Tingkat UV yang tinggi berbahaya bahkan pada hari yang berawan.",
        recommendations: [
          "Gunakan tabir surya dengan SPF 30+.",
          "Kenakan pakaian pelindung, topi lebar, dan kacamata hitam.",
          "Cari tempat teduh, terutama antara pukul 10 pagi hingga 4 sore.",
          "Hindari paparan sinar matahari langsung untuk waktu yang lama."
        ]
      }
    },
    pm2_5: {
      title: "PM2.5",
      description: "Partikel halus yang dapat dihirup, diameter < 2,5 mikrometer.",
      details: {
        description: "PM2.5 adalah partikel polusi udara yang sangat kecil dengan diameter 2.5 mikrometer atau kurang. Ukurannya yang sangat kecil memungkinkannya masuk jauh ke dalam saluran pernapasan dan bahkan aliran darah.",
        healthImpact: "Paparan jangka pendek dapat menyebabkan iritasi mata, hidung, tenggorokan, dan paru-paru. Paparan jangka panjang berhubungan dengan masalah kesehatan serius seperti penyakit jantung, stroke, penyakit paru-paru kronis, dan kanker paru-paru.",
        recommendations: [
          "Saat tingkat PM2.5 tinggi, batasi aktivitas di luar ruangan.",
          "Gunakan pembersih udara (air purifier) di dalam ruangan.",
          "Kenakan masker N95 jika harus beraktivitas di luar.",
          "Tutup jendela dan pintu untuk mengurangi polusi masuk ke dalam rumah."
        ]
      }
    },
    pm10: {
      title: "PM10",
      description: "Partikel kasar yang dapat dihirup, diameter < 10 mikrometer.",
      details: {
        description: "PM10 adalah partikel di udara dengan diameter 10 mikrometer atau kurang. Partikel ini lebih besar dari PM2.5 dan biasanya mencakup debu, serbuk sari, dan spora jamur.",
        healthImpact: "PM10 dapat mengiritasi mata, hidung, dan tenggorokan. Bagi orang dengan kondisi pernapasan seperti asma, paparan PM10 dapat memicu serangan dan memperburuk gejala.",
        recommendations: [
          "Hindari area dengan tingkat debu tinggi seperti lokasi konstruksi atau jalan yang tidak beraspal.",
          "Jaga kebersihan rumah untuk mengurangi debu.",
          "Batasi aktivitas berat di luar ruangan saat kualitas udara buruk."
        ]
      }
    },
    ozone: {
      title: "Ozon (O₃)",
      description: "Komponen utama kabut asap, berbahaya di permukaan tanah.",
      details: {
        description: "Ozon di permukaan tanah adalah polutan sekunder yang terbentuk ketika polutan lain (seperti nitrogen oksida dan senyawa organik volatil) bereaksi dengan sinar matahari. Ini adalah komponen utama dari kabut asap (smog).",
        healthImpact: "Menghirup ozon dapat menyebabkan nyeri dada, batuk, iritasi tenggorokan, dan sesak napas. Dapat memperburuk kondisi seperti bronkitis, emfisema, dan asma, serta merusak jaringan paru-paru.",
        recommendations: [
          "Kurangi aktivitas berat di luar ruangan pada sore hari yang panas dan cerah, saat tingkat ozon biasanya paling tinggi.",
          "Perhatikan peringatan kualitas udara dari otoritas setempat.",
          "Dukung penggunaan energi bersih untuk mengurangi emisi prekursor ozon."
        ]
      }
    },
    carbon_monoxide: {
      title: "Karbon Monoksida (CO)",
      description: "Gas beracun dari pembakaran tidak sempurna.",
      details: {
        description: "Karbon monoksida adalah gas tidak berwarna dan tidak berbau yang dihasilkan dari pembakaran bahan bakar yang tidak sempurna, seperti pada kendaraan bermotor, pemanas, dan proses industri.",
        healthImpact: "CO mengurangi jumlah oksigen yang dapat diangkut dalam aliran darah ke organ-organ vital seperti jantung dan otak. Paparan tingkat tinggi bisa fatal, sementara tingkat rendah dapat menyebabkan nyeri dada, kebingungan, dan gejala mirip flu.",
        recommendations: [
          "Pastikan ventilasi yang baik saat menggunakan peralatan pembakaran.",
          "Jangan pernah menyalakan mobil di garasi yang tertutup.",
          "Pasang detektor CO di rumah jika Anda menggunakan peralatan yang membakar bahan bakar."
        ]
      }
    },
    nitrogen_dioxide: {
      title: "Nitrogen Dioksida (NO₂)",
      description: "Gas reaktif dari emisi kendaraan dan industri.",
      details: {
        description: "NO₂ adalah gas reaktif berwarna coklat kemerahan yang terutama berasal dari emisi kendaraan, pembangkit listrik, dan industri. Gas ini berkontribusi pada pembentukan ozon di permukaan tanah dan hujan asam.",
        healthImpact: "Menghirup NO₂ dapat mengiritasi saluran pernapasan, memperburuk penyakit pernapasan seperti asma, dan dapat menyebabkan perkembangan asma pada anak-anak. Paparan jangka panjang dapat mengurangi fungsi paru-paru.",
        recommendations: [
          "Dukung kebijakan transportasi yang mengurangi emisi kendaraan.",
          "Hindari berolahraga di dekat jalan raya yang sibuk.",
          "Gunakan transportasi umum, sepeda, atau berjalan kaki jika memungkinkan."
        ]
      }
    },
    sulphur_dioxide: {
      title: "Sulfur Dioksida (SO₂)",
      description: "Gas dari pembakaran bahan bakar fosil, penyebab hujan asam.",
      details: {
        description: "SO₂ adalah gas tidak berwarna dengan bau tajam yang dihasilkan dari pembakaran bahan bakar fosil (terutama batu bara dan minyak) oleh pembangkit listrik dan industri. Gas ini adalah penyebab utama hujan asam.",
        healthImpact: "Paparan SO₂ dapat mengiritasi sistem pernapasan dan memperburuk asma. Orang dengan asma sangat sensitif terhadap SO₂ dan mungkin mengalami sesak napas bahkan dari paparan singkat.",
        recommendations: [
          "Dukung transisi ke sumber energi yang lebih bersih.",
          "Otoritas industri harus menggunakan teknologi kontrol emisi untuk mengurangi pelepasan SO₂.",
          "Orang dengan asma harus memeriksa data kualitas udara sebelum beraktivitas di luar."
        ]
      }
    }
  }
};

export default translations;