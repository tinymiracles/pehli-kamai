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
const storage=firebase.storage();

const allData = [
  {id:1,key:'alisha',name:'Alisha Shaikh Aslam',location:'Mumbai',sectors:['Admin & Data Entry'],note:'Looking in Admin and Data Entry',urgent:false,resume:false},
  {id:2,key:'bhavesh',name:'Bhavesh Rishi Pardeshi',location:'Grant Road, Mumbai',sectors:['Sales','Admin & Data Entry'],note:'Fresher, SSC 2026 pass, MS-CIT certified, good typing speed',urgent:false,resume:true},
  {id:3,key:'ayush',name:'Ayush Pardeshi',location:'Mumbai',sectors:['Sales','Admin & Data Entry','Office Work'],note:'Looking in Sales, Data Entry, Office Work',urgent:false,resume:false},
  {id:4,key:'paresh',name:'Paresh Pardeshi',location:'Mumbai',sectors:['Editing & Animation','Real Estate'],note:'Looking in Editing, Animation, Real Estate',urgent:false,resume:false},
  {id:5,key:'shreya_m',name:'Shreya Mathur',location:'Mumbai',sectors:['Media & Advertising','Design / Creative','Education & Training'],note:'TYBAMMC Advertising student, 3yr private tutoring exp',urgent:false,resume:true},
  {id:7,key:'dipesh',name:'Dipesh Vijay Dhodade',location:'Dahanu, Palghar',sectors:['Electrician','Electrical & Electronics','ITI Trades'],note:'ITI Electrician (77.8%), MS-CIT 93%, 1-month OJT at Thakur Electronics',urgent:false,resume:true},
  {id:8,key:'aniket',name:'Aniket Pardeshi',location:'Goregaon East',sectors:['Sales','Retail','Logistics','BPO'],note:'Fresher, HSC pass 2023, energetic team player ready to start',urgent:false,resume:true},
  {id:9,key:'riya',name:'Riya Sanjay Kale',location:'Goregaon East',sectors:['Tele-calling','Customer Support','Real Estate'],note:'2yr tele-calling exp in real estate sector',urgent:false,resume:true},
  {id:10,key:'harshad',name:'Harshad Sanjay Kale',location:'Mumbai',sectors:['Editing & Animation','Graphics & Design'],note:'Looking in Editing, Graphic, Animation',urgent:false,resume:false},
  {id:11,key:'amuthasara',name:'Amuthasara Albertraj',location:'Aarey Colony',sectors:['Education & Training','Admin','Customer Service'],note:'BA Mass Comm, 3+yr tuition teaching exp, student council leadership',urgent:false,resume:true},
  {id:12,key:'iqra',name:'Iqra Farid Khan',location:'Mumbai Central',sectors:['Retail & Fashion','Education & Training','Admin'],note:'BCom pursuing, boutique styling exp + teaching intern at Tiny Miracles Daycare',urgent:false,resume:true},
  {id:13,key:'shweta',name:'Shweta Sunil Jaiswal',location:'Andheri East',sectors:['Accounting','Admin','Banking Ops Support'],note:'BCom Accounting & Finance student, event & leadership exp',urgent:false,resume:true},
  {id:14,key:'janhavi',name:'Janhavi Pradeep Redkar',location:'Malad East',sectors:['Accounting','Admin','Banking Ops Support'],note:'BCom pursuing, Tally Prime A-grade certified, 40 WPM typing',urgent:false,resume:true},
  {id:16,key:'shreya_s',name:'Shreya Shedge',location:'Parel',sectors:['Admin','Retail','Customer Service'],note:'Fresher, HSC pass, MS-CIT certified, dependable & adaptable',urgent:false,resume:true},
  {id:17,key:'gangaram',name:'Gangaram Raut',location:'Grant Road',sectors:['Accounting','Admin','Banking Ops Support'],note:'Tally-certified, part-time accounting exp in vouchers & ledgers',urgent:false,resume:true},
  {id:18,key:'sandeep',name:'Sandeep Betwala',location:'Mumbai',sectors:['Admin','Data Entry','Staffing / HR Ops'],note:'Staffing Coordinator at Ad Astra, prior data entry & sales ops exp',urgent:false,resume:true},
  {id:19,key:'purva',name:'Purva Shedge',location:'Parel',sectors:['Admin','Data Entry','BPO'],note:'Data Entry intern in Mumbai, documentation & verification skills',urgent:false,resume:true},
  {id:20,key:'ashish',name:'Ashish Anand Pardeshi',location:'Girgaon',sectors:['BPO','Technical Support','Admin'],note:'10+yr DSL Engineer at Tata Teleservices, MIS reporting & SLA mgmt',urgent:false,resume:true},
  {id:21,key:'chandar',name:'Chandar Pardeshi',location:'Mumbai',sectors:['Open to All'],note:'Open to any sector',urgent:false,resume:false},
  {id:23,key:'varun',name:'Varun Pardeshi',location:'Mumbai Central',sectors:['Office Work','Admin & Data Entry'],note:'HSC + Computer Course, Fresher',urgent:false,resume:true},
  {id:24,key:'abhishek',name:'Abhishek Dhanraj Pardeshi',location:'Mumbai Central',sectors:['Customer Service','Retail','Catering & Hospitality'],note:'Fresher, billing/customer service exp at canteen, cookie shop & hospital ward',urgent:false,resume:true},
  {id:25,key:'zainab',name:'Ansari Zainab Abdul Latif',location:'Govandi',sectors:['Healthcare Support','Admin','Customer Service'],note:'6+yr exp: Nurse Assistant & Clinic Receptionist',urgent:true,resume:true},
  {id:26,key:'divya',name:'Divya Khandu Garud',location:'Aarey Colony',sectors:['Retail','Beauty & Wellness','Customer Service'],note:'3yr cash-counter exp at Greats Food, certified Makeup Artist',urgent:false,resume:true},
  {id:27,key:'janvi',name:'Janvi Ajay Pardeshi',location:'Mumbai',sectors:['Admin','Data Entry','BPO'],note:'Fresher, HSC Arts pass, basic computer & data entry skills',urgent:false,resume:true},
  {id:28,key:'kalpesh',name:'Kalpesh Nandu Lotade',location:'Aarey Colony',sectors:['Admin','IT Support','BPO'],note:'Fresher, HSC Commerce, MSCIT pursuing, ready for admin/IT/BPO roles',urgent:false,resume:true},
  {id:29,key:'kamini',name:'Kamini Krishnakumar Gangurde',location:'Mumbai',sectors:['Sales & Marketing','Hospitality','Customer Service'],note:'Hotel Mgmt + BA, sales & marketing exp at Excel Enterprises',urgent:false,resume:true},
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
];
const EJ_PK='iDYGDYpxhT7wKJ12d',EJ_SID='service_ob0zrq2',EJ_TID='template_1wuqmdr';
const N_EMAIL='meghna@tinymiracles.com',N_EMAIL2='rishikesh@tinymiracles.com',N_EMAIL3='pehlikamaitm@gmail.com',N_WA='919326691744';
emailjs.init(EJ_PK);

// ── SHEET/DRIVE LOGGER ───────────────────────────────────────────────
// Mirrors every HR signup, youth signup, and contact-form submission into
// a Google Sheet, and saves each youth's auto-generated resume into a Drive
// folder. Deployed Apps Script Web App URL (see sheet-logger/SETUP.md) —
// leave blank to disable.
const SHEET_LOG_URL='https://script.google.com/macros/s/AKfycbzz76kQJjrnDLO8rwUn-Y8xAllezp9GR-4s4quoPDfBqaXMHY0z89dnzS5t_4c1mkoR/exec';
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

// ── ANALYTICS ─────────────────────────────────────
// First-party, minimal-data event tracking -- no visitor identity, no
// cookies, no third-party script sending this off to anyone else. Just
// enough to answer "how many people actually use this and where do
// they drop off", read back in /admin's Analytics panel. Fire-and-
// forget like logSignup() above -- never blocks or breaks the actual
// user action if this fails, and kept as a separate call from
// logSignup() deliberately so a Sheet-logger misconfiguration (like
// today's) can never also silently take analytics down with it.
function trackEvent(type,meta){
  try{
    db.collection('analytics_events').add({type,meta:meta||{},ts:new Date().toISOString()}).catch(()=>{});
  }catch(e){}
}

// ── CLIENT ERROR MONITORING ───────────────────────
// If the site breaks for a real visitor, this is how you'd otherwise
// find out: not at all, unless they happen to tell you. Logs the error
// message and which page it happened on (window.__pkCurrentPage, set
// by showPage()) to Firestore, surfaced in /admin's Errors panel.
// Capped per page load so one error firing in a loop can't flood the
// database with hundreds of near-identical rows.
let clientErrorCount=0;
const CLIENT_ERROR_LIMIT=5;
function logClientError(message){
  if(clientErrorCount>=CLIENT_ERROR_LIMIT)return;
  clientErrorCount++;
  try{
    db.collection('client_errors').add({message:String(message).slice(0,500),page:window.__pkCurrentPage||'unknown',ts:new Date().toISOString()}).catch(()=>{});
  }catch(e){}
}
window.addEventListener('error',e=>{logClientError(e.message||'Unknown error');});
window.addEventListener('unhandledrejection',e=>{
  const r=e.reason;
  logClientError('Unhandled promise rejection: '+(r&&r.message?r.message:String(r)));
});

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
    edu: c.note.includes('BCom')||c.note.includes('BA')||c.note.includes('BMS')||c.note.includes('B.Com')||c.note.includes('TYBAMMC')||c.note.includes('TYBCOM')||c.note.includes('pursuing')||c.note.includes('Master') ? 'Graduate' : c.note.includes('HSC')||c.note.includes('12th')||c.note.includes('Higher Secondary') ? '12th Pass' : c.note.includes('ITI')||c.note.includes('certified')||c.note.includes('MSCIT') ? 'ITI/Trade' : '10th Pass',
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

// Normalize education level for filtering
function normalizeEdu(eduStr){
  if(!eduStr)return 'all';
  const s=eduStr.toLowerCase();
  if(s.includes('graduate')||s.includes('masters')||s.includes('m.'))return 'graduate';
  if(s.includes('12th')||s.includes('hsc')||s.includes('higher secondary'))return '12th';
  if(s.includes('iti')||s.includes('trade')||s.includes('technical'))return 'itk';
  if(s.includes('10th')||s.includes('ssc')||s.includes('secondary'))return '10th';
  return 'all';
}

// Page nav
// .ss (the search/filter bar) is position:sticky, and calling
// scrollIntoView() directly on a sticky element is unreliable across
// browsers -- the browser can miscalculate whether it's "already in
// view" since sticky elements reposition themselves during scroll.
//
// The real trap, found after goHomeThenScroll started calling this
// while genuinely still scrolled down (instead of always measuring
// right after a scrollTo(0,0) reset, which had been masking this by
// accident): getBoundingClientRect() on a sticky element reports its
// current STUCK position once you've scrolled past its natural spot --
// basically always true for a "browse candidates" click coming from the
// footer, About page, or the profile page. rect.top then reads ~64
// (its pinned offset) instead of its real place in the document, so
// the old math worked out to "scroll to roughly where you already
// are" -- i.e. nothing visibly happens.
// Fix: walk the offsetParent chain instead. offsetTop reflects an
// element's normal-flow position and is unaffected by sticky's
// scroll-driven visual offset, so this gives the same real answer
// whether .ss is currently stuck or not.
function scrollToCandidates(){
  const ss=document.querySelector('.ss');
  if(!ss)return;
  const headerH=window.innerWidth<=700?56:64; // matches .ss{top:...} at each breakpoint
  let docTop=0,el=ss;
  while(el){docTop+=el.offsetTop||0;el=el.offsetParent;}
  window.scrollTo({top:Math.max(0,docTop-headerH),behavior:'smooth'});
}

function scrollToHowItWorks(){
  const el=document.querySelector('.fi-hiw');
  if(el) el.scrollIntoView({behavior:'smooth'});
}

// Every "browse candidates" / "how it works" link that lives outside
// the home page (footer, About, the profile page's back link, a
// resume click bubbling up) needs showPage('home') first. The bug: that
// resets scroll straight to (0,0) unconditionally, then a hardcoded
// setTimeout tried to smooth-scroll back down 100ms later -- a race
// that a slower device/layout could lose, leaving you stuck at the
// top with the "browse profiles" click looking like it did nothing.
// This skips the reset+race entirely when we're already on Home (the
// hero's own button does this too), and otherwise waits two animation
// frames -- i.e. until the browser has actually painted the newly-
// shown page -- instead of guessing a delay.
// tabId is set AFTER showPage('home') below, not before -- showPage()
// unconditionally resets aria-current to match its own page param, so a
// caller setting the tab first would just get silently overwritten the
// moment this needed to navigate home first (e.g. clicking "How it works"
// while sitting on the Our story page).
function goHomeThenScroll(fn,tabId){
  const homeEl=document.getElementById('view-home');
  if(homeEl && homeEl.classList.contains('hidden')){
    showPage('home');
    if(tabId)setActiveTab(tabId);
    requestAnimationFrame(()=>requestAnimationFrame(fn));
  } else {
    if(tabId)setActiveTab(tabId);
    fn();
  }
}

function setActiveTab(id){
  document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-current','false'));
  const el=document.getElementById(id);if(el)el.setAttribute('aria-current','true');
}

function showPage(p){
  const homeEl = document.getElementById('view-home');
  const leavingHome = homeEl && !homeEl.classList.contains('hidden') && p!=='home';
  const enteringHome = homeEl && homeEl.classList.contains('hidden') && p==='home';
  document.querySelectorAll('[id^="view-"]').forEach(x=>x.classList.add('hidden'));
  const v=document.getElementById('view-'+p);if(v)v.classList.remove('hidden');
  setActiveTab('nl-'+p);
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
  if(p==='report')resetGrievanceForm();
  if(p==='admin')loadAdminDashboard();
  if(p==='hraccount')renderHRAccountView();
  if(p==='ytaccount')renderYtAccountView();
  window.scrollTo(0,0);
  window.__pkCurrentPage=p; // read by the client-error handler for context
  trackEvent('pageview',{page:p});
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
// `key` is the i18n key for the label; these are rebuilt from JS, so each
// one carries its data-i18n attribute and we re-run applyTranslations at the
// end -- otherwise the markup we just wrote would sit in English until the
// visitor switched language again.
const TRACKS=[
  {val:'all',label:'All',key:'fl_all'},
  {val:'corporate',label:'Corporate',key:'fl_corporate'},
  {val:'social',label:'Social Sector',key:'fl_social'},
  {val:'freelance',label:'Freelance',key:'fl_freelance'},
  {val:'services',label:'Services',key:'fl_services'},
];
function buildChips(){
  const w=document.getElementById('chips');
  w.innerHTML=TRACKS.map(t=>`<button class="chip${t.val==='all'?' on':''}" onclick="setSec(this,'${t.val}')" data-i18n="${t.key}">${t.label}</button>`).join('');
  // Build location dropdown
  const locs=new Set();
  DATA.forEach(d=>locs.add(d.location));
  const ls=document.getElementById('loc-sel');
  // Locality names stay as typed -- they're what the candidate wrote and what
  // the filter matches on, so they are data, not UI copy.
  ls.innerHTML='<option value="all" data-i18n="search_all_locations">All locations</option>';
  Array.from(locs).sort().forEach(l=>{
    const o=document.createElement('option');o.value=l;o.textContent=l;ls.appendChild(o);
  });
  if(typeof applyTranslations==='function') applyTranslations();
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
  const edu=document.getElementById('edu-sel').value;
  let f=DATA.filter(d=>{
    if(curSec!=='all'&&d.track!==curSec)return false;
    if(loc!=='all'&&d.location!==loc)return false;
    if(edu!=='all'){
      const edLevel=normalizeEdu(d.edu);
      if(edLevel!==edu)return false;
    }
    if(q){const h=`${d.name} ${d.sector} ${d.skills.join(' ')} ${d.location} ${d.about}`.toLowerCase();if(!h.includes(q))return false;}
    return true;
  });
  document.getElementById('rc').textContent=f.length;
  const g=document.getElementById('grid');
  if(!f.length){g.innerHTML=`<div class="empty" style="padding:60px 40px"><div class="empty-h">No candidates found.</div></div>`;return;}
  const full=canSeeFull();
  const card=d=>`<div class="pcard" onclick="showProfile(${d.id})">
    <div class="pc-name">${full?d.name:maskName(d.name)}</div>
    <div class="pc-sector">${d.sector}</div>
    <div class="pc-area">${full?d.location+(d.location.toLowerCase().includes('mumbai')?'':', Mumbai'):'Mumbai'}</div>
    <div class="pc-avail"><span class="avail-dot"></span>Available</div>
  </div>`;
  // The scrolling-marquee rows below duplicate each row's cards
  // (${cards}${cards}) so the loop animation has no visible seam -- that
  // reads fine with the full ~53-candidate list (plenty of cards per row),
  // but a narrow sector/location/search filter can leave a row with just
  // one or two cards, and the same trick then just shows the same person
  // twice, going nowhere. Below this threshold, render a plain static
  // grid instead -- no animation, no duplication, nothing to look buggy.
  const TICKER_MIN=16;
  if(f.length<TICKER_MIN){
    g.innerHTML=`<div class="track-grid-static">${f.map(card).join('')}</div>`;
    return;
  }
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
  const full=canSeeFull();
  const av=document.getElementById('rm-av');
  av.textContent=full?ini(d.name):'?';
  av.style.background=full?'var(--teal)':'var(--ink-5)';
  document.getElementById('rm-nm').textContent=full?d.name:maskName(d.name);
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
    body.innerHTML=`<div class="rv-none"><p>Resume coming soon.</p></div>`;
  }
  document.getElementById('r-ov').classList.add('open');
}
function closeR(){document.getElementById('r-ov').classList.remove('open');}
function toPf(){closeR();showProfile(curId);}

// ── SHORTLIST ──────────────────────────────────────
// A lighter, personal bookmarking tool for HR browsing multiple
// candidates before deciding who to actually contact -- separate from
// (and in addition to) "I'm Interested", which is still the real
// notify-the-team action. Persisted per-browser so it survives reloads.
let shortlist=JSON.parse(localStorage.getItem('pk_shortlist')||'[]');
function saveShortlist(){localStorage.setItem('pk_shortlist',JSON.stringify(shortlist));}
function isShortlisted(id){return shortlist.includes(id);}
function toggleShortlist(id){
  const i=shortlist.indexOf(id);
  if(i>=0)shortlist.splice(i,1);else shortlist.push(id);
  saveShortlist();
}
function toggleShortlistCurrent(){
  if(curId==null)return;
  toggleShortlist(curId);
  updateShortlistUI();
}
function updateShortlistUI(){
  const btn=document.getElementById('pf-shortlist-btn');
  const countEl=document.getElementById('pf-shortlist-count');
  if(countEl)countEl.textContent=shortlist.length;
  if(!btn||curId==null)return;
  const on=isShortlisted(curId);
  btn.textContent=on?'Shortlisted':'Add to shortlist';
  btn.classList.toggle('on',on);
}

const TRAINING=[
  'Reading a job description — kya maang rahe hain samajhna',
  'Building an honest resume — jhooth ke bina',
  'Interviewing — HR round mein kya poochte hain',
  "Knowing what day one at a workplace actually looks like"
];

function showProfile(id){
  const d=DATA.find(x=>x.id===id);if(!d)return;curId=id;
  const full=canSeeFull();
  const shownName=full?d.name:maskName(d.name);
  const shownLoc=full?d.location+(d.location.toLowerCase().includes('mumbai')?'':', Mumbai'):'Mumbai';

  document.getElementById('pf-av').textContent=shownName.charAt(0).toUpperCase();
  document.getElementById('pf-name').textContent=shownName;
  document.getElementById('pf-location').textContent=shownLoc;
  document.getElementById('pf-tags').innerHTML=
    `<span>${d.edu}</span><span>${d.sector}</span>`+
    (d.resume?'<span>Resume ready</span>':'<span>Resume not uploaded yet</span>');
  document.getElementById('pf-summary').textContent=d.about||'No summary provided yet.';
  document.getElementById('pf-training-list').innerHTML=TRAINING.map(t=>`<li>${t}</li>`).join('');

  // "Others in [sector]" -- same sector (via track, matching the sector
  // filter chips), excluding this candidate, first 3.
  const similar=DATA.filter(x=>x.id!==d.id&&x.track===d.track).slice(0,3);
  const simWrap=document.getElementById('pf-similar-wrap');
  if(similar.length){
    simWrap.style.display='';
    document.getElementById('pf-similar-sector').textContent=d.sector;
    document.getElementById('pf-similar-grid').innerHTML=similar.map(s=>{
      const sName=full?s.name:maskName(s.name);
      const sLoc=full?s.location:'Mumbai';
      return `<button onclick="showProfile(${s.id})"><div class="sm-name">${sName}</div><div class="sm-sector">${s.sector}</div><div class="sm-loc">${sLoc}</div></button>`;
    }).join('');
  } else {
    simWrap.style.display='none';
  }

  document.getElementById('pf-side-desc').textContent=full
    ?`Shortlist ${shownName.split(' ')[0]} and we'll make the introduction — and stay in the loop until the first day.`
    :'Sign in as an approved employer, or express interest below, to see their exact location and contact details.';
  document.getElementById('pf-resume-btn').style.display=full?'':'none';
  document.getElementById('pf-info-location').textContent=shownLoc;
  document.getElementById('pf-info-sectors').textContent='1';
  document.getElementById('pf-info-resume').textContent=d.resume?'Ready':'Not uploaded yet';
  updateShortlistUI();

  showPage('profile');
}
function toRes(){openR(curId);}

function downloadShortlist(){
  if(!shortlist.length){toast('Shortlist is empty — pick a few candidates first.');return;}
  const rows=shortlist.map(id=>DATA.find(d=>d.id===id)).filter(Boolean);
  const full=canSeeFull();
  const html=`<h1>Pehli Kamai — Shortlist</h1>
    <div class="sp-sub">${rows.length} candidate${rows.length===1?'':'s'} · ${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>
    <table><thead><tr><th>Name</th><th>Sector</th><th>Location</th></tr></thead><tbody>
    ${rows.map(d=>`<tr><td>${full?d.name:maskName(d.name)}</td><td>${d.sector}</td><td>${full?d.location:'Mumbai'}</td></tr>`).join('')}
    </tbody></table>`;
  document.getElementById('shortlist-print').innerHTML=html;
  window.print();
}

// ── HR INTEREST FLOW ──────────────────────────────
function openHI(){
  const d=DATA.find(x=>x.id===curId);if(!d)return;
  document.getElementById('hi-modal-name').textContent=d.name;
  document.getElementById('hi-form-body').style.display='block';
  document.getElementById('hi-thanks').style.display='none';
  // Logged-in HR: prefill from their account instead of a blank form every
  // time — still editable, in case they're submitting for a colleague.
  document.getElementById('hcf-name').value=hrUser?hrUser.name||'':'';
  document.getElementById('hcf-phone').value=hrUser?hrUser.phone||'':'';
  document.getElementById('hcf-email').value=hrUser?hrUser.email||'':'';
  document.getElementById('hcf-company').value=hrUser?hrUser.company||'':'';
  document.getElementById('hi-ov').classList.add('open');
  setTimeout(()=>document.getElementById(hrUser?'hcf-phone':'hcf-name').focus(),100);
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
  trackEvent('interest',{sector:d.sector});

  const emailData = {
    candidate_name: d.name,
    candidate_sectors: d.skills.join(', '),
    candidate_location: d.location+', Mumbai',
    candidate_note: 'HR: '+name+' | Phone: '+phone+' | Email: '+email+' | Company: '+(company||'Not specified'),
    viewed_at: t,
    message_type: 'HR INTERESTED — '+name+' ('+phone+')'
  };

  // Send to Meghna, Rishikesh, and the shared Pehli Kamai inbox
  emailjs.send(EJ_SID,EJ_TID,{...emailData,to_email:N_EMAIL}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{...emailData,to_email:N_EMAIL2}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{...emailData,to_email:N_EMAIL3}).catch(()=>{});

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

let hasVolunteered=false;
function toggleVol(show){
  hasVolunteered=show;
  document.getElementById('af-vol-yes').classList.toggle('act',show);
  document.getElementById('af-vol-no').classList.toggle('act',!show);
  document.getElementById('af-vol-fields').style.display=show?'flex':'none';
}

// Two-column layout -- header band + a skills/education sidebar + a
// main work-experience column -- matching the shape of a real uploaded
// resume (see the "already have a resume?" PDF path) instead of a flat
// stack of labelled fields. Built entirely from the profile form's own
// fields; nothing here is invented (there's no separate "job title"
// field, so the experience/volunteering entries use company/org + how
// long + what they did there, same fields the form actually collects).
/* ══ generated resume ═══════════════════════════════════════════════════
   Layout reproduced from the approved Pehli Kamai CV template: A4 at 96dpi
   (794px), 57px margins giving a 680px column, Fraunces for display type and
   Inter for everything else, a 2px #1d6b4f rule under the masthead and
   #dde1e7 hairlines between sections.

   The template it came from belongs to a candidate with an MBA, eight roles,
   projects and certifications. Almost nobody enrolling here has any of that
   -- they are first-time jobseekers, and the form only asks for one optional
   job and one optional volunteering stint. So every block below is
   conditional: a section with nothing in it is omitted entirely rather than
   printed as an empty heading, which is what would otherwise make a young
   person's first CV look like a form they failed to finish. */

const RESUME_CSS = `
  .gr{--ink:#14181b;--muted:#656e7c;--teal:#1d6b4f;--rule:#dde1e7;
      --serif:'Fraunces',Georgia,'Times New Roman',serif;
      --sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
      width:794px;max-width:100%;margin:0 auto;background:#fff;color:var(--ink);
      font-family:var(--sans);padding:51px 57px 44px;box-sizing:border-box;}
  .gr *{box-sizing:border-box;}
  /* masthead */
  .gr-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;}
  .gr-brand{font-family:var(--serif);font-weight:600;font-size:15px;color:var(--teal);line-height:1.1;}
  .gr-by{font-family:var(--sans);font-size:9.5px;color:var(--muted);margin-top:3px;}
  .gr-date{font-family:var(--sans);font-size:9.5px;color:var(--muted);white-space:nowrap;padding-top:2px;}
  .gr-rule{height:2px;background:var(--teal);margin:9px 0 0;}
  .gr-hr{height:1px;background:var(--rule);margin:0;}
  /* identity */
  .gr-id{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:22px 0 20px;}
  .gr-name{font-family:var(--serif);font-weight:600;font-size:30px;line-height:1.05;margin:0;}
  .gr-contact{text-align:right;font-size:11px;line-height:1.75;color:var(--ink);}
  .gr-contact .p{font-weight:500;font-size:12.5px;}
  .gr-contact span{display:block;color:var(--muted);}
  /* stat strip */
  .gr-stats{display:flex;gap:26px;padding:18px 0 16px;}
  .gr-stat{min-width:0;}
  .gr-stat-v{font-family:var(--serif);font-weight:600;font-size:17px;line-height:1.2;}
  .gr-stat-l{font-size:10px;color:var(--muted);margin-top:3px;}
  /* summary */
  .gr-summary{padding:22px 0 0;}
  .gr-summary p{font-family:var(--serif);font-weight:400;font-size:13.5px;line-height:1.62;margin:0;}
  .gr-cap{font-size:10px;color:var(--muted);margin:14px 0 20px;}
  /* sections */
  .gr-sec{padding:22px 0 0;}
  .gr-sec-h{font-family:var(--serif);font-weight:600;font-size:14.5px;margin:0 0 16px;}
  .gr-sub{font-size:11px;font-weight:600;margin:0 0 9px;}
  .gr-chips{display:flex;flex-wrap:wrap;gap:6px 8px;margin:0 0 18px 10px;padding:0;list-style:none;}
  .gr-chips li{font-size:11.5px;line-height:1.5;color:var(--ink);}
  .gr-chips li::after{content:'·';color:var(--rule);margin-left:8px;}
  .gr-chips li:last-child::after{content:'';}
  /* two-column rows: when it happened on the left, what it was on the right */
  .gr-row{display:flex;gap:18px;margin-bottom:18px;}
  .gr-row:last-child{margin-bottom:4px;}
  .gr-when{width:107px;flex:none;font-size:11px;color:var(--muted);line-height:1.5;padding-top:2px;}
  .gr-what{flex:1;min-width:0;}
  .gr-what-t{font-size:12.5px;font-weight:600;line-height:1.35;}
  .gr-what-s{font-size:11.5px;color:var(--muted);margin-top:3px;line-height:1.5;}
  .gr-what-d{font-size:11.5px;line-height:1.6;margin-top:7px;}
  /* footer */
  .gr-foot{margin-top:26px;padding-top:13px;border-top:1px dashed var(--rule);
           font-size:9.5px;line-height:1.65;color:var(--muted);}
  .gr-foot b{color:var(--ink);font-weight:600;}
  @media(max-width:820px){
    .gr{width:100%;padding:28px 22px 30px;}
    .gr-id{flex-direction:column;align-items:flex-start;gap:12px;}
    .gr-contact{text-align:left;}
    .gr-stats{flex-wrap:wrap;gap:16px 26px;}
    .gr-row{flex-direction:column;gap:4px;}
    .gr-when{width:auto;}
  }
`;

function esc(v){
  return String(v==null?'':v).replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function buildResumeHTML(d){
  const firstName = (d.name||'').trim().split(/\s+/)[0] || 'this candidate';
  const today = new Date().toLocaleDateString('en-IN',
    {day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kolkata'});

  // Contact column: only rows we actually hold. Deliberately no phone --
  // the form never asks for one, and Pehli Kamai makes the introduction
  // itself rather than publishing a young person's number on a file that
  // gets forwarded around.
  const contact = [
    d.email    ? `<div class="p">${esc(d.email)}</div>` : '',
    d.location ? `<span>${esc(d.location)}, Mumbai</span>` : '',
    d.sector   ? `<span>${esc(d.sector)}</span>` : ''
  ].filter(Boolean).join('');

  const stats = [
    d.edu      ? {v:d.edu,      l:'Education'}  : null,
    d.passYear ? {v:d.passYear, l:'Completed'}  : null,
    (d.langs && d.langs.length) ? {v:d.langs.join(', '), l:'Languages'} : null,
    d.location ? {v:d.location, l:'Based in'}   : null
  ].filter(Boolean).map(s =>
    `<div class="gr-stat"><div class="gr-stat-v">${esc(s.v)}</div>
       <div class="gr-stat-l">${esc(s.l)}</div></div>`).join('');

  const chips = list => `<ul class="gr-chips">${
    list.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`;

  // "What X can do" only earns its heading if there is something under it.
  const skillBlocks = [
    (d.skills && d.skills.length)
      ? `<div class="gr-sub">Skills &amp; sectors</div>${chips(d.skills)}` : '',
    (d.langs && d.langs.length)
      ? `<div class="gr-sub">Languages</div>${chips(d.langs)}` : ''
  ].filter(Boolean).join('');

  const row = (when, title, sub, desc) => `
      <div class="gr-row">
        <div class="gr-when">${esc(when||'')}</div>
        <div class="gr-what">
          <div class="gr-what-t">${esc(title)}</div>
          ${sub  ? `<div class="gr-what-s">${esc(sub)}</div>`  : ''}
          ${desc ? `<div class="gr-what-d">${esc(desc)}</div>` : ''}
        </div>
      </div>`;

  const work = d.expCompany
    ? `<div class="gr-hr"></div><div class="gr-sec"><h2 class="gr-sec-h">Work experience</h2>
         ${row(d.expDuration, d.expCompany, '', d.expRole)}</div>` : '';

  // Volunteering is not in the source template, but for someone with no paid
  // job it is often the only evidence of showing up and being relied on --
  // so it gets the same treatment rather than being dropped.
  const vol = d.volOrg
    ? `<div class="gr-hr"></div><div class="gr-sec"><h2 class="gr-sec-h">Volunteering</h2>
         ${row(d.volDuration, d.volOrg, '', d.volRole)}</div>` : '';

  const education = (d.edu || d.institution)
    ? `<div class="gr-hr"></div><div class="gr-sec"><h2 class="gr-sec-h">Education</h2>
         ${row(d.passYear, d.edu||'', d.institution||'', '')}</div>` : '';

  return `<div class="gr">
    <div class="gr-top">
      <div>
        <div class="gr-brand">Pehli Kamai</div>
        <div class="gr-by">by tiny miracles</div>
      </div>
      <div class="gr-date">${esc(today)}</div>
    </div>
    <div class="gr-rule"></div>

    <div class="gr-id">
      <h1 class="gr-name">${esc(d.name||'')}</h1>
      ${contact ? `<div class="gr-contact">${contact}</div>` : ''}
    </div>
    <div class="gr-hr"></div>

    ${stats ? `<div class="gr-stats">${stats}</div><div class="gr-hr"></div>` : ''}

    ${d.about ? `<div class="gr-summary"><p>${esc(d.about)}</p>
       <div class="gr-cap">In ${esc(firstName)}'s own words.</div></div>` : ''}

    ${skillBlocks ? `<div class="gr-hr"></div><div class="gr-sec">
       <h2 class="gr-sec-h">What ${esc(firstName)} can do</h2>${skillBlocks}</div>` : ''}

    ${work}${vol}${education}

    <div class="gr-foot">
      <b>Pehli Kamai is free for candidates.</b> No one from Pehli Kamai or an employer
      may ask for a fee, a deposit, or original documents.<br>
      Tiny Miracles, Mumbai · www.pehlikamai.com<br>
      Raise a concern: pehlikamaitm@gmail.com · This document carries no Aadhaar,
      PAN, or other ID number.
    </div>
  </div>`;
}

/* The same markup saved as a standalone .html in Drive (see saveResumeToDrive_
   in sheet-logger/Code.gs). Opened on its own it has no stylesheet, so the
   rules travel with it. Fraunces and Inter are pulled from Google Fonts with
   real fallbacks, because a CV is often opened offline or printed. */
function buildStandaloneResumeHTML(d){
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(d.name||'Resume')} — Pehli Kamai</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;background:#f4f1ea;}
  @media print{ html,body{background:#fff;} .gr{padding:0;} @page{size:A4;margin:14mm;} }
${RESUME_CSS}
</style>
</head>
<body>
${buildResumeHTML(d)}
</body>
</html>`;
}

/* The in-page preview drops buildResumeHTML() straight into the modal, so the
   same rules have to exist in this document too. Injected once from the single
   RESUME_CSS above rather than copied into styles.css, so what a candidate
   sees on screen and what lands in their downloaded file cannot drift apart. */
(function injectResumeCSS(){
  const add = () => {
    if(document.getElementById('pk-resume-css')) return;
    const s = document.createElement('style');
    s.id = 'pk-resume-css';
    s.textContent = RESUME_CSS;
    document.head.appendChild(s);
  };
  if(document.head) add();
  else document.addEventListener('DOMContentLoaded', add);
})();

// Optional "already have a resume?" upload -- kept separate from the
// auto-generated resume (candidates still get that either way). The file
// itself is held here until saveProfile() runs, then uploaded straight to
// Firebase Storage (already configured -- storageBucket in the Firebase
// config above) rather than embedded as base64 anywhere, since a 5MB file
// would blow well past Firestore's 1MB document limit.
function handleFile(input){
  const file=input.files[0];if(!file)return;
  if(file.size>5*1024*1024){toast('File too large — max 5MB');return;}
  const okTypes=['application/pdf','image/jpeg','image/jpg','image/png'];
  if(!okTypes.includes(file.type)){toast('Please upload a PDF or image (JPG/PNG).');return;}
  pendingResume=file;
  document.getElementById('rdrop-lbl').innerHTML=`<strong>${file.name}</strong> ready — <span style="text-decoration:underline;cursor:pointer" onclick="event.stopPropagation();clearPendingResume()">remove</span>`;
  document.getElementById('resume-drop').style.borderColor='var(--teal)';
}

function clearPendingResume(){
  pendingResume=null;
  document.getElementById('rdrop-lbl').innerHTML='Drop a PDF or image here, or click to browse (max 5MB)';
  document.getElementById('resume-drop').style.borderColor='var(--line-d)';
  document.getElementById('resume-file').value='';
}

function handleDrop(e){
  e.preventDefault();
  document.getElementById('resume-drop').style.borderColor='var(--line-d)';
  const file=e.dataTransfer.files[0];if(!file)return;
  const dt=new DataTransfer();dt.items.add(file);
  const inp=document.getElementById('resume-file');inp.files=dt.files;handleFile(inp);
}

// Uploads the pending file (if any) to Storage under this user's uid and
// saves the resulting URL onto their Firestore docs + local cache. Runs
// after the signup/edit itself already succeeded -- best-effort, same
// fire-and-forget pattern as the Sheet logger and email notifications, so a
// Storage hiccup never blocks the actual profile save.
function uploadPendingResume(uid,email){
  if(!pendingResume)return;
  const file=pendingResume;
  const ext=(file.name.split('.').pop()||'pdf').toLowerCase();
  storage.ref(`resumes/${uid}/resume.${ext}`).put(file)
    .then(snap=>snap.ref.getDownloadURL())
    .then(url=>{
      db.collection('youth_accounts').doc(uid).update({resumeFileURL:url}).catch(()=>{});
      db.collection('candidates').where('email','==',email).limit(1).get()
        .then(snap=>{if(!snap.empty)snap.docs[0].ref.update({resumeFileURL:url}).catch(()=>{});}).catch(()=>{});
      const accts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
      if(accts[email]){accts[email].resumeFileURL=url;localStorage.setItem('pk_yt_accts',JSON.stringify(accts));}
      if(currentYtAcct&&currentYtAcct.email===email)currentYtAcct.resumeFileURL=url;
    })
    .catch(()=>{});
}

function openAdd(){
  editingEmail=null;pendingResume=null;atTrack='';hasWorkExp=false;hasVolunteered=false;
  const t=document.getElementById('a-modal-title');if(t)t.innerHTML='Add your <em>profile</em>';
  ['a-nm','a-sk','a-ab','a-ph','a-lg','a-loc','a-inst','a-em-yt','a-pw','a-pw2','a-exco','a-exdu','a-exro','a-volorg','a-voldur','a-volrole'].forEach(i=>{const el=document.getElementById(i);if(el)el.value='';});
  const emf=document.getElementById('a-em-yt');if(emf){emf.readOnly=false;emf.style.opacity='';}
  document.getElementById('a-ed').value='';
  const ayr=document.getElementById('a-yr');if(ayr)ayr.value='';
  toggleExp(false);
  toggleVol(false);
  const rdrop=document.getElementById('rdrop-lbl');if(rdrop)rdrop.innerHTML='Drop a PDF or image here, or click to browse (max 5MB)';
  const rdz=document.getElementById('resume-drop');if(rdz)rdz.style.borderColor='var(--line-d)';
  const rfi=document.getElementById('resume-file');if(rfi)rfi.value='';
  ['a-age','a-consent-terms','a-consent-profile','a-consent-donor'].forEach(i=>{const el=document.getElementById(i);if(el)el.checked=false;});
  const sc=document.getElementById('a-sc');
  while(sc.options.length)sc.remove(0);
  sc.add(new Option('Select sector...',''));
  [...new Set(Object.values(TRACK_SECTORS).flat())].sort().forEach(o=>sc.add(new Option(o,o)));
  showPage('addprofile');
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
  const volorg=hasVolunteered?document.getElementById('a-volorg').value.trim():'';
  const voldur=hasVolunteered?document.getElementById('a-voldur').value.trim():'';
  const volrole=hasVolunteered?document.getElementById('a-volrole').value.trim():'';
  const ex=exco?'experienced':'fresher';
  const rl=sc+' — Looking for work';
  const trk=atTrack||Object.entries(TRACK_SECTORS).find(([,ss])=>ss.includes(sc))?.[0]||'corporate';
  const t=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
  const resumeD={name:nm,edu:ed,institution:inst,passYear:yr,sector:sc,location:loc,skills:sk,langs:lg,about:ab,expCompany:exco,expDuration:exdu,expRole:exro,volOrg:volorg,volDuration:voldur,volRole:volrole};

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
    // No password field here -- it never belongs in this cache. Changing
    // your password now actually goes through Firebase Auth's own
    // updatePassword() below, instead of just being written into
    // localStorage and never really taking effect.
    const donorConsentEl=document.getElementById('a-consent-donor');
    const updated={...old,name:nm,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,track:trk,institution:inst,passYear:yr,expCompany:exco,expDuration:exdu,expRole:exro,volOrg:volorg,volDuration:voldur,volRole:volrole,resumeKey:rk,resume:true,resumeHTML:html,donorConsent:donorConsentEl?donorConsentEl.checked:!!old.donorConsent};
    delete updated.password;
    cachedAccts[editingEmail]=updated;
    localStorage.setItem('pk_yt_accts',JSON.stringify(cachedAccts));
    const fbUser=auth.currentUser;
    if(fbUser){
      db.collection('youth_accounts').doc(fbUser.uid).update({name:nm,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,track:trk,institution:inst,passYear:yr,resumeHTML:html,donorConsent:updated.donorConsent}).catch(()=>{});
      uploadPendingResume(fbUser.uid,editingEmail);
      if(npw)fbUser.updatePassword(npw).then(()=>toast('Password updated.')).catch(()=>toast('Could not update password -- try signing in again first.'));
    }
    const idx=DATA.findIndex(x=>x.id===old.id);
    if(idx>=0)DATA[idx]={...DATA[idx],name:nm,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,track:trk,resume:true,resumeKey:rk};
    const em=editingEmail;editingEmail=null;
    currentYtAcct=updated;
    buildChips();render();updateEnqBadge();updateAboutStats();closeA();
    emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc,candidate_location:loc,candidate_note:'Profile updated.',viewed_at:t,message_type:'Profile Updated — '+nm,to_email:N_EMAIL}).catch(()=>{});
    emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc,candidate_location:loc,candidate_note:'Profile updated.',viewed_at:t,message_type:'Profile Updated — '+nm,to_email:N_EMAIL2}).catch(()=>{});
    emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc,candidate_location:loc,candidate_note:'Profile updated.',viewed_at:t,message_type:'Profile Updated — '+nm,to_email:N_EMAIL3}).catch(()=>{});
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
  if(!document.getElementById('a-age').checked){toast('Please confirm you are 18 or older.');return;}
  if(!document.getElementById('a-consent-terms').checked){toast('Please agree to the Privacy Policy and Terms & Conditions.');return;}
  if(!document.getElementById('a-consent-profile').checked){toast('Please consent to your profile being shown to employers.');return;}
  const donorConsent=document.getElementById('a-consent-donor').checked;

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
      const acct={uid,id,email,name:nm,age:21,edu:ed,sector:sc,location:loc,role:rl,skills:sk,langs:lg,about:ab,resumeKey:key,resume:true,track:trk,phone:ph,institution:inst,passYear:yr,expCompany:exco,expDuration:exdu,expRole:exro,volOrg:volorg,volDuration:voldur,volRole:volrole,resumeHTML:html,ageConfirmed18:true,donorConsent,createdAt:new Date().toISOString()};
      db.collection('youth_accounts').doc(uid).set(acct).catch(()=>{});
      db.collection('candidates').add({...np,email,phone:ph,institution:inst,passYear:yr,expCompany:exco,expDuration:exdu,expRole:exro,volOrg:volorg,volDuration:voldur,volRole:volrole,resumeHTML:html,donorConsent,createdAt:new Date().toISOString()}).catch(()=>{});
      logSignup('youth',{name:nm,email,phone:ph,edu:ed,institution:inst,sector:sc,location:loc,skills:sk.join(', '),about:ab,resumeHtml:buildStandaloneResumeHTML(resumeD)});
      trackEvent('signup_youth',{sector:sc,location:loc}); // no name/email/phone -- aggregate only
      uploadPendingResume(uid,email);
      // Cache the profile for the "Firestore doc missing" fallback in
      // youthLogin() -- never the password. Firebase Auth is the one place
      // that ever holds it, hashed and salted server-side.
      const accts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
      accts[email]=acct;
      localStorage.setItem('pk_yt_accts',JSON.stringify(accts));
      openYtDash(acct,true);
    })
    .catch(e=>{
      if(e.code==='auth/email-already-in-use'){toast('Account already exists. Try logging in.');}
      else{
        // Account creation itself failed (network issue, etc.) -- there
        // used to be a local-only fallback here that created an unauthenticated
        // "account" cached in localStorage with a plaintext password. Removed:
        // it wasn't a real account (no other device could ever sign into it),
        // and it stored the password in the clear. Ask them to retry instead.
        toast('Could not create your account -- check your connection and try again.');
      }
    });

  const noteMsg='New profile. Email: '+email+(ph?' | Phone: '+ph:'')+' | Resume auto-generated from form.';
  emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc+' ('+trk+')',candidate_location:loc,candidate_note:noteMsg,viewed_at:t,message_type:'New Profile — '+nm,to_email:N_EMAIL}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc+' ('+trk+')',candidate_location:loc,candidate_note:noteMsg,viewed_at:t,message_type:'New Profile — '+nm,to_email:N_EMAIL2}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{candidate_name:nm,candidate_sectors:sc+' ('+trk+')',candidate_location:loc,candidate_note:noteMsg,viewed_at:t,message_type:'New Profile — '+nm,to_email:N_EMAIL3}).catch(()=>{});
}

function closeA(){showPage('home');}

// ── header hamburger menu ────────────────────────────────
function toggleHdrMenu(){document.getElementById('hdr-menu').classList.toggle('open');}
document.addEventListener('click',e=>{
  const menu=document.getElementById('hdr-menu'), btn=document.getElementById('hdr-menu-btn');
  if(menu && menu.classList.contains('open') && !menu.contains(e.target) && e.target!==btn && !btn.contains(e.target)){
    menu.classList.remove('open');
  }
});

// ── EXPORT ──────────────────────────────────────

// ── CONTACT FORM ─────────────────────────────────
function openCF(){
  document.getElementById('cf-ov').classList.add('open');
  document.getElementById('cf-thanks').style.display='none';
  document.getElementById('cf-form-body').style.display='block';
  ['cf-name','cf-org','cf-email','cf-msg'].forEach(i=>{const el=document.getElementById(i);if(el)el.value='';});
  const cons=document.getElementById('cf-consent');if(cons)cons.checked=false;
}
function closeCF(){document.getElementById('cf-ov').classList.remove('open');}

function submitContact(){
  const name=document.getElementById('cf-name').value.trim();
  const email=document.getElementById('cf-email').value.trim();
  const msg=document.getElementById('cf-msg').value.trim();
  if(!name||!email||!msg){toast('Please fill all required fields.');return;}
  if(!document.getElementById('cf-consent').checked){toast('Please agree to the Privacy Policy to send this.');return;}
  const org=document.getElementById('cf-org').value.trim();
  const type=document.getElementById('cf-type').value;

  // Backup copy in Firestore -- this form previously only fired an email,
  // with no structured record if EmailJS ever silently failed.
  db.collection('contact_enquiries').add({name,email,org,contactType:type,msg,createdAt:new Date().toISOString()}).catch(()=>{});
  // Mirror to the Sheet too, same as HR/youth signups.
  logSignup('contact',{name,email,org,contactType:type,msg});
  trackEvent('contact',{contactType:type});

  const contactEmailData={
    candidate_name:name,candidate_sectors:type,candidate_location:org||'Not specified',
    candidate_note:msg,viewed_at:new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}),
    message_type:'Contact Form — '+type
  };
  // Notify Meghna, Rishikesh, and the shared inbox, same as the other flows.
  emailjs.send(EJ_SID,EJ_TID,{...contactEmailData,to_email:N_EMAIL2}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{...contactEmailData,to_email:N_EMAIL3}).catch(()=>{});
  emailjs.send(EJ_SID,EJ_TID,{...contactEmailData,to_email:N_EMAIL}).then(()=>{
    document.getElementById('cf-form-body').style.display='none';
    document.getElementById('cf-thanks').style.display='block';
  }).catch(()=>{window.open(`mailto:${N_EMAIL}?subject=${encodeURIComponent('Enquiry from '+name)}&body=${encodeURIComponent(msg)}`);toast('Opening email…');});
}

// ── REPORT A CONCERN / GRIEVANCE ──────────────────
// A real ticket, not just an email: gets a reference number, a Firestore
// record (the trackable source of truth), a mirrored row in the Sheet
// (a "Grievances" tab with a Status column the team updates by hand --
// same lightweight, no-new-backend pattern as HR approval), and an
// immediate notification to all three team addresses. Screenshots go to
// Firebase Storage, same as resume uploads, for the same reason: too big
// for a Firestore document field.
let pendingGrievanceFile=null;

// Was a modal (openGrievance/closeGrievance); now a real page reachable
// at showPage('report'), same as Privacy/Terms/Grievance Redressal --
// this just resets the form each time that page is shown, hooked into
// showPage() itself instead of an explicit open call.
function resetGrievanceForm(){
  document.getElementById('gr-thanks').style.display='none';
  document.getElementById('gr-form-body').style.display='block';
  ['gr-name','gr-email','gr-desc','gr-related'].forEach(i=>{document.getElementById(i).value='';});
  document.getElementById('gr-category').selectedIndex=0;
  document.getElementById('gr-urgency').selectedIndex=0;
  document.getElementById('gr-consent').checked=false;
  pendingGrievanceFile=null;
  document.getElementById('gr-drop-lbl').textContent='Drop a screenshot here, or click to browse (max 5MB)';
  document.getElementById('gr-drop').style.borderColor='var(--line-d)';
  document.getElementById('gr-file').value='';
  // Pre-fill from whoever's actually signed in, same idea as the HR
  // interest form prefill -- one less thing to retype.
  if(hrUser){document.getElementById('gr-name').value=hrUser.name||'';document.getElementById('gr-email').value=hrUser.email||'';}
  else if(currentYtAcct){document.getElementById('gr-name').value=currentYtAcct.name||'';document.getElementById('gr-email').value=currentYtAcct.email||'';}
}

function handleGrievanceFile(input){
  const file=input.files[0];if(!file)return;
  if(file.size>5*1024*1024){toast('Screenshot too large — max 5MB');return;}
  if(!['image/jpeg','image/jpg','image/png'].includes(file.type)){toast('Please attach a JPG or PNG screenshot.');return;}
  pendingGrievanceFile=file;
  document.getElementById('gr-drop-lbl').innerHTML=`<strong>${file.name}</strong> attached`;
  document.getElementById('gr-drop').style.borderColor='var(--teal)';
}
function handleGrievanceDrop(e){
  e.preventDefault();
  document.getElementById('gr-drop').style.borderColor='var(--line-d)';
  const file=e.dataTransfer.files[0];if(!file)return;
  const dt=new DataTransfer();dt.items.add(file);
  const inp=document.getElementById('gr-file');inp.files=dt.files;handleGrievanceFile(inp);
}

function genRefNo(){
  return 'GR-'+Math.random().toString(36).slice(2,8).toUpperCase();
}

function submitGrievance(){
  const name=document.getElementById('gr-name').value.trim();
  const email=document.getElementById('gr-email').value.trim();
  const category=document.getElementById('gr-category').value;
  const related=document.getElementById('gr-related').value.trim();
  const urgency=document.getElementById('gr-urgency').value;
  const desc=document.getElementById('gr-desc').value.trim();
  if(!name||!email||!desc){toast('Please fill your name, email, and what happened.');return;}
  if(!document.getElementById('gr-consent').checked){toast('Please agree to the Privacy Policy to send this.');return;}

  const refNo=genRefNo();
  const t=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
  const finish=(screenshotURL,screenshotNote)=>{
    db.collection('grievances').add({refNo,name,email,category,relatedTo:related,urgency,description:desc,screenshotURL:screenshotURL||'',status:'open',createdAt:new Date().toISOString()}).catch(()=>{});
    logSignup('grievance',{refNo,name,email,category,relatedTo:related,urgency,description:desc});
    trackEvent('grievance',{category,urgency});
    const grData={candidate_name:name,candidate_sectors:category,candidate_location:(related?'Re: '+related+' — ':'')+(screenshotNote||'No screenshot attached'),candidate_note:desc,viewed_at:t,message_type:'Grievance '+refNo+' ('+urgency+') — '+category};
    emailjs.send(EJ_SID,EJ_TID,{...grData,to_email:N_EMAIL}).catch(()=>{});
    emailjs.send(EJ_SID,EJ_TID,{...grData,to_email:N_EMAIL2}).catch(()=>{});
    emailjs.send(EJ_SID,EJ_TID,{...grData,to_email:N_EMAIL3}).catch(()=>{});
    document.getElementById('gr-form-body').style.display='none';
    document.getElementById('gr-ref-no').textContent=refNo;
    document.getElementById('gr-thanks').style.display='block';
  };

  if(pendingGrievanceFile){
    const ext=(pendingGrievanceFile.name.split('.').pop()||'jpg').toLowerCase();
    storage.ref(`grievances/${refNo}/screenshot.${ext}`).put(pendingGrievanceFile)
      .then(snap=>snap.ref.getDownloadURL())
      .then(url=>finish(url,url))
      .catch(()=>finish('','Screenshot attached but failed to upload — ask the reporter to resend it.'));
  } else {
    finish('',null);
  }
}

function loadAdminDashboard(){
  const gate=document.getElementById('admin-gate');
  const body=document.getElementById('admin-body');
  if(!canAccessAdmin()){
    gate.style.display='block';
    body.style.display='none';
    return;
  }
  gate.style.display='none';
  body.style.display='block';
  document.getElementById('admin-rows').innerHTML='<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--fi-ink-2)">Loading…</td></tr>';
  db.collection('grievances').orderBy('createdAt','desc').get().then(snap=>{
    const rows=[];
    snap.forEach(doc=>rows.push({id:doc.id,...doc.data()}));
    renderAdminRows(rows);
  }).catch(()=>{
    document.getElementById('admin-rows').innerHTML='<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--fi-ink-2)">Could not load grievances. Check the Firestore rules note in script.js.</td></tr>';
  });
}

function renderAdminRows(rows){
  const statsEl=document.getElementById('admin-stats');
  const open=rows.filter(r=>r.status!=='resolved').length;
  const urgent=rows.filter(r=>r.urgency==='Very urgent'&&r.status!=='resolved').length;
  const stat=(n,label)=>`<div style="background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 18px;min-width:110px">
    <div style="font-family:var(--serif);font-size:22px;font-weight:700;color:var(--teal)">${n}</div>
    <div style="font-size:10.5px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink-3)">${label}</div></div>`;
  statsEl.innerHTML=stat(rows.length,'Total')+stat(open,'Open or acknowledged')+stat(urgent,'Very urgent, unresolved');

  const rowsEl=document.getElementById('admin-rows');
  if(!rows.length){rowsEl.innerHTML='<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--fi-ink-2)">No grievances yet.</td></tr>';return;}
  rowsEl.innerHTML=rows.map(r=>{
    const when=r.createdAt?new Date(r.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'2-digit'}):'';
    const urgencyColor=r.urgency==='Very urgent'?'#c54036':r.urgency==='Somewhat urgent'?'#c9820a':'var(--ink-3)';
    const shot=r.screenshotURL?`<a href="${r.screenshotURL}" target="_blank" style="color:var(--teal);font-weight:700">View</a>`:'—';
    const statusOpts=['open','acknowledged','resolved'].map(s=>`<option value="${s}" ${r.status===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('');
    return `<tr>
      <td><strong>${r.refNo||''}</strong></td>
      <td>${when}</td>
      <td>${r.name||''}<br><span style="font-size:11px;color:var(--ink-3)">${r.email||''}</span></td>
      <td>${r.category||''}</td>
      <td style="color:${urgencyColor};font-weight:600">${r.urgency||''}</td>
      <td>${r.relatedTo||'—'}</td>
      <td style="max-width:260px;white-space:pre-wrap">${(r.description||'').slice(0,220)}${(r.description||'').length>220?'…':''}</td>
      <td>${shot}</td>
      <td><select onchange="setGrievanceStatus('${r.id}',this.value)">${statusOpts}</select></td>
    </tr>`;
  }).join('');
}

function setGrievanceStatus(docId,status){
  db.collection('grievances').doc(docId).update({status,statusUpdatedAt:new Date().toISOString()})
    .then(()=>toast('Status updated.'))
    .catch(()=>toast('Could not update status — try again.'));
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
          <span class="enq-pill">${e.hrName}</span>
          <span class="enq-pill">${e.hrPhone}</span>
          <span class="enq-pill">${e.hrEmail}</span>
          ${e.hrCompany?`<span class="enq-pill">${e.hrCompany}</span>`:''}
        </div>
        <div class="enq-sector">Sectors: ${e.candidateSectors} · ${e.candidateLocation}</div>
        <div class="enq-card-actions">
          <button class="btn-enq-wa" onclick="window.open('https://wa.me/91'+${JSON.stringify(e.hrPhone)}.replace(/\D/g,''),'_blank')">WhatsApp HR</button>
          <button class="btn-enq-mail" onclick="window.open('mailto:${e.hrEmail}?subject=Re: ${encodeURIComponent(e.candidateName)} — Pehli Kamai','_blank')">Email HR</button>
        </div>
      </div>
    </div>`).join('')}</div>`;
}

// ── TOAST ────────────────────────────────────────
function toast(m){const t=document.getElementById('toast');document.getElementById('t-m').textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}

// ── SIGN IN ──────────────────────────────────────
let hrUser=JSON.parse(localStorage.getItem('typc_hr_user')||'null');

function openSignIn(){document.getElementById('hl-ov').classList.add('open');switchLoginRole('hr');}

/* Arriving from /reset/ after choosing a new password. Without this the
   journey ends by dumping someone on the home page to go and find the login
   again, having just proved they own the address -- so the modal opens
   straight away and both email fields are pre-filled.

   The address travels in sessionStorage, not the URL: a query string would
   put a jobseeker's email into browser history and referrer headers. It is
   read once and removed. The role is not known here (the reset link does not
   say whether they are youth or HR), so both panels are filled and they pick. */
function handleReturnFromReset(){
  const params = new URLSearchParams(location.search);
  if(params.get('signin') !== '1') return;

  let email = null;
  try{
    email = sessionStorage.getItem('pk-reset-email');
    sessionStorage.removeItem('pk-reset-email');
  }catch(e){ /* private mode -- just open the form empty */ }

  const ov = document.getElementById('hl-ov');
  if(ov) ov.classList.add('open');
  // Default to the youth panel: they are the larger group and the ones most
  // likely to have needed a reset. This MUST come before the prefill --
  // switchLoginRole('yt') blanks yt-email and yt-pw, so filling first would
  // have the values silently wiped.
  switchLoginRole('yt');

  if(email){
    ['yt-email','hr-si-email'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.value = email;
    });
    const p = document.getElementById('yt-pw'); if(p) p.focus();
  }

  // Drop ?signin=1 so a refresh or a shared link does not reopen the modal.
  try{ history.replaceState({}, '', location.pathname); }catch(e){}
}
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
/* Password reset, shared by the youth and HR sign-in forms.

   Deliberately reports the SAME message whether or not the address has an
   account. Firebase distinguishes auth/user-not-found, and surfacing that
   would turn this box into a membership oracle: anyone could test an email
   and learn whether that person is a Pehli Kamai jobseeker. Given the
   candidates here are young people from underserved communities, that is
   not a detail worth leaking to save a moment of confusion. */
function sendPasswordReset(emailFieldId){
  const el=document.getElementById(emailFieldId);
  const email=(el&&el.value||'').trim().toLowerCase();
  if(!email){toast('Enter your email address first, then tap Forgot password.');return;}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){toast('That does not look like an email address.');return;}
  const done=()=>toast('If that email has an account, a reset link is on its way. Check spam too.');
  auth.sendPasswordResetEmail(email)
    .then(done)
    .catch(e=>{
      // Same reassurance for a missing account; only surface real faults.
      if(e&&(e.code==='auth/user-not-found'||e.code==='auth/invalid-email')){done();return;}
      if(e&&e.code==='auth/too-many-requests'){toast('Too many attempts. Please wait a few minutes and try again.');return;}
      toast('Could not send the reset email just now. Please try again.');
    });
}

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
        /* Firestore doc missing. The cache below is keyed by email and this
           email is the one Firebase just authenticated, so it can only ever
           return this person's own profile -- unlike the HR panel's old
           fallback, which was keyed to nobody. */
        const accts=JSON.parse(localStorage.getItem('pk_yt_accts')||'{}');
        const acct=accts[email];
        if(acct){closeHRLogin();openYtDash(acct);return;}
        // Not a candidate at all. Say which panel they want rather than
        // telling someone with a perfectly good account to sign up again.
        const uid = (auth.currentUser && auth.currentUser.uid) || snap.id;
        const check = uid
          ? db.collection('hr_accounts').doc(uid).get().catch(()=>({exists:false}))
          : Promise.resolve({exists:false});
        return check.then(h=>{
          auth.signOut().catch(()=>{});
          toast(h && h.exists
            ? 'That is an employer account — switch to HR / Employer to sign in.'
            : 'Profile not found. Please sign up again.');
        });
      }
    })
    .catch(e=>{
      // Firebase Auth is the only real credential check -- there used to be
      // a fallback here that compared against a plaintext password cached
      // in localStorage. Removed: that password never should have been
      // stored client-side in the first place, and a client-side compare
      // isn't real authentication anyway (trivially bypassed via devtools).
      toast('Email or password incorrect.');
    });
}

let ytIsNewSignup=false;

// Real page now (was a modal) -- same "not a popup" pattern as the HR
// account page, and same sidebar+panel design format.
function openYtDash(acct,isNew){
  currentYtAcct=acct;
  ytIsNewSignup=!!isNew;
  updateYouthHeader();
  showPage('ytaccount');
}

// Same idea as updateHRHeader(): once a youth is signed in this
// session, "Upload your profile" becomes "My account" and reopens
// their dashboard instead of the blank signup form. HR takes priority
// if somehow both are set in the same session -- updateHRHeader()
// already hides this button entirely for a signed-in HR account.
function updateYouthHeader(){
  updateRoleNav();
  const addBtn=document.getElementById('btn-add-profile');
  if(!addBtn||hrUser)return;
  // Same data-i18n-stays-set reasoning as the HR version above -- keeps
  // this correct across a later language switch, not just at the
  // moment of login.
  const key=currentYtAcct?'menu_myaccount':'btn_upload';
  addBtn.setAttribute('data-i18n',key);
  addBtn.textContent=typeof t==='function'?t(key):(currentYtAcct?'My account':'Upload your profile');
  addBtn.onclick=currentYtAcct?(()=>openYtDash(currentYtAcct)):(()=>openAdd());
}

function renderYtAccountView(){
  const body=document.getElementById('yt-acct-body');
  const acct=currentYtAcct;
  if(!acct){
    body.innerHTML=`<p style="font-size:14.5px;color:var(--fi-ink-2);max-width:60ch">Sign in with your youth account to see this.</p>
      <button onclick="openSignIn()" style="margin-top:10px;padding:11px 22px;background:var(--teal);color:#fff;border:none;border-radius:8px;font-family:var(--sans);font-size:13px;font-weight:700;cursor:pointer">Sign in</button>`;
    return;
  }
  const isNew=ytIsNewSignup;
  ytIsNewSignup=false;
  body.innerHTML=`
    <button class="pf-back" onclick="showPage('home')" style="margin-bottom:20px">&larr; Back to home</button>
    <div class="acct-shell">
      <aside class="acct-side">
        <div class="acct-avatar">${ini(acct.name)}</div>
        <div class="acct-name">${acct.name}</div>
        <div class="acct-sub">${acct.sector} &middot; ${acct.location}, Mumbai</div>
        <div class="acct-email">${acct.email}</div>
        <button class="acct-signout" onclick="youthSignOut()">Sign out</button>
      </aside>
      <div class="acct-main">
        <div class="acct-panel" id="yt-acct-panel"><div style="padding:20px 0;text-align:center;color:var(--ink-4);font-size:13px">Loading…</div></div>
      </div>
    </div>
  `;
  db.collection('hr_enquiries').where('candidateName','==',acct.name).get()
    .then(snap=>{
      const enquiries=[];
      snap.forEach(doc=>enquiries.push({...doc.data(),id:doc.id}));
      renderYtProfilePanel(acct,isNew,snap.size);
      loadYtApplications(enquiries);
    })
    .catch(()=>{
      const enqs=JSON.parse(localStorage.getItem('typc_enquiries')||'[]');
      const n=enqs.filter(e=>e.candidateName===acct.name).length;
      renderYtProfilePanel(acct,isNew,n);
      loadYtApplications(enqs);
    });
}

function renderYtProfilePanel(acct,isNew,n){
  const hasResume=acct.resumeKey&&RESUMES[acct.resumeKey];
  const panel=document.getElementById('yt-acct-panel');
  if(!panel)return; // page navigated away before the enquiry count loaded
  panel.innerHTML=`
    ${isNew?`<div style="background:#e8f5e9;border:1.5px solid #a5d6a7;border-radius:10px;padding:14px 16px;margin-bottom:20px;text-align:center">
      <div style="font-weight:700;color:#2e7d32;font-size:14px">Your profile is live!</div>
      <div style="font-size:12px;color:#388e3c;margin-top:4px">Your resume has been automatically created. You can view it below.</div>
    </div>`:''}
    <h2>My profile</h2>
    <div class="acct-panel-sub">Your account information.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:22px">
      <div style="background:${n>0?'#e8f5e9':'var(--bg)'};border:1.5px solid ${n>0?'#a5d6a7':'var(--line-d)'};border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:26px;font-weight:800;color:${n>0?'#2e7d32':'var(--ink-4)'}">${n}</div>
        <div style="font-size:10.5px;color:${n>0?'#388e3c':'var(--ink-4)'};font-weight:600;margin-top:3px">HR${n===1?' has':' have'} expressed interest</div>
      </div>
      <div style="background:var(--teal-soft);border:1.5px solid var(--teal-mid);border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:26px;font-weight:800;color:var(--teal)">Live</div>
        <div style="font-size:10.5px;color:var(--teal-dark);font-weight:600;margin-top:3px">Profile status</div>
      </div>
    </div>
    <div style="margin-bottom:24px;padding:16px;background:var(--bg);border-radius:10px;border:1.5px solid var(--line-d)">
      <h3 style="font-size:13.5px;font-weight:700;color:var(--ink-1);margin:0 0 12px">Application Status</h3>
      <div id="yt-applications" style="font-size:12px;color:var(--ink-4)">Loading your applications...</div>
    </div>
    ${hasResume?`<button onclick="openR(${acct.id||'curId'})" style="display:block;width:100%;padding:11px;background:var(--teal);color:white;text-align:center;border-radius:8px;font-size:13px;font-weight:600;margin-bottom:10px;box-sizing:border-box;cursor:pointer;border:none;font-family:var(--sans)">View my resume</button>`:''}
    ${acct.resumeFileURL?`<a href="${acct.resumeFileURL}" target="_blank" style="display:block;width:100%;padding:11px;background:transparent;color:var(--teal);text-align:center;border-radius:8px;font-size:13px;font-weight:600;margin-bottom:10px;box-sizing:border-box;cursor:pointer;border:1.5px solid var(--teal);font-family:var(--sans);text-decoration:none">View my uploaded resume</a>`:''}
    <div style="font-size:11.5px;color:var(--ink-3);line-height:1.6;margin-bottom:18px;padding:10px 12px;background:var(--bg);border-radius:8px">
      Pehli Kamai will personally call you when an HR is interested.<br>Questions? <strong>+91 9326691744</strong> or <strong>+91 99204 45917</strong>
    </div>
    <button class="btn-lf-submit" style="width:auto;padding:0 26px" onclick="youthEditProfile()">Edit my profile</button>
    <hr class="acct-hr">
    <div class="acct-danger" style="border:1px solid rgba(197,64,54,.3);border-radius:10px;padding:18px 20px">
      <h2 style="font-size:15px;margin-bottom:4px">Delete account</h2>
      <p style="font-size:12.5px;color:var(--ink-4);margin:0 0 14px">This permanently removes your account and profile, and cannot be undone.</p>
      <button onclick="confirmDeleteYouthAccount()" style="padding:9px 20px;background:transparent;border:1.5px solid #e57373;border-radius:8px;font-family:var(--sans);font-size:12.5px;color:#c62828;cursor:pointer">Delete my account</button>
    </div>
  `;
}

function loadYtApplications(enquiries){
  const appDiv=document.getElementById('yt-applications');
  if(!appDiv)return;
  if(!enquiries||enquiries.length===0){
    appDiv.innerHTML='<div style="color:var(--ink-4);font-size:12px">No applications yet. HR teams will reach out once they are interested in your profile.</div>';
    return;
  }
  const appsList=enquiries.map(enq=>{
    const company=enq.hrCompany||enq.company||'HR Company';
    const date=enq.createdAt||enq.dateCreated||'Recently';
    const status=enq.status||'Interested';
    const statusColor={
      'interested':'#2e7d32',
      'viewing':'#0097a7',
      'interview':'#f57c00',
      'rejected':'#c62828',
      'placed':'#1565c0'
    }[status.toLowerCase()]||'#0097a7';
    return `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--line-light)">
        <div style="flex:1">
          <div style="font-weight:600;color:var(--ink-1);font-size:13px">${company}</div>
          <div style="font-size:11px;color:var(--ink-4);margin-top:2px">${date}</div>
        </div>
        <div style="background:${statusColor}20;color:${statusColor};padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;white-space:nowrap">${status}</div>
      </div>
    `;
  }).join('');
  appDiv.innerHTML=appsList;
}

function youthSignOut(){
  if(!confirm('Sign out?'))return;
  currentYtAcct=null;
  auth.signOut().catch(()=>{});
  showPage('home');
  updateYouthHeader();
  toast('Signed out.');
}

function confirmDeleteYouthAccount(){
  if(!confirm('Delete your account and remove your profile from Pehli Kamai? This cannot be undone.'))return;
  deleteYouthAccount();
}
function deleteYouthAccount(){
  const user=auth.currentUser;
  if(!user){toast('Please sign in again.');return;}
  const uid=user.uid;
  const acct=currentYtAcct;
  // Same order as the HR version: delete the Auth login first. If that
  // fails (e.g. needs a fresh re-login), nothing else is touched.
  user.delete()
    .then(()=>{
      const jobs=[db.collection('youth_accounts').doc(uid).delete().catch(()=>{})];
      if(acct&&acct.email){
        jobs.push(db.collection('candidates').where('email','==',acct.email).get().then(snap=>{
          const batch=db.batch();
          snap.forEach(d=>batch.delete(d.ref));
          return batch.commit();
        }).catch(()=>{}));
      }
      return Promise.all(jobs);
    })
    .then(()=>{
      if(acct){const idx=DATA.findIndex(d=>d.id===acct.id);if(idx>-1)DATA.splice(idx,1);}
      currentYtAcct=null;
      showPage('home');
      updateYouthHeader();
      render();
      toast('Your account and profile have been deleted.');
    })
    .catch(e=>{
      if(e.code==='auth/requires-recent-login'){promptReauthAndDeleteYt_();}
      else{toast('Could not delete account: '+(e.message||'try again'));}
    });
}
function promptReauthAndDeleteYt_(){
  const pw=prompt('For security, please re-enter your password to confirm deletion:');
  if(!pw)return;
  const user=auth.currentUser;
  const cred=firebase.auth.EmailAuthProvider.credential(user.email,pw);
  user.reauthenticateWithCredential(cred)
    .then(()=>deleteYouthAccount())
    .catch(()=>toast('Incorrect password — account not deleted.'));
}

function youthEditProfile(){
  const acct=currentYtAcct;
  if(!acct){toast('Please sign in again to edit your profile.');return;}
  const email=acct.email;
  openAdd();
  editingEmail=email;
  const t=document.getElementById('a-modal-title');if(t)t.innerHTML='Update my <em>profile</em>';
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
    if(acct.volOrg){hasVolunteered=true;toggleVol(true);document.getElementById('a-volorg').value=acct.volOrg||'';document.getElementById('a-voldur').value=acct.volDuration||'';document.getElementById('a-volrole').value=acct.volRole||'';}
    if(acct.resumeFileURL){document.getElementById('rdrop-lbl').innerHTML=`You already have a resume uploaded (<a href="${acct.resumeFileURL}" target="_blank" onclick="event.stopPropagation()">view it</a>) — drop a new file here to replace it`;document.getElementById('resume-drop').style.borderColor='var(--teal)';}
    // Already agreed once at signup -- reflect that instead of showing
    // freshly-unticked boxes for someone who's just editing their profile.
    document.getElementById('a-age').checked=true;
    document.getElementById('a-consent-terms').checked=true;
    document.getElementById('a-consent-profile').checked=true;
    document.getElementById('a-consent-donor').checked=!!acct.donorConsent;
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
        /* No cached fallback here. This used to read typc_hr_user from
           localStorage when the Firestore doc was missing -- but that key
           holds the LAST HR user to sign in on this device, keyed to nobody.
           On a shared or community machine a candidate signing in through
           this panel with their own correct password would find no
           hr_accounts doc, fall through to that cache, and be handed the
           previous employer's name, company and approved flag. Your role is
           your account: if there is no HR record for this uid, this is not an
           employer login, and no amount of local cache should say otherwise. */
        const data = snap.exists ? snap.data() : null;
        if(!data){
          return db.collection('youth_accounts').doc(cred.user.uid).get()
            .then(y=>{
              auth.signOut().catch(()=>{});
              toast(y.exists
                ? 'That is a candidate account — switch to Youth to sign in.'
                : 'No employer account found for that email. Please create one.');
              if(!y.exists) switchLoginTab('up');
            })
            .catch(()=>{ auth.signOut().catch(()=>{}); toast('No employer account found for that email.'); });
        }
        {
          hrUser={name:data.name,phone:data.phone,email:data.email,company:data.company,industry:data.industry,city:data.city,approved:data.approved===true};
          localStorage.setItem('typc_hr_user',JSON.stringify(hrUser));
          closeHRLogin();updateHRHeader();render();
          toast('Welcome back, '+hrUser.name+'!');
        }
      });
    })
    .catch(()=>{
      // There used to be a fallback here that matched on email alone, with
      // no password check at all -- on a shared device where this HR user
      // had previously signed in once, ANY password would get you in as
      // them, as long as you knew their email. Removed: Firebase Auth's
      // rejection is the real answer here, not something to work around.
      toast('Email or password incorrect.');
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
  if(!document.getElementById('hr-consent-terms').checked){toast('Please agree to the Privacy Policy and Terms & Conditions.');return;}
  auth.createUserWithEmailAndPassword(em,pw)
    .then(cred=>{
      cred.user.sendEmailVerification();
      // Pilot phase: every HR account sees full candidate details right
      // away, no manual review step -- that's a deliberate call, not an
      // oversight (see canSeeFull()). Kept the `approved` field itself
      // rather than deleting the whole mechanism, since it's the same
      // flag the post-pilot paid-access gate is expected to reuse later.
      const hrData={uid:cred.user.uid,name:nm,phone:ph,email:em,company:co,industry:ind,city:city,role:'hr',approved:true,createdAt:new Date().toISOString()};
      db.collection('hr_accounts').doc(cred.user.uid).set(hrData).catch(()=>{});
      logSignup('hr',{name:nm,phone:ph,email:em,org:co,industry:ind,city:city});
      trackEvent('signup_hr',{industry:ind,city:city});
      hrUser={name:nm,phone:ph,email:em,company:co,industry:ind,city:city,approved:true};
      localStorage.setItem('typc_hr_user',JSON.stringify(hrUser));
      closeHRLogin();updateHRHeader();render();
      toast('Account created! Verify your email to finish setting up.');
    })
    .catch(e=>{
      if(e.code==='auth/email-already-in-use'){toast('Email already registered — please sign in.');switchLoginTab('in');}
      else{toast('Error: '+e.message);}
    });
}

// ── HR ACCOUNT (view / edit / delete) ────────────────────────────
const HR_INDUSTRIES=['Retail & FMCG','Banking & Finance','IT & Technology','Healthcare','Hospitality & Food','Manufacturing','Education & NGO','Media & Marketing','Logistics & Supply Chain','Real Estate','Other'];

// Real page now (was a modal) -- same "not a popup" pattern as the
// profile/report/admin pages.
function openHRAccount(){
  if(!hrUser){toast('Please sign in first.');return;}
  showPage('hraccount');
}

let hrAcctTab='details';

function renderHRAccountView(){
  const body=document.getElementById('hr-acct-body');
  const u=hrUser;
  if(!u){
    body.innerHTML=`<p style="font-size:14.5px;color:var(--fi-ink-2);max-width:60ch">Sign in with your HR account to see this.</p>
      <button onclick="openSignIn()" style="margin-top:10px;padding:11px 22px;background:var(--teal);color:#fff;border:none;border-radius:8px;font-family:var(--sans);font-size:13px;font-weight:700;cursor:pointer">Sign in</button>`;
    return;
  }
  hrAcctTab='details';
  body.innerHTML=`
    <div class="acct-shell">
      <aside class="acct-side">
        <div class="acct-avatar">${ini(u.name)}</div>
        <div class="acct-name">${u.name}</div>
        <div class="acct-sub">${u.company}</div>
        <div class="acct-email">${u.email}</div>
        <nav class="acct-nav">
          <button class="acct-nav-item active" id="acct-nav-details" onclick="setHRAcctTab('details')">My details</button>
          <button class="acct-nav-item" id="acct-nav-enquiries" onclick="setHRAcctTab('enquiries')">My enquiries</button>
        </nav>
        <button class="acct-signout" onclick="if(confirm('Sign out?')){hrUser=null;localStorage.removeItem('typc_hr_user');auth.signOut().catch(()=>{});location.reload();}">Sign out</button>
      </aside>
      <div class="acct-main">
        <div class="acct-panel" id="acct-panel-details"></div>
        <div class="acct-panel hidden" id="acct-panel-enquiries">
          <h2>My enquiries</h2>
          <div class="acct-panel-sub">Candidates you've expressed interest in.</div>
          <div id="hr-acct-enquiries"><div style="padding:20px 0;text-align:center;color:var(--ink-4);font-size:13px">Loading…</div></div>
        </div>
      </div>
    </div>
  `;
  renderHRDetailsPanel();
  loadHRAccountEnquiries(u.email);
}

function setHRAcctTab(tab){
  hrAcctTab=tab;
  document.getElementById('acct-nav-details').classList.toggle('active',tab==='details');
  document.getElementById('acct-nav-enquiries').classList.toggle('active',tab==='enquiries');
  document.getElementById('acct-panel-details').classList.toggle('hidden',tab!=='details');
  document.getElementById('acct-panel-enquiries').classList.toggle('hidden',tab!=='enquiries');
}

// Always-editable, sectioned like a real settings page (a description
// next to each group of fields, one Save per section) rather than the
// old plain label:value list + a single "Edit" toggle for the whole
// panel -- both sections' Save buttons call the same
// saveHRAccountEdit(), which reads every field regardless of which
// button was clicked, so this is really one form visually split in two,
// not two independent saves.
function renderHRDetailsPanel(){
  const u=hrUser;
  const panel=document.getElementById('acct-panel-details');
  panel.innerHTML=`
    <h2>My details</h2>
    <div class="acct-panel-sub">Your account information.</div>

    <div class="acct-section">
      <div class="acct-section-head">
        <h3>Personal information</h3>
        <p>Your name and phone number — shared with a candidate's team only once an introduction is actually made.</p>
      </div>
      <div class="acct-section-fields">
        <div class="lf" style="width:100%">
          <div class="acct-field-row">
            <div><label>Your name *</label><input type="text" id="hra-nm"></div>
            <div><label>Phone *</label><input type="tel" id="hra-ph"></div>
          </div>
        </div>
        <button class="btn-lf-submit" style="width:auto;padding:0 22px" onclick="saveHRAccountEdit()">Save</button>
      </div>
    </div>

    <div class="acct-section">
      <div class="acct-section-head">
        <h3>Company information</h3>
        <p>Where you work and what industry you're in — shown to our team, never on a public page.</p>
      </div>
      <div class="acct-section-fields">
        <div class="lf" style="width:100%">
          <div><label>Company *</label><input type="text" id="hra-co"></div>
          <div class="acct-field-row" style="margin-top:14px">
            <div><label>Industry *</label><select id="hra-ind">${HR_INDUSTRIES.map(x=>`<option>${x}</option>`).join('')}</select></div>
            <div><label>City *</label><input type="text" id="hra-city"></div>
          </div>
        </div>
        <button class="btn-lf-submit" style="width:auto;padding:0 22px" onclick="saveHRAccountEdit()">Save</button>
      </div>
    </div>

    <div class="acct-section">
      <div class="acct-section-head">
        <h3>Email address</h3>
        <p>Used to sign in. Contact us if you ever need this changed.</p>
      </div>
      <div class="acct-section-fields">
        <div class="lf" style="width:100%"><label>Email</label><input type="email" value="${u.email||''}" disabled style="opacity:.6;cursor:not-allowed"></div>
      </div>
    </div>

    <hr class="acct-hr">
    <div class="acct-danger" style="border:1px solid rgba(197,64,54,.3);border-radius:10px;padding:18px 20px">
      <h2 style="font-size:15px;margin-bottom:4px">Delete account</h2>
      <p style="font-size:12.5px;color:var(--ink-4);margin:0 0 14px">This permanently removes your account and cannot be undone.</p>
      <button onclick="confirmDeleteHRAccount()" style="padding:9px 20px;background:transparent;border:1.5px solid #e57373;border-radius:8px;font-family:var(--sans);font-size:12.5px;color:#c62828;cursor:pointer">Delete my account</button>
    </div>
  `;
  // Set via .value, not interpolated into the HTML above -- avoids a
  // stray quote/ampersand in a name or company ever breaking the markup.
  document.getElementById('hra-nm').value=u.name||'';
  document.getElementById('hra-ph').value=u.phone||'';
  document.getElementById('hra-co').value=u.company||'';
  document.getElementById('hra-city').value=u.city||'';
  const sel=document.getElementById('hra-ind');
  for(let i=0;i<sel.options.length;i++){if(sel.options[i].value===u.industry){sel.selectedIndex=i;break;}}
}

// Which candidates this specific HR account has actually sent an
// enquiry about ("I'm Interested") -- filtered by their own email, not
// the site-wide unfiltered list the (separate, older) Enquiries page
// shows. hr_enquiries' Firestore rule already allows any signed-in
// read, so this where() is just for relevance, not security.
function loadHRAccountEnquiries(email){
  const el=document.getElementById('hr-acct-enquiries');
  const rowsHTML=(snap)=>snap.docs.map(d=>{
    const e=d.data();
    return `<div style="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)">
      <div>
        <div style="font-size:13.5px;font-weight:700;color:var(--ink)">${e.candidateName||'—'}</div>
        <div style="font-size:11.5px;color:var(--ink-3);margin-top:2px">${e.candidateSectors||''}${e.candidateLocation?' · '+e.candidateLocation:''}</div>
      </div>
      <div style="font-size:11px;color:var(--ink-4);white-space:nowrap">${e.time||''}</div>
    </div>`;
  }).join('');
  db.collection('hr_enquiries').where('hrEmail','==',email).orderBy('savedAt','desc').get()
    .then(snap=>{
      el.innerHTML=snap.empty?'<p style="font-size:13px;color:var(--ink-4)">You haven\'t expressed interest in anyone yet.</p>':rowsHTML(snap);
    })
    .catch(()=>{
      // Firestore needs a composite index for a where()+orderBy() on two
      // different fields the first time this runs -- if that hasn't been
      // created yet, fall back to an unordered read rather than showing
      // nothing.
      db.collection('hr_enquiries').where('hrEmail','==',email).get().then(snap=>{
        el.innerHTML=snap.empty?'<p style="font-size:13px;color:var(--ink-4)">You haven\'t expressed interest in anyone yet.</p>':rowsHTML(snap);
      }).catch(()=>{el.innerHTML='<p style="font-size:13px;color:var(--ink-4)">Could not load your enquiries right now.</p>';});
    });
}

function saveHRAccountEdit(){
  const nm=document.getElementById('hra-nm').value.trim();
  const ph=document.getElementById('hra-ph').value.trim();
  const co=document.getElementById('hra-co').value.trim();
  const ind=document.getElementById('hra-ind').value;
  const city=document.getElementById('hra-city').value.trim();
  if(!nm||!ph||!co||!ind||!city){toast('Please fill all fields.');return;}
  const user=auth.currentUser;
  if(!user){toast('Please sign in again.');return;}
  db.collection('hr_accounts').doc(user.uid).update({name:nm,phone:ph,company:co,industry:ind,city:city})
    .then(()=>{
      hrUser={...hrUser,name:nm,phone:ph,company:co,industry:ind,city:city};
      localStorage.setItem('typc_hr_user',JSON.stringify(hrUser));
      updateHRHeader();
      toast('Account updated.');
      renderHRDetailsPanel();
    })
    .catch(()=>toast('Could not save changes — try again.'));
}

function confirmDeleteHRAccount(){
  if(!confirm('Delete your account? This removes your HR profile permanently and cannot be undone.'))return;
  deleteHRAccount();
}
function deleteHRAccount(){
  const user=auth.currentUser;
  if(!user){toast('Please sign in again.');return;}
  const uid=user.uid;
  // Delete the Auth login FIRST, the Firestore profile after -- if
  // deleting the login fails (e.g. requires-recent-login below), the
  // profile is untouched and nothing is left half-deleted. The reverse
  // order could leave a live login with no profile behind it.
  user.delete()
    .then(()=>db.collection('hr_accounts').doc(uid).delete().catch(()=>{}))
    .then(()=>{
      hrUser=null;
      localStorage.removeItem('typc_hr_user');
      showPage('home');
      updateHRHeader();
      render();
      toast('Your account has been deleted.');
    })
    .catch(e=>{
      if(e.code==='auth/requires-recent-login'){promptReauthAndDeleteHR_();}
      else{toast('Could not delete account: '+(e.message||'try again'));}
    });
}
function promptReauthAndDeleteHR_(){
  const pw=prompt('For security, please re-enter your password to confirm deletion:');
  if(!pw)return;
  const user=auth.currentUser;
  const cred=firebase.auth.EmailAuthProvider.credential(user.email,pw);
  user.reauthenticateWithCredential(cred)
    .then(()=>deleteHRAccount())
    .catch(()=>toast('Incorrect password — account not deleted.'));
}

// Pilot phase: any signed-in HR account sees full candidate details --
// no manual review, per Meghna's call. Deliberately not checking
// hrUser.approved here so this also covers accounts created before this
// change (still sitting at approved:false in Firestore from the old
// review step) without needing to hand-fix each one. The `approved`
// field itself is left alone in the data model -- it's the flag the
// post-pilot paid-access gate is expected to reuse, it just isn't
// enforced right now.
function canSeeFull(){return !!hrUser;}

// "Priya Sharma" -> "Priya S." -- enough to recognise a profile you've
// already seen, not enough to identify someone from the public grid.
function maskName(name){
  if(!name)return'Candidate';
  const parts=name.trim().split(/\s+/);
  if(parts.length===1)return parts[0];
  return parts[0]+' '+parts[parts.length-1].charAt(0).toUpperCase()+'.';
}

// Client-side gate only -- hides the dashboard link/page from anyone not
// signed in as one of these accounts, but does NOT by itself protect the
// grievances collection from someone querying Firestore directly via
// devtools. That protection has to be a real Firestore security rule,
// e.g.:
//   match /grievances/{id} {
//     allow read, write: if request.auth != null
//       && request.auth.token.email in
//          ['meghna@tinymiracles.com','rishikesh@tinymiracles.com','pehlikamaitm@gmail.com'];
//   }
// Paste that (adjusted to your actual rules structure) into Firebase
// Console -> Firestore Database -> Rules. Without it, this list is a UI
// convenience, not security.
//
// pehlikamaitm@gmail.com doubles as the /admin dashboard's shared
// staff login (docs/admin/index.html) -- one shared account, one
// shared password, no backend or service-account key needed since it's
// already on this list.
const ADMIN_EMAILS=['meghna@tinymiracles.com','rishikesh@tinymiracles.com','pehlikamaitm@gmail.com'];
function canAccessAdmin(){return !!(hrUser&&hrUser.email&&ADMIN_EMAILS.includes(hrUser.email.toLowerCase()));}

function updateHRHeader(){
  const addBtn=document.getElementById('btn-add-profile');
  // No hamburger-menu link to the grievance dashboard -- that's an
  // internal team tool, reached by a direct bookmarked URL to /admin/,
  // not something to surface in the public nav even conditionally.
  // Hamburger-menu link: "HR Login" when signed out, "My account" once
  // signed in as HR -- was hardcoded to always say "HR Login" and always
  // open the sign-in flow, even for someone already logged in.
  const hrMenuLink=document.getElementById('hdr-hr-link');
  if(hrMenuLink){
    // Keeping data-i18n set (to whichever key currently applies) rather
    // than just writing textContent once means a later language switch
    // -- via applyTranslations() re-scanning every [data-i18n] element --
    // still updates this button correctly instead of leaving it stuck
    // in whatever language it was in at login. t() falls back to the
    // English string if i18n.js hasn't loaded for some reason.
    const key=hrUser?'menu_myaccount':'menu_hrlogin';
    hrMenuLink.setAttribute('data-i18n',key);
    hrMenuLink.textContent=typeof t==='function'?t(key):(hrUser?'My account':'Sign in');
    hrMenuLink.onclick=hrUser?(()=>{openHRAccount();toggleHdrMenu();}):(()=>{openSignIn();toggleHdrMenu();});
  }
  // "Upload your profile" makes no sense once you're signed in as HR --
  // this used to live inside a branch gated on a header button
  // (#btn-hr-login) that doesn't exist in the current header markup, so
  // it silently never ran and the button just sat there regardless of
  // being signed in as HR. Setting it directly here instead.
  if(addBtn)addBtn.style.display=hrUser?'none':'';
  updateRoleNav();
  // Runs after that so, once HR signs out, updateYouthHeader() gets a
  // chance to put the button back to whichever state youth login left
  // it in (it's a no-op whenever hrUser is set).
  updateYouthHeader();
}

// Once someone is signed in as one role, nav aimed at the OTHER role is
// just noise -- a signed-in youth isn't here to hire anyone (they're the
// fresher), and a signed-in HR contact isn't job-hunting. Hidden rather
// than relabelled, so a signed-out visitor still sees both. Called from
// both updateHRHeader() and updateYouthHeader() since either a youth or
// an HR login/logout can flip which side should be hidden, and the two
// functions aren't always called together.
function updateRoleNav(){
  const hireTab=document.getElementById('nl-home');       // "Hire a fresher" -- HR-facing
  const kaamTab=document.getElementById('nl-addprofile');  // "Kaam chahiye" -- youth-facing
  const hrLink=document.getElementById('hdr-hr-link');     // "Sign in" (HR) entry point
  const kaamCta=document.querySelector('.fi-cta.ghost');   // hero's "Naukri dhoond rahe ho?"
  // "Candidates" is HR's browse-the-directory page -- a signed-in youth
  // has no reason to be in there, they're the ones being browsed.
  const candTab=document.getElementById('nl-candidates');
  const browseCta=document.getElementById('hero-browse-cta'); // hero's "Browse profiles"
  const footerCandLink=document.getElementById('footer-candidates-link');
  if(hireTab)hireTab.style.display=currentYtAcct?'none':'';
  if(hrLink)hrLink.style.display=currentYtAcct?'none':'';
  if(candTab)candTab.style.display=currentYtAcct?'none':'';
  if(browseCta)browseCta.style.display=currentYtAcct?'none':'';
  if(footerCandLink)footerCandLink.style.display=currentYtAcct?'none':'';
  if(kaamTab)kaamTab.style.display=hrUser?'none':'';
  if(kaamCta)kaamCta.style.display=hrUser?'none':'';
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
/* The public "sectors" figure, used by BOTH the hero and Our story so the two
   pages can never disagree again.

   Deliberately NOT new Set(DATA.map(d=>d.sector)).size -- that returns 24, but
   they are 24 spellings of roughly nine things: Retail / Retail & Fashion /
   Retail & Sales / Sales / Sales & Marketing are one sector typed five ways,
   Admin / Admin & Data Entry / Office Work another, Hospitality / Hotel Front
   Desk another, and "Open to All" is not a sector at all. Publishing 24+ would
   have put an inflated claim on two pages instead of one.
   Change this single number, or swap in a real canonical grouping, once the
   sector labels in the data are tidied up. */
const SECTORS_CLAIM = 10;

function updateAboutStats(){
  const set=(id,val,suffix)=>setStat(document.getElementById(id),val,suffix);
  set('ab-tot',  DATA.length);
  set('ab-res',  DATA.filter(d=>d.resume).length);
  set('ab-sec',  SECTORS_CLAIM, '+');
  set('hero-sec',SECTORS_CLAIM, '+');
  set('s-tot',   DATA.length);
  set('d-tot',   DATA.length);
  set('hiw-tot', DATA.length);
  set('hero-tot',DATA.length);
  // Pick up stats whose numbers are written in the markup rather than set
  // from DATA (the hero's "10+"), so every figure counts, not just the
  // data-driven ones. Runs after the above so it never re-reads a stat
  // mid-animation and mistakes the current frame for the real total.
  adoptStaticStats();
}

/* Count a stat up from zero, but ONLY the first time. updateAboutStats() runs
   again whenever mergeFirestoreCandidates() resolves, and re-animating on every
   data refresh would make the hero number visibly flicker back to 0. After the
   first run this just assigns the value.
   Honours prefers-reduced-motion by skipping straight to the final number. */
/* ── counting stats ──────────────────────────────────────────────────────
   Every figure on the home page and Our story counts up when it scrolls
   into view, and counts again each time you scroll away and back.

   The target lives on the element as data-count-to rather than being
   captured in a closure, because updateAboutStats() runs again whenever
   mergeFirestoreCandidates() resolves -- an in-flight animation re-reads
   the value each frame and lands on the real total instead of a stale one. */
const STAT_DUR = 900;

function statPaint(el, n){
  el.textContent = n + (el.dataset.countSuffix || '');
}

function statCanAnimate(){
  // rAF does not fire in a background tab: the loop would freeze on frame one
  // and paint the starting number forever. Reduced motion opts out too.
  if(document.hidden) return false;
  return !(window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches);
}

function setStat(el, value, suffix){
  if(!el) return;
  const n = Number(value) || 0;
  el.dataset.countTo = String(n);
  el.dataset.countSuffix = suffix || '';
  if(!el.dataset.countWired){
    el.dataset.countWired = '1';
    if(statObserver) statObserver.observe(el); else statPaint(el, n);
  }
  // Don't stamp over a running count -- it re-reads the target itself.
  if(!el.dataset.countRunning) statPaint(el, n);
}

/* Numbers written straight into the markup, e.g. the hero's "10+".
   Anything non-numeric ("Mumbai") is skipped rather than counted to 0. */
function adoptStaticStats(){
  document.querySelectorAll('.fi-hero-stat-n, .stat-n').forEach(el=>{
    if(el.dataset.countWired) return;
    const m = (el.textContent || '').trim().match(/^(\d[\d,]*)(\D*)$/);
    if(!m) return;
    setStat(el, Number(m[1].replace(/,/g,'')), m[2]);
  });
}

function statAnimate(el){
  const target = Number(el.dataset.countTo) || 0;
  if(target <= 0 || !statCanAnimate()){ statPaint(el, target); return; }
  el.dataset.countRunning = '1';
  const t0 = performance.now();
  (function tick(now){
    const live = Number(el.dataset.countTo) || 0;
    const p = Math.min(1, (now - t0) / STAT_DUR);
    const eased = 1 - Math.pow(1 - p, 3);   // ease-out cubic
    // Start at 1 rather than 0, and pin the final frame to the exact target
    // so a rounding step can never leave it one short.
    statPaint(el, p < 1 ? Math.max(1, Math.round(eased * live)) : live);
    if(p < 1) requestAnimationFrame(tick);
    else delete el.dataset.countRunning;
  })(t0);
}

/* Two thresholds on purpose: fire the count at 50% visible so it is not
   already finished by the time it reaches the eye, but only rewind at 0 --
   fully off-screen -- so nobody ever sees a figure snap back to 1. */
const statObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.intersectionRatio >= 0.5){
          if(!e.target.dataset.countRunning) statAnimate(e.target);
        } else if(e.intersectionRatio === 0 && !e.target.dataset.countRunning){
          statPaint(e.target, 1);   // armed to count again on the way back
        }
      });
    }, {threshold:[0, 0.5]})
  : null;
function boot(){
  buildChips();render();updateEnqBadge();updateAboutStats();
  updateHRHeader();
  handleReturnFromReset();
  mergeFirestoreCandidates();
  const holder=document.getElementById('shutterHolder');
  if(holder && !holder.querySelector('pk-shutter')){
    const s=document.createElement('pk-shutter'); s.setAttribute('h','840');
    holder.appendChild(s);
  }
  startShutterLoop();
  const heroVid=document.querySelector('.fi-hero-video');
  if(heroVid) heroVid.playbackRate=0.6;

  // Sector cards + every .reveal / .reveal-stagger section replay their
  // fade+rise+blur animation EVERY time they cross into view -- scrolling
  // down past a section and then back up over it plays it again both
  // ways, instead of the old fire-once-then-forget behaviour. Skips
  // prefers-reduced-motion via the CSS guard (that just shows everything
  // in its final state, no class-toggling needed there).
  const sectorCards=document.querySelectorAll('.fi-sector-card');
  const revealEls=document.querySelectorAll('.reveal, .reveal-stagger');
  if('IntersectionObserver' in window){
    const replay=(entries)=>{
      entries.forEach(e=>{
        e.target.classList.toggle('in-view', e.isIntersecting);
      });
    };
    if(sectorCards.length){
      const io=new IntersectionObserver(replay,{threshold:0.2});
      sectorCards.forEach(c=>io.observe(c));
    }
    if(revealEls.length){
      const rio=new IntersectionObserver(replay,{threshold:0.15});
      revealEls.forEach(el=>rio.observe(el));
    }
  } else {
    sectorCards.forEach(c=>c.classList.add('in-view'));
    revealEls.forEach(el=>el.classList.add('in-view'));
  }
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

