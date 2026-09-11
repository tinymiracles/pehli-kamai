/**
 * Pehli Kamai — language switcher (EN / Hindi / Marathi)
 *
 * First pass: the home page (nav, hero, how-it-works, sector cards,
 * search bar, footer) -- the part everyone sees first, translated
 * completely rather than half-covering the whole site. Forms, legal
 * pages, and the candidate profile page have a lot more text and are
 * a deliberate follow-up, not missed.
 *
 * How it works: static text elements carry a data-i18n="key" attribute
 * (data-i18n-placeholder="key" for input placeholders); applyTranslations()
 * walks the DOM once per language switch and sets each one's text from
 * the TRANSLATIONS table below. "Pehli Kamai" itself, and any other
 * brand/proper noun, is deliberately left untagged -- a brand name
 * doesn't get translated any more than "Google" would.
 *
 * One special case: the "You browse" step's candidate count is a live
 * number (DATA.length), not static text, so it can't just be a plain
 * data-i18n string -- see the {{TOT}} handling in applyTranslations().
 */
const TRANSLATIONS = {
  en: {
    nav_hire: 'Hire a fresher',
    nav_how: 'How it works',
    nav_candidates: 'Candidates',
    nav_kaam: 'Kaam chahiye',
    nav_story: 'Our story',
    btn_upload: 'Upload your profile',
    menu_browse: 'Browse',
    menu_hrlogin: 'Sign in',
    menu_myaccount: 'My account',
    menu_contact: 'Contact Us',
    menu_report: 'Report a concern',
    hero_lede: "Need college students for a short-term survey? A hospitality hire that's a quick learner? A data entry operator who'll actually show up? Our candidates span accounting, data entry, hospitality, sales, creative media, and more.",
    hero_stat_candidates: 'Candidates',
    hero_stat_sectors: 'Sectors',
    hero_stat_based: 'Based',
    hero_backed: 'Backed by',
    hero_cta_browse: 'Browse profiles →',
    hero_cta_kaam: 'Naukri dhoond rahe ho? →',
    hiw_quote: '"How it works is simple. You browse profiles. You pick who you like. We make the introduction — and we stay in the loop until the candidate\'s first day, and after."',
    step1_title: 'You browse',
    step1_desc: 'Search {{TOT}} fresher profiles by sector, location, or availability.',
    step2_title: 'You pick',
    step2_desc: 'Pick the candidates you want to talk to. Download the list.',
    step3_title: 'We introduce',
    step3_desc: 'We make the introduction and set up the first conversation.',
    step4_desc: "We stay in the loop until the candidate's first day, and after.",
    sectors_label: 'Jobs across every sector',
    sectors_h2: 'Every kind of job, one portal',
    sectors_p: "Shop floors, back-offices, clinics, workshops — whatever the job looks like, we've got candidates ready for it: accounting, data entry, hospitality, sales, technical trades, and more.",
    sector1_tag: 'Retail & Sales',
    sector1_h3: 'On the shop floor',
    sector1_p: 'Counter sales, stock handling, and customer-facing roles across retail chains.',
    sector2_tag: 'Office & Data Entry',
    sector2_h3: 'Back-office & ops',
    sector2_p: 'Data entry, accounting support, and administrative roles in real offices.',
    sector3_tag: 'Technical & Healthcare-support',
    sector3_h3: 'Skilled & service roles',
    sector3_p: 'Technical trades and healthcare-support attendants, trained and ready.',
    search_placeholder: 'Search…',
    search_all_locations: 'All locations',
    footer_desc: "Connecting Mumbai's youth with their first real opportunity. We work with young people from underserved communities to find dignified employment.",
    footer_explore: 'Explore',
    footer_home: 'Home',
    footer_about: 'About Us',
    footer_contact_label: 'Contact',
    footer_send_message: 'Send us a message →',
    footer_legal_label: 'Legal',
    footer_privacy: 'Privacy Policy',
    footer_cookies: 'Cookies',
    nav_stories: 'Success Stories',
    nav_journey: 'Training Journey',
    menu_freetraining: 'Free Training',
    menu_helpfaq: 'Help & FAQ',
    af_about_you: 'About you',
    af_fullname: 'Full name *',
    af_area: 'Area / Neighbourhood *',
    af_education: 'Education *',
    af_select: 'Select...',
    af_10th: '10th Pass',
    af_12th: '12th Pass',
    af_graduate: 'Graduate',
    af_postgrad: 'Post Graduate',
    af_diploma: 'Diploma',
    af_school: 'School / College',
    af_year: 'Year of passing',
    af_sector: 'Sector *',
    af_skills: 'Your skills *',
    af_languages: 'Languages',
    af_lookingfor: 'What kind of work are you looking for? *',
    af_no: 'No',
    af_yes: 'Yes',
    af_company_place: 'Company / Place',
    af_howlong: 'How long?',
    af_whatdid: 'What did you do there?',
    af_org_cause: 'Organisation / Cause',
    af_create_account: 'Create your account',
    af_password: 'Password *',
    af_confirm_pw: 'Confirm password *',
    af_submit: 'Generate my resume & save',
    si_hr: 'HR / Employer',
    si_youth: 'Youth',
    si_workemail: 'Work email *',
    si_signin: 'Sign in',
    si_forgot: 'Forgot password?',
    si_createone: 'Create one',
    si_yourname: 'Your name *',
    si_phone: 'Phone *',
    si_company: 'Company *',
    si_industry: 'Industry *',
    si_city: 'City *',
    si_create_account: 'Create account',
    si_email: 'Email',
    si_pw: 'Password',
    si_login: 'Login',
    si_addprofile: 'Add my profile',
    footer_terms: 'Terms & Conditions',
    footer_grievance: 'Grievance Redressal',
    footer_report: 'Report a concern →',
    footer_browse_label: 'Browse profiles',
  },
  hi: {
    nav_hire: 'फ्रेशर को नौकरी दें',
    nav_how: 'यह कैसे काम करता है',
    nav_candidates: 'उम्मीदवार',
    nav_kaam: 'काम चाहिए',
    nav_story: 'हमारी कहानी',
    btn_upload: 'अपनी प्रोफ़ाइल अपलोड करें',
    menu_browse: 'देखें',
    menu_hrlogin: 'साइन इन करें',
    menu_myaccount: 'मेरा अकाउंट',
    menu_contact: 'हमसे संपर्क करें',
    menu_report: 'शिकायत दर्ज करें',
    hero_lede: 'किसी छोटी अवधि के सर्वे के लिए कॉलेज स्टूडेंट्स चाहिए? कोई हॉस्पिटैलिटी हायर जो जल्दी सीख ले? डेटा एंट्री ऑपरेटर जो वाकई समय पर आए? हमारे उम्मीदवार अकाउंटिंग, डेटा एंट्री, हॉस्पिटैलिटी, सेल्स, क्रिएटिव मीडिया और भी बहुत कुछ में हैं।',
    hero_stat_candidates: 'उम्मीदवार',
    hero_stat_sectors: 'क्षेत्र',
    hero_stat_based: 'स्थित',
    // NEEDS A NATIVE CHECK -- Hindi/Marathi put the postposition AFTER the
    // name ("Tiny Miracles द्वारा"), so this label sitting BEFORE the logo
    // may read oddly. Flagged rather than guessed at silently.
    hero_backed: 'समर्थन',
    hero_cta_browse: 'प्रोफ़ाइल देखें →',
    hero_cta_kaam: 'नौकरी ढूंढ रहे हो? →',
    hiw_quote: '"यह कैसे काम करता है, बहुत आसान है। आप प्रोफ़ाइल देखते हैं। आप जिसे पसंद करें उसे चुनते हैं। हम मुलाकात कराते हैं — और उम्मीदवार के पहले दिन तक, और उसके बाद भी हम साथ रहते हैं।"',
    step1_title: 'आप देखते हैं',
    step1_desc: 'क्षेत्र, स्थान या उपलब्धता के अनुसार {{TOT}} फ्रेशर प्रोफ़ाइल खोजें।',
    step2_title: 'आप चुनते हैं',
    step2_desc: 'जिन उम्मीदवारों से बात करना चाहें, उन्हें चुनें। लिस्ट डाउनलोड करें।',
    step3_title: 'हम मिलवाते हैं',
    step3_desc: 'हम मुलाकात कराते हैं और पहली बातचीत तय करते हैं।',
    step4_desc: 'हम उम्मीदवार के पहले दिन तक, और उसके बाद भी साथ रहते हैं।',
    sectors_label: 'हर क्षेत्र में नौकरियां',
    sectors_h2: 'हर तरह की नौकरी, एक पोर्टल',
    sectors_p: 'दुकान, बैक-ऑफिस, क्लीनिक, वर्कशॉप — नौकरी जैसी भी हो, हमारे पास उसके लिए तैयार उम्मीदवार हैं: अकाउंटिंग, डेटा एंट्री, हॉस्पिटैलिटी, सेल्स, टेक्निकल ट्रेड्स और भी बहुत कुछ।',
    sector1_tag: 'रिटेल और सेल्स',
    sector1_h3: 'दुकान में काम',
    sector1_p: 'काउंटर सेल्स, स्टॉक हैंडलिंग, और रिटेल चेन में ग्राहकों से जुड़े काम।',
    sector2_tag: 'ऑफिस और डेटा एंट्री',
    sector2_h3: 'बैक-ऑफिस और ऑपरेशंस',
    sector2_p: 'डेटा एंट्री, अकाउंटिंग सपोर्ट, और ऑफिस में एडमिनिस्ट्रेटिव काम।',
    sector3_tag: 'टेक्निकल और हेल्थकेयर-सपोर्ट',
    sector3_h3: 'स्किल्ड और सर्विस रोल्स',
    sector3_p: 'टेक्निकल ट्रेड्स और हेल्थकेयर-सपोर्ट अटेंडेंट, ट्रेंड और तैयार।',
    search_placeholder: 'खोजें…',
    search_all_locations: 'सभी स्थान',
    footer_desc: 'मुंबई के युवाओं को उनका पहला असली मौका दिलाना। हम वंचित समुदायों के युवाओं के साथ मिलकर उन्हें सम्मानजनक रोज़गार दिलाने का काम करते हैं।',
    footer_explore: 'एक्सप्लोर करें',
    footer_home: 'होम',
    footer_about: 'हमारे बारे में',
    footer_contact_label: 'संपर्क',
    footer_send_message: 'हमें मैसेज भेजें →',
    footer_legal_label: 'कानूनी',
    footer_privacy: 'प्राइवेसी पॉलिसी',
    footer_terms: 'नियम और शर्तें',
    footer_cookies: 'कुकीज़',
    nav_stories: 'सफलता की कहानियाँ',
    nav_journey: 'ट्रेनिंग जर्नी',
    menu_freetraining: 'मुफ़्त ट्रेनिंग',
    menu_helpfaq: 'मदद और सवाल-जवाब',
    af_about_you: 'आपके बारे में',
    af_fullname: 'पूरा नाम *',
    af_area: 'इलाका / मोहल्ला *',
    af_education: 'पढ़ाई *',
    af_select: 'चुनें...',
    af_10th: '10वीं पास',
    af_12th: '12वीं पास',
    af_graduate: 'ग्रेजुएट',
    af_postgrad: 'पोस्ट ग्रेजुएट',
    af_diploma: 'डिप्लोमा',
    af_school: 'स्कूल / कॉलेज',
    af_year: 'पास होने का साल',
    af_sector: 'क्षेत्र *',
    af_skills: 'आपके हुनर *',
    af_languages: 'भाषाएँ',
    af_lookingfor: 'आप किस तरह का काम ढूंढ रहे हैं? *',
    af_no: 'नहीं',
    af_yes: 'हाँ',
    af_company_place: 'कंपनी / जगह',
    af_howlong: 'कितने समय?',
    af_whatdid: 'वहाँ आपने क्या काम किया?',
    af_org_cause: 'संस्था / काम',
    af_create_account: 'अपना अकाउंट बनाएँ',
    af_password: 'पासवर्ड *',
    af_confirm_pw: 'पासवर्ड दोबारा डालें *',
    af_submit: 'मेरा रिज़्यूमे बनाएँ और सेव करें',
    si_hr: 'एचआर / नियोक्ता',
    si_youth: 'युवा',
    si_workemail: 'ऑफिस ईमेल *',
    si_signin: 'साइन इन करें',
    si_forgot: 'पासवर्ड भूल गए?',
    si_createone: 'नया बनाएँ',
    si_yourname: 'आपका नाम *',
    si_phone: 'फ़ोन *',
    si_company: 'कंपनी *',
    si_industry: 'इंडस्ट्री *',
    si_city: 'शहर *',
    si_create_account: 'अकाउंट बनाएँ',
    si_email: 'ईमेल',
    si_pw: 'पासवर्ड',
    si_login: 'लॉगिन',
    si_addprofile: 'मेरी प्रोफ़ाइल जोड़ें',
    footer_grievance: 'शिकायत निवारण',
    footer_report: 'शिकायत दर्ज करें →',
    footer_browse_label: 'प्रोफ़ाइल देखें',
  },
  mr: {
    nav_hire: 'फ्रेशरला कामावर घ्या',
    nav_how: 'हे कसं चालतं',
    nav_candidates: 'उमेदवार',
    nav_kaam: 'काम पाहिजे',
    nav_story: 'आमची गोष्ट',
    btn_upload: 'तुमची प्रोफाइल अपलोड करा',
    menu_browse: 'पहा',
    menu_hrlogin: 'साइन इन करा',
    menu_myaccount: 'माझं अकाउंट',
    menu_contact: 'आमच्याशी संपर्क करा',
    menu_report: 'तक्रार नोंदवा',
    hero_lede: 'एखाद्या छोट्या सर्वेसाठी कॉलेज स्टुडंट्स हवेत? पटकन शिकणारा हॉस्पिटॅलिटी स्टाफ हवाय? डेटा एंट्री ऑपरेटर जो खरंच वेळेवर येईल? आमचे उमेदवार अकाउंटिंग, डेटा एंट्री, हॉस्पिटॅलिटी, सेल्स, क्रिएटिव्ह मीडिया आणि बरंच काही यात आहेत.',
    hero_stat_candidates: 'उमेदवार',
    hero_stat_sectors: 'क्षेत्रं',
    hero_stat_based: 'स्थित',
    hero_backed: 'पाठिंबा',
    hero_cta_browse: 'प्रोफाइल्स पाहा →',
    hero_cta_kaam: 'नोकरी शोधताय? →',
    hiw_quote: '"हे कसं चालतं, अगदी सोपं आहे. तुम्ही प्रोफाइल्स पाहता. तुम्हाला आवडेल त्याला निवडता. आम्ही ओळख करून देतो — आणि उमेदवाराच्या पहिल्या दिवसापर्यंत, आणि नंतरही आम्ही सोबत असतो."',
    step1_title: 'तुम्ही पाहता',
    step1_desc: 'क्षेत्र, ठिकाण किंवा उपलब्धतेनुसार {{TOT}} फ्रेशर प्रोफाइल्स शोधा.',
    step2_title: 'तुम्ही निवडता',
    step2_desc: 'ज्यांच्याशी बोलायचं आहे ते उमेदवार निवडा. लिस्ट डाउनलोड करा.',
    step3_title: 'आम्ही ओळख करून देतो',
    step3_desc: 'आम्ही ओळख करून देतो आणि पहिलं संभाषण ठरवतो.',
    step4_desc: 'आम्ही उमेदवाराच्या पहिल्या दिवसापर्यंत, आणि नंतरही सोबत असतो.',
    sectors_label: 'प्रत्येक क्षेत्रात नोकऱ्या',
    sectors_h2: 'प्रत्येक प्रकारची नोकरी, एक पोर्टल',
    sectors_p: 'दुकानं, बॅक-ऑफिस, क्लिनिक, वर्कशॉप — नोकरी कशीही असो, आमच्याकडे त्यासाठी तयार उमेदवार आहेत: अकाउंटिंग, डेटा एंट्री, हॉस्पिटॅलिटी, सेल्स, टेक्निकल ट्रेड्स आणि बरंच काही.',
    sector1_tag: 'रिटेल आणि सेल्स',
    sector1_h3: 'दुकानात काम',
    sector1_p: 'काउंटर सेल्स, स्टॉक हँडलिंग, आणि रिटेल चेनमध्ये ग्राहकांशी संबंधित काम.',
    sector2_tag: 'ऑफिस आणि डेटा एंट्री',
    sector2_h3: 'बॅक-ऑफिस आणि ऑपरेशन्स',
    sector2_p: 'डेटा एंट्री, अकाउंटिंग सपोर्ट, आणि ऑफिसमधली अॅडमिनिस्ट्रेटिव्ह कामं.',
    sector3_tag: 'टेक्निकल आणि हेल्थकेअर-सपोर्ट',
    sector3_h3: 'स्किल्ड आणि सर्व्हिस रोल्स',
    sector3_p: 'टेक्निकल ट्रेड्स आणि हेल्थकेअर-सपोर्ट अटेंडंट, ट्रेन्ड आणि तयार.',
    search_placeholder: 'शोधा…',
    search_all_locations: 'सर्व ठिकाणं',
    footer_desc: 'मुंबईतील युवकांना त्यांची पहिली खरी संधी मिळवून देणं. आम्ही वंचित समाजातील तरुणांसोबत काम करून त्यांना सन्माननीय रोजगार मिळवून देतो.',
    footer_explore: 'एक्सप्लोर करा',
    footer_home: 'होम',
    footer_about: 'आमच्याबद्दल',
    footer_contact_label: 'संपर्क',
    footer_send_message: 'आम्हाला मेसेज पाठवा →',
    footer_legal_label: 'कायदेशीर',
    footer_privacy: 'प्रायव्हसी पॉलिसी',
    footer_terms: 'अटी व शर्ती',
    footer_grievance: 'तक्रार निवारण',
    footer_cookies: 'कुकीज',
    nav_stories: 'यशोगाथा',
    nav_journey: 'प्रशिक्षण प्रवास',
    menu_freetraining: 'मोफत प्रशिक्षण',
    menu_helpfaq: 'मदत आणि प्रश्न',
    af_about_you: 'तुमच्याबद्दल',
    af_fullname: 'पूर्ण नाव *',
    af_area: 'परिसर *',
    af_education: 'शिक्षण *',
    af_select: 'निवडा...',
    af_10th: '१०वी पास',
    af_12th: '१२वी पास',
    af_graduate: 'पदवीधर',
    af_postgrad: 'पदव्युत्तर',
    af_diploma: 'डिप्लोमा',
    af_school: 'शाळा / कॉलेज',
    af_year: 'उत्तीर्ण वर्ष',
    af_sector: 'क्षेत्र *',
    af_skills: 'तुमची कौशल्ये *',
    af_languages: 'भाषा',
    af_lookingfor: 'तुम्ही कोणत्या प्रकारचे काम शोधत आहात? *',
    af_no: 'नाही',
    af_yes: 'होय',
    af_company_place: 'कंपनी / ठिकाण',
    af_howlong: 'किती काळ?',
    af_whatdid: 'वहोय आपने क्या काम किया?',
    af_org_cause: 'संस्था / कार्य',
    af_create_account: 'तुमचे खाते तयार करा',
    af_password: 'पासवर्ड *',
    af_confirm_pw: 'पासवर्ड पुन्हा टाका *',
    af_submit: 'माझा रेझ्युमे तयार करा आणि सेव्ह करा',
    si_hr: 'एचआर / नियोक्ता',
    si_youth: 'युवा',
    si_workemail: 'ऑफिस ईमेल *',
    si_signin: 'साइन इन करा',
    si_forgot: 'पासवर्ड विसरलात?',
    si_createone: 'नवीन तयार करा',
    si_yourname: 'तुमचे नाव *',
    si_phone: 'फोन *',
    si_company: 'कंपनी *',
    si_industry: 'उद्योग *',
    si_city: 'शहर *',
    si_create_account: 'खाते तयार करा',
    si_email: 'ईमेल',
    si_pw: 'पासवर्ड',
    si_login: 'लॉगिन',
    si_addprofile: 'माझी प्रोफाइल जोडा',
    footer_report: 'तक्रार नोंदवा →',
    footer_browse_label: 'प्रोफाइल्स पाहा',
  },
};

const LANG_NAMES = { en: 'EN', hi: 'हिं', mr: 'मर' };

function getLang(){ return localStorage.getItem('pk_lang') || 'en'; }

/* Returns null when a key exists in no language, rather than the key itself.
   Callers keep whatever text is already in the markup instead of printing a
   raw key at a visitor: a missing footer_cookies entry put the literal string
   "footer_cookies" in the site footer on every page. English copy in the HTML
   is a far better fallback than an identifier. */
function t(key){
  const lang = getLang();
  const v = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key];
  return (typeof v === 'string') ? v : null;
}

function setLang(lang){
  if(!TRANSLATIONS[lang]) return;
  localStorage.setItem('pk_lang', lang);
  applyTranslations();
}

function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(key === 'step1_desc'){
      // The one spot with a live number embedded mid-sentence -- rebuild
      // the counter span rather than losing it to a plain textContent
      // set. #hiw-tot itself is kept updated elsewhere (updateAboutStats);
      // this just needs to exist so that continues to work.
      const totVal = document.getElementById('hiw-tot') ? document.getElementById('hiw-tot').textContent : (typeof DATA!=='undefined'?DATA.length:'');
      const tpl = t(key);
      if(tpl) el.innerHTML = tpl.replace('{{TOT}}', '<span id="hiw-tot">'+totVal+'</span>');
      return;
    }
    const v = t(key);
    // Leave the markup's own text alone when a key is missing.
    if(v !== null) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const v = t(el.getAttribute('data-i18n-placeholder'));
    if(v !== null) el.placeholder = v;
  });
  document.documentElement.lang = getLang();
  document.querySelectorAll('.lang-switch [data-lang]').forEach(btn=>{
    btn.classList.toggle('active', btn.getAttribute('data-lang')===getLang());
  });
}

document.addEventListener('DOMContentLoaded', applyTranslations);
// In case this script runs after DOMContentLoaded already fired (it's
// loaded near the end of body, after the elements it targets exist).
if(document.readyState !== 'loading') applyTranslations();
