/* ============================================================
   script.js — data struktur + pohon interaktif
   Tanpa module, tanpa fetch: aman dibuka lewat file://
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- 1. DATA ----------
     Mengsalin outline tugas apa adanya.
     date = teks tampilan; at = angka yyyymmdd untuk urutan (jangan parse string Indonesia).
  */
  var OUTLINE = {
    acts: [
      {
        id: 'a',
        num: 'A',
        title: 'Pendudukan Jepang',
        span: '1942–1945',
        nodes: [
          {
            label: 'Kedatangan & Propaganda',
            desc: 'Latar: Perang Asia Pasifik pecah 8 Des 1941 setelah Pearl Harbor (7 Des 1941). Jepang butuh minyak Kalimantan & Sumatera, sehingga menyerbu Hindia Belanda awal 1942 dan memakai propaganda “saudara tua” agar disambut.',
            children: [
              { label: 'Pendaratan Pertama: Tarakan, Kalimantan Timur', date: '11 Jan 1942', at: 19420111, desc: 'Jepang mendarat di Tarakan pada 11 Januari 1942 untuk merebut ladang minyak. Disusul Balikpapan (24 Jan), Pontianak & Banjarmasin (Feb), Palembang (14 Feb), lalu Jawa: Eretan Wetan 1 Mar & Batavia jatuh 5 Mar 1942.' },
              { label: 'Penyerahan Belanda: Perjanjian Kalijati', date: '8 Mar 1942', at: 19420308, desc: 'Pada 8 Maret 1942 di rumah dinas Kalijati, Subang, Gubernur Jenderal Tjarda van Starkenborgh dan Letjen Ter Poorten menyerah tanpa syarat kepada Letjen Imamura. Sejak hari itu Hindia Belanda resmi di bawah Dai Nippon.' },
              { label: 'Propaganda 3A: Jepang Pemimpin, Pelindung, & Cahaya Asia', date: '1942', at: 19420301, desc: 'Gerakan 3A dibentuk tahun 1942 pimpinan Mr. Syamsuddin dengan semboyan: Jepang Pemimpin Asia, Pelindung Asia, Cahaya Asia. Tujuannya menarik simpati, tetapi gagal karena terlalu memaksa sehingga dibubarkan akhir 1942.' }
            ]
          },
          {
            label: 'Kebijakan Utama',
            desc: 'Semua kebijakan diarahkan untuk memenangkan Perang Pasifik (1941–1945): militer diperkuat, ekonomi diperas untuk perang, dan budaya dikontrol agar rakyat patuh kepada Kaisar (Tenno Heika).',
            children: [
              { label: 'Bidang Militer: Wajib militer & disiplin tinggi', desc: 'Jepang menerapkan pengawasan ketat, latihan baris-berbaris, kinrohosi (kerja bakti) dan seikerei setiap pagi. Pemuda dididik disiplin ala militer untuk dijadikan cadangan perang melawan Sekutu.' },
              { label: 'Bidang Ekonomi: Ekonomi Perang (eksploitasi padi, karet, aset)', desc: 'Sejak 1942 hasil padi, karet, tebu, dan besi wajib disetor ke gudang Jepang dengan harga murah. Akibatnya persediaan rakyat habis, terjadi kelangkaan kain, obat, dan garam di Jawa tahun 1943–1944.' },
              { label: 'Sosial-Budaya: Bahasa Indonesia diizinkan, wajib Seikerei', desc: 'Belanda melarang bahasa Indonesia di sekolah, Jepang justru mewajibkannya sejak 1942 sehingga bahasa persatuan menyebar. Sebaliknya setiap orang wajib Seikerei — membungkuk ke arah Tokyo untuk menghormat Kaisar — yang memberatkan umat Islam dan Kristen.' }
            ]
          },
          {
            label: 'Dampak bagi Rakyat',
            desc: 'Tiga setengah tahun (Mar 1942 – Agu 1945) terasa sangat berat secara ekonomi, tetapi justru mematangkan kesadaran nasional dan keterampilan militer.',
            children: [
              { label: 'Sisi Negatif: Romusha (kerja paksa), kelaparan, kemiskinan', desc: 'Romusha dikerahkan sejak 1942–1943 untuk membangun rel, lapangan udara, dan kubu (mis. rel Muaro–Pekanbaru, 1943–1944, puluhan ribu meninggal). Pengerahan padi + inflasi menimbulkan kelaparan dan wabah di Jawa 1944–1945.' },
              { label: 'Sisi Positif: Pelatihan militer pemuda, bahasa Indonesia meluas', desc: 'Puluhan ribu pemuda mendapat latihan baris, taktik, dan organisasi modern yang tidak pernah diberikan Belanda selama 350 tahun. Bahasa Indonesia menjadi bahasa resmi sekolah, radio, dan rapat — modal penting untuk proklamasi 1945.' }
            ]
          },
          {
            label: 'Organisasi Bentukan Jepang',
            desc: 'Jepang membentuk organisasi lapis: sipil untuk pengerahan massa, semimiliter/militer untuk cadangan perang, dan badan persiapan kemerdekaan sebagai janji politik tahun 1944–1945.',
            children: [
              { label: 'Sipil: Gerakan 3A, PUTERA, Jawa Hokokai', desc: '3A (1942, gagal) → PUTERA / Pusat Tenaga Rakyat (16 Apr 1943, Empat Serangkai: Soekarno, Hatta, Ki Hajar Dewantara, Mas Mansyur) → Jawa Hokokai / Himpunan Kebaktian Jawa (1 Mar 1944). Tujuannya mengerahkan rakyat, tetapi malah jadi panggung nasionalisme.' },
              { label: 'Militer & Semimiliter: Seinendan, Keibodan, Heiho, PETA', desc: 'Seinendan / Barisan Pemuda (29 Apr 1943, usia 14–22 th), Keibodan / Barisan Pembantu Polisi (29 Apr 1943, usia 20–25 th), Heiho / Pembantu Prajurit (1943), dan PETA / Pembela Tanah Air (3 Okt 1943, usul Gatot Mangkupraja). Dari PETA lahir Soedirman, Soeharto, Yani — tulang punggung TNI.' },
              { label: 'Persiapan Kemerdekaan: BPUPKI & PPKI', date: '29 Apr – 7 Agu 1945', at: 19450429, desc: 'BPUPKI (Dokuritsu Junbi Cosakai) dilantik 28 Mei 1945, bersidang 29 Mei–1 Jun & 10–17 Jul 1945 dan menghasilkan Piagam Jakarta (22 Jun 1945) serta rancangan UUD. Dibubarkan 7 Agustus 1945 dan diganti PPKI (Dokuritsu Junbi Inkai) beranggotakan 21 orang ketua Soekarno.' }
            ]
          }
        ]
      },
      {
        id: 'b',
        num: 'B',
        title: 'Detik-detik Proklamasi',
        span: 'Agustus 1945',
        nodes: [
          {
            label: 'Kekalahan Jepang',
            desc: 'Kekalahan total Jepang pada Agustus 1945 menciptakan kekosongan kekuasaan (vacuum of power): Belanda belum datang, Jepang dilarang mengubah status quo oleh Sekutu.',
            children: [
              { label: 'Bom atom di Hiroshima & Nagasaki', date: '6 & 9 Ags 1945', at: 19450806, desc: 'AS menjatuhkan bom uranium “Little Boy” di Hiroshima (6 Agustus 1945, ±140 ribu korban) dan bom plutonium “Fat Man” di Nagasaki (9 Agustus 1945). Uni Soviet pun menyerbu Manchuria 9 Agustus — Jepang terjepit dua front.' },
              { label: 'Jepang menyerah pada Sekutu (Vacuum of Power)', date: '15 Ags 1945', at: 19450815, desc: 'Kaisar Hirohito mengumumkan menyerah tanpa syarat pada 14 Agustus (disiarkan 15 Agustus 1945 pukul 12.00 Tokyo). Sjahrir mendengar siaran radio 14 Agustus dan menyebarkan kabar ke golongan muda: inilah saat merdeka tanpa hadiah Jepang.' }
            ]
          },
          {
            label: 'Peristiwa Rengasdengklok',
            date: '16 Ags 1945',
            at: 19450816,
            desc: 'Puncaknya perselisihan golongan muda (Sukarni, Chaerul Saleh, Wikana — ingin merdeka 16 Agustus) vs golongan tua (Soekarno-Hatta — ingin lewat PPKI & perhitungan matang).',
            children: [
              { label: 'Konflik: Perbedaan pendapat Golongan Muda vs Tua', desc: 'Pada 15 Agustus 1945 malam terjadi perdebatan di Pegangsaan Timur 56: Wikana mendesak proklamasi malam itu juga, Soekarno menolak karena khawatir pertumpahan darah tanpa persiapan. Jalan buntu memicu penculikan.' },
              { label: 'Tindakan: Mengamankan Soekarno-Hatta dari pengaruh Jepang', date: '16 Ags 1945, 04.00 WIB', at: 19450816, desc: '16 Agustus subuh, Sukarni dkk. membawa Soekarno-Hatta beserta ibu dan anak ke Rengasdengklok, Karawang, agar jauh dari tekanan Jepang. Di Jakarta, Achmad Soebardjo menjamin proklamasi esok hari, lalu menjemput mereka kembali malam harinya.' }
            ]
          },
          {
            label: 'Penyusunan Teks Proklamasi',
            date: 'Malam 16 – subuh 17 Ags 1945',
            at: 19450816,
            desc: 'Setelah kembali dari Rengasdengklok, perumusan dilakukan 16 Agustus pukul 22.00 hingga 17 Agustus pukul 02.00 di rumah Laksamana Maeda — perwira Jepang yang bersimpati.',
            children: [
              { label: 'Lokasi: Rumah Laksamana Maeda (Malam – Subuh)', desc: 'Rumah dinas Laksamana Tadashi Maeda di Jl. Imam Bonjol No. 1, Jakarta dipilih karena aman dari pengawasan militer Jepang (Kenpeitai). Di ruang makan itulah kalimat “Kami bangsa Indonesia...” disusun.' },
              { label: 'Perumus Teks: Soekarno, Moh. Hatta, Achmad Soebardjo', desc: 'Soekarno menuliskan kalimat pertama, Hatta menyusun kalimat kedua tentang pemindahan kekuasaan, Soebardjo menjadi penengah dan saksi. Hadir pula Sukarni, B.M. Diah, Sudiro, dan Nishijima sebagai penghubung.' },
              { label: 'Pengetik Teks: Sayuti Melik (dengan beberapa perubahan kata)', desc: 'Sayuti Melik mengetik naskah dengan perubahan penting: “tempoh” menjadi “tempo”, “wakil-wakil bangsa Indonesia” menjadi “atas nama bangsa Indonesia”, dan penulisan tanggal “Djakarta, hari 17 boelan 8 tahoen 05” (tahun Jimmu Jepang 2605 = 1945 M).' }
            ]
          },
          {
            label: 'Pelaksanaan Proklamasi',
            date: '17 Ags 1945, 10.00 WIB',
            at: 19450817,
            desc: 'Semula upacara direncanakan di Lapangan Ikada, tetapi dialihkan ke rumah Soekarno karena tentara Jepang berjaga. Dibacakan tepat pukul 10.00 WIB, Jumat Legi, bulan Ramadan.',
            children: [
              { label: 'Lokasi: Jl. Pegangsaan Timur No. 56, Jakarta', desc: 'Halaman rumah Soekarno di Pegangsaan Timur 56 dihadiri ±500–1000 orang. Mikrofon sederhana, tiang bambu, dan bendera jahitan tangan menjadi saksi lahirnya Republik.' },
              { label: 'Pembaca: Ir. Soekarno & Drs. Moh. Hatta', desc: 'Soekarno membacakan teks dengan suara lantang didampingi Hatta. Pidato pengantar singkat menegaskan kemerdekaan bukan hadiah, melainkan hasil perjuangan rakyat.' },
              { label: 'Pengibaran Bendera: Oleh Latief Hendraningrat & Suhud', desc: 'Sang Saka Merah Putih yang dijahit Fatmawati dikibarkan oleh Latief Hendraningrat dibantu Suhud, diiringi lagu Indonesia Raya. Setelah itu berita disebar lewat radio, surat kabar, dan selebaran ke seluruh Jawa hari itu juga.' }
            ]
          }
        ]
      },
      {
        id: 'c',
        num: 'C',
        title: 'Pembentukan Pemerintahan',
        span: 'Pasca Proklamasi',
        nodes: [
          {
            label: 'Sidang PPKI I',
            date: '18 Ags 1945',
            at: 19450818,
            desc: 'Sehari setelah merdeka (18 Agustus 1945, pukul 11.00), PPKI bersidang di bekas Gedung Volksraad, Pejambon, Jakarta untuk memberi dasar hukum negara baru.',
            children: [
              { label: 'Dasar Negara: Pengesahan UUD 1945 sebagai konstitusi', desc: 'PPKI mengesahkan UUD 1945 denganhapusnya 7 kata Piagam Jakarta (“dengan kewajiban menjalankan syariat Islam...”) menjadi “Ketuhanan Yang Maha Esa” demi persatuan Indonesia Timur yang diwakili Sam Ratulangi dan Latuharhary.' },
              { label: 'Pemimpin Negara: Pemilihan Soekarno (Presiden) & Hatta (Wapres)', desc: 'Secara aklamasi Soekarno dipilih Presiden dan Hatta Wakil Presiden. PPKI juga memutuskan presiden untuk sementara dibantu KNIP sebelum ada MPR/DPR.' }
            ]
          },
          {
            label: 'Sidang PPKI II',
            date: '19 Ags 1945',
            at: 19450819,
            desc: 'Sidang kedua (19 Agustus 1945) melengkapi mesin pemerintahan agar proklamasi tidak hanya teks, tetapi berjalan sebagai negara.',
            children: [
              { label: 'Birokrasi: Pembentukan 12 Kementerian & 4 Menteri Negara', desc: 'Dibentuk 12 kementerian (Dalam Negeri, Luar Negeri, Kehakiman, Keuangan, Kemakmuran, Kesehatan, Pengajaran, Sosial, Pertahanan, Perhubungan, Pekerjaan Umum, Penerangan) serta 4 menteri negara. Kabinet pertama (Kabinet Presidensial) dilantik 2 September 1945.' },
              { label: 'Wilayah: Pembagian 8 Provinsi awal & pengangkatan Gubernur', desc: 'Wilayah dibagi 8 provinsi (1945): Jawa Barat (Sutardjo), Jawa Tengah (R.P. Soeroso), Jawa Timur (R.M.T. Suryo), Sumatera (Teuku M. Hasan), Borneo/Kalimantan (Pangeran M. Noor), Sulawesi (Sam Ratulangi), Maluku (J. Latuharhary), Sunda Kecil/Nusa Tenggara (I G. Puja). Yogyakarta & Surakarta menjadi Daerah Istimewa/Kooti.' }
            ]
          },
          {
            label: 'Pembentukan Lembaga Tambahan',
            date: '29 Ags 1945',
            at: 19450829,
            desc: 'Untuk menampung aspirasi daerah sebelum pemilu, dibentuk badan-badan pelengkap akhir Agustus 1945.',
            children: [
              { label: 'KNIP: Dibentuk untuk membantu tugas Presiden (sebelum ada DPR/MPR)', desc: 'KNIP (Komite Nasional Indonesia Pusat) dibentuk 29 Agustus 1945, dilantik dengan ketua Kasman Singodimedjo. Awalnya penasihat presiden, sejak Maklumat 16 Oktober 1945 KNIP menjadi badan legislatif sementara.' }
            ]
          }
        ]
      }
    ]
  };

  /* ---------- 2. HELPER ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function iso(at) {
    if (!at) return null;
    var s = String(at);
    while (s.length < 8) s = '0' + s;
    return s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6, 8);
  }

  function labelOf(node) {
    var l = node.querySelector(':scope > .node-row > .label');
    return l ? l.textContent : '';
  }

  /* ---------- 3. RENDER POHON ---------- */
  function renderNode(node, depth, path) {
    var kids = node.children || [];
    var li = el('li', 'node');
    li.setAttribute('data-depth', String(depth));

    var row = el('div', 'node-row');

    if (kids.length) {
      var btn = el('button', 'tgl');
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-controls', 'p-' + path);
      btn.setAttribute('aria-label', 'Tutup detail: ' + node.label);
      btn.appendChild(el('span', 'mark'));
      row.appendChild(btn);
    } else {
      row.appendChild(el('span', 'mark leaf'));
    }

    var label = el('span', 'label', node.label);
    label.id = 'l-' + path;
    row.appendChild(label);

    if (node.date) row.appendChild(el('span', 'chip', node.date));
    li.appendChild(row);

    if (node.desc) li.appendChild(el('p', 'desc', node.desc));

    if (kids.length) {
      var panel = el('div', 'node-panel');
      panel.id = 'p-' + path;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', 'l-' + path);

      var inner = el('div', 'panel-in');
      var ul = el('ul', 'kids');
      for (var i = 0; i < kids.length; i++) {
        ul.appendChild(renderNode(kids[i], depth + 1, path + '-' + (i + 1)));
      }
      inner.appendChild(ul);
      panel.appendChild(inner);
      li.appendChild(panel);
      li.setAttribute('data-open', 'true');
    }

    return li;
  }

  function renderAct(act) {
    var mount = document.querySelector('.tree-mount[data-act="' + act.id + '"]');
    if (!mount) return;
    var tree = el('ul', 'tree');
    for (var i = 0; i < act.nodes.length; i++) {
      tree.appendChild(renderNode(act.nodes[i], 1, act.id + '-' + (i + 1)));
    }
    mount.appendChild(tree);
  }

  /* ---------- 4. SIDEBAR TANGGAL ---------- */
  function collectDates(nodes, out) {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.date) out.push(n);
      if (n.children) collectDates(n.children, out);
    }
    return out;
  }

  function renderDates(act) {
    var list = document.querySelector('ol.dates[data-act="' + act.id + '"]');
    var empty = document.querySelector('.dates-empty[data-act="' + act.id + '"]');
    if (!list) return;

    var dated = collectDates(act.nodes, []).slice().sort(function (a, b) {
      return (a.at || 0) - (b.at || 0);
    });

    for (var i = 0; i < dated.length; i++) {
      var li = el('li');
      var t = el('time', null, dated[i].date);
      var d = iso(dated[i].at);
      if (d) t.setAttribute('datetime', d);
      li.appendChild(t);
      li.appendChild(el('span', 'who', dated[i].label));
      list.appendChild(li);
    }
    if (empty) empty.hidden = dated.length > 0;
  }

  /* ---------- 5. BUKA / TUTUP ---------- */
  function setOpen(node, open) {
    node.setAttribute('data-open', open ? 'true' : 'false');
    var btn = node.querySelector(':scope > .node-row > .tgl');
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', (open ? 'Tutup detail: ' : 'Buka detail: ') + labelOf(node));
    }
  }

  function setAll(root, open) {
    var branches = root.querySelectorAll('.node[data-open]');
    for (var i = 0; i < branches.length; i++) setOpen(branches[i], open);
  }

  /* Default layar: cabang pertama terbuka, sisanya tertutup (cetak selalu terbuka). */
  function initStates(root) {
    var branches = root.querySelectorAll('.node[data-open]');
    for (var i = 0; i < branches.length; i++) setOpen(branches[i], i === 0);
  }

  function isOpen(btn) {
    var n = btn.parentElement;
    while (n) {
      if (n.classList && n.classList.contains('node-panel')) {
        var owner = n.parentElement;
        if (owner && owner.getAttribute('data-open') === 'false') return false;
      }
      n = n.parentElement;
    }
    return true;
  }

  function visibleToggles(scope) {
    var all = scope.querySelectorAll('.tgl');
    var res = [];
    for (var i = 0; i < all.length; i++) if (isOpen(all[i])) res.push(all[i]);
    return res;
  }

  function moveFocus(list, cur, delta) {
    if (!list.length) return;
    var idx = list.indexOf(cur);
    var next = idx < 0 ? 0 : Math.min(Math.max(idx + delta, 0), list.length - 1);
    list[next].focus();
  }

  function parentToggle(btn) {
    var li = btn.closest('.node');
    var parentLi = li && li.parentElement ? li.parentElement.closest('.node') : null;
    if (!parentLi) return null;
    var t = parentLi.querySelector(':scope > .node-row > .tgl');
    return t === btn ? null : t;
  }

  function firstChildToggle(btn) {
    var node = btn.closest('.node');
    var kids = node ? node.querySelectorAll('.node-panel .tgl') : [];
    return kids.length ? kids[0] : null;
  }

  /* ---------- 6. INTERAKSI ---------- */
  OUTLINE.acts.forEach(function (act) {
    renderAct(act);
    renderDates(act);
    var mount = document.querySelector('.tree-mount[data-act="' + act.id + '"]');
    if (!mount) return;

    initStates(mount);

    mount.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.tgl') : null;
      if (!btn) return;
      var node = btn.closest('.node');
      setOpen(node, node.getAttribute('data-open') !== 'true');
    });

    mount.addEventListener('keydown', function (e) {
      var btn = e.target.closest ? e.target.closest('.tgl') : null;
      if (!btn) return;
      var node = btn.closest('.node');
      var open = node.getAttribute('data-open') === 'true';
      var list = visibleToggles(mount);

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (!open) { setOpen(node, true); }
          else { var c = firstChildToggle(btn); if (c) c.focus(); }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (open) { setOpen(node, false); }
          else { var p = parentToggle(btn); if (p) p.focus(); }
          break;
        case 'ArrowDown':
          e.preventDefault(); moveFocus(list, btn, 1); break;
        case 'ArrowUp':
          e.preventDefault(); moveFocus(list, btn, -1); break;
        case 'Home':
          e.preventDefault(); if (list.length) list[0].focus(); break;
        case 'End':
          e.preventDefault(); if (list.length) list[list.length - 1].focus(); break;
      }
    });
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button[data-all]') : null;
    if (!b) return;
    var mount = document.querySelector('.tree-mount[data-act="' + b.getAttribute('data-all') + '"]');
    if (mount) setAll(mount, b.getAttribute('data-open') === 'true');
  });

  var printBtn = document.getElementById('cetak');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  /* ---------- 7. REVEAL, NAV AKTIF, PROGRESS ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    for (var i = 0; i < reveals.length; i++) io.observe(reveals[i]);

    var links = {};
    var navLinks = document.querySelectorAll('.actnav a');
    for (var j = 0; j < navLinks.length; j++) {
      links[navLinks[j].getAttribute('href').slice(1)] = navLinks[j];
    }
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          for (var k = 0; k < navLinks.length; k++) navLinks[k].removeAttribute('aria-current');
          a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    for (var s = 0; s < navLinks.length; s++) {
      var id = navLinks[s].getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    }
  } else {
    for (var r = 0; r < reveals.length; r++) reveals[r].classList.add('is-in');
  }

  var bar = document.querySelector('.progress > span');
  if (bar) {
    var tick = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(Math.max(window.pageYOffset / max, 0), 1) : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      tick = false;
    };
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
