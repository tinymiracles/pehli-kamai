// ── FIREBASE ─────────────────────────────────────
firebase.initializeApp({
  apiKey:"AIzaSyD4hBZPFrbB_JRskYLHda-htoyY2EYUSzA",
  authDomain:"pehli-kamai.firebaseapp.com",
  projectId:"pehli-kamai",
  storageBucket:"pehli-kamai.firebasestorage.app",
  messagingSenderId:"461944204483",
  appId:"1:461944204483:web:6c677fc8534f81f6764676"
});
const db=firebase.firestore();
const auth=firebase.auth();

const allData = [
  {id:1,key:'alisha',name:'Alisha Shaikh Aslam',location:'Mumbai',sectors:['Admin & Data Entry'],note:'Looking in Admin and Data Entry',urgent:false,resume:false},
  {id:2,key:'bhavesh',name:'Bhavesh Rishi Pardeshi',location:'Grant Road, Mumbai',sectors:['Sales','Admin & Data Entry'],note:'Fresher, SSC 2026 pass, MS-CIT certified, good typing speed',urgent:false,resume:true},
  {id:3,key:'ayush',name:'Ayush Pardeshi',location:'Mumbai',sectors:['Sales','Admin & Data Entry','Office Work'],note:'Looking in Sales, Data Entry, Office Work',urgent:false,resume:false},
  {id:4,key:'paresh',name:'Paresh Pardeshi',location:'Mumbai',sectors:['Editing & Animation','Real Estate'],note:'Looking in Editing, Animation, Real Estate',urgent:false,resume:false},
  {id:5,key:'shreya_m',name:'Shreya Mathur',location:'Mumbai',sectors:['Media & Advertising','Design / Creative','Education & Training'],note:'TYBAMMC Advertising student, 3yr private tutoring exp',urgent:false,resume:true},
  {id:6,key:'kartik',name:'Kartik Pardeshi',location:'Mumbai',sectors:['Applied Arts','Medical Assistance','Clinic Coordination'],note:'Medical Assistant exp at allergy clinic, MS-CIT, aspiring Applied Arts',urgent:false,resume:true},
  {id:7,key:'dipesh',name:'Dipesh Vijay Dhodade',location:'Dahanu, Palghar',sectors:['Electrician','Electrical & Electronics','ITI Trades'],note:'ITI Electrician (77.8%), MS-CIT 93%, 1-month OJT at Thakur Electronics',urgent:false,resume:true},
  {id:8,key:'aniket',name:'Aniket Pardeshi',location:'Goregaon East',sectors:['Sales','Retail','Logistics','BPO'],note:'Fresher, HSC pass 2023, energetic team player ready to start',urgent:false,resume:true},
  {id:9,key:'riya',name:'Riya Sanjay Kale',location:'Goregaon East',sectors:['Tele-calling','Customer Support','Real Estate'],note:'2yr tele-calling exp in real estate sector',urgent:false,resume:true},
  {id:10,key:'harshad',name:'Harshad Sanjay Kale',location:'Mumbai',sectors:['Editing & Animation','Graphics & Design'],note:'Looking in Editing, Graphic, Animation',urgent:false,resume:false},
  {id:11,key:'amuthasara',name:'Amuthasara Albertraj',location:'Aarey Colony',sectors:['Education & Training','Admin','Customer Service'],note:'BA Mass Comm, 3+yr tuition teaching exp, student council leadership',urgent:false,resume:true},
  {id:12,key:'iqra',name:'Iqra Farid Khan',location:'Mumbai Central',sectors:['Retail & Fashion','Education & Training','Admin'],note:'BCom pursuing, boutique styling exp + teaching intern at Tiny Miracles Daycare',urgent:false,resume:true},
  {id:13,key:'shweta',name:'Shweta Sunil Jaiswal',location:'Andheri East',sectors:['Accounting','Admin','Banking Ops Support'],note:'BCom Accounting & Finance student, event & leadership exp',urgent:false,resume:true},
  {id:14,key:'janhavi',name:'Janhavi Pradeep Redkar',location:'Malad East',sectors:['Accounting','Admin','Banking Ops Support'],note:'BCom pursuing, Tally Prime A-grade certified, 40 WPM typing',urgent:false,resume:true},
  {id:15,key:'archita',name:'Archita Pardeshi',location:'Mumbai',sectors:['Accounting','Banking Ops Support','Admin'],note:'Operations Supervisor exp in Tally billing & vendor docs, pursuing degree',urgent:false,resume:true},
  {id:16,key:'shreya_s',name:'Shreya Shedge',location:'Parel',sectors:['Admin','Retail','Customer Service'],note:'Fresher, HSC pass, MS-CIT certified, dependable & adaptable',urgent:false,resume:true},
  {id:17,key:'gangaram',name:'Gangaram Raut',location:'Grant Road',sectors:['Accounting','Admin','Banking Ops Support'],note:'Tally-certified, part-time accounting exp in vouchers & ledgers',urgent:false,resume:true},
  {id:18,key:'sandeep',name:'Sandeep Betwala',location:'Mumbai',sectors:['Admin','Data Entry','Staffing / HR Ops'],note:'Staffing Coordinator at Ad Astra, prior data entry & sales ops exp',urgent:false,resume:true},
  {id:19,key:'purva',name:'Purva Shedge',location:'Parel',sectors:['Admin','Data Entry','BPO'],note:'Data Entry intern in Mumbai, documentation & verification skills',urgent:false,resume:true},
  {id:20,key:'ashish',name:'Ashish Anand Pardeshi',location:'Girgaon',sectors:['BPO','Technical Support','Admin'],note:'10+yr DSL Engineer at Tata Teleservices, MIS reporting & SLA mgmt',urgent:false,resume:true},
  {id:21,key:'chandar',name:'Chandar Pardeshi',location:'Mumbai',sectors:['Open to All'],note:'Open to any sector',urgent:false,resume:false},
  {id:22,key:'kripa',name:'Kripa Pardeshi',location:'Mumbai',sectors:['Admin / Front Desk','Beauty & Wellness','Healthcare Support'],note:'Receptionist at 2 clinics + freelance nail artist, BCom student',urgent:false,resume:true},
  {id:23,key:'varun',name:'Varun Pardeshi',location:'Mumbai Central',sectors:['Office Work','Admin & Data Entry'],note:'HSC + Computer Course, Fresher',urgent:false,resume:true},
  {id:24,key:'abhishek',name:'Abhishek Dhanraj Pardeshi',location:'Mumbai Central',sectors:['Customer Service','Retail','Catering & Hospitality'],note:'Fresher, billing/customer service exp at canteen, cookie shop & hospital ward',urgent:false,resume:true},
  {id:25,key:'zainab',name:'Ansari Zainab Abdul Latif',location:'Govandi',sectors:['Healthcare Support','Admin','Customer Service'],note:'6+yr exp: Nurse Assistant & Clinic Receptionist',urgent:true,resume:true},
  {id:26,key:'divya',name:'Divya Khandu Garud',location:'Aarey Colony',sectors:['Retail','Beauty & Wellness','Customer Service'],note:'3yr cash-counter exp at Greats Food, certified Makeup Artist',urgent:false,resume:true},
  {id:27,key:'janvi',name:'Janvi Ajay Pardeshi',location:'Mumbai',sectors:['Admin','Data Entry','BPO'],note:'Fresher, HSC Arts pass, basic computer & data entry skills',urgent:false,resume:true},
  {id:28,key:'kalpesh',name:'Kalpesh Nandu Lotade',location:'Aarey Colony',sectors:['Admin','IT Support','BPO'],note:'Fresher, HSC Commerce, MSCIT pursuing, ready for admin/IT/BPO roles',urgent:false,resume:true},
  {id:29,key:'kamini',name:'Kamini Krishnakumar Gangurde',location:'Mumbai',sectors:['Sales & Marketing','Hospitality','Customer Service'],note:'Hotel Mgmt + BA, sales & marketing exp at Excel Enterprises',urgent:false,resume:true},
  {id:30,key:'kinjal',name:'Kinjal Ravi Pardeshi',location:'Mumbai',sectors:['Admin','Retail','Customer Service'],note:'Fresher, HSC appearing 2025-26, quick learner, positive attitude',urgent:false,resume:true},
  {id:31,key:'mohd',name:'Mohd Sameer Umar Shaikh',location:'Mumbai Central',sectors:['Hospitality','Retail & Sales','Restaurant Operations'],note:'Team Leader at 1441 Pizzeria, prior sales & restaurant mgmt exp',urgent:false,resume:true},
  {id:32,key:'nihal',name:'Nihal Kurian',location:'Aarey Colony',sectors:['Design / VFX','Media & Creative'],note:'MAAC-trained Motion Graphic Designer, Photoshop/Illustrator/After Effects',urgent:false,resume:true},
  {id:33,key:'nikhil',name:'Nikhil Madhe',location:'Andheri East',sectors:['Open to All'],note:'10th pass, Fresher, hardworking',urgent:false,resume:true},
  {id:34,key:'omkar',name:'Omkar Mahesh Ghosalkar',location:'Aarey Colony',sectors:['Logistics & Supply Chain','Admin','E-commerce'],note:'BCom Logistics student, college leadership & coordination exp',urgent:false,resume:true},
  {id:35,key:'pradeep',name:'Pradeep Rama Hadal',location:'Aarey Colony',sectors:['Accounting','Admin','Banking Ops Support'],note:'BCom (7.46 CGPA), Tally ERP 9 & Excel trained, MSCIT certified',urgent:false,resume:true},
  {id:36,key:'pranali_g',name:'Pranali Gangurde',location:'Aarey Colony',sectors:['Hotel Front Desk','Housekeeping','Food & Beverage (F&B)','Customer Service'],note:'Hotel Mgmt course, trained in hospitality ops & front desk',urgent:false,resume:true},
  {id:37,key:'pranali_k',name:'Pranali Suresh Khanjode',location:'Aarey Colony',sectors:['Hospitality','Front Desk / F&B','Business Development'],note:'Hotel Mgmt course, hospitality training, interested in biz dev too',urgent:false,resume:true},
  {id:38,key:'sahil',name:'Sahil Pangerkar',location:'Virar',sectors:['Sales & Marketing','Insurance / BFSI','Marketing Internship'],note:'BMS student, LIC Agent training, sales & negotiation skills',urgent:false,resume:true},
  {id:39,key:'sarathi',name:'Sarathi Kishor Pandav',location:'Mumbai Central',sectors:['Admin','Retail','BPO'],note:'FY BMS student, Tally course pursuing, eager fresher',urgent:false,resume:true},
  {id:40,key:'shakil',name:'Shakil Sultan Shaikh',location:'Aarey Colony',sectors:['Jewellery & Craft Manufacturing','Retail'],note:'7yr jewellery filler & stone-setter, micro pave/prong/bezel setting',urgent:false,resume:true},
  {id:41,key:'sneha',name:'Sneha Kailash Chaudhari',location:'Aarey Colony',sectors:['Accounting','Banking Ops Support','Admin'],note:'BCom grad, Advance Tally Prime & Excel (pivot tables) trained',urgent:false,resume:true},
  {id:42,key:'twinkal',name:'Twinkal Gupta',location:'Mumbai',sectors:['Admin','Education & Training','BPO'],note:'HSC pass, tutoring exp, basic computer & typing skills',urgent:false,resume:true},
  {id:43,key:'vrushali',name:'Vrushali Sunil Magare',location:'Aarey Colony',sectors:['Admin','Retail','BPO'],note:'Pursuing graduation, MS-CIT certified, NSS volunteer 2021-23',urgent:false,resume:true},
  {id:44,key:'afrin',name:'Afrin Khan',location:'Mumbai',sectors:['Retail & Sales','Hospitality','Customer Service'],note:'10+yr Retail Store Manager, currently Store Mgr at Nilkamal',urgent:false,resume:true},
  {id:45,key:'akanksha',name:'Akanksha Ganesh Kadam',location:'Mumbai',sectors:['Accounting','Admin','Banking Ops Support'],note:'BCom pursuing, Tally Prime GST & Advance Excel certified fresher',urgent:false,resume:true},
  {id:46,key:'ambika',name:'Ambika Gopal Pardeshi',location:'Khetwadi',sectors:['Healthcare Support','Admin'],note:'Dental Assistant, 5+4+0.5yr exp across 3 Mumbai dental clinics',urgent:false,resume:true},
  {id:47,key:'dakshata',name:'Dakshata Parshuram Kolekar',location:'Mumbai',sectors:['Admin','Retail','BPO'],note:"Fresher pursuing FY, NCC 'A'&'B' certificate, disciplined & trainable",urgent:false,resume:true},
  {id:48,key:'jyostna',name:'Jyostna Shankar Ulyandal',location:'Mumbai',sectors:['Admin','Retail','BPO'],note:'TYBCOM pursuing, fresher, basic computer knowledge, eager learner',urgent:false,resume:true},
  {id:49,key:'kashish',name:'Kashish Dubakka',location:'Goregaon East',sectors:['Customer Service','BPO','Coordination'],note:'BCom pursuing, 6mo customer service exp at JAM Outsourcing',urgent:false,resume:true},
  {id:50,key:'omkar_k',name:'Omkar Mangesh Kudalkar',location:'Goregaon East',sectors:['Operations','Logistics & Courier','Admin'],note:'4yr Operations Executive in courier ops at Trackon Courier',urgent:false,resume:true},
  {id:51,key:'rohit',name:'Rohit Vijay Kale',location:'Goregaon East',sectors:['Sales','Banking','Customer Service'],note:'BCom grad, credit card sales at SBI + 3yr Swiggy delivery exp',urgent:false,resume:true},
  {id:52,key:'vaishnavi',name:'Vaishnavi Sarju Pardeshi',location:'Grant Road',sectors:['Medical / Healthcare','Open to All'],note:'HSC Arts pursuing, fresher, open to medical or any sector',urgent:false,resume:true},
  {id:53,key:'vijay_c',name:'Vijay Shivaji Chavan',location:'Mumbai',sectors:['Admin','Data Entry','BPO'],note:'BA pursuing, 2yr data entry & record-keeping exp at LPRO Co',urgent:false,resume:true},
];
const EJ_PK='iDYGDYpxhT7wKJ12d',EJ_SID='service_ob0zrq2',EJ_TID='template_1wuqmdr';
const N_EMAIL='meghna@tinymiracles.com',N_EMAIL2='rishikesh@tinymiracles.com',N_WA='919326691744';
emailjs.init(EJ_PK);

// ── SHEET/DRIVE LOGGER ───────────────────────────────────────────────
// Mirrors every HR and youth signup into a Google Sheet, and saves each
// youth's auto-generated resume into a Drive folder. Paste your deployed
// Apps Script Web App URL here (see setup-sheet-logger.md) — leave blank
// to disable, e.g. before it's deployed.
const SHEET_LOG_URL='';
function logSignup(type,payload){
  if(!SHEET_LOG_URL)return;
  try{
    fetch(SHEET_LOG_URL,{
      method:'POST',
      mode:'no-cors',
      headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify({type,...payload})
    }).catch(()=>{});
  }catch(e){}
}

// Map allData to OG format
function inferTrack(sectors){
  const soc=['Teaching','Community','Social','Field Work','Health','Environment','NSS','Education Support'];
  return sectors.some(s=>soc.some(k=>s.includes(k)))?'social':'corporate';
}

const DATA = allData.map(c=>{
  const hasRes = c.resume && RESUMES[c.key];
  return {
    id: c.id,
    key: c.key,
    name: c.name,
    age: 21,
    edu: c.note.includes('BCom')||c.note.includes('BA')||c.note.includes('BMS')||c.note.includes('B.Com') ? 'Graduate' : c.note.includes('HSC')||c.note.includes('12th') ? '12th Pass' : '10th Pass',
    sector: c.sectors[0] || 'Other',
    role: c.sectors[0] ? c.sectors[0]+' — Looking for work' : 'Looking for work',
    exp: c.note.includes('exp')||c.note.includes('yr')||c.note.includes('year')||c.note.includes('worked')||c.note.includes('Engineer') ? 'experienced' : 'fresher',
    skills: c.sectors,
    langs: ['Hindi','English'],
    about: c.note,
    exps: [],
    location: c.location,
    resume: hasRes,
    resumeKey: hasRes ? c.key : null,
    track: inferTrack([c.sectors[0]]),
  };
});

let sl=new Set(), curSec='all', curId=null, pendingResume=null, editingEmail=null, currentYtAcct=null;

function ini(n){return n.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();}

// Page nav
function showPage(p){
  const leavingDoor = !document.getElementById('view-door').classList.contains('hidden') && p!=='door';
  const enteringDoor = document.getElementById('view-door').classList.contains('hidden') && p==='door';
  const homeEl = document.getElementById('view-home');
  const leavingHome = homeEl && !homeEl.classList.contains('hidden') && p!=='home';
  const enteringHome = homeEl && homeEl.classList.contains('hidden') && p==='home';
  document.querySelectorAll('[id^="view-"]').forEach(x=>x.classList.add('hidden'));
  const v=document.getElementById('view-'+p);if(v)v.classList.remove('hidden');
  document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-current','false'));
  const nl=document.getElementById('nl-'+p);if(nl)nl.setAttribute('aria-current','true');
  // The shutter's render loop only stops when it's actually removed from the DOM
  // (its own disconnectedCallback) — toggling display:none alone leaves it rendering
  // invisibly forever. Detach it when leaving the door view; reattaching re-inits it,
  // which conveniently also replays the intro for free.
  if(leavingDoor){
    const el=document.querySelector('#shutterHolder pk-shutter');
    if(el){window.__pkShutter=el;el.remove();}
    stopShutterLoop();
  } else if(enteringDoor){
    const holder=document.getElementById('shutterHolder');
    if(holder && !holder.querySelector('pk-shutter')){
      holder.appendChild(window.__pkShutter||document.createElement('pk-shutter'));
      const s=holder.querySelector('pk-shutter'); if(!s.getAttribute('h')) s.setAttribute('h','840');
    }
    startShutterLoop();
  }
  // Same fix, same reason, for the how-it-works 3D scene sitting inside Home.
  if(leavingHome){
    const el=document.querySelector('.hiw3d-stage pk-hiw3d');
    if(el){window.__pkHiw3d=el;el.remove();}
  } else if(enteringHome){
    const stage=document.querySelector('.hiw3d-stage');
    if(stage && !stage.querySelector('pk-hiw3d')){
      const hint=stage.querySelector('.hiw3d-hint');
      stage.insertBefore(window.__pkHiw3d||document.createElement('pk-hiw3d'), hint||null);
    }
  }
  window.scrollTo(0,0);
}

// The intro isn't a one-shot thing you have to click a button to see again —
// it quietly replays itself every so often while you're on the landing view.
// Respects prefers-reduced-motion: settles on the open state instead of animating.
const SHUTTER_LOOP_MS=13000;
function startShutterLoop(){
  stopShutterLoop();
  const reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const s=document.querySelector('#shutterHolder pk-shutter');
  if(!s) return;
  if(reduced){ if(s.setOpen) s.setOpen(1); return; }
  window.__pkShutterLoop=setInterval(()=>{
    const cur=document.querySelector('#shutterHolder pk-shutter');
    if(cur && cur.replay) cur.replay();
  }, SHUTTER_LOOP_MS);
}
function stopShutterLoop(){
  if(window.__pkShutterLoop){ clearInterval(window.__pkShutterLoop); window.__pkShutterLoop=null; }
}

// Build track filter chips + location dropdown
const TRACKS=[
  {val:'all',label:'All'},
  {val:'corporate',label:'Corporate'},
  {val:'social',label:'Social Sector'},
  {val:'freelance',label:'Freelance'},
  {val:'services',label:'Services'},
];
function buildChips(){
  const w=document.getElementById('chips');
  w.innerHTML=TRACKS.map(t=>`<button class="chip${t.val==='all'?' on':''}" onclick="setSec(this,'${t.val}')">${t.label}</button>`).join('');
  // Build location dropdown
  const locs=new Set();
  DATA.forEach(d=>locs.add(d.location));
  const ls=document.getElementById('loc-sel');
  ls.innerHTML='<option value="all">All locations</option>';
  Array.from(locs).sort().forEach(l=>{
    const o=document.createElement('option');o.value=l;o.textContent=l;ls.appendChild(o);
  });
}

function setSec(el,s){
  curSec=s;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  render();
}

function render(){
  const q=document.getElementById('q').value.toLowerCase();
  const loc=document.getElementById('loc-sel').value;
  let f=DATA.filter(d=>{
    if(curSec!=='all'&&d.track!==curSec)return false;
    if(loc!=='all'&&d.location!==loc)return false;
    if(q){const h=`${d.name} ${d.sector} ${d.skills.join(' ')} ${d.location} ${d.about}`.toLowerCase();if(!h.includes(q))return false;}
    return true;
  });
  document.getElementById('rc').textContent=f.length;
  const g=document.getElementById('grid');
  if(!f.length){g.innerHTML=`<div class="empty" style="padding:60px 40px"><div style="font-size:28px;color:var(--teal-mid)">✦</div><div class="empty-h">No candidates found.</div></div>`;return;}
  const card=d=>`<div class="pcard" onclick="openP(${d.id})">
    <div class="pc-name">${d.name}</div>
    <div class="pc-sector">${d.sector}</div>
    <div class="pc-area">📍 ${d.location}${d.location.toLowerCase().includes('mumbai')?'':`, Mumbai`}</div>
    <div class="pc-avail"><span class="avail-dot"></span>Available</div>
  </div>`;
  const ROWS=4;
  g.innerHTML=Array.from({length:ROWS},(_,i)=>{
    const row=f.filter((_,j)=>j%ROWS===i);
    if(!row.length)return'';
    const dir=i%2===0?'left':'right';
    const spd=70+i*12;
    const cards=row.map(card).join('');
    return`<div class="track-row"><div class="track-inner ${dir}" style="--spd:${spd}s">${cards}${cards}</div></div>`;
  }).join('');
}


function openR(id){
  const d=DATA.find(x=>x.id===id);if(!d)return;curId=id;
  const av=document.getElementById('rm-av');
  av.textContent=hrUser?ini(d.name):'?';
  av.style.background=hrUser?'var(--teal)':'var(--ink-5)';
  document.getElementById('rm-nm').textContent=hrUser?d.name:'Candidate';
  document.getElementById('rm-rl').textContent=d.sector;
  const body=document.getElementById('rm-body');
  const redact=`<div style="background:var(--bg);border-bottom:1px solid var(--line);padding:8px 16px;font-size:11px;color:var(--ink-4);text-align:center">Contact info in this resume is not displayed — express interest to connect with this candidate.</div>`;
  if(d.resumeKey&&RESUMES[d.resumeKey]){
    const r=RESUMES[d.resumeKey];
    if(r.t==='html'){
      body.innerHTML=`<div class="rv-wrap">${redact}${r.d}</div>`;
    }else if(r.t==='pdf'){
      body.innerHTML=`<div class="rv-wrap" style="overflow:hidden">${redact}<div class="rv-badge">view only</div><iframe src="data:application/pdf;base64,${r.d}#toolbar=0&navpanes=0" title="Resume"></iframe></div>`;
    }else{
      const coverBar=`<div style="position:absolute;top:0;left:0;right:0;height:96px;background:white;z-index:3;border-bottom:1px solid var(--line);"></div>`;
      const imgs=r.d.map(pg=>`<div style="position:relative">${coverBar}<img src="data:image/jpeg;base64,${pg}" alt="Resume" oncontextmenu="return false"/></div>`).join('');
      body.innerHTML=`<div class="rv-wrap" oncontextmenu="return false" style="background:white;overflow:hidden">${redact}<div style="padding:8px">${imgs}</div><div class="rv-badge">view only</div></div>`;
    }
  }else{
    body.innerHTML=`<div class="rv-none"><div style="font-size:28px;opacity:0.2">📄</div><p>Resume coming soon.</p></div>`;
  }
  document.getElementById('r-ov').classList.add('open');
}
function closeR(){document.getElementById('r-ov').classList.remove('open');}
function toPf(){closeR();openP(curId);}

function openP(id){
  const d=DATA.find(x=>x.id===id);if(!d)return;curId=id;
  const av=document.getElementById('pm-av');
  av.textContent=ini(d.name);
  av.style.background='var(--teal)';
  const nm=document.getElementById('pm-nm');
  nm.textContent=d.name;nm.style.fontSize='';
  document.getElementById('pm-rl').textContent=d.sector;
  document.getElementById('pm-ab').textContent=d.about;
  document.getElementById('pm-tgs').innerHTML=`<span class="tag t-edu">${d.edu}</span><span class="tag t-sec">${d.sector}</span><span class="tag t-loc">📍 ${d.location}</span>${d.resume?'<span class="tag t-res">Resume</span>':''}`;
  document.getElementById('pm-exs').style.display='none';
  document.getElementById('pm-sk').innerHTML=d.skills.map(s=>`<span class="sk">${s}</span>`).join('');
  document.getElementById('pm-lg').innerHTML=d.langs.map(l=>`<span class="sk">${l}</span>`).join('');
  const ct=document.getElementById('pm-ct');
  ct.innerHTML=hrUser
    ?'📍 '+d.location+(d.location.toLowerCase().includes('mumbai')?'':`, Mumbai`)
    :'<span style="font-size:12px;color:var(--ink-4)">Express interest below to receive their contact details</span>';
  document.getElementById('pm-res-btn').style.display=hrUser?'':'none';
  document.getElementById('p-ov').classList.add('open');
}
function closeP(){document.getElementById('p-ov').classList.remove('open');}
function toRes(){closeP();openR(curId);}

// ── HR INTEREST FLOW ──────────────────────────────
function openHI(){
  const d=DATA.find(x=>x.id===curId);if(!d)return;
  document.getElementById('hi-modal-name').textContent=d.name;
  document.getElementById('hi-form-body').style.display='block';
  document.getElementById('hi-thanks').style.display='none';
  document.getElementById('hcf-name').value='';
  document.getElementById('hcf-phone').value='';
  document.getElementById('hcf-email').value='';
  document.getElementById('hcf-company').value='';
  document.getElementById('hi-ov').classList.add('open');
  setTimeout(()=>document.getElementById('hcf-name').focus(),100);
}

function closeHI(){
  document.getElementById('hi-ov').classList.remove('open');
}

function showContactForm(){ openHI(); }

function notifyWA(){
  const d=DATA.find(x=>x.id===curId);if(!d)return;
  const msg=encodeURIComponent(`Hi Meghna! I'm interested in *${d.name}* from Pehli Kamai (tiny miracles).\n\nSectors: ${d.skills.join(', ')}\nLocation: ${d.location}, Mumbai\n\nPlease share more details!`);
  window.open(`https://wa.me/${N_WA}?text=${msg}`,'_blank');
}

function submitInterest(){
  const name=document.getElementById('hcf-name').value.trim();
  const phone=document.getElementById('hcf-phone').value.trim();
  const email=document.getElementById('hcf-email').value.trim();
  const company=document.getElementById('hcf-company').value.trim();
  if(!name||!phone||!email){toast('Please fill your name, phone and email.');return;}
  const d=DATA.find(x=>x.id===curId);if(!d)return;
  const t=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});

  // Save enquiry to local storage
  saveEnquiry({hrName:name,hrPhone:phone,hrEmail:email,hrCompany:company||'',
    candidateName:d.name,candidateSectors:d.skills.join(', '),
    candidateLocation:d.location+', Mumbai',time:t});

  const emailData = {
    candidate_name: d.name,
    candidate_sectors: d.skills.join(', '),
    candidate_location: d.location+', Mumbai',
    candidate_note: 'HR: '+name+' | Phone: '+phone+' | Email: '+email+' | Company: '+(company||'Not specified'),
    viewed_at: t,
    message_type: '⭐ HR INTERESTED — '+name+' ('+phone+')'
  };

  // Send to Meghna and Rishikesh
  emailjs.send(EJ_SID,EJ_TID,{...emailData,to_email:N_EMAIL}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{...emailData,to_email:N_EMAIL2}).catch(()=>{});

  showThanks(d.name);
}

function showThanks(candidateName){
  document.getElementById('hi-form-body').style.display='none';
  document.getElementById('hi-cname').textContent=candidateName;
  document.getElementById('hi-thanks').style.display='block';
}

// ── ADD PROFILE ──────────────────────────────────
let hasWorkExp=false;
function toggleExp(show){
  hasWorkExp=show;
  document.getElementById('af-exp-yes').classList.toggle('act',show);
  document.getElementById('af-exp-no').classList.toggle('act',!show);
  document.getElementById('af-exp-fields').style.display=show?'flex':'none';
}

function buildResumeHTML(d){
  const edu=`${d.edu||''}${d.institution?' — '+d.institution:''}${d.passYear?', '+d.passYear:''}`;
  const expSec=d.expCompany?`
    <div class="gr-section">
      <div class="gr-label">Experience</div>
      <div class="gr-item-title">${d.expCompany}${d.expDuration?' &nbsp;·&nbsp; '+d.expDuration:''}</div>
      ${d.expRole?`<div class="gr-item-desc">${d.expRole}</div>`:''}
    </div>`:'';
  const skillList=(d.skills||[]).join(' &nbsp;·&nbsp; ');
  const langList=(d.langs||[]).join(' &nbsp;·&nbsp; ');
  return`<div class="gen-resume">
    <div class="gr-head">
      <div class="gr-name">${d.name||''}</div>
      <div class="gr-contact">${d.location||'Mumbai'}, Mumbai &nbsp;·&nbsp; ${d.sector||''}</div>
    </div>
    ${d.about?`<div class="gr-section"><div class="gr-label">Objective</div><div class="gr-text">${d.about}</div></div>`:''}
    <div class="gr-section"><div class="gr-label">Education</div><div class="gr-text">${edu}</div></div>
    ${expSec}
    ${skillList?`<div class="gr-section"><div class="gr-label">Skills</div><div class="gr-chips">${skillList}</div></div>`:''}
    ${langList?`<div class="gr-section"><div class="gr-label">Languages</div><div class="gr-chips">${langList}</div></div>`:''}
  </div>`;
}

function handleFile(input){
  const file=input.files[0];if(!file)return;
  if(file.size>5*1024*1024){toast('File too large — max 5MB');return;}
  const reader=new FileReader();
  reader.onload=e=>{
    const b64=e.target.result.split(',')[1];
    const isImg=file.type.startsWith('image/');
    pendingResume={t:isImg?'imgs':'pdf',d:isImg?[b64]:b64};
    document.getElementById('rdrop-lbl').innerHTML=`✅ <strong>${file.name}</strong> ready`;
    document.getElementById('resume-drop').style.borderColor='var(--teal)';
  };
  reader.readAsDataURL(file);
}

function handleDrop(e){
  e.preventDefault();
  document.getElementById('resume-drop').style.borderColor='var(--line-d)';
  const file=e.dataTransfer.files[0];if(!file)return;
  const dt=new DataTransfer();dt.items.add(file);
  const inp=document.getElementById('resume-file');inp.files=dt.files;handleFile(inp);
}

function openAdd(){
  editingEmail=null;pendingResume=null;atTrack='';hasWorkExp=false;
  const t=document.getElementById('a-modal-title');if(t)t.textContent='Add your profile';
  ['a-nm','a-sk','a-ab','a-ph','a-lg','a-loc','a-inst','a-em-yt','a-pw','a-pw2','a-exco','a-exdu','a-exro'].forEach(i=>{const el=document.getElementById(i);if(el)el.value='';});
  const emf=document.getElementById('a-em-yt');if(emf){emf.readOnly=false;emf.style.opacity='';}
  document.getElementById('a-ed').value='';
  const ayr=document.getElementById('a-yr');if(ayr)ayr.value='';
  toggleExp(false);
  const sc=document.getElementById('a-sc');
  while(sc.options.length)sc.remove(0);
  sc.add(new Option('Select sector...',''));
  [...new Set(Object.values(TRACK_SECTORS).flat())].sort().forEach(o=>sc.add(new Option(o,o)));
  document.getElementById('a-ov').classList.add('open');
}

function saveProfile(){
  const nm=document.getElementById('a-nm').value.trim();
  const ed=document.getElementById('a-ed').value;
  const sc=document.getElementById('a-sc').value;
  const loc=document.getElementById('a-loc').value.trim()||'Mumbai';
  if(!nm||!ed||!sc){toast('Please fill your name, education and sector.');return;}

  const inst=document.getElementById('a-inst').value.trim();
  const yr=document.getElementById('a-yr').value;
  const sk=[sc,...document.getElementById('a-sk').value.split(',').map(s=>s.trim()).filter(Boolean)];
  const rawLg=document.getElementById('a-lg').value.split(',').map(s=>s.trim()).filter(Boolean);
  const lg=rawLg.length?rawLg:['Hindi','English'];
  const ab=document.getElementById('a-ab').value.trim()||'Looking for work in '+sc+' in Mumbai.';
  const exco=hasWorkExp?document.getElementById('a-exco').value.trim():'';
  const exdu=hasWorkExp?document.getElementById('a-exdu').value.trim():'';
  const exro=hasWorkExp?document.getElementById('a-exro').value.trim():'';
  const ex=exco?'experienced':'fresher';
  const rl=sc+' — Looking for work';
  const trk=atTrack||Object.entries(TRACK_SECTORS).find(([,ss])=>ss.includes(sc))?.[0]||'corporate';
  const t=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
  const resumeD={name:nm,edu:ed,institution:inst,passYear:yr,sector:sc,location:loc,skills:sk,langs:lg,about:ab,expCompany:exco,expDuration:exdu,expRole:exro};

  // ── EDIT MODE ──
  if(editingEmail){
    const cachedAccts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
    const old=(currentYtAcct&&currentYtAcct.email===editingEmail)?currentYtAcct:cachedAccts[editingEmail];
    if(!old){toast('Account not found. Please sign in again.');editingEmail=null;return;}
    const npw=document.getElementById('a-pw').value;const npw2=document.getElementById('a-pw2').value;
    if(npw){if(npw.length<6){toast('Password must be at least 6 characters.');return;}if(npw!==npw2){toast('Passwords do not match.');return;}}
    const rk='new_'+Date.now();
    const html=buildResumeHTML(resumeD);
    RESUMES[rk]={t:'html',d:html};
    const updated={...old,name:nm,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,track:trk,institution:inst,passYear:yr,expCompany:exco,expDuration:exdu,expRole:exro,resumeKey:rk,resume:true,resumeHTML:html,...(npw?{password:npw}:{})};
    cachedAccts[editingEmail]=updated;
    localStorage.setItem('pk_yt_accts',JSON.stringify(cachedAccts));
    const fbUser=auth.currentUser;
    if(fbUser){db.collection('youth_accounts').doc(fbUser.uid).update({name:nm,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,track:trk,institution:inst,passYear:yr,resumeHTML:html}).catch(()=>{});}
    const idx=DATA.findIndex(x=>x.id===old.id);
    if(idx>=0)DATA[idx]={...DATA[idx],name:nm,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,track:trk,resume:true,resumeKey:rk};
    const em=editingEmail;editingEmail=null;
    currentYtAcct=updated;
    buildChips();render();updateEnqBadge();updateAboutStats();closeA();
    emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc,candidate_location:loc,candidate_note:'Profile updated.',viewed_at:t,message_type:'Profile Updated — '+nm,to_email:N_EMAIL}).catch(()=>{});
    emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc,candidate_location:loc,candidate_note:'Profile updated.',viewed_at:t,message_type:'Profile Updated — '+nm,to_email:N_EMAIL2}).catch(()=>{});
    openYtDash(updated);
    return;
  }

  // ── NEW PROFILE ──
  const email=document.getElementById('a-em-yt').value.trim().toLowerCase();
  const pw=document.getElementById('a-pw').value;
  const pw2=document.getElementById('a-pw2').value;
  if(!email){toast('Please enter your email.');return;}
  if(!pw||pw.length<6){toast('Password must be at least 6 characters.');return;}
  if(pw!==pw2){toast('Passwords do not match.');return;}

  const key='new_'+Date.now();
  const html=buildResumeHTML(resumeD);
  RESUMES[key]={t:'html',d:html};
  const id=DATA.length+1;
  const ph=document.getElementById('a-ph').value.trim();
  const np={id,key,name:nm,age:21,edu:ed,sector:sc,location:loc,role:rl,exp:ex,skills:sk,langs:lg,about:ab,exps:[],resume:true,resumeKey:key,track:trk};
  DATA.push(np);
  buildChips();render();updateEnqBadge();updateAboutStats();closeA();

  auth.createUserWithEmailAndPassword(email,pw)
    .then(cred=>{
      const uid=cred.user.uid;
      const acct={uid,id,email,name:nm,age:21,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,resumeKey:key,resume:true,track:trk,phone:ph,institution:inst,passYear:yr,expCompany:exco,expDuration:exdu,expRole:exro,resumeHTML:html,createdAt:new Date().toISOString()};
      db.collection('youth_accounts').doc(uid).set(acct).catch(()=>{});
      db.collection('candidates').add({...np,email,phone:ph,institution:inst,passYear:yr,expCompany:exco,expDuration:exdu,expRole:exro,resumeHTML:html,createdAt:new Date().toISOString()}).catch(()=>{});
      logSignup('youth',{name:nm,email,phone:ph,edu:ed,institution:inst,sector:sc,location:loc,skills:sk.join(', '),about:ab,resumeHtml:html});
      const accts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
      accts[email]={...acct,password:pw};
      localStorage.setItem('pk_yt_accts',JSON.stringify(accts));
      openYtDash(acct,true);
    })
    .catch(e=>{
      if(e.code==='auth/email-already-in-use'){toast('Account already exists. Try logging in.');}
      else{
        const acct={id,email,password:pw,name:nm,age:21,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,resumeKey:key,resume:true,track:trk,resumeHTML:html};
        const accts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
        accts[email]=acct;
        localStorage.setItem('pk_yt_accts',JSON.stringify(accts));
        openYtDash(acct,true);
      }
    });

  const noteMsg='New profile. Email: '+email+(ph?' | Phone: '+ph:'')+' | Resume auto-generated from form.';
  emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc+' ('+trk+')',candidate_location:loc,candidate_note:noteMsg,viewed_at:t,message_type:'New Profile — '+nm,to_email:N_EMAIL}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc+' ('+trk+')',candidate_location:loc,candidate_note:noteMsg,viewed_at:t,message_type:'New Profile — '+nm,to_email:N_EMAIL2}).catch(()=>{});
}

function closeA(){document.getElementById('a-ov').classList.remove('open');}

// ── EXPORT ──────────────────────────────────────

// ── CONTACT FORM ─────────────────────────────────
function openCF(){
  document.getElementById('cf-ov').classList.add('open');
  document.getElementById('cf-thanks').style.display='none';
  document.getElementById('cf-form-body').style.display='block';
  ['cf-name','cf-org','cf-email','cf-msg'].forEach(i=>{const el=document.getElementById(i);if(el)el.value='';});
}
function closeCF(){document.getElementById('cf-ov').classList.remove('open');}

function submitContact(){
  const name=document.getElementById('cf-name').value.trim();
  const email=document.getElementById('cf-email').value.trim();
  const msg=document.getElementById('cf-msg').value.trim();
  if(!name||!email||!msg){toast('Please fill all required fields.');return;}
  const org=document.getElementById('cf-org').value.trim();
  const type=document.getElementById('cf-type').value;
  emailjs.send(EJ_SID,EJ_TID,{
    to_email:N_EMAIL,candidate_name:name,
    candidate_sectors:type,candidate_location:org||'Not specified',
    candidate_note:msg,viewed_at:new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}),
    message_type:'📩 Contact Form — '+type
  }).then(()=>{
    document.getElementById('cf-form-body').style.display='none';
    document.getElementById('cf-thanks').style.display='block';
  }).catch(()=>{window.open(`mailto:${N_EMAIL}?subject=${encodeURIComponent('Enquiry from '+name)}&body=${encodeURIComponent(msg)}`);toast('Opening email…');});
}


// ── ENQUIRIES ────────────────────────────────────
function saveEnquiry(enq){
  const doc={...enq, id:Date.now(), savedAt:new Date().toISOString()};
  // Write to Firestore
  db.collection('hr_enquiries').add(doc).catch(e=>console.warn('Firestore enquiry write failed:',e));
  // Keep localStorage as backup
  let list=JSON.parse(localStorage.getItem('typc_enquiries')||'[]');
  list.unshift(doc);
  localStorage.setItem('typc_enquiries',JSON.stringify(list));
  updateEnqBadge();
}

function loadEnquiries(){
  return JSON.parse(localStorage.getItem('typc_enquiries')||'[]');
}

function loadEnquiriesFromFirestore(callback){
  db.collection('hr_enquiries').orderBy('savedAt','desc').get()
    .then(snap=>{
      const list=snap.docs.map(d=>d.data());
      // Sync to localStorage
      localStorage.setItem('typc_enquiries',JSON.stringify(list));
      callback(list);
    })
    .catch(()=>callback(loadEnquiries()));
}

function clearEnquiries(){
  if(!confirm('Clear all enquiries? This cannot be undone.')) return;
  // Clear Firestore
  db.collection('hr_enquiries').get().then(snap=>{
    const batch=db.batch();
    snap.docs.forEach(d=>batch.delete(d.ref));
    return batch.commit();
  }).catch(()=>{});
  localStorage.removeItem('typc_enquiries');
  updateEnqBadge();
  renderEnquiries();
  toast('All enquiries cleared.');
}

function updateEnqBadge(){}

function renderEnquiries(){
  const list=loadEnquiries();
  const body=document.getElementById('enq-body');
  if(!list.length){
    body.innerHTML=`<div class="enq-empty">
      <div class="enq-empty-icon">📭</div>
      <div class="enq-empty-h">No enquiries yet</div>
      <div class="enq-empty-p">When HR submits interest in a candidate, it will appear here.</div>
    </div>`;
    return;
  }
  body.innerHTML=`<div class="enq-list">${list.map((e,i)=>`
    <div class="enq-card">
      <div class="enq-card-left"><div class="enq-num">${list.length-i}</div></div>
      <div class="enq-card-body">
        <div class="enq-card-top">
          <div class="enq-cand">Interested in: ${e.candidateName}</div>
          <div class="enq-time">${e.time}</div>
        </div>
        <div class="enq-hr-info">
          <span class="enq-pill">👤 ${e.hrName}</span>
          <span class="enq-pill">📞 ${e.hrPhone}</span>
          <span class="enq-pill">✉️ ${e.hrEmail}</span>
          ${e.hrCompany?`<span class="enq-pill">🏢 ${e.hrCompany}</span>`:''}
        </div>
        <div class="enq-sector">Sectors: ${e.candidateSectors} · ${e.candidateLocation}</div>
        <div class="enq-card-actions">
          <button class="btn-enq-wa" onclick="window.open('https://wa.me/91'+${JSON.stringify(e.hrPhone)}.replace(/\D/g,''),'_blank')">💬 WhatsApp HR</button>
          <button class="btn-enq-mail" onclick="window.open('mailto:${e.hrEmail}?subject=Re: ${encodeURIComponent(e.candidateName)} — Pehli Kamai','_blank')">✉️ Email HR</button>
        </div>
      </div>
    </div>`).join('')}</div>`;
}

// ── TOAST ────────────────────────────────────────
function toast(m){const t=document.getElementById('toast');document.getElementById('t-m').textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}

// ── SIGN IN ──────────────────────────────────────
let hrUser=JSON.parse(localStorage.getItem('typc_hr_user')||'null');

function openSignIn(){document.getElementById('hl-ov').classList.add('open');switchLoginRole('hr');}
function closeSI(){document.getElementById('si-ov').classList.remove('open');}
function openHRLogin(){closeSI();document.getElementById('hl-ov').classList.add('open');switchLoginRole('hr');}
function closeHRLogin(){document.getElementById('hl-ov').classList.remove('open');}

function switchLoginRole(r){
  ['hr','yt'].forEach(x=>{
    const pill=document.getElementById('rp-'+x);if(pill)pill.classList.toggle('act',x===r);
    const panel=document.getElementById('lp-'+x);if(panel)panel.classList.toggle('act',x===r);
  });
  if(r==='hr')switchLoginTab('in');
  if(r==='yt'){const e=document.getElementById('yt-email');const p=document.getElementById('yt-pw');if(e)e.value='';if(p)p.value='';}
}

// ── YOUTH AUTH ────────────────────────────────────
function youthLogin(){
  const email=document.getElementById('yt-email').value.trim().toLowerCase();
  const pw=document.getElementById('yt-pw').value;
  if(!email||!pw){toast('Enter your email and password.');return;}
  // Try Firebase Auth first
  auth.signInWithEmailAndPassword(email,pw)
    .then(cred=>{
      return db.collection('youth_accounts').doc(cred.user.uid).get();
    })
    .then(snap=>{
      if(snap.exists){
        closeHRLogin();
        openYtDash(snap.data());
      } else {
        // Profile in Firestore missing — try localStorage
        const accts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
        const acct=accts[email];
        if(acct){closeHRLogin();openYtDash(acct);}
        else{toast('Profile not found. Please sign up again.');}
      }
    })
    .catch(e=>{
      // Fall back to localStorage for old accounts
      const accts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
      const acct=accts[email];
      if(acct&&acct.password===pw){closeHRLogin();openYtDash(acct);}
      else{toast('Email or password incorrect.');}
    });
}

function openYtDash(acct,isNew){
  currentYtAcct=acct;
  document.getElementById('yt-ov').classList.add('open');
  document.getElementById('yt-dash-title').textContent='My Profile';
  document.getElementById('yt-dash-body').innerHTML='<div style="padding:50px 0;text-align:center;color:var(--ink-4);font-size:13px">Loading…</div>';
  db.collection('hr_enquiries').where('candidateName','==',acct.name).get()
    .then(snap=>renderYtDash(acct,isNew,snap.size))
    .catch(()=>{
      const enqs=JSON.parse(localStorage.getItem('typc_enquiries')||'[]');
      const n=enqs.filter(e=>e.candidateName===acct.name).length;
      renderYtDash(acct,isNew,n);
    });
}

function renderYtDash(acct,isNew,n){
  const hasResume=acct.resumeKey&&RESUMES[acct.resumeKey];
  document.getElementById('yt-dash-body').innerHTML=`
    ${isNew?`<div style="background:#e8f5e9;border:1.5px solid #a5d6a7;border-radius:10px;padding:14px 16px;margin-bottom:16px;text-align:center">
      <div style="font-size:18px;margin-bottom:4px">🎉</div>
      <div style="font-weight:700;color:#2e7d32;font-size:14px">Your profile is live!</div>
      <div style="font-size:12px;color:#388e3c;margin-top:4px">Your resume has been automatically created. You can view it below.</div>
    </div>`:''}
    <div style="display:flex;align-items:center;gap:14px;padding-bottom:16px;border-bottom:1px solid var(--line);margin-bottom:16px">
      <div style="width:50px;height:50px;border-radius:50%;background:var(--teal);flex-shrink:0;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px">${ini(acct.name)}</div>
      <div>
        <div style="font-family:var(--serif);font-size:17px;font-weight:700;color:var(--ink)">${acct.name}</div>
        <div style="font-size:12px;color:var(--ink-3);margin-top:2px">${acct.sector} &nbsp;·&nbsp; 📍 ${acct.location}, Mumbai</div>
        <div style="font-size:11px;color:var(--ink-4);margin-top:2px">${acct.email}</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
      <div style="background:${n>0?'#e8f5e9':'var(--bg)'};border:1.5px solid ${n>0?'#a5d6a7':'var(--line-d)'};border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:26px;font-weight:800;color:${n>0?'#2e7d32':'var(--ink-4)'}">${n}</div>
        <div style="font-size:10.5px;color:${n>0?'#388e3c':'var(--ink-4)'};font-weight:600;margin-top:3px">HR${n===1?' has':' have'} expressed interest</div>
      </div>
      <div style="background:var(--teal-soft);border:1.5px solid var(--teal-mid);border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:26px">✅</div>
        <div style="font-size:10.5px;color:var(--teal-dark);font-weight:600;margin-top:3px">Profile is live</div>
      </div>
    </div>
    ${hasResume?`<button onclick="closeYtDash();openR(${acct.id||'curId'})" style="display:block;width:100%;padding:11px;background:var(--teal);color:white;text-align:center;border-radius:8px;font-size:13px;font-weight:600;margin-bottom:10px;box-sizing:border-box;cursor:pointer;border:none;font-family:var(--sans)">📄 View my resume</button>`:''}
    <div style="font-size:11.5px;color:var(--ink-3);line-height:1.6;margin-bottom:14px;padding:10px 12px;background:var(--bg);border-radius:8px">
      Pehli Kamai will personally call you when an HR is interested.<br>Questions? <strong>+91 9326691744</strong> or <strong>+91 99204 45917</strong>
    </div>
    <button class="btn-lf-submit" onclick="closeYtDash();youthEditProfile()" style="margin-bottom:10px">Edit my profile</button>
    <button onclick="closeYtDash()" style="width:100%;padding:10px;background:transparent;border:1.5px solid var(--line-d);border-radius:8px;font-family:var(--sans);font-size:13px;color:var(--ink-3);cursor:pointer">Close</button>
  `;
}

function closeYtDash(){document.getElementById('yt-ov').classList.remove('open');}

function youthEditProfile(){
  const acct=currentYtAcct;
  if(!acct){toast('Please sign in again to edit your profile.');return;}
  const email=acct.email;
  openAdd();
  editingEmail=email;
  const t=document.getElementById('a-modal-title');if(t)t.textContent='Update my profile';
  setTimeout(()=>{
    document.getElementById('a-nm').value=acct.name||'';
    document.getElementById('a-ed').value=acct.edu||'';
    const sc=document.getElementById('a-sc');
    for(let i=0;i<sc.options.length;i++){if(sc.options[i].value===acct.sector){sc.selectedIndex=i;break;}}
    document.getElementById('a-loc').value=acct.location||'';
    document.getElementById('a-inst').value=acct.institution||'';
    document.getElementById('a-yr').value=acct.passYear||'';
    document.getElementById('a-sk').value=(acct.skills||[]).slice(1).join(', ')||'';
    document.getElementById('a-lg').value=(acct.langs||[]).join(', ')||'';
    document.getElementById('a-ab').value=acct.about||'';
    if(acct.expCompany){hasWorkExp=true;toggleExp(true);document.getElementById('a-exco').value=acct.expCompany||'';document.getElementById('a-exdu').value=acct.expDuration||'';document.getElementById('a-exro').value=acct.expRole||'';}
    const emf=document.getElementById('a-em-yt');emf.value=email;emf.readOnly=true;emf.style.opacity='.65';
    const pw=document.getElementById('a-pw');const pw2=document.getElementById('a-pw2');
    if(pw){pw.value='';pw.placeholder='Leave blank to keep current';}if(pw2){pw2.value='';pw2.placeholder='Leave blank to keep current';}
  },60);
}

function switchLoginTab(t){
  ['in','up'].forEach(x=>{
    document.getElementById('lt-'+x).classList.toggle('act',x===t);
    document.getElementById('lp-'+x).classList.toggle('act',x===t);
  });
}

function hrSignIn(){
  const email=document.getElementById('hr-si-email').value.trim();
  const pw=document.getElementById('hr-si-pw').value;
  if(!email||!pw){toast('Please fill all fields.');return;}
  auth.signInWithEmailAndPassword(email,pw)
    .then(cred=>{
      if(!cred.user.emailVerified){
        cred.user.sendEmailVerification().catch(()=>{});
        toast('Please verify your email first — check your inbox.');
        return;
      }
      return db.collection('hr_accounts').doc(cred.user.uid).get().then(snap=>{
        const data=snap.exists?snap.data():JSON.parse(localStorage.getItem('typc_hr_user')||'null');
        if(data){
          hrUser={name:data.name,phone:data.phone,email:data.email,company:data.company,industry:data.industry,city:data.city};
          localStorage.setItem('typc_hr_user',JSON.stringify(hrUser));
          closeHRLogin();updateHRHeader();
          toast('Welcome back, '+hrUser.name+'!');
        } else {toast('Account not found. Please create one.');switchLoginTab('up');}
      });
    })
    .catch(()=>{
      // Fallback for old localStorage-only accounts
      const saved=JSON.parse(localStorage.getItem('typc_hr_user')||'null');
      if(saved&&saved.email===email){hrUser=saved;localStorage.setItem('typc_hr_user',JSON.stringify(hrUser));closeHRLogin();updateHRHeader();toast('Welcome back, '+hrUser.name+'!');}
      else{toast('Email or password incorrect.');}
    });
}

function hrSignUp(){
  const nm=document.getElementById('hr-nm').value.trim();
  const ph=document.getElementById('hr-ph').value.trim();
  const em=document.getElementById('hr-em').value.trim();
  const co=document.getElementById('hr-co').value.trim();
  const ind=document.getElementById('hr-ind').value;
  const city=document.getElementById('hr-city').value.trim();
  const pw=document.getElementById('hr-up-pw').value;
  if(!nm||!ph||!em||!co||!ind||!city||!pw){toast('Please fill all required fields.');return;}
  if(pw.length<6){toast('Password must be at least 6 characters.');return;}
  auth.createUserWithEmailAndPassword(em,pw)
    .then(cred=>{
      cred.user.sendEmailVerification();
      const hrData={uid:cred.user.uid,name:nm,phone:ph,email:em,company:co,industry:ind,city:city,role:'hr',createdAt:new Date().toISOString()};
      db.collection('hr_accounts').doc(cred.user.uid).set(hrData).catch(()=>{});
      logSignup('hr',{name:nm,phone:ph,email:em,org:co,industry:ind,city:city});
      hrUser={name:nm,phone:ph,email:em,company:co,industry:ind,city:city};
      localStorage.setItem('typc_hr_user',JSON.stringify(hrUser));
      closeHRLogin();updateHRHeader();
      toast('Account created! Check your email ('+em+') to verify before signing in.');
    })
    .catch(e=>{
      if(e.code==='auth/email-already-in-use'){toast('Email already registered — please sign in.');switchLoginTab('in');}
      else{toast('Error: '+e.message);}
    });
}

function updateHRHeader(){
  const btn=document.getElementById('btn-hr-login');
  const addBtn=document.getElementById('btn-add-profile');
  if(!btn)return;
  if(hrUser){
    btn.className='hr-logged';
    btn.textContent=hrUser.name+' · '+hrUser.company+' ▾';
    btn.onclick=()=>{if(confirm('Sign out?')){hrUser=null;localStorage.removeItem('typc_hr_user');auth.signOut().catch(()=>{});location.reload();}};
    if(addBtn){addBtn.style.display='none';}
  } else {
    btn.className='btn-ghost';
    btn.textContent='Login';
    btn.onclick=openSignIn;
    if(addBtn){addBtn.style.display='';}
  }
}

// ── ASSESSMENT ─────────────────────────────────────
const AT_BG=[
  {id:'bg-area',q:'Which area of Mumbai do you live in?',opts:['Aarey Colony / Goregaon','Dharavi / Sion / Matunga / Parel','Andheri / Jogeshwari / Malad','Grant Road / Mumbai Central / Girgaon','Virar / Vasai / Nalasopara','Other area in Mumbai']},
  {id:'bg-emp',q:'Are you currently employed?',opts:['No, I am looking for my first job','Yes, but I want to change or improve my job','Occasional / part-time work only','Unemployed for more than 6 months']}
];
const AT_ENG=[
  {q:'Which sentence is correct?',opts:['I am go to office tomorrow.','I going office tomorrow.','I will go to the office tomorrow.','I go office tomorrow will.'],ans:2},
  {q:'Your HR sends this message: "Your interview has been rescheduled to Thursday at 11am." What does this mean?',opts:['The interview is cancelled','You need to go today','The interview time has been changed to Thursday 11am','You missed your interview'],ans:2}
];
const AT_WORK=[
  {q:'Your shift starts at 9am. You arrive at 9:10am. What do you do?',opts:['Say nothing — 10 minutes is nothing','Blame the traffic, it is not your fault','Apologise to your manager and explain','Arrive late again tomorrow'],ans:2},
  {q:'Your manager gives you a task you do not understand. What do you do?',opts:['Try to do it even if you do it wrong','Do nothing and wait','Ask a friend outside the office','Politely ask your manager to explain again'],ans:3}
];

let atEI=0,atWI=0,atES=0,atWS=0,atEA=[],atWA=[],atTrack='',atBgA={};

function openAssessment(){
  atEI=0;atWI=0;atES=0;atWS=0;atEA=[];atWA=[];atTrack='';atBgA={};
  renderAtBG();
  atStep(0);
  document.getElementById('at-ov').classList.add('open');
}
function closeAT(){document.getElementById('at-ov').classList.remove('open');}

const AT_TITLES=['Register your profile','Step 1 — Background','Step 2 — English Check','Step 3 — Work Readiness','Step 4 — Your Track'];
function atStep(n){
  document.querySelectorAll('.at-screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('at-s'+n).classList.add('active');
  [0,1,2,3].forEach(i=>{const p=document.getElementById('ap'+i);p.classList.remove('done','act');if(i<n-1)p.classList.add('done');else if(i===n-1)p.classList.add('act');});
  document.getElementById('at-ttl').textContent=AT_TITLES[n]||'Register your profile';
  if(n===2)renderAtEng();
  if(n===3){atWI=0;renderAtWork();}
}

function renderAtBG(){
  document.getElementById('at-bg-qs').innerHTML=AT_BG.map((q,qi)=>`
    <div style="margin-bottom:18px">
      <div class="at-q-text" style="font-weight:600;color:var(--ink)">${qi+1}. ${q.q}</div>
      <div class="at-options">${q.opts.map((o,oi)=>`<label class="at-opt${atBgA[q.id]===oi?' sel':''}">
        <input type="radio" name="${q.id}" value="${oi}" ${atBgA[q.id]===oi?'checked':''} onchange="atBgSel('${q.id}',${oi},this)">
        <span class="at-opt-text">${o}</span></label>`).join('')}
      </div>
    </div>`).join('');
}
function atBgSel(qid,val,inp){
  inp.closest('.at-options').querySelectorAll('.at-opt').forEach(l=>l.classList.remove('sel'));
  inp.closest('.at-opt').classList.add('sel');
  atBgA[qid]=val;
}
function atNextBG(){
  if(AT_BG.some(q=>atBgA[q.id]===undefined)){toast('Please answer all questions to continue.');return;}
  atStep(2);
}

function renderAtEng(){
  const q=AT_ENG[atEI];const sv=atEA[atEI];
  document.getElementById('at-eq').textContent=atEI+1;
  document.getElementById('at-eq-body').innerHTML=`<div class="at-q-text">${q.q}</div>
    <div class="at-options">${q.opts.map((o,i)=>`<label class="at-opt${sv===i?' sel':''}">
      <input type="radio" name="at-eq" value="${i}" ${sv===i?'checked':''} onchange="atEngSel(${i},this)">
      <span class="at-opt-text">${o}</span></label>`).join('')}</div>`;
  document.getElementById('at-eb').textContent=atEI===0?'Back':'Previous';
  document.getElementById('at-en').textContent=atEI===AT_ENG.length-1?'Continue':'Next';
}
function atEngSel(v,inp){
  inp.closest('.at-options').querySelectorAll('.at-opt').forEach(l=>l.classList.remove('sel'));
  inp.closest('.at-opt').classList.add('sel');
  atEA[atEI]=v;
}
function atEngBack(){if(atEI===0)atStep(1);else{atEI--;renderAtEng();}}
function atEngNext(){
  if(atEA[atEI]===undefined){toast('Please choose an answer.');return;}
  if(atEI<AT_ENG.length-1){atEI++;renderAtEng();}
  else{atES=atEA.filter((a,i)=>a===AT_ENG[i].ans).length;atStep(3);}
}

function renderAtWork(){
  const q=AT_WORK[atWI];const sv=atWA[atWI];
  document.getElementById('at-wq').textContent=atWI+1;
  document.getElementById('at-wq-body').innerHTML=`<div class="at-q-text">${q.q}</div>
    <div class="at-options">${q.opts.map((o,i)=>`<label class="at-opt${sv===i?' sel':''}">
      <input type="radio" name="at-wq" value="${i}" ${sv===i?'checked':''} onchange="atWorkSel(${i},this)">
      <span class="at-opt-text">${o}</span></label>`).join('')}</div>`;
  document.getElementById('at-wb').textContent=atWI===0?'Back':'Previous';
  document.getElementById('at-wn').textContent=atWI===AT_WORK.length-1?'Continue':'Next';
}
function atWorkSel(v,inp){
  inp.closest('.at-options').querySelectorAll('.at-opt').forEach(l=>l.classList.remove('sel'));
  inp.closest('.at-opt').classList.add('sel');
  atWA[atWI]=v;
}
function atWorkBack(){if(atWI===0)atStep(2);else{atWI--;renderAtWork();}}
function atWorkNext(){
  if(atWA[atWI]===undefined){toast('Please choose an answer.');return;}
  if(atWI<AT_WORK.length-1){atWI++;renderAtWork();}
  else{atWS=atWA.filter((a,i)=>a===AT_WORK[i].ans).length;atStep(4);}
}

function selTrack(t){
  atTrack=t;
  ['corporate','social','freelance','services'].forEach(k=>{
    const el=document.getElementById('attrk-'+k);
    if(el)el.classList.toggle('sel',t===k);
  });
}

function atFinish(){
  if(!atTrack){toast('Please choose your track to continue.');return;}
  atProceed();
}

const TRACK_SECTORS={
  corporate:['Admin & Data Entry','Sales & Marketing','Catering & Hospitality','Editing & Animation','Graphics & Design','Accounting & Finance','Office Work','BPO','Retail','Logistics','Customer Service','IT & Technology','Back Office','Receptionist','Other'],
  social:['Community Outreach','Teaching / Education Support','Social Work','Field Work','Health & Wellness','Environmental Work','Admin & Data Entry','Office Work','Other'],
  freelance:['Graphic Design','Photography','Content Writing','Video & Animation','Events & Coordination','Music & Arts','Web & Tech Freelance','Other'],
  services:['Beauty & Grooming','Food & Catering','Repairs & Maintenance','Cleaning & Housekeeping','Transport & Delivery','Retail & Shop Work','Other']
};

function atProceed(){
  closeAT();
  const sc=document.getElementById('a-sc');
  while(sc.options.length)sc.remove(0);
  sc.add(new Option('Select...',''));
  (TRACK_SECTORS[atTrack]||TRACK_SECTORS.corporate).forEach(o=>sc.add(new Option(o,o)));
  openAdd();
}

document.querySelectorAll('.ov').forEach(o=>{
  if(o.id==='at-ov')return;
  o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');});
});
function updateAboutStats(){
  const abTot=document.getElementById('ab-tot'); if(abTot) abTot.textContent=DATA.length;
  const abRes=document.getElementById('ab-res'); if(abRes) abRes.textContent=DATA.filter(d=>d.resume).length;
  const abSec=document.getElementById('ab-sec'); if(abSec) abSec.textContent=new Set(DATA.map(d=>d.sector)).size+'+';
  const hTot=document.getElementById('h-tot'); if(hTot) hTot.textContent=DATA.length;
  const sTot=document.getElementById('s-tot'); if(sTot) sTot.textContent=DATA.length;
  const dTot=document.getElementById('d-tot'); if(dTot) dTot.textContent=DATA.length;
  const hiwTot=document.getElementById('hiw-tot'); if(hiwTot) hiwTot.textContent=DATA.length;
}
function boot(){
  buildChips();render();updateEnqBadge();updateAboutStats();
  updateHRHeader();
  mergeFirestoreCandidates();
  const holder=document.getElementById('shutterHolder');
  if(holder && !holder.querySelector('pk-shutter')){
    const s=document.createElement('pk-shutter'); s.setAttribute('h','840');
    holder.appendChild(s);
  }
  startShutterLoop();
  const heroVid=document.querySelector('.fi-hero-video');
  if(heroVid) heroVid.playbackRate=0.6;
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
else boot();

// Fetch new candidates added via the form and merge into DATA
function mergeFirestoreCandidates(){
db.collection('candidates').orderBy('createdAt','asc').get().then(snap=>{
  if(snap.empty) return;
  let added=0;
  snap.forEach(doc=>{
    const c=doc.data();
    if(!c.name) return;
    // Skip if already in hardcoded list (name match, case-insensitive)
    if(DATA.some(d=>d.name.trim().toLowerCase()===c.name.trim().toLowerCase())) return;
    const nc={
      id:DATA.length+1,
      key:c.key||'fs_'+doc.id,
      name:c.name,
      age:c.age||21,
      edu:c.edu||'Graduate',
      sector:c.sector||'Other',
      location:c.location||'Mumbai',
      role:c.role||(c.sector?c.sector+' — Looking for work':'Looking for work'),
      exp:c.exp||'fresher',
      skills:Array.isArray(c.skills)?c.skills:[c.sector||'Other'],
      langs:c.langs||['Hindi','English'],
      about:c.about||'',
      exps:[],
      resume:!!c.resumeHTML,
      resumeKey:c.resumeHTML?('fs_'+doc.id):null,
      track:c.track||inferTrack([c.sector||'']),
    };
    if(c.resumeHTML) RESUMES['fs_'+doc.id]={t:'html',d:c.resumeHTML};
    DATA.push(nc);
    added++;
  });
  if(added>0){
    buildChips();render();
    updateAboutStats();
  }
}).catch(()=>{});
}

