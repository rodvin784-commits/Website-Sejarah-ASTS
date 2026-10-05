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
            children: [
              { label: 'Pendaratan Pertama: Tarakan, Kalimantan Timur', date: 'Jan 1942', at: 19420111 },
              { label: 'Penyerahan Belanda: Perjanjian Kalijati', date: '8 Mar 1942', at: 19420308 },
              { label: 'Propaganda 3A: Jepang Pemimpin, Pelindung, & Cahaya Asia' }
            ]
          },
          {
            label: 'Kebijakan Utama',
            children: [
              { label: 'Bidang Militer: Wajib militer & disiplin tinggi' },
              { label: 'Bidang Ekonomi: Ekonomi Perang (eksploitasi padi, karet, aset)' },
              { label: 'Sosial-Budaya: Bahasa Indonesia diizinkan, wajib Seikerei' }
            ]
          },
          {
            label: 'Dampak bagi Rakyat',
            children: [
              { label: 'Sisi Negatif: Romusha (kerja paksa), kelaparan, kemiskinan' },
              { label: 'Sisi Positif: Pelatihan militer pemuda, bahasa Indonesia meluas' }
            ]
          },
          {
            label: 'Organisasi Bentukan Jepang',
            children: [
              { label: 'Sipil: Gerakan 3A, PUTERA, Jawa Hokokai' },
              { label: 'Militer & Semimiliter: Seinendan, Keibodan, Heiho, PETA' },
              { label: 'Persiapan Kemerdekaan: BPUPKI & PPKI' }
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
            children: [
              { label: 'Bom atom di Hiroshima & Nagasaki', date: '6 & 9 Ags 1945', at: 19450806 },
              { label: 'Jepang menyerah pada Sekutu (Vacuum of Power)', date: '15 Ags 1945', at: 19450815 }
            ]
          },
          {
            label: 'Peristiwa Rengasdengklok',
            date: '16 Ags 1945',
            at: 19450816,
            children: [
              { label: 'Konflik: Perbedaan pendapat Golongan Muda vs Tua' },
              { label: 'Tindakan: Mengamankan Soekarno-Hatta dari pengaruh Jepang' }
            ]
          },
          {
            label: 'Penyusunan Teks Proklamasi',
            date: 'Malam 16 – subuh 17 Ags 1945',
            at: 19450816,
            children: [
              { label: 'Lokasi: Rumah Laksamana Maeda (Malam – Subuh)' },
              { label: 'Perumus Teks: Soekarno, Moh. Hatta, Achmad Soebardjo' },
              { label: 'Pengetik Teks: Sayuti Melik (dengan beberapa perubahan kata)' }
            ]
          },
          {
            label: 'Pelaksanaan Proklamasi',
            date: '17 Ags 1945, 10.00 WIB',
            at: 19450817,
            children: [
              { label: 'Lokasi: Jl. Pegangsaan Timur No. 56, Jakarta' },
              { label: 'Pembaca: Ir. Soekarno & Drs. Moh. Hatta' },
              { label: 'Pengibaran Bendera: Oleh Latief Hendraningrat & Suhud' }
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
            children: [
              { label: 'Dasar Negara: Pengesahan UUD 1945 sebagai konstitusi' },
              { label: 'Pemimpin Negara: Pemilihan Soekarno (Presiden) & Hatta (Wapres)' }
            ]
          },
          {
            label: 'Sidang PPKI II',
            date: '19 Ags 1945',
            at: 19450819,
            children: [
              { label: 'Birokrasi: Pembentukan 12 Kementerian & 4 Menteri Negara' },
              { label: 'Wilayah: Pembagian 8 Provinsi awal & pengangkatan Gubernur' }
            ]
          },
          {
            label: 'Pembentukan Lembaga Tambahan',
            date: '29 Ags 1945',
            at: 19450829,
            children: [
              { label: 'KNIP: Dibentuk untuk membantu tugas Presiden (sebelum ada DPR/MPR)' }
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
