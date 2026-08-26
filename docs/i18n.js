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
    menu_hrlogin: 'Sign in',
    menu_myaccount: 'My account',
    menu_contact: 'Contact Us',
    menu_report: 'Report a concern',
    hero_lede: "Need college students for a short-term survey? A hospitality hire that's a quick learner? A data entry operator who'll actually show up? Our candidates span accounting, data entry, hospitality, sales, creative media, and more.",
    hero_stat_candidates: 'Candidates',
    hero_stat_sectors: 'Sectors',
    hero_stat_based: 'Based',
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
    menu_hrlogin: 'साइन इन करें',
    menu_myaccount: 'मेरा अकाउंट',
    menu_contact: 'हमसे संपर्क करें',
    menu_report: 'शिकायत दर्ज करें',
    hero_lede: 'किसी छोटी अवधि के सर्वे के लिए कॉलेज स्टूडेंट्स चाहिए? कोई हॉस्पिटैलिटी हायर जो जल्दी सीख ले? डेटा एंट्री ऑपरेटर जो वाकई समय पर आए? हमारे उम्मीदवार अकाउंटिंग, डेटा एंट्री, हॉस्पिटैलिटी, सेल्स, क्रिएटिव मीडिया और भी बहुत कुछ में हैं।',
    hero_stat_candidates: 'उम्मीदवार',
    hero_stat_sectors: 'क्षेत्र',
    hero_stat_based: 'स्थित',
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
    menu_hrlogin: 'साइन इन करा',
    menu_myaccount: 'माझं अकाउंट',
    menu_contact: 'आमच्याशी संपर्क करा',
    menu_report: 'तक्रार नोंदवा',
    hero_lede: 'एखाद्या छोट्या सर्वेसाठी कॉलेज स्टुडंट्स हवेत? पटकन शिकणारा हॉस्पिटॅलिटी स्टाफ हवाय? डेटा एंट्री ऑपरेटर जो खरंच वेळेवर येईल? आमचे उमेदवार अकाउंटिंग, डेटा एंट्री, हॉस्पिटॅलिटी, सेल्स, क्रिएटिव्ह मीडिया आणि बरंच काही यात आहेत.',
    hero_stat_candidates: 'उमेदवार',
    hero_stat_sectors: 'क्षेत्रं',
    hero_stat_based: 'स्थित',
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
    footer_report: 'तक्रार नोंदवा →',
    footer_browse_label: 'प्रोफाइल्स पाहा',
  },
};

const LANG_NAMES = { en: 'EN', hi: 'हिं', mr: 'मर' };

function getLang(){ return localStorage.getItem('pk_lang') || 'en'; }

function t(key){
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
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
      el.innerHTML = t(key).replace('{{TOT}}', '<span id="hiw-tot">'+totVal+'</span>');
      return;
    }
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
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
