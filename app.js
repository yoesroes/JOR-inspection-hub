const app = document.querySelector('#appView');
const nav = document.querySelector('#bottomNav');
let current = 'login';
let role = 'inspector';
let activeUser = false;
let profilePhoto = '';
const profileInfo = {name:'Inspektur Demo',username:'inspektur.demo',homeAddress:'',boardingAddress:'',emergencyPhone:'',personalStatus:'Aktif bertugas'};
const plans = [{task:'Periksa sambungan sisi utara Pier 02',start:'08:00',end:'10:00',status:'Direncanakan'}, {task:'Dokumentasikan kondisi balok B-04',start:'10:30',end:'12:00',status:'Direncanakan'}];
const libraryDocs = [
  {name:'Shop Drawing Pier 02 — Zona Utara',kind:'Shop drawing',meta:'Revisi 03 · PDF'},
  {name:'Spesifikasi Teknis Struktur Dermaga',kind:'Dokumen teknis',meta:'Dokumen proyek · PDF'},
  {name:'Metode Pelaksanaan Test PDA',kind:'Metode kerja',meta:'Revisi 01 · PDF'},
  {name:'Detail Sambungan Balok B-04',kind:'Shop drawing',meta:'Revisi 02 · PDF'}
];
const pendingSignups = [{name:'Dimas Pratama',username:'dimas.p',email:'dimas@example.test',requested:'Hari ini · 09.05'}];
const folderElements = ['Bored pile','Pile cap','Pier','Pierhead'];
const issues = [];
const CATS = {'Mutu material':'A','Alat / mesin':'A','Cuaca':'A','Struktural':'B','Lainnya':'A'};
const OUTCOMES = ['Diselesaikan sesuai rekomendasi','Diselesaikan dengan cara lain','Ditutup, rekomendasi tidak diikuti','Gugur / tidak perlu tindakan'];
const PARTIES = ['Kontraktor','MK','Engineer CES','Lainnya'];
const VIAS = ['Lisan di lapangan','Rapat','Surat','WhatsApp'];
const WHO = {inspector:'Anda · Inspektur',engineer:'Anda · Senior Engineer',admin:'Admin JOR'};
let nextIssueId = 4;
let curIssue = null;
let curActivity = null;
const TAHAP = ['Bored pile','Pile cap','Pier','Pierhead'];
const STEPS = ['Rebar','Bekisting','Siap dicor','Pengecoran','Curing'];
const activities = [
  {id:1,name:'Pembesian pile cap',lokasi:'P10',time:'08.00',end:'',status:'Sedang berjalan',date:null,by:'Anda',photos:[{caption:'Pemeriksaan tulangan pile cap sisi utara.'},{caption:'Sambungan tulangan sebelum pengecoran.'}]},
  {id:2,name:'Test PDA bored pile',lokasi:'P9',time:'09.20',end:'',status:'Delay',date:null,by:'Rani',why:'Alat PDA terlambat tiba',delayAt:'09.20',photos:[{caption:'Peralatan uji belum tiba di lokasi.'}]},
  {id:3,name:'Pengecoran pier',lokasi:'P2',time:'07.30',end:'11.45',status:'Selesai',date:null,by:'Maya',photos:[{caption:'Pengecoran pier selesai dan permukaan dirapikan.'}]},
  {id:4,name:'Pemasangan bekisting pierhead',lokasi:'P1',time:'13.00',end:'15.10',status:'Selesai',date:null,by:'Anda',photos:[{caption:'Bekisting pierhead selesai dipasang.'}]},
  {id:5,name:'Joint inspection rebar',lokasi:'P2',time:'10.00',end:'10.40',status:'Selesai',date:null,by:'Anda',photos:[{caption:'Joint inspection tulangan rebar.'}]},
  {id:6,name:'Pengeboran bored pile',lokasi:'P10',time:'08.30',end:'12.00',status:'Selesai',date:null,by:'Anda',photos:[{caption:'Pengeboran bored pile selesai sesuai kedalaman rencana.'}]}
];
const projectPiers = ['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10'];
const PS = [{pier:'P1',stage:'Pierhead',step:'Curing',src:'Laporan inspektur · 14 Okt'},{pier:'P2',stage:'Pier',step:'Pengecoran pile cap',src:'Laporan Maya · hari ini'},{pier:'P3',stage:'Survey',step:'Survey lokasi',src:'Laporan inspektur · hari ini'},{pier:'P4',stage:'Clearance',step:'Menunggu clearance area',src:'Laporan inspektur · hari ini'},{pier:'P5',stage:'Bored pile',step:'Pengeboran',src:'Laporan inspektur · hari ini'},{pier:'P6',stage:'Bored pile',step:'Persiapan pengeboran',src:'Laporan inspektur · hari ini'},{pier:'P7',stage:'Clearance',step:'Pembersihan area',src:'Laporan inspektur · hari ini'},{pier:'P8',stage:'Survey',step:'Survey elevasi',src:'Laporan inspektur · hari ini'},{pier:'P9',stage:'Bored pile',step:'Test PDA',src:'Laporan Rani · hari ini'},{pier:'P10',stage:'Pile cap',step:'Bekisting',src:'Laporan Budi · 09.30'}];
const notifs = [{t:'Senior engineer menanggapi issue "Panjang penyaluran kurang"',w:'10 menit lalu',u:1},{t:'Pengingat: Test PDA P9 pukul 09.20',w:'1 jam lalu',u:1},{t:'Pengumuman admin: foto proyek dikirim lewat Pelaporan Lapangan',w:'Kemarin',u:0}];
let atts = [];
const jis = [];
let nextJi = 1;
let jiSel = {};
const BASE = {Rebar:['Diameter dan jumlah tulangan sesuai gambar','Spasi dan sengkang sesuai gambar','Panjang penyaluran / lewatan terpenuhi','Tekukan sesuai standar','Tulangan bersih dari karat dan lumpur'],Dimensi:['Dimensi sesuai gambar','Elevasi sesuai gambar','Posisi / koordinat sesuai gambar'],Bekisting:['Bekisting kokoh dan rapat','Perancah terpasang sesuai','Permukaan bersih dan siap dicor'],PDA:['Umur beton memenuhi syarat','Kepala tiang siap diuji','Pelaksanaan sesuai prosedur','Data hasil diterima']};
BASE.PIT = BASE.Statik = BASE.Dinamis = BASE.PDA;
const EXTRA = {'Bored pile|Rebar':['Spacer dan penggantung tulangan terpasang'],'Bored pile|Dimensi':['Diameter dan kedalaman lubang sesuai'],'Pile cap|Rebar':['Selimut beton terpenuhi','Stek kolom / pier terpasang sesuai'],'Pier|Rebar':['Selimut beton terpenuhi'],'Pierhead|Rebar':['Selimut beton terpenuhi','Dudukan perletakan sesuai']};
const KINDS = {'Bored pile':['Rebar','Dimensi','PDA','PIT','Statik','Dinamis'],'Pile cap':['Rebar','Dimensi','Bekisting'],'Pier':['Rebar','Dimensi','Bekisting'],'Pierhead':['Rebar','Dimensi','Bekisting']};
const items = (element,kind) => [...(BASE[kind] || []),...(EXTRA[element+'|'+kind] || [])];
let hf, ht, cx = '';


function login(){nav.hidden=true;return `<section class="login-screen"><div class="welcome-mark">J</div><p class="eyebrow">JOR PROJECT HUB</p><h1>Sistem Informasi<br><em>Pekerjaan Lapangan</em></h1><p class="intro">Masuk untuk melihat informasi proyek, rencana kerja, dan dokumen JOR.</p><div class="login-illustration"><div class="sun"></div><div class="pier-art"><i></i><i></i><i></i><b></b><span></span></div><div class="water"></div></div><div class="login-bottom"><label class="field-label">Username atau email<input class="text-field" id="loginName" autocomplete="username" placeholder="Nama pengguna"></label><label class="field-label">Password<input class="text-field" id="loginPassword" type="password" autocomplete="current-password" placeholder="Masukkan password"></label><button class="primary-button" data-action="login">Masuk <span>→</span></button><p class="login-privacy">Belum punya akun? <button class="inline-link" data-view="signup">Ajukan pendaftaran</button></p><div class="sample-note">Demo pratinjau · data ilustratif, belum memakai akun sungguhan.</div></div></section>`}

function dashboardOld(){
  const planning = role === 'inspector'
    ? `<p class="screen-lead">Rencana kerja disusun dan dikelola sendiri oleh inspektur.</p><div class="section-title"><div><h2>Jadwal saya</h2><p>${plans.length} kegiatan hari ini</p></div><button class="plain-link" data-view="plan">＋ Tambah</button></div><div class="timeline">${plans.map(p=>`<article class="plan-card"><time>${escapeText(p.start)}–${escapeText(p.end)}</time><div><b>${escapeText(p.task)}</b><small>${escapeText(p.status)} · dibuat oleh Anda</small></div></article>`).join('')}</div>`
    : `<div class="illustrative-callout"><b>Rencana harian inspektur</b><span>Setiap inspektur mengelola jadwal kerjanya sendiri.</span></div>`;
  return head('DASHBOARD PRIBADI','Dashboard') + planning + `<div class="section-title"><div><h2>Library</h2><p>Shop drawing dan dokumen teknis proyek</p></div></div><button class="library-entry" data-view="library"><span class="file-icon">▤</span><span><b>Buka Library proyek</b><small>Cari gambar dan dokumen yang dibutuhkan</small></span><i>→</i></button>`;
}

function plan(){return `<div class="screen-heading"><div><p class="eyebrow">DASHBOARD PRIBADI</p><h1>Rencana kerja</h1></div></div><p class="screen-lead">Buat rencana kerja harian dengan waktu mulai dan estimasi selesai.</p><form id="planForm" class="stack-form"><label class="field-label">Kegiatan<input class="text-field" name="task" required placeholder="Contoh: inspeksi Pier 02"></label><div class="time-row"><label class="field-label">Mulai<input class="text-field" name="start" type="time" required value="13:00"></label><label class="field-label">Estimasi selesai<input class="text-field" name="end" type="time" required value="15:00"></label></div><button class="primary-button">Simpan rencana <span>→</span></button></form><div class="section-title"><div><h2>Jadwal hari ini</h2><p>Rencana yang Anda susun</p></div></div><div class="timeline">${plans.map(p=>`<article class="plan-card"><time>${escapeText(p.start)}–${escapeText(p.end)}</time><div><b>${escapeText(p.task)}</b><small>${escapeText(p.status)} · dibuat oleh Anda</small></div></article>`).join('')}</div>`}

function profile(){return `<div class="screen-heading"><div><p class="eyebrow">AKUN PENGGUNA</p><h1>Profile</h1></div></div><div class="profile-photo-row"><label class="profile-photo-picker" for="profilePhotoInput">${profilePhoto?`<img src="${profilePhoto}" alt="Foto profil">`:`<span>${role==='admin'?'AD':'IN'}</span>`}<i>＋</i></label><div><b>Foto profil</b><small>Ketuk foto untuk mengganti</small></div><input id="profilePhotoInput" type="file" accept="image/*" hidden></div><form id="profileForm" class="stack-form"><label class="field-label">Nama<input class="text-field" name="name" value="${escapeText(profileInfo.name)}" required></label><label class="field-label">Username<input class="text-field" name="username" value="${escapeText(profileInfo.username)}" required></label><label class="field-label">Password<input class="text-field" name="password" type="password" autocomplete="new-password" placeholder="Masukkan password baru untuk mengganti"></label><label class="field-label">Alamat rumah <small class="optional-note">(opsional)</small><textarea name="homeAddress" placeholder="Alamat rumah">${escapeText(profileInfo.homeAddress)}</textarea></label><label class="field-label">Alamat kos <small class="optional-note">(jika ada)</small><textarea name="boardingAddress" placeholder="Alamat kos">${escapeText(profileInfo.boardingAddress)}</textarea></label><label class="field-label">Nomor keluarga yang bisa dihubungi <small class="optional-note">(opsional)</small><input class="text-field" name="emergencyPhone" type="tel" value="${escapeText(profileInfo.emergencyPhone)}" placeholder="Nomor telepon keluarga"></label><label class="field-label">Status pribadi<textarea name="personalStatus" placeholder="Contoh: aktif bertugas, cuti, atau sedang di lokasi">${escapeText(profileInfo.personalStatus)}</textarea></label><button class="primary-button">Simpan profil <span>→</span></button></form>${role==='admin'?`<button class="menu-row" data-view="approvals">Persetujuan signup <span>${pendingSignups.length} permintaan →</span></button>`:''}<div class="profile-account-note">Password tidak ditampilkan. Perubahan profil di preview ini hanya tersimpan selama halaman terbuka.</div><button class="logout-button" data-action="logout">Keluar dari akun <span>↗</span></button><div class="illustrative-callout"><b>Mode pratinjau</b><span>Peran demo saat ini: ${role==='admin'?'Admin JOR':'Inspektur'}.</span><div class="filter-pills"><button class="${role==='inspector'?'selected':''}" data-action="role" data-role="inspector">Inspektur</button><button class="${role==='admin'?'selected':''}" data-action="role" data-role="admin">Admin JOR</button><button class="${role==='engineer'?'selected':''}" data-action="role" data-role="engineer">Senior Engineer</button></div></div>`}

function library(){return `<div class="screen-heading"><div><p class="eyebrow">UNTUK SEMUA PENGGUNA AKTIF</p><h1>Library</h1></div><span class="group-icon">▤</span></div><p class="screen-lead">Cari shop drawing dan dokumen teknis proyek.</p><label class="search-field">⌕ <input id="librarySearch" placeholder="Cari dokumen atau gambar…"></label><div class="filter-pills"><button class="selected" data-filter="Semua">Semua</button><button data-filter="Shop drawing">Shop drawing</button><button data-filter="Dokumen teknis">Dokumen teknis</button></div><div class="library-list" id="libraryList">${libraryRows(libraryDocs)}</div><div class="illustrative-callout"><b>Library proyek</b><span>Seluruh pengguna aktif dapat mencari dan membuka dokumen. Akses demo menampilkan metadata; file belum tersimpan.</span></div>`}

function libraryRows(rows){return rows.map(d=>`<button class="library-item" data-action="document"><span class="file-icon">▧</span><span><b>${escapeText(d.name)}</b><small>${escapeText(d.kind)} · ${escapeText(d.meta)}</small></span><i>→</i></button>`).join('')||'<p class="screen-lead">Dokumen tidak ditemukan.</p>'}

function signup(){nav.hidden=true;return `<div class="screen-heading"><div><p class="eyebrow">AKSES PENGGUNA</p><h1>Daftar akun</h1></div></div><p class="screen-lead">Akun aktif setelah disetujui Admin JOR. Peran ditetapkan admin saat menyetujui.</p><form id="signupForm" class="stack-form"><label class="field-label">Nama lengkap<input class="text-field" name="name" required></label><label class="field-label">Username<input class="text-field" name="username" required></label><label class="field-label">Email<input class="text-field" type="email" name="email" required></label><label class="field-label">Password<input class="text-field" type="password" name="password" required minlength="8" placeholder="Minimal 8 karakter"></label><button class="primary-button">Kirim permintaan <span>→</span></button></form><button class="plain-link" data-view="login">← Kembali ke Masuk</button>`}

function approvals(){return head('KHUSUS ADMIN JOR','Permintaan<br><strong>signup</strong>')+`<div class="record-list">${pendingSignups.map((u,i)=>`<article class="approval-card"><b>${escapeText(u.name)}</b><small>@${escapeText(u.username)} · ${escapeText(u.email)} · ${escapeText(u.requested)}</small><label class="field-label">Tetapkan peran<select name="role"><option>Inspektur</option><option>Senior Engineer</option><option>Admin JOR</option></select></label><div class="approval-actions"><button data-action="approve" data-index="${i}">Setujui</button><button data-action="reject" data-index="${i}">Tolak</button></div></article>`).join('')||'<div class="illustrative-callout"><b>Tidak ada permintaan tertunda</b></div>'}</div>`}

function statusClass(s){return s==='Selesai'?'complete':s==='Hold'?'hold':s==='Delay'?'waiting':s==='Menunggu'?'waiting':'progressing'}

function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2300)}

function timeNow(){return new Intl.DateTimeFormat('id-ID',{hour:'2-digit',minute:'2-digit'}).format(new Date())}

function pill(s){return `<span class="status-pill ${statusClass(s)}">${escapeText(s)}</span>`}

function head(e,t){return `<div class="screen-heading"><div><p class="eyebrow">${e}</p><h1>${t}</h1></div><button class="round-avatar" data-view="profile">${{inspector:'IN',engineer:'EN',admin:'AD'}[role]}</button></div>`}

function openAt(p,n){return issues.filter(x=>x.pier===p&&x.element===n&&x.status!=='Selesai')}

function newissue(){return head('ISSUE BARU','Laporkan<br><strong>masalah</strong>')+`<form id="issueForm" class="stack-form"><label class="field-label">Judul<input class="text-field" name="title" required placeholder="Contoh: Slump kurang truk mixer 3"></label><label class="field-label">Kategori<select name="cat">${Object.keys(CATS).map(c=>`<option>${c}</option>`).join('')}</select></label><div class="folder-select-row"><label class="field-label">Pier<select name="pier"><option value="">Tidak spesifik</option><option>P2</option><option>P9</option></select></label><label class="field-label">Elemen<select name="element"><option value="">—</option>${folderElements.map(n=>`<option>${n}</option>`).join('')}</select></label></div><div class="time-row"><label class="field-label">Mulai<input class="text-field" type="time" name="start" required></label><label class="field-label">Selesai <small class="optional-note">(opsional)</small><input class="text-field" type="time" name="end"></label></div><label class="field-label">Keterangan<textarea name="text" required></textarea></label><label class="field-label">Foto <small class="optional-note">(opsional)</small><input type="file" name="ph" accept="image/*" multiple></label><button class="primary-button">Kirim issue <span>→</span></button></form><div class="illustrative-callout"><b>Jalur penanganan</b><span>Struktural otomatis ke senior engineer. Kategori lain ditangani inspektur dan dapat dinaikkan.</span></div>`}

function closeissue(){const i=issues.find(x=>x.id===curIssue);return head('TUTUP ISSUE',escapeText(i.title))+`<form id="closeForm" class="stack-form"><label class="field-label">Hasil penutupan<select name="outcome">${OUTCOMES.map(o=>`<option>${o}</option>`).join('')}</select></label><label class="field-label">Catatan kondisi lapangan<textarea name="text" required placeholder="Wajib. Untuk rekomendasi tidak diikuti, tulis posisi kontraktor dan MK pada catatan issue."></textarea></label><button class="primary-button">Tutup issue <span>→</span></button></form><button class="plain-link" data-action="open-issue" data-id="${i.id}">← Batal</button>`}

function issueSeed(){
  issues.push(
    {id:1,title:'Tekukan rebar bored pile tidak memenuhi standar',area:'P9 · Bored pile',pier:'P9',element:'Bored pile',cat:'—',route:'B',status:'Hold',by:'Budi',start:'07.50',end:'',photos:2,outcome:'',notes:[{party:'Pengawas',via:'Lapangan',by:'Budi',time:'07.50',text:'Tekukan sengkang tidak sesuai radius standar.'},{party:'Pengawas',via:'Lapangan',by:'Budi',time:'08.05',text:'Tindakan: koreksi diameter tekukan sesuai standar; pengecoran ditahan sampai diperiksa ulang.'}]},
    {id:2,title:'Panjang penyaluran kurang',area:'P2 · Pile cap',pier:'P2',element:'Pile cap',cat:'—',route:'B',status:'Sedang ditangani',by:'Rani',start:'08.40',end:'',photos:1,outcome:'',notes:[{party:'Pengawas',via:'Lapangan',by:'Rani',time:'08.40',text:'Panjang penyaluran stek kurang dari gambar.'},{party:'Engineer CES',via:'Rapat',by:'Rani',time:'10.15',text:'Tindakan: tambah panjang penyaluran sesuai gambar revisi, lalu ajukan pemeriksaan ulang.'}]},
    {id:3,title:'Slump beton di bawah batas penerimaan',area:'P2 · Pile cap',pier:'P2',element:'Pile cap',cat:'Mutu material',route:'A',status:'Hold',by:'Maya',start:'11.20',end:'',photos:1,outcome:'',notes:[{party:'Pengawas',via:'Lapangan',by:'Maya',time:'11.20',text:'Nilai slump di bawah batas spesifikasi.'},{party:'Pengawas',via:'Lapangan',by:'Maya',time:'11.25',text:'Tindakan: reject truk beton dan catat nomor batch sebelum suplai pengganti.'}]}
  );
}


function issueRow(i){const latest=i.notes[i.notes.length-1];return `<button class="record-card issue-global-row" data-action="open-issue" data-id="${i.id}"><div><b>${escapeText(i.title)}</b><small>${escapeText(i.area)} · dilaporkan ${escapeText(i.by)} · ${escapeText(i.status)}</small><small class="issue-action">Tindak lanjut: ${escapeText(latest?latest.text:'Belum ada tindakan tercatat')}</small></div><span class="count">Detail ›</span></button>`}

function actRow(a){const timing=`Mulai ${a.time||'—'} · Selesai ${a.end||'—'}${a.delayAt?' · '+a.status+' '+a.delayAt:''}`;return `<button class="record-card activity-row" data-action="activity" data-id="${a.id}"><div><b>${escapeText(a.name)}</b><small>${escapeText(a.lokasi)} · Inspektur ${escapeText(a.by)} · ${escapeText(timing)}${a.why?' · '+escapeText(a.why):''}</small></div>${pill(a.status)}</button>`}

function projectStatus(){return head('DATABASE PROYEK','Status<br><strong>proyek</strong>')+`<button class="plain-link" data-view="home">← Beranda</button><p class="screen-lead">Pilih pier untuk melihat tahap dan status terakhir yang dilaporkan.</p><label class="field-label">Cari lokasi pier<input id="pierSearch" class="text-field" placeholder="Ketik P1, P2, P10…"></label><div class="filter-pills pier-filters">${projectPiers.map(p=>`<button data-pier="${p}">${p}</button>`).join('')}</div><div id="pierStatusList" class="record-list">${pierStatusRows(PS)}</div>`}
function pierStatusRows(rows){return rows.map(p=>`<article class="record-card"><div><b>${escapeText(p.pier)} · ${escapeText(p.stage)}</b><small>${escapeText(p.src)}</small></div><span class="count">${escapeText(p.step)}</span></article>`).join('')||'<small>Status pier tidak ditemukan.</small>'}
function activityDetail(){const a=activities.find(x=>x.id===curActivity);if(!a)return home();return head('DETAIL KEGIATAN',escapeText(a.name))+`<button class="plain-link" data-view="home">← Beranda</button><div class="site-card"><p><b>Lokasi</b> ${escapeText(a.lokasi)}</p><p><b>Inspektur</b> ${escapeText(a.by)}</p><p><b>Status</b> ${pill(a.status)}</p><p><b>Waktu mulai</b> ${escapeText(a.time||'—')} · <b>Selesai</b> ${escapeText(a.end||'—')}</p>${a.delayAt?`<p><b>${escapeText(a.status)} sejak</b> ${escapeText(a.delayAt)} · ${escapeText(a.why||'')}</p>`:''}</div><div class="section-title"><div><h2>Foto dan keterangan</h2></div></div><div class="photo-gallery">${(a.photos||[]).map(p=>`<article class="gallery-card">${p.url?`<img class="gallery-image" src="${p.url}" alt="Foto kegiatan di ${escapeText(a.lokasi)}">`:`<div class="gallery-placeholder gallery-image"><span>▧</span><small>Foto laporan ilustratif</small></div>`}<div class="gallery-content"><p class="gallery-caption">${escapeText(p.caption)}</p><small class="gallery-meta">Dikirim oleh ${escapeText(a.by)} · ${escapeText(a.time||'')}</small></div></article>`).join('')||'<small>Belum ada foto pada laporan ini.</small>'}</div>`}

function home(){const open=issues.filter(i=>i.status!=='Selesai');return head('PROYEK JOR · INFORMASI GLOBAL','Aktivitas<br><strong>Lapangan</strong>')+`<div class="weather"><b>☁ 31°C</b> Cerah berawan · peluang hujan 20%<small>Lokasi proyek · data contoh</small></div><div class="section-title"><div><h2>Kegiatan lapangan</h2><p>Ketuk kegiatan untuk foto dan detail</p></div></div><div class="record-list">${activities.filter(a=>a.date===TODAY).map(actRow).join('')}</div><div class="section-title"><div><h2>Status proyek · P1–P10</h2><p>Tahap berbeda di setiap pier</p></div><button class="plain-link" data-view="projectStatus">Cari pier ›</button></div><div class="record-list">${PS.slice(0,3).map(p=>`<button class="record-card" data-action="select-pier" data-pier="${p.pier}"><div><b>${escapeText(p.pier)} · ${escapeText(p.stage)}</b><small>${escapeText(p.src)}</small></div><span class="count">${escapeText(p.step)}</span></button>`).join('')}</div><div class="section-title"><div><h2>Issue global</h2><p>Issue dari laporan pengguna dan tindakan lanjutnya</p></div><button class="plain-link" data-view="issuesAll">Lihat semua (${open.length})</button></div><div class="record-list">${open.slice(0,3).map(issueRow).join('')}</div>`}

function issuesAll(){return head('ISSUE LAPANGAN','Semua<br><strong>issue</strong>')+`<button class="plain-link" data-view="home">← Beranda</button><div class="record-list">${issues.map(issueRow).join('')}</div>`}

function issueDetail(){const i=issues.find(x=>x.id===curIssue);if(!i)return issuesAll();return head('DETAIL ISSUE',escapeText(i.title))+`<button class="plain-link" data-view="home">← Beranda</button><div class="site-card"><p><b>Lokasi</b> ${escapeText(i.area)}</p><p><b>Diangkat oleh</b> ${escapeText(i.by)} · ${i.start}</p><p><b>Status</b> ${i.status}${i.outcome?' · '+escapeText(i.outcome):''}</p></div><div class="section-title"><div><h2>Tindakan yang dilakukan / direncanakan</h2></div></div><div class="record-list">${i.notes.map(n=>`<article class="note"><b>${escapeText(n.time)} · ${escapeText(n.party)}</b><p>${escapeText(n.text)}</p></article>`).join('')}</div><div class="section-title"><div><h2>Foto issue</h2></div></div><div class="photo-strip">${Array.from({length:i.photos},()=>'<div class="ph">◉</div>').join('')||'<small>Tidak ada foto</small>'}</div><details><summary class="plain-link">Tambah catatan / tindakan</summary><form id="noteForm" class="stack-form"><label class="field-label">Pihak<select name="party">${PARTIES.map(p=>`<option>${p}</option>`).join('')}</select></label><input type="hidden" name="via" value="Lapangan"><label class="field-label">Catatan<textarea name="text" required placeholder="Misalnya: bersihkan karat rebar, koreksi diameter tekukan, atau reject slump di bawah batas."></textarea></label><button class="primary-button">Tambah ke riwayat issue</button></form></details>`+(i.status==='Selesai'?`<button class="plain-link" data-action="reopen" data-id="${i.id}">Buka kembali</button>`:`<button class="plain-link" data-action="close-form" data-id="${i.id}">Tutup issue</button>`)}

function attHtml(){return atts.map(u=>`<div class="att"><span>${escapeText(u.name)}</span><small>${u.ok?'Tersimpan di server':'Mengunggah…'}</small></div>`).join('')+(atts.length&&atts.every(u=>u.ok)?'<small class="optional-note">Semua lampiran tersimpan di server. Salinan di HP boleh dihapus.</small>':'')}

function upload(){return head('PELAPORAN LAPANGAN','Pelaporan<br><strong>Lapangan</strong>')+`<form id="repForm" class="stack-form"><div class="seg"><label><input type="radio" name="jenis" value="Kegiatan" checked><span>Kegiatan</span></label><label><input type="radio" name="jenis" value="Issue"><span>Issue</span></label></div><label class="field-label">Lokasi<input class="text-field" name="lokasi" required placeholder="P1, P2, P10…"></label><div class="kg"><label class="field-label">Nama aktivitas<input class="text-field" name="name"></label><div class="time-row"><label class="field-label">Waktu mulai<input class="text-field" type="time" name="time" value="${hhmm()}"></label><label class="field-label">Waktu selesai <small class="optional-note">(jika selesai)</small><input class="text-field" type="time" name="end"></label></div><div class="time-row"><label class="field-label">Status<select name="status"><option>Sedang berjalan</option><option>Hold</option><option>Delay</option><option>Selesai</option></select></label><label class="field-label">Waktu mulai hold / delay <small class="optional-note">(jika berlaku)</small><input class="text-field" type="time" name="statusTime"></label></div><label class="field-label">Alasan hold / delay <small class="optional-note">(jika berlaku)</small><input class="text-field" name="why"></label><div class="time-row"><label class="field-label">Elemen <small class="optional-note">(opsional)</small><select name="el"><option value="">—</option>${TAHAP.map(t=>`<option>${t}</option>`).join('')}</select></label><label class="field-label">Tahapan <small class="optional-note">(opsional)</small><select name="step"><option value="">—</option>${STEPS.map(t=>`<option>${t}</option>`).join('')}</select></label></div></div><div class="is" hidden><label class="field-label">Keterangan issue<input class="text-field" name="title"></label><label class="check"><input type="checkbox" name="eng" checked> Perlu keputusan senior engineer</label></div><label class="field-label">Detail<textarea class="big-text" name="text" required placeholder="Tulis laporan lapangan dan tindakan yang dilakukan atau direncanakan…"></textarea></label><div class="att-row"><label class="att-plus" for="attIn">＋</label><span>Lampiran foto atau berkas</span><input id="attIn" type="file" multiple hidden></div><div id="attList">${attHtml()}</div><button class="primary-button">Kirim <span>→</span></button></form>`}

function jiSeed(){
  jis.push({id:2,element:'Pile cap',kind:'Rebar',pier:'P10',time:'09.10',by:'Anda',done:6,total:7},{id:1,element:'Bored pile',kind:'Rebar',pier:'P9',time:'08.45',by:'Rani',done:5,total:6});
}


function jiView(){return head('JOINT INSPECTION & TEST','Joint<br><strong>Inspection</strong>')+`<button class="primary-button" data-view="jiel">＋ Catat joint inspection / test</button><div class="record-list">${jis.map(r=>`<article class="record-card"><div><b>${r.kind} · ${r.element}</b><small>${escapeText(r.pier)} · ${escapeText(r.by)} · ${r.time}</small></div><span class="count">${r.done}/${r.total}</span></article>`).join('')}</div>`}

function jiel(){return head('CATAT','Pilih<br><strong>elemen</strong>')+`<div class="record-list">${TAHAP.map(t=>`<button class="record-card" data-action="jiel" data-e="${t}"><div><b>${t}</b></div><span class="count">›</span></button>`).join('')}</div><button class="plain-link" data-view="ji">← Batal</button>`}

function jikind(){return head(jiSel.e.toUpperCase(),'Pilih<br><strong>pemeriksaan</strong>')+`<div class="record-list">${KINDS[jiSel.e].map(k=>`<button class="record-card" data-action="jikind" data-k="${k}"><div><b>${k}</b></div><span class="count">›</span></button>`).join('')}</div><button class="plain-link" data-view="jiel">← Kembali</button>`}

function jiform(){return head(jiSel.e.toUpperCase(),`Ceklis<br><strong>${jiSel.k} ${jiSel.e}</strong>`)+`<form id="chkForm" class="stack-form"><label class="field-label">Lokasi<input class="text-field" name="pier" required placeholder="P1, P2…"></label>${items(jiSel.e,jiSel.k).map(t=>`<label class="check"><input type="checkbox" name="c"> ${escapeText(t)}</label>`).join('')}<label class="field-label">Catatan <small class="optional-note">(opsional)</small><textarea name="note"></textarea></label><button class="primary-button">Simpan</button></form><button class="plain-link" data-view="jikind">← Kembali</button>`}

function historyStart(){
  const today = new Date();
  const fmt = date => date.toISOString().slice(0,10);
  hf = fmt(new Date(today.getTime()-6*86400000));
  ht = fmt(today);
  activities.forEach(a=>{if(!a.date)a.date=ht});
}


function dashboard(){const hist=activities.filter(a=>a.by==='Anda'&&a.date>=hf&&a.date<=ht);return dashboardOld()+`<div class="section-title"><div><h2>Notifikasi</h2></div></div><div class="record-list">${notifs.map(n=>`<article class="record-card"><span class="status-dot ${n.u?'progressing':'waiting'}"></span><div><b>${escapeText(n.t)}</b><small>${n.w}</small></div></article>`).join('')}</div><div class="section-title"><div><h2>Riwayat pekerjaan</h2></div></div><div class="time-row"><label class="field-label">Dari<input class="text-field" type="date" name="hf" value="${hf}"></label><label class="field-label">Sampai<input class="text-field" type="date" name="ht" value="${ht}"></label></div><div class="record-list">${hist.map(a=>`<article class="record-card"><div><b>${escapeText(a.name)}</b><small>${a.date} · ${escapeText(a.lokasi)} · ${a.time}</small></div><span class="count">${a.status}</span></article>`).join('')||'<small>Tidak ada pekerjaan pada rentang ini.</small>'}</div><div class="section-title"><div><h2>Alat</h2></div></div><div class="tool-row"><button data-view="calc">Kalkulator</button><button data-view="notes">Catatan</button><button data-action="sheet">Spreadsheet</button></div>`}

function calc(){const k=['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','=','+','C'];return head('ALAT','Kalkulator')+`<button class="plain-link" data-view="dashboard">← Dashboard</button><div class="calc-disp">${escapeText(cx)||'0'}</div><div class="calc-grid">${k.map(x=>`<button data-action="ck" data-k="${x}">${x}</button>`).join('')}</div>`}

function notes(){let v='';try{v=localStorage.getItem('jor-notes')||''}catch(e){}return head('ALAT','Catatan')+`<button class="plain-link" data-view="dashboard">← Dashboard</button><textarea id="noteArea" class="big-text">${escapeText(v)}</textarea>`}

const NAVV4 = {inspector:['home','dashboard','upload','ji','profile'],engineer:['home','dashboard','ji','profile'],admin:['home','dashboard','ji','profile']};
function render(page=current){
  const views = {login,signup,home,dashboard,upload,profile,library,approvals,issue:issueDetail,issuesAll,newissue,closeissue,ji:jiView,jiel,jikind,jiform,calc,notes,plan,projectStatus,activity:activityDetail};
  current = views[page] ? page : 'login';
  nav.hidden = ['login','signup'].includes(current);
  const groups = {home:['issue','issuesAll','newissue','closeissue','approvals','projectStatus','activity'],dashboard:['plan','library','calc','notes'],ji:['jiel','jikind','jiform']};
  nav.querySelectorAll('button').forEach(button=>{
    const view = button.dataset.view;
    button.hidden = !NAVV4[role].includes(view);
    button.classList.toggle('active',view===current||(groups[view]||[]).includes(current));
  });
  app.innerHTML = views[current]();
}


function nowTime(){return hhmm()}
const hhmm = () => new Date().toTimeString().slice(0,5);
const iso = d => d.toISOString().slice(0,10);
const TODAY = iso(new Date());
function hhmmForForm(){return hhmm()}


issueSeed();
jiSeed();
historyStart();
render('login');


document.addEventListener('click',e=>{
  const view=e.target.closest('[data-view]');
  if(view){render(view.dataset.view);return}
  const pier=e.target.closest('[data-pier]');if(pier){const p=PS.find(x=>x.pier===pier.dataset.pier);if(p){render('projectStatus');setTimeout(()=>{const input=document.querySelector('#pierSearch');if(input){input.value=p.pier;document.querySelector('#pierStatusList').innerHTML=pierStatusRows(PS.filter(x=>x.pier===p.pier))}},0)}return}
  const filter=e.target.closest('[data-filter]');
  if(filter){document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('selected',b===filter));const kind=filter.dataset.filter;document.querySelector('#libraryList').innerHTML=libraryRows(libraryDocs.filter(d=>kind==='Semua'||d.kind===kind));return}
  const action=e.target.closest('[data-action]');
  if(!action)return;
  const d=action.dataset, issue=issues.find(x=>x.id===Number(d.id));
  switch(d.action){
    case 'login': {const name=document.querySelector('#loginName').value.trim(),password=document.querySelector('#loginPassword').value;if(!name||!password){toast('Isi username/email dan password untuk demo.');return}activeUser=true;render('home');toast('Masuk demo sebagai pengguna aktif');break}
    case 'logout':activeUser=false;render('login');break;
    case 'role':role=d.role;render('profile');break;
    case 'approve':{const index=Number(d.index),card=action.closest('.approval-card'),selected=card.querySelector('[name="role"]').value;pendingSignups[index].approvedRole=selected;pendingSignups.splice(index,1);render('approvals');toast(`Permintaan disetujui sebagai ${selected}.`);break}
    case 'reject':pendingSignups.splice(Number(d.index),1);render('approvals');toast('Permintaan ditolak.');break;
    case 'document':toast('Pratinjau dokumen ilustratif · file belum terhubung.');break;
    case 'open-issue':curIssue=Number(d.id);render('issue');break;
    case 'activity':curActivity=Number(d.id);render('activity');break;
    case 'escalate':issue.route='B';issue.status='Menunggu keputusan';render('issue');toast('Issue dikirim ke senior engineer.');break;
    case 'istatus':issue.status=d.s;render('issue');break;
    case 'close-form':curIssue=issue.id;render('closeissue');break;
    case 'reopen':{const reason=prompt('Alasan membuka kembali issue:');if(reason){issue.status='Sedang ditangani';issue.outcome='';issue.notes.push({party:'Dibuka kembali',via:'Lapangan',by:WHO[role],time:timeNow(),text:reason});render('issue')}break}
    case 'jiel':jiSel={e:d.e};render('jikind');break;
    case 'jikind':jiSel.k=d.k;render('jiform');break;
    case 'sheet':toast('Spreadsheet menyusul di tahap berikutnya.');break;
    case 'ck':{const k=d.k;if(k==='C')cx='';else if(k==='='){const x=cx.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-');if(/^[0-9+\-*/. ]+$/.test(x)){try{cx=String(+Function('return '+x)().toFixed(10))}catch(err){cx=''}}}else cx+=k;render('calc');break}
  }
});

document.addEventListener('input',e=>{
  if(e.target.id==='noteArea'){try{localStorage.setItem('jor-notes',e.target.value)}catch(err){}}
  if(e.target.id==='librarySearch'){const query=e.target.value.toLowerCase();document.querySelector('#libraryList').innerHTML=libraryRows(libraryDocs.filter(d=>(d.name+' '+d.kind+' '+d.meta).toLowerCase().includes(query)))}
  if(e.target.id==='pierSearch'){const query=e.target.value.trim().toUpperCase();document.querySelectorAll('[data-pier]').forEach(b=>b.classList.toggle('selected',!!query&&b.dataset.pier===query));document.querySelector('#pierStatusList').innerHTML=pierStatusRows(PS.filter(p=>(p.pier+' '+p.stage+' '+p.step).toUpperCase().includes(query)))}
});

document.addEventListener('change',e=>{
  const target=e.target,reportForm=target.closest&&target.closest('#repForm');
  if(target.name==='hf'||target.name==='ht'){if(target.name==='hf')hf=target.value;else ht=target.value;render('dashboard');return}
  if(reportForm&&target.name==='jenis'){reportForm.querySelector('.kg').hidden=target.value!=='Kegiatan';reportForm.querySelector('.is').hidden=target.value!=='Issue'}
  if(target.id==='attIn'){[...target.files].forEach(file=>{const item={name:file.name,url:file.type.startsWith('image/')?URL.createObjectURL(file):'',ok:false};atts.push(item);setTimeout(()=>{item.ok=true;const list=document.querySelector('#attList');if(list)list.innerHTML=attHtml()},900+Math.random()*1500)});target.value='';document.querySelector('#attList').innerHTML=attHtml()}
  if(target.id==='profilePhotoInput'){const file=target.files[0];if(!file)return;if(profilePhoto)URL.revokeObjectURL(profilePhoto);profilePhoto=URL.createObjectURL(file);render('profile');toast('Foto profil demo diperbarui.')}
});

document.addEventListener('submit',e=>{
  const form=e.target,data=new FormData(form);
  if(form.id==='signupForm'){e.preventDefault();pendingSignups.push({name:data.get('name'),username:data.get('username'),email:data.get('email'),requested:`Hari ini · ${timeNow()}`});render('login');toast('Permintaan signup dikirim untuk persetujuan Admin JOR.');return}
  if(form.id==='profileForm'){e.preventDefault();profileInfo.name=data.get('name').trim();profileInfo.username=data.get('username').trim();profileInfo.homeAddress=data.get('homeAddress').trim();profileInfo.boardingAddress=data.get('boardingAddress').trim();profileInfo.emergencyPhone=data.get('emergencyPhone').trim();profileInfo.personalStatus=data.get('personalStatus').trim();const changedPassword=!!data.get('password');render('profile');toast(changedPassword?'Profil tersimpan; penggantian password belum terhubung.':'Profil tersimpan di demo.');return}
  if(form.id==='planForm'){e.preventDefault();if(role!=='inspector'){toast('Rencana harian disusun oleh inspektur.');return}if(data.get('end')<=data.get('start')){toast('Estimasi selesai harus setelah waktu mulai.');return}plans.push({task:data.get('task'),start:data.get('start'),end:data.get('end'),status:'Direncanakan'});render('dashboard');toast('Rencana kerja ditambahkan.');return}
  if(form.id==='issueForm'){e.preventDefault();const cat=data.get('cat'),pier=data.get('pier'),element=data.get('element');issues.unshift({id:nextIssueId++,title:data.get('title'),area:pier?`${pier} · ${element||'umum'}`:'Umum',pier,element,cat,route:CATS[cat],status:CATS[cat]==='B'?'Menunggu keputusan':'Terbuka',by:WHO[role],start:data.get('start'),end:data.get('end')||'',photos:[...form.ph.files].length,outcome:'',notes:[{party:'Inspektur',via:'Lapangan',by:WHO[role],time:timeNow(),text:data.get('text')}]});render('home');toast('Issue dicatat.');return}
  if(form.id==='noteForm'){e.preventDefault();const issue=issues.find(x=>x.id===curIssue);issue.notes.push({party:data.get('party'),via:data.get('via'),by:WHO[role],time:timeNow(),text:data.get('text').trim()});if(role==='engineer'&&issue.status==='Menunggu keputusan')issue.status='Sedang ditangani';render('issue');return}
  if(form.id==='closeForm'){e.preventDefault();const issue=issues.find(x=>x.id===curIssue),outcome=data.get('outcome'),note=data.get('text').trim();if(outcome===OUTCOMES[2]&&note.length<15){toast('Catatan posisi para pihak wajib diisi.');return}issue.status='Selesai';issue.outcome=outcome;issue.end=issue.end||timeNow();issue.notes.push({party:'Penutupan',via:'Lapangan',by:WHO[role],time:timeNow(),text:note});render('issue');toast('Issue ditutup dengan catatan.');return}
  if(form.id==='repForm'){e.preventDefault();const location=data.get('lokasi').trim().toUpperCase(),time=hhmm();if(data.get('jenis')==='Kegiatan'){const status=data.get('status'),entry={id:Date.now(),name:data.get('name')||data.get('text').slice(0,40),lokasi:location,time:data.get('time')||time,end:data.get('end'),status,date:TODAY,by:profileInfo.name||'Anda',why:data.get('why'),delayAt:['Delay','Hold'].includes(status)?(data.get('statusTime')||time):'',photos:atts.filter(x=>x.url).map(x=>({url:x.url,caption:data.get('text')}))};activities.unshift(entry);if(data.get('el')&&data.get('step')){const project={pier:location,stage:data.get('el'),step:data.get('step'),src:'Laporan '+profileInfo.name+' · '+time},existing=PS.find(item=>item.pier===location);existing?Object.assign(existing,project):PS.unshift(project)}}else{const senior=!!data.get('eng'),action=data.get('text');issues.unshift({id:nextIssueId++,title:data.get('title')||action.slice(0,50),area:location,pier:location,element:'',cat:'—',route:senior?'B':'A',status:'Terbuka',by:profileInfo.name||'Anda',start:time,end:'',photos:atts.length,outcome:'',notes:[{party:'Pengawas',via:'Lapangan',by:profileInfo.name||'Anda',time,text:action}]})}atts=[];render('home');toast('Laporan terkirim dan tampil di Beranda.');return}
  if(form.id==='chkForm'){e.preventDefault();const checks=[...form.querySelectorAll('[name=c]')];jis.unshift({id:nextJi++,element:jiSel.e,kind:jiSel.k,pier:data.get('pier').trim().toUpperCase(),time:hhmm(),by:'Anda',done:checks.filter(x=>x.checked).length,total:checks.length});render('ji');toast('Ceklis tersimpan.')}
});
