/**
 * Pehli Kamai — help chatbot ("Saathi")
 *
 * A SCRIPTED FAQ assistant, in the Myntra/Amazon mould: a menu of
 * pre-written questions, plus keyword matching on anything typed
 * freely. There is no model behind it and that is deliberate — every
 * sentence it can say is written below, so it cannot invent a fee, a
 * placement timeline, or a policy we do not have. For a site whose
 * users are first-time job-seekers, a confident wrong answer about
 * money or documents does real damage.
 *
 * The other half of the design is the handover. When nothing matches
 * with enough confidence, or two answers in a row miss, or the
 * question touches money/safety, it stops guessing and routes to a
 * person: WhatsApp, phone, the contact form, or Report a concern
 * (which is the logged, reference-numbered grievance route).
 *
 * Trilingual EN/HI/MR, following the site's own language switch —
 * an English-only helper on a trilingual site would be a step back.
 * It re-reads getLang() on every open and re-renders on setLang().
 *
 * Self-injecting: index.html only needs the stylesheet and this file.
 * Depends on script.js for showPage/openAdd/openSignIn/openCF/toast/
 * trackEvent, and on i18n.js for getLang — all guarded, so the widget
 * degrades to plain answers rather than throwing if one is missing.
 */
(function () {
  'use strict';

  // ── contact details ──────────────────────────────────────────
  // Single source for the widget. These match the Help page and the
  // Grievance Redressal page; if they change there, change them here.
  var WA_NUM = '919326691744';
  var PHONE_1 = '+91 93266 91744';
  var PHONE_2 = '+91 99204 45917';
  var EMAIL = 'pehlikamaitm@gmail.com';

  // Small helper so every string reads as one line of three languages
  // instead of three parallel tables that drift apart.
  function L(en, hi, mr) { return { en: en, hi: hi, mr: mr }; }

  function lang() {
    try { if (typeof getLang === 'function') return getLang(); } catch (e) {}
    return 'en';
  }
  function say(obj) {
    if (!obj) return '';
    return obj[lang()] || obj.en || '';
  }

  // Safe callers — the widget must never be the thing that breaks the page.
  function call(name, arg) {
    try { if (typeof window[name] === 'function') window[name](arg); } catch (e) {}
  }
  function track(meta) {
    try { if (typeof trackEvent === 'function') trackEvent('chatbot', meta); } catch (e) {}
  }

  // ── UI copy ──────────────────────────────────────────────────
  var UI = {
    name: L('Saathi', 'साथी', 'साथी'),
    sub: L('Pehli Kamai help', 'पहली कमाई सहायता', 'पहली कमाई मदत'),
    launch: L('Need help?', 'मदद चाहिए?', 'मदत हवी?'),
    close: L('Close', 'बंद करें', 'बंद करा'),
    restart: L('Start over', 'फिर से शुरू करें', 'पुन्हा सुरू करा'),
    placeholder: L('Type your question…', 'अपना सवाल लिखें…', 'तुमचा प्रश्न लिहा…'),
    send: L('Send', 'भेजें', 'पाठवा'),
    greet: L(
      'Namaste! I am <b>Saathi</b>, the Pehli Kamai help assistant. Ask me anything, or pick a topic below.',
      'नमस्ते! मैं <b>साथी</b> हूँ, पहली कमाई की सहायक। कुछ भी पूछिए, या नीचे से कोई विषय चुनिए।',
      'नमस्कार! मी <b>साथी</b>, पहली कमाईची मदतनीस. काहीही विचारा, किंवा खालून विषय निवडा.'
    ),
    backTopics: L('⟵ All topics', '⟵ सभी विषय', '⟵ सर्व विषय'),
    more: L('Related questions', 'मिलते-जुलते सवाल', 'संबंधित प्रश्न'),
    pickOne: L('What would you like to know?', 'आप क्या जानना चाहते हैं?', 'तुम्हाला काय जाणून घ्यायचंय?'),
    noMatch: L(
      'Sorry — I do not have a written answer for that one, and I would rather not guess. Our team can answer it properly.',
      'माफ़ कीजिए — इसका लिखा हुआ जवाब मेरे पास नहीं है, और अंदाज़ा लगाना ठीक नहीं होगा। हमारी टीम इसका सही जवाब देगी।',
      'माफ करा — याचं लिहिलेलं उत्तर माझ्याकडे नाही, आणि अंदाज लावणं योग्य होणार नाही. आमची टीम याचं नीट उत्तर देईल.'
    ),
    guess: L(
      'I am not certain I understood. Did you mean one of these?',
      'मुझे पूरा यक़ीन नहीं कि मैं समझी। क्या आपका मतलब इनमें से कुछ था?',
      'मला नीट समजलं का याची खात्री नाही. यापैकी काही म्हणायचं होतं का?'
    ),
    helpful: L('Did that help?', 'क्या इससे मदद मिली?', 'याने मदत झाली का?'),
    yes: L('Yes, thanks', 'हाँ, धन्यवाद', 'हो, धन्यवाद'),
    no: L('No, talk to a person', 'नहीं, किसी व्यक्ति से बात करें', 'नाही, माणसाशी बोला'),
    glad: L(
      'Good. Anything else?',
      'अच्छा लगा। और कुछ?',
      'छान. आणखी काही?'
    ),
    escHead: L('Talk to our team', 'हमारी टीम से बात करें', 'आमच्या टीमशी बोला'),
    escNote: L(
      'We reply to messages within 2 working days. Calls: Mon–Sat, 10am–6pm.',
      'हम 2 कार्य-दिवस के भीतर जवाब देते हैं। कॉल: सोम–शनि, सुबह 10 से शाम 6।',
      'आम्ही 2 कामकाजाच्या दिवसांत उत्तर देतो. कॉल: सोम–शनि, सकाळी 10 ते संध्याकाळी 6.'
    ),
    escWA: L('WhatsApp us', 'व्हाट्सएप करें', 'व्हॉट्सअ‍ॅप करा'),
    escCall: L('Call us', 'कॉल करें', 'कॉल करा'),
    escMail: L('Email us', 'ईमेल करें', 'ईमेल करा'),
    escForm: L('Send a message', 'संदेश भेजें', 'संदेश पाठवा'),
    escFormSub: L('Contact form — we write back', 'संपर्क फ़ॉर्म — हम जवाब देते हैं', 'संपर्क फॉर्म — आम्ही उत्तर देतो'),
    escGriev: L('Report a concern', 'शिकायत दर्ज करें', 'तक्रार नोंदवा'),
    escGrievSub: L(
      'Formal complaint — you get a reference number',
      'औपचारिक शिकायत — आपको संदर्भ संख्या मिलेगी',
      'औपचारिक तक्रार — तुम्हाला संदर्भ क्रमांक मिळेल'
    ),
    legal: L(
      'Saathi gives pre-written answers. For anything personal, ask our team.',
      'साथी पहले से लिखे जवाब देती है। निजी बात के लिए हमारी टीम से पूछें।',
      'साथी आधीच लिहिलेली उत्तरं देते. वैयक्तिक गोष्टींसाठी आमच्या टीमला विचारा.'
    )
  };

  // ── topics ───────────────────────────────────────────────────
  var TOPICS = [
    { id: 'job', icon: '🧰', label: L('I am looking for work', 'मुझे काम चाहिए', 'मला काम हवंय') },
    { id: 'hire', icon: '🏢', label: L('I want to hire', 'मुझे भर्ती करनी है', 'मला भरती करायची आहे') },
    { id: 'account', icon: '👤', label: L('My profile & login', 'मेरी प्रोफ़ाइल और लॉगिन', 'माझं प्रोफाइल आणि लॉगिन') },
    { id: 'privacy', icon: '🔒', label: L('Privacy & safety', 'गोपनीयता और सुरक्षा', 'गोपनीयता आणि सुरक्षा') },
    { id: 'about', icon: 'ℹ️', label: L('About Pehli Kamai', 'पहली कमाई के बारे में', 'पहली कमाईबद्दल') },
    { id: 'human', icon: '💬', label: L('Talk to a person', 'किसी व्यक्ति से बात करें', 'माणसाशी बोला') }
  ];

  // ── the knowledge base ───────────────────────────────────────
  // q  = the question as it appears on a chip
  // a  = the answer (trusted HTML, authored here — never user input)
  // k  = extra match words, including romanised Hindi/Marathi and the
  //      words people actually type ("naukri", "paisa", "kitne din")
  // do = optional action button that takes them to the real page
  // see= related question ids offered after the answer
  var FAQ = [

    // ── looking for work ──────────────────────────────────────
    {
      id: 'j_signup', topic: 'job',
      q: L('How do I create my profile?', 'मैं अपनी प्रोफ़ाइल कैसे बनाऊँ?', 'मी माझं प्रोफाइल कसं बनवू?'),
      k: ['register', 'signup', 'sign up', 'create profile', 'join', 'account banao', 'kaise banaye', 'apply', 'naam likhna', 'registration', 'रजिस्टर', 'प्रोफ़ाइल', 'प्रोफाइल', 'नाम', 'बनाऊ', 'खाते'],
      a: L(
        'Tap <b>Add your profile</b> and sign up with your phone number and email. You answer a few questions — what work you are looking for, your education, your skills, your area. We build a professional resume for you from those answers, so employers see you at your best. It takes about 10 minutes and you can come back and edit it later.',
        '<b>अपनी प्रोफ़ाइल जोड़ें</b> पर टैप करें और अपने फ़ोन नंबर व ईमेल से साइन अप करें। कुछ सवाल पूछे जाएँगे — आपको कैसा काम चाहिए, आपकी पढ़ाई, आपके स्किल, आपका इलाक़ा। इन्हीं जवाबों से हम आपका प्रोफ़ेशनल रेज़्यूमे बना देते हैं, ताकि कंपनियाँ आपको सबसे अच्छे रूप में देखें। इसमें लगभग 10 मिनट लगते हैं और आप बाद में इसे बदल भी सकते हैं।',
        '<b>तुमचं प्रोफाइल जोडा</b> वर टॅप करा आणि तुमचा फोन नंबर व ईमेल वापरून साइन अप करा. काही प्रश्न विचारले जातील — तुम्हाला कोणतं काम हवंय, तुमचं शिक्षण, तुमची कौशल्यं, तुमचा भाग. याच उत्तरांतून आम्ही तुमचा प्रोफेशनल रेझ्युमे तयार करतो, म्हणजे कंपन्यांना तुम्ही उत्तम दिसाल. यासाठी सुमारे 10 मिनिटं लागतात आणि नंतर तुम्ही बदलही करू शकता.'
      ),
      do: { label: L('Create my profile', 'प्रोफ़ाइल बनाएँ', 'प्रोफाइल बनवा'), fn: function () { call('openAdd'); } },
      see: ['j_free', 'j_resume', 'j_who']
    },
    {
      id: 'j_free', topic: 'job',
      q: L('Is it really free? Any hidden cost?', 'क्या यह सच में मुफ़्त है? कोई छुपा खर्च?', 'हे खरंच मोफत आहे का? काही छुपा खर्च?'),
      k: ['free', 'cost', 'fee', 'charge', 'paisa', 'paise', 'money', 'payment', 'muft', 'kitna paisa', 'hidden', 'donation', 'मुफ़्त', 'मोफत', 'पैसा', 'पैसे', 'फीस', 'शुल्क', 'खर्च'],
      a: L(
        'Completely free, and it stays free. No registration fee, no training fee, no commission from your salary, no charge when you get placed. Employers are our paying customers — we earn from them, never from you.<br><br><b>If anyone ever asks you for money to get a job through Pehli Kamai, that is not us.</b> Please report it straight away.',
        'पूरी तरह मुफ़्त, और हमेशा मुफ़्त रहेगा। न रजिस्ट्रेशन फ़ीस, न ट्रेनिंग फ़ीस, न आपकी सैलरी से कमीशन, न नौकरी लगने पर कोई चार्ज। कंपनियाँ हमारी ग्राहक हैं — हम उनसे कमाते हैं, आपसे कभी नहीं।<br><br><b>अगर कोई भी आपसे पहली कमाई के ज़रिए नौकरी दिलाने के लिए पैसे माँगे, तो वह हम नहीं हैं।</b> तुरंत हमें बताइए।',
        'पूर्णपणे मोफत, आणि कायम मोफतच राहील. नोंदणी फी नाही, प्रशिक्षण फी नाही, तुमच्या पगारातून कमिशन नाही, नोकरी लागल्यावर कोणताही चार्ज नाही. कंपन्या आमच्या ग्राहक आहेत — आम्ही त्यांच्याकडून कमावतो, तुमच्याकडून कधीच नाही.<br><br><b>पहली कमाईमार्फत नोकरी देण्यासाठी कोणी तुमच्याकडे पैसे मागितले, तर ते आम्ही नाही.</b> लगेच आम्हाला कळवा.'
      ),
      see: ['j_money', 'h_cost']
    },
    {
      id: 'j_money', topic: 'job',
      q: L('Someone asked me for money or my documents', 'किसी ने मुझसे पैसे या दस्तावेज़ माँगे', 'कोणीतरी माझ्याकडे पैसे किंवा कागदपत्रं मागितली'),
      k: ['asked money', 'demand', 'bribe', 'fraud', 'scam', 'cheat', 'deposit', 'original documents', 'certificate rakha', 'thagi', 'dhokha', 'ठगी', 'धोखा', 'फ्रॉड', 'फसवणूक', 'दस्तावेज', 'कागदपत्र', 'डिपॉजिट'],
      urgent: true,
      a: L(
        'Please tell us immediately. Under our Terms, an employer using Pehli Kamai <b>may never charge a candidate any fee or deposit, and may never keep your original documents.</b> That is a firm condition, not a suggestion.<br><br>Report it below — you will get a reference number, it is logged, and <b>you will not lose access to Pehli Kamai for reporting anything</b>.',
        'कृपया हमें तुरंत बताइए। हमारी शर्तों के अनुसार, पहली कमाई इस्तेमाल करने वाली कोई भी कंपनी <b>उम्मीदवार से कोई फ़ीस या डिपॉज़िट नहीं ले सकती, और आपके असली दस्तावेज़ अपने पास नहीं रख सकती।</b> यह सख़्त शर्त है, सुझाव नहीं।<br><br>नीचे से शिकायत दर्ज करें — आपको संदर्भ संख्या मिलेगी, वह दर्ज हो जाएगी, और <b>शिकायत करने से पहली कमाई पर आपकी पहुँच बिलकुल नहीं जाएगी।</b>',
        'कृपया आम्हाला लगेच सांगा. आमच्या अटींनुसार, पहली कमाई वापरणारी कोणतीही कंपनी <b>उमेदवाराकडून कोणतीही फी किंवा डिपॉझिट घेऊ शकत नाही, आणि तुमची मूळ कागदपत्रं ठेवू शकत नाही.</b> ही कडक अट आहे, सूचना नाही.<br><br>खालून तक्रार नोंदवा — तुम्हाला संदर्भ क्रमांक मिळेल, ती नोंदवली जाईल, आणि <b>तक्रार केल्यामुळे पहली कमाईवरचा तुमचा प्रवेश अजिबात जाणार नाही.</b>'
      ),
      escalate: true
    },
    {
      id: 'j_who', topic: 'job',
      q: L('Who can join? Am I eligible?', 'कौन जुड़ सकता है? क्या मैं योग्य हूँ?', 'कोण सामील होऊ शकतं? मी पात्र आहे का?'),
      k: ['eligible', 'eligibility', 'qualify', 'who can', 'age', 'umar', 'yogya', '10th', '12th', 'graduate', 'iti', 'diploma', 'fail', 'no experience', 'fresher', 'योग्य', 'पात्र', 'उम्र', 'वय', 'पढ़ाई', 'शिक्षण'],
      a: L(
        'Pehli Kamai is for young people in Mumbai looking for their <b>first real job</b> — whether you finished 10th, 12th, ITI, a diploma or a degree. No work experience is needed; that is the whole point. You do not need English, a laptop, or contacts in any company.<br><br>If you are not sure whether you fit, ask our team — they will tell you honestly.',
        'पहली कमाई मुंबई के उन युवाओं के लिए है जो अपनी <b>पहली असली नौकरी</b> ढूँढ रहे हैं — चाहे आपने 10वीं की हो, 12वीं, ITI, डिप्लोमा या डिग्री। काम का तजुर्बा ज़रूरी नहीं है; यही तो बात है। न अंग्रेज़ी चाहिए, न लैपटॉप, न किसी कंपनी में जान-पहचान।<br><br>अगर आपको यक़ीन न हो कि आप फ़िट बैठते हैं, तो हमारी टीम से पूछिए — वे सच बता देंगे।',
        'पहली कमाई मुंबईतील अशा तरुणांसाठी आहे जे त्यांची <b>पहिली खरी नोकरी</b> शोधत आहेत — तुम्ही 10वी, 12वी, ITI, डिप्लोमा किंवा पदवी केली असो. कामाचा अनुभव लागत नाही; तोच तर मुद्दा आहे. इंग्रजी, लॅपटॉप किंवा कंपनीत ओळख — यापैकी काहीही लागत नाही.<br><br>तुम्ही बसता का याची खात्री नसेल, तर आमच्या टीमला विचारा — ते खरं सांगतील.'
      ),
      see: ['j_sectors', 'j_signup']
    },
    {
      id: 'j_sectors', topic: 'job',
      q: L('What kind of jobs are available?', 'किस तरह की नौकरियाँ हैं?', 'कोणत्या प्रकारच्या नोकऱ्या आहेत?'),
      k: ['jobs', 'job types', 'sector', 'role', 'kaam', 'naukri', 'work', 'vacancy', 'kaunsi job', 'field', 'नौकरी', 'काम', 'क्षेत्र', 'नोकरी', 'पद'],
      a: L(
        'Entry-level roles across four tracks:<ul><li><b>Corporate</b> — sales, admin, finance, retail, BPO, IT, customer service, logistics</li><li><b>Social sector</b> — community outreach, teaching, field work, health, environment</li><li><b>Freelance</b> — design, photography, content, events</li><li><b>Services</b> — beauty, food, repairs, maintenance, transport, trades</li></ul>You pick your track when you build your profile.',
        'चार ट्रैक में शुरुआती स्तर की नौकरियाँ:<ul><li><b>कॉर्पोरेट</b> — सेल्स, एडमिन, फ़ाइनेंस, रिटेल, BPO, IT, कस्टमर सर्विस, लॉजिस्टिक्स</li><li><b>सामाजिक क्षेत्र</b> — कम्युनिटी आउटरीच, पढ़ाना, फ़ील्ड वर्क, स्वास्थ्य, पर्यावरण</li><li><b>फ्रीलांस</b> — डिज़ाइन, फ़ोटोग्राफ़ी, कंटेंट, इवेंट</li><li><b>सेवाएँ</b> — ब्यूटी, खाना, रिपेयर, मेंटेनेंस, ट्रांसपोर्ट, ट्रेड</li></ul>प्रोफ़ाइल बनाते समय आप अपना ट्रैक चुनते हैं।',
        'चार ट्रॅकमध्ये सुरुवातीच्या पातळीच्या नोकऱ्या:<ul><li><b>कॉर्पोरेट</b> — सेल्स, अ‍ॅडमिन, फायनान्स, रिटेल, BPO, IT, कस्टमर सर्व्हिस, लॉजिस्टिक्स</li><li><b>सामाजिक क्षेत्र</b> — समुदाय संपर्क, शिकवणं, फील्ड वर्क, आरोग्य, पर्यावरण</li><li><b>फ्रीलान्स</b> — डिझाइन, फोटोग्राफी, कंटेंट, इव्हेंट</li><li><b>सेवा</b> — ब्युटी, खाणं, दुरुस्ती, देखभाल, वाहतूक, कारागिरी</li></ul>प्रोफाइल बनवताना तुम्ही तुमचा ट्रॅक निवडता.'
      ),
      see: ['j_signup', 'j_time']
    },
    {
      id: 'j_salary', topic: 'job',
      q: L('What salary can I expect?', 'मुझे कितनी सैलरी मिल सकती है?', 'मला किती पगार मिळू शकतो?'),
      k: ['salary', 'pay', 'stipend', 'wage', 'income', 'kitni salary', 'tankha', 'pagar', 'per month', 'earning', 'सैलरी', 'तनख्वाह', 'पगार', 'कमाई', 'वेतन'],
      a: L(
        'It depends entirely on the role, the sector and the employer — so we will not quote you a figure we cannot stand behind. What we can promise is that <b>the employer tells you the salary before the interview</b>, so you are never negotiating blind, and <b>Pehli Kamai takes no cut of it, ever</b>.<br><br>If an offer feels unfair or does not match what you were told, tell us and we will take it up with the employer.',
        'यह पूरी तरह पद, क्षेत्र और कंपनी पर निर्भर करता है — इसलिए हम कोई ऐसा आँकड़ा नहीं बताएँगे जिस पर टिक न सकें। हम इतना ज़रूर कहते हैं कि <b>इंटरव्यू से पहले कंपनी आपको सैलरी बता देती है</b>, ताकि आप अंधेरे में बात न करें, और <b>पहली कमाई उसमें से कभी कोई हिस्सा नहीं लेती</b>।<br><br>अगर कोई ऑफ़र ग़लत लगे या जो बताया गया था उससे मेल न खाए, तो हमें बताइए — हम कंपनी से बात करेंगे।',
        'हे पूर्णपणे पद, क्षेत्र आणि कंपनीवर अवलंबून आहे — म्हणून आम्ही असा आकडा सांगणार नाही ज्यावर आम्ही ठाम राहू शकत नाही. एवढं मात्र नक्की की <b>मुलाखतीआधी कंपनी तुम्हाला पगार सांगते</b>, म्हणजे तुम्ही अंधारात बोलत नाही, आणि <b>पहली कमाई त्यातून कधीही वाटा घेत नाही</b>.<br><br>एखादी ऑफर चुकीची वाटली किंवा सांगितल्याप्रमाणे नसेल, तर आम्हाला सांगा — आम्ही कंपनीशी बोलू.'
      ),
      see: ['j_free', 'j_money', 'j_sectors']
    },
    {
      id: 'j_time', topic: 'job',
      q: L('How long until I get a job?', 'नौकरी मिलने में कितना समय लगेगा?', 'नोकरी मिळायला किती वेळ लागेल?'),
      k: ['how long', 'time', 'kitne din', 'kab tak', 'duration', 'wait', 'timeline', 'when', 'कितना समय', 'कब', 'किती वेळ', 'केव्हा', 'दिवस'],
      a: L(
        'There is no fixed timeline, and we will not promise you one. It depends on your profile, your area, and what employers are hiring for right now.<br><br>What we do promise: your profile is seen by every signed-in employer, we actively push it to the ones hiring in your sector, and when someone shows interest we coach you before the interview. Keeping your profile complete and updated makes a real difference.',
        'कोई तय समय-सीमा नहीं है, और हम आपसे झूठा वादा नहीं करेंगे। यह आपकी प्रोफ़ाइल, आपके इलाक़े, और अभी कंपनियाँ किस तरह की भर्ती कर रही हैं — इस पर निर्भर करता है।<br><br>हमारा वादा यह है: आपकी प्रोफ़ाइल हर साइन-इन कंपनी को दिखती है, हम उसे आपके क्षेत्र में भर्ती कर रही कंपनियों तक ख़ुद पहुँचाते हैं, और जब कोई दिलचस्पी दिखाए तो इंटरव्यू से पहले हम आपको तैयार करते हैं। प्रोफ़ाइल पूरी और अपडेटेड रखने से सचमुच फ़र्क़ पड़ता है।',
        'ठरलेली मुदत नाही, आणि आम्ही तुम्हाला खोटं आश्वासन देणार नाही. ते तुमचं प्रोफाइल, तुमचा भाग, आणि सध्या कंपन्या कशासाठी भरती करत आहेत यावर अवलंबून आहे.<br><br>आमचं वचन एवढंच: तुमचं प्रोफाइल प्रत्येक साइन-इन कंपनीला दिसतं, तुमच्या क्षेत्रात भरती करणाऱ्या कंपन्यांपर्यंत आम्ही ते स्वतः पोहोचवतो, आणि कोणी रस दाखवला की मुलाखतीआधी आम्ही तुम्हाला तयार करतो. प्रोफाइल पूर्ण आणि अपडेटेड ठेवल्याने खरोखर फरक पडतो.'
      ),
      see: ['j_nocall', 'j_training']
    },
    {
      id: 'j_nocall', topic: 'job',
      q: L('I have not heard from anyone yet', 'अभी तक किसी का जवाब नहीं आया', 'अजून कोणाचंही उत्तर आलेलं नाही'),
      k: ['no call', 'no response', 'nobody', 'waiting', 'koi call nahi', 'jawab nahi', 'silence', 'rejected', 'kuch nahi hua', 'जवाब नहीं', 'कॉल नहीं', 'उत्तर नाही', 'प्रतीक्षा'],
      a: L(
        'That is frustrating, and it is worth checking three things:<ul><li>Is your profile <b>complete</b>? Half-filled profiles get skipped.</li><li>Are your <b>skills and sector</b> up to date?</li><li>Is your <b>phone number</b> on the profile the one you actually use?</li></ul>If all three are fine and it has been a while, message our team — they can look at your specific profile and tell you what is holding it back.',
        'यह निराशाजनक है, और तीन चीज़ें जाँचने लायक़ हैं:<ul><li>क्या आपकी प्रोफ़ाइल <b>पूरी</b> है? आधी-अधूरी प्रोफ़ाइल छोड़ दी जाती है।</li><li>क्या आपके <b>स्किल और क्षेत्र</b> अपडेटेड हैं?</li><li>क्या प्रोफ़ाइल पर लिखा <b>फ़ोन नंबर</b> वही है जो आप इस्तेमाल करते हैं?</li></ul>अगर तीनों ठीक हैं और काफ़ी वक़्त हो गया है, तो हमारी टीम को संदेश भेजिए — वे आपकी प्रोफ़ाइल देखकर बताएँगे कि कहाँ अटक रहा है।',
        'हे निराशाजनक आहे, आणि तीन गोष्टी तपासण्यासारख्या आहेत:<ul><li>तुमचं प्रोफाइल <b>पूर्ण</b> आहे का? अर्धवट प्रोफाइल वगळली जातात.</li><li>तुमची <b>कौशल्यं आणि क्षेत्र</b> अपडेटेड आहेत का?</li><li>प्रोफाइलवरचा <b>फोन नंबर</b> तुम्ही खरंच वापरता तोच आहे का?</li></ul>तिन्ही ठीक असून बराच वेळ झाला असेल, तर आमच्या टीमला संदेश पाठवा — ते तुमचं प्रोफाइल पाहून काय अडतंय ते सांगतील.'
      ),
      escalate: true
    },
    {
      id: 'j_training', topic: 'job',
      q: L('Do you give training or interview coaching?', 'क्या आप ट्रेनिंग या इंटरव्यू कोचिंग देते हैं?', 'तुम्ही प्रशिक्षण किंवा मुलाखत कोचिंग देता का?'),
      k: ['training', 'coaching', 'interview', 'prepare', 'practice', 'excel', 'english', 'course', 'sikhna', 'seekh', 'ट्रेनिंग', 'प्रशिक्षण', 'इंटरव्यू', 'मुलाखत', 'सिखाना', 'शिकवणं'],
      a: L(
        'Yes, and it is free. Two parts:<ul><li><b>Free resources</b>, open to everyone right now — Excel, workplace communication, intro to AI tools.</li><li><b>One-to-one coaching</b> when an employer shows interest in you — interview etiquette, answering tough questions, workplace expectations, telling your own story well.</li></ul>Many people lose interviews not for lack of skill but because nobody ever showed them how the room works. That is exactly the gap we close.',
        'हाँ, और यह मुफ़्त है। दो हिस्से:<ul><li><b>मुफ़्त संसाधन</b>, अभी सबके लिए खुले — एक्सेल, ऑफ़िस में बातचीत, AI टूल्स का परिचय।</li><li><b>आमने-सामने कोचिंग</b> जब कोई कंपनी आप में दिलचस्पी दिखाए — इंटरव्यू का तौर-तरीक़ा, मुश्किल सवालों के जवाब, ऑफ़िस की अपेक्षाएँ, अपनी कहानी ठीक से कहना।</li></ul>बहुत लोग इंटरव्यू स्किल की कमी से नहीं, बल्कि इसलिए हारते हैं कि किसी ने कभी बताया ही नहीं कि वहाँ होता क्या है। यही खाई हम पाटते हैं।',
        'हो, आणि ते मोफत आहे. दोन भाग:<ul><li><b>मोफत साधनं</b>, आत्ता सर्वांसाठी खुली — एक्सेल, ऑफिसमधलं संभाषण, AI टूल्सची ओळख.</li><li><b>एकास-एक कोचिंग</b> जेव्हा एखादी कंपनी तुमच्यात रस दाखवते — मुलाखतीचे शिष्टाचार, अवघड प्रश्नांची उत्तरं, ऑफिसच्या अपेक्षा, स्वतःची गोष्ट नीट सांगणं.</li></ul>बरेच जण कौशल्य कमी म्हणून नाही, तर तिथे काय चालतं हे कोणी सांगितलंच नाही म्हणून मुलाखत गमावतात. नेमकी हीच दरी आम्ही भरून काढतो.'
      ),
      do: { label: L('See free training', 'मुफ़्त ट्रेनिंग देखें', 'मोफत प्रशिक्षण पहा'), fn: function () { call('showPage', 'training'); } },
      see: ['j_time', 'j_signup']
    },
    {
      id: 'j_resume', topic: 'job',
      q: L('Do I need a resume already?', 'क्या मेरे पास पहले से रेज़्यूमे होना चाहिए?', 'माझ्याकडे आधीच रेझ्युमे हवा का?'),
      k: ['resume', 'cv', 'biodata', 'no resume', 'upload', 'रेज़्यूमे', 'रेझ्युमे', 'बायोडाटा', 'सीवी'],
      a: L(
        'No. If you do not have one, we <b>build it for you</b> from the answers you give while signing up — that is the normal path, not a fallback. If you already have a resume you like, you can upload it instead.',
        'नहीं। अगर आपके पास नहीं है, तो साइन-अप के समय दिए गए जवाबों से हम <b>ख़ुद बना देते हैं</b> — यही आम रास्ता है, कोई मजबूरी नहीं। अगर आपके पास पहले से अच्छा रेज़्यूमे है, तो आप उसे अपलोड कर सकते हैं।',
        'नाही. तुमच्याकडे नसेल, तर साइन-अप करताना दिलेल्या उत्तरांतून आम्ही <b>तो स्वतः बनवतो</b> — हाच नेहमीचा मार्ग आहे, नाइलाज नाही. तुमच्याकडे आधीच चांगला रेझ्युमे असेल, तर तो अपलोड करू शकता.'
      ),
      see: ['j_signup']
    },

    // ── employers ─────────────────────────────────────────────
    {
      id: 'h_start', topic: 'hire',
      q: L('How do I find candidates?', 'मैं उम्मीदवार कैसे ढूँढूँ?', 'मी उमेदवार कसे शोधू?'),
      k: ['hire', 'hiring', 'recruit', 'employer', 'hr', 'find candidates', 'browse', 'company', 'staff', 'भर्ती', 'भरती', 'कंपनी', 'उम्मीदवार', 'उमेदवार'],
      a: L(
        'Create an HR account, sign in, and browse the candidate directory. You can filter by education level (10th, 12th, ITI, graduate), sector, location and skills. Signed-in employers see full profiles; the public only ever sees a masked version.',
        'एक HR अकाउंट बनाइए, साइन इन कीजिए, और उम्मीदवारों की डायरेक्टरी देखिए। आप पढ़ाई के स्तर (10वीं, 12वीं, ITI, ग्रेजुएट), क्षेत्र, जगह और स्किल से छाँट सकते हैं। साइन-इन कंपनियों को पूरी प्रोफ़ाइल दिखती है; आम लोगों को हमेशा छुपाई हुई प्रोफ़ाइल ही दिखती है।',
        'HR खातं तयार करा, साइन इन करा, आणि उमेदवारांची डिरेक्टरी पाहा. तुम्ही शिक्षण पातळी (10वी, 12वी, ITI, पदवीधर), क्षेत्र, ठिकाण आणि कौशल्यांनुसार गाळणी लावू शकता. साइन-इन कंपन्यांना पूर्ण प्रोफाइल दिसतं; सामान्य लोकांना नेहमी झाकलेलंच दिसतं.'
      ),
      do: { label: L('Sign in / register', 'साइन इन / रजिस्टर', 'साइन इन / नोंदणी'), fn: function () { call('openSignIn'); } },
      see: ['h_cost', 'h_interest', 'h_verify']
    },
    {
      id: 'h_cost', topic: 'hire',
      q: L('What does it cost employers?', 'कंपनियों को कितना खर्च आता है?', 'कंपन्यांना किती खर्च येतो?'),
      k: ['employer cost', 'pricing', 'price', 'plan', 'invoice', 'subscription', 'how much', 'company fee', 'कीमत', 'शुल्क', 'किंमत', 'योजना'],
      a: L(
        'Employers are our paying side — that is what keeps Pehli Kamai free for every young person on it. Pricing depends on how you want to hire, so we discuss it directly rather than publish a number that may not fit you. Send us a message and our team will walk you through it.',
        'कंपनियाँ ही भुगतान करने वाला पक्ष हैं — इसी से पहली कमाई हर युवा के लिए मुफ़्त रह पाती है। क़ीमत इस पर निर्भर करती है कि आप कैसे भर्ती करना चाहते हैं, इसलिए हम कोई एक आँकड़ा छापने के बजाय सीधे बात करते हैं। हमें संदेश भेजिए, हमारी टीम आपको पूरी बात समझाएगी।',
        'कंपन्या हीच पैसे देणारी बाजू आहे — त्यामुळेच पहली कमाई प्रत्येक तरुणासाठी मोफत राहते. किंमत तुम्ही कशा प्रकारे भरती करू इच्छिता यावर अवलंबून आहे, म्हणून एक आकडा छापण्याऐवजी आम्ही थेट बोलतो. आम्हाला संदेश पाठवा, आमची टीम सगळं समजावून सांगेल.'
      ),
      do: { label: L('Message the team', 'टीम को संदेश भेजें', 'टीमला संदेश पाठवा'), fn: function () { call('openCF'); } },
      see: ['h_start']
    },
    {
      id: 'h_interest', topic: 'hire',
      q: L('How do I express interest in a candidate?', 'मैं किसी उम्मीदवार में दिलचस्पी कैसे दिखाऊँ?', 'मी एखाद्या उमेदवारात रस कसा दाखवू?'),
      k: ['express interest', 'shortlist', 'contact candidate', 'i want to hire', 'connect', 'reach candidate', 'दिलचस्पी', 'संपर्क', 'रस'],
      a: L(
        'Open the candidate profile and choose <b>Express Interest</b>. We notify you and the candidate at the same time, share their contact details with you, and then help coordinate the interview. The candidate always gets to decide whether to go ahead.',
        'उम्मीदवार की प्रोफ़ाइल खोलिए और <b>Express Interest</b> चुनिए। हम आपको और उम्मीदवार दोनों को एक साथ सूचित करते हैं, उनकी संपर्क जानकारी आपके साथ साझा करते हैं, और फिर इंटरव्यू तय करने में मदद करते हैं। आगे बढ़ना है या नहीं, यह फ़ैसला हमेशा उम्मीदवार का होता है।',
        'उमेदवाराचं प्रोफाइल उघडा आणि <b>Express Interest</b> निवडा. आम्ही तुम्हाला आणि उमेदवाराला एकाच वेळी कळवतो, त्यांची संपर्क माहिती तुमच्याशी शेअर करतो, आणि मग मुलाखत ठरवायला मदत करतो. पुढे जायचं की नाही, हा निर्णय नेहमी उमेदवाराचा असतो.'
      ),
      see: ['h_support', 'h_start']
    },
    {
      id: 'h_support', topic: 'hire',
      q: L('What support do you give around interviews?', 'इंटरव्यू में आप क्या मदद करते हैं?', 'मुलाखतीच्या वेळी तुम्ही काय मदत करता?'),
      k: ['interview support', 'coordination', 'scheduling', 'follow up', 'placement support', 'सहायता', 'मदत', 'समन्वय'],
      a: L(
        'We prepare the candidate before they meet you — interview etiquette, how to speak about their work, what to expect from your workplace. We help schedule, we follow up on the outcome, and we stay in touch after placement so the person actually settles into the role.',
        'आपसे मिलने से पहले हम उम्मीदवार को तैयार करते हैं — इंटरव्यू का तौर-तरीक़ा, अपने काम के बारे में कैसे बोलें, आपके कार्यस्थल से क्या उम्मीद रखें। हम समय तय करने में मदद करते हैं, नतीजे का फ़ॉलो-अप करते हैं, और नौकरी लगने के बाद भी संपर्क में रहते हैं ताकि व्यक्ति सचमुच काम में जम जाए।',
        'तुम्हाला भेटण्याआधी आम्ही उमेदवाराला तयार करतो — मुलाखतीचे शिष्टाचार, स्वतःच्या कामाबद्दल कसं बोलावं, तुमच्या कामाच्या ठिकाणाकडून काय अपेक्षा ठेवाव्यात. वेळ ठरवायला मदत करतो, निकालाचा पाठपुरावा करतो, आणि नोकरी लागल्यावरही संपर्कात राहतो जेणेकरून ती व्यक्ती खरोखर रुळेल.'
      ),
      see: ['h_interest']
    },
    {
      id: 'h_verify', topic: 'hire',
      q: L('Are the candidate profiles verified?', 'क्या उम्मीदवारों की प्रोफ़ाइल जाँची हुई है?', 'उमेदवारांची प्रोफाइल तपासलेली असतात का?'),
      k: ['verified', 'verify', 'genuine', 'authentic', 'background', 'trust', 'सत्यापित', 'जाँच', 'तपासणी', 'खात्री'],
      a: L(
        'Profiles come from our own community work — Tiny Miracles has worked alongside these neighbourhoods for over a decade, so these are not anonymous internet sign-ups. Candidates can also complete a work-readiness questionnaire, and that assessment shows on their profile. For anything more specific about verification, ask our team directly.',
        'प्रोफ़ाइलें हमारे अपने सामुदायिक काम से आती हैं — Tiny Miracles इन मोहल्लों के साथ एक दशक से ज़्यादा काम कर चुका है, इसलिए ये कोई अनजान इंटरनेट साइन-अप नहीं हैं। उम्मीदवार काम-के-लिए-तैयारी वाली प्रश्नावली भी भर सकते हैं, और वह आकलन उनकी प्रोफ़ाइल पर दिखता है। सत्यापन के बारे में और कुछ जानना हो तो सीधे हमारी टीम से पूछिए।',
        'प्रोफाइल आमच्या स्वतःच्या समुदाय-कामातून येतात — Tiny Miracles या वस्त्यांसोबत दशकाहून अधिक काळ काम करत आहे, त्यामुळे या अनोळखी इंटरनेट नोंदणी नाहीत. उमेदवार काम-तयारीची प्रश्नावलीही भरू शकतात, आणि ते मूल्यांकन त्यांच्या प्रोफाइलवर दिसतं. पडताळणीबद्दल आणखी काही जाणून घ्यायचं असल्यास थेट आमच्या टीमला विचारा.'
      ),
      see: ['h_start', 'p_who']
    },

    // ── profile & account ─────────────────────────────────────
    {
      id: 'a_login', topic: 'account',
      q: L('I cannot log in / I forgot my password', 'मैं लॉगिन नहीं कर पा रहा / पासवर्ड भूल गया', 'मला लॉगिन होत नाही / पासवर्ड विसरलो'),
      k: ['login', 'log in', 'password', 'forgot', 'reset', 'cant sign in', 'locked', 'otp', 'पासवर्ड', 'लॉगिन', 'भूल', 'विसरलो'],
      a: L(
        'Open <b>Sign in</b> and use <b>Forgot password</b>. We email you a reset link — check spam if it does not arrive in a few minutes. Make sure you are using the same email you signed up with. If the email never comes, message our team and they will sort it out for you.',
        '<b>Sign in</b> खोलिए और <b>Forgot password</b> इस्तेमाल कीजिए। हम आपको ईमेल पर रीसेट लिंक भेजते हैं — कुछ मिनटों में न आए तो स्पैम देखिए। ध्यान रखिए कि वही ईमेल इस्तेमाल कर रहे हों जिससे साइन अप किया था। अगर ईमेल आता ही नहीं, तो हमारी टीम को संदेश भेजिए, वे ठीक कर देंगे।',
        '<b>Sign in</b> उघडा आणि <b>Forgot password</b> वापरा. आम्ही तुम्हाला ईमेलवर रीसेट लिंक पाठवतो — काही मिनिटांत आली नाही तर स्पॅम पाहा. तुम्ही साइन अप केलेला तोच ईमेल वापरत आहात याची खात्री करा. ईमेल येतच नसेल, तर आमच्या टीमला संदेश पाठवा, ते सोडवतील.'
      ),
      do: { label: L('Open sign in', 'साइन इन खोलें', 'साइन इन उघडा'), fn: function () { call('openSignIn'); } },
      escalate: true
    },
    {
      id: 'a_edit', topic: 'account',
      q: L('How do I edit my profile?', 'मैं अपनी प्रोफ़ाइल कैसे बदलूँ?', 'मी माझं प्रोफाइल कसं बदलू?'),
      k: ['edit', 'update', 'change', 'correct', 'badalna', 'sudhar', 'mistake', 'wrong info', 'बदलना', 'सुधार', 'बदलणं', 'चूक'],
      a: L(
        'Sign in and go to your account page — you can change your details, skills, sector and resume yourself, any time. Anything you cannot edit there, our team can change for you; just ask.',
        'साइन इन करके अपने अकाउंट पेज पर जाइए — आप अपनी जानकारी, स्किल, क्षेत्र और रेज़्यूमे कभी भी ख़ुद बदल सकते हैं। जो वहाँ से न बदल सके, वह हमारी टीम बदल देगी; बस कहिए।',
        'साइन इन करून तुमच्या खात्याच्या पानावर जा — तुमची माहिती, कौशल्यं, क्षेत्र आणि रेझ्युमे तुम्ही कधीही स्वतः बदलू शकता. जे तिथून बदलता येत नाही, ते आमची टीम बदलून देईल; फक्त सांगा.'
      ),
      see: ['a_delete', 'a_login']
    },
    {
      id: 'a_delete', topic: 'account',
      q: L('How do I delete my profile?', 'मैं अपनी प्रोफ़ाइल कैसे हटाऊँ?', 'मी माझं प्रोफाइल कसं काढून टाकू?'),
      k: ['delete', 'remove', 'close account', 'hatana', 'band karna', 'erase', 'deactivate', 'हटाना', 'बंद', 'काढून', 'रद्द'],
      a: L(
        'From your account page, any time — it comes down <b>immediately</b>, not after a waiting period, and you do not need to give a reason. If you would rather our team did it, just ask us and we will.',
        'अपने अकाउंट पेज से, कभी भी — यह <b>तुरंत</b> हट जाती है, कोई इंतज़ार नहीं, और कारण बताने की ज़रूरत नहीं। अगर आप चाहते हैं कि हमारी टीम करे, तो बस कह दीजिए, हम कर देंगे।',
        'तुमच्या खात्याच्या पानावरून, कधीही — ते <b>लगेच</b> काढलं जातं, वाट पाहावी लागत नाही, आणि कारण सांगावं लागत नाही. आमच्या टीमने करावं असं वाटत असेल, तर फक्त सांगा, आम्ही करू.'
      ),
      do: { label: L('Read the privacy policy', 'प्राइवेसी पॉलिसी पढ़ें', 'गोपनीयता धोरण वाचा'), fn: function () { call('showPage', 'privacy'); } },
      see: ['p_safe']
    },
    {
      id: 'a_lang', topic: 'account',
      q: L('Can I use this site in Hindi or Marathi?', 'क्या मैं यह साइट हिंदी या मराठी में देख सकता हूँ?', 'ही साइट मी हिंदी किंवा मराठीत पाहू शकतो का?'),
      k: ['hindi', 'marathi', 'language', 'bhasha', 'translate', 'english nahi', 'हिंदी', 'मराठी', 'भाषा', 'अनुवाद'],
      a: L(
        'Yes. Use the <b>EN / हिं / मर</b> switch at the top of the page. I follow whichever language you pick, so you can ask me in Hindi or Marathi too.',
        'हाँ। पेज के ऊपर <b>EN / हिं / मर</b> स्विच इस्तेमाल कीजिए। आप जो भाषा चुनेंगे, मैं उसी में चलूँगी — तो आप मुझसे हिंदी या मराठी में भी पूछ सकते हैं।',
        'हो. पानाच्या वरच्या बाजूला <b>EN / हिं / मर</b> स्विच वापरा. तुम्ही जी भाषा निवडाल, मी तीच वापरते — त्यामुळे तुम्ही मला हिंदी किंवा मराठीतही विचारू शकता.'
      )
    },

    // ── privacy & safety ──────────────────────────────────────
    {
      id: 'p_safe', topic: 'privacy',
      q: L('Is my information safe?', 'क्या मेरी जानकारी सुरक्षित है?', 'माझी माहिती सुरक्षित आहे का?'),
      k: ['safe', 'secure', 'privacy', 'data', 'protect', 'surakshit', 'private', 'सुरक्षित', 'गोपनीय', 'डेटा', 'माहिती'],
      a: L(
        'Yes. We collect only what is needed to introduce you to an employer, we never sell your data, and you can see, correct or delete everything we hold about you. The full detail — what we keep, for how long, and who it goes to — is written out in our Privacy Policy in plain language.',
        'हाँ। हम सिर्फ़ उतना ही लेते हैं जितना किसी कंपनी से आपका परिचय कराने के लिए ज़रूरी है, आपका डेटा कभी बेचते नहीं, और आपके बारे में हमारे पास जो कुछ है वह आप देख, सुधार या हटा सकते हैं। पूरी बात — क्या रखते हैं, कितने समय तक, और किसे जाता है — हमारी प्राइवेसी पॉलिसी में सीधी भाषा में लिखी है।',
        'हो. एखाद्या कंपनीशी तुमची ओळख करून देण्यासाठी जेवढं गरजेचं आहे तेवढंच आम्ही घेतो, तुमचा डेटा कधीही विकत नाही, आणि आमच्याकडे तुमच्याबद्दल जे आहे ते तुम्ही पाहू, दुरुस्त करू किंवा काढून टाकू शकता. संपूर्ण तपशील — काय ठेवतो, किती काळ, आणि कोणाला जातो — आमच्या गोपनीयता धोरणात सोप्या भाषेत लिहिला आहे.'
      ),
      do: { label: L('Read the privacy policy', 'प्राइवेसी पॉलिसी पढ़ें', 'गोपनीयता धोरण वाचा'), fn: function () { call('showPage', 'privacy'); } },
      see: ['p_who', 'p_phone', 'a_delete']
    },
    {
      id: 'p_who', topic: 'privacy',
      q: L('Who can see my profile?', 'मेरी प्रोफ़ाइल कौन देख सकता है?', 'माझं प्रोफाइल कोण पाहू शकतं?'),
      k: ['who can see', 'visible', 'public', 'anyone see', 'kaun dekh', 'dikhega', 'कौन देख', 'सार्वजनिक', 'कोण पाहू', 'दिसतं'],
      a: L(
        'Anyone visiting the site sees only a <b>masked</b> version — first name and last initial, and your city, not your exact neighbourhood. Signed-in employers see the fuller profile. Once you are placed in a job, your profile comes down from public browsing.',
        'साइट पर आने वाले किसी भी व्यक्ति को सिर्फ़ <b>छुपाई हुई</b> प्रोफ़ाइल दिखती है — पहला नाम और सरनेम का पहला अक्षर, और आपका शहर, आपका सही मोहल्ला नहीं। साइन-इन कंपनियों को पूरी प्रोफ़ाइल दिखती है। नौकरी लग जाने पर आपकी प्रोफ़ाइल सार्वजनिक सूची से हट जाती है।',
        'साइटवर येणाऱ्या कोणालाही फक्त <b>झाकलेलं</b> प्रोफाइल दिसतं — पहिलं नाव आणि आडनावाचं पहिलं अक्षर, आणि तुमचं शहर, नेमकी वस्ती नाही. साइन-इन कंपन्यांना पूर्ण प्रोफाइल दिसतं. नोकरी लागल्यावर तुमचं प्रोफाइल सार्वजनिक यादीतून काढलं जातं.'
      ),
      see: ['p_phone', 'p_safe']
    },
    {
      id: 'p_phone', topic: 'privacy',
      q: L('Will my phone number be shown publicly?', 'क्या मेरा फ़ोन नंबर सबको दिखेगा?', 'माझा फोन नंबर सर्वांना दिसेल का?'),
      k: ['phone number', 'mobile', 'contact shown', 'number public', 'email public', 'spam calls', 'नंबर', 'फ़ोन', 'फोन', 'मोबाइल'],
      a: L(
        'Never. Your phone number and email are <b>not shown on your public profile at all</b>. They are shared with one specific employer only after that employer expresses interest in you — and you still decide whether to talk to them.',
        'कभी नहीं। आपका फ़ोन नंबर और ईमेल <b>आपकी सार्वजनिक प्रोफ़ाइल पर बिलकुल नहीं दिखते</b>। वे सिर्फ़ उसी एक कंपनी को दिए जाते हैं जिसने आप में दिलचस्पी दिखाई हो — और उससे बात करनी है या नहीं, यह फिर भी आपका फ़ैसला है।',
        'कधीच नाही. तुमचा फोन नंबर आणि ईमेल <b>तुमच्या सार्वजनिक प्रोफाइलवर अजिबात दिसत नाहीत</b>. ज्या कंपनीने तुमच्यात रस दाखवला असेल फक्त तिलाच ते दिले जातात — आणि त्यांच्याशी बोलायचं की नाही, हा निर्णय तरीही तुमचाच.'
      ),
      see: ['p_who', 'p_safe']
    },

    // ── about ─────────────────────────────────────────────────
    {
      id: 'ab_what', topic: 'about',
      q: L('What is Pehli Kamai?', 'पहली कमाई क्या है?', 'पहली कमाई म्हणजे काय?'),
      k: ['what is pehli kamai', 'about pehli kamai', 'kya hai', 'explain', 'purpose', 'क्या है', 'बारे में', 'काय आहे', 'बद्दल'],
      a: L(
        'A bridge between Mumbai young people looking for their first job and employers looking to hire. Free for job-seekers, always. We build your profile and resume, put you in front of employers, coach you before interviews, and stay with you after you are placed.<br><br>The belief behind it: talent was never the shortage in this city — introductions were.',
        'मुंबई के उन युवाओं और भर्ती करने वाली कंपनियों के बीच एक पुल, जो अपनी पहली नौकरी ढूँढ रहे हैं। नौकरी ढूँढने वालों के लिए हमेशा मुफ़्त। हम आपकी प्रोफ़ाइल और रेज़्यूमे बनाते हैं, कंपनियों के सामने रखते हैं, इंटरव्यू से पहले तैयार करते हैं, और नौकरी लगने के बाद भी साथ रहते हैं।<br><br>इसके पीछे की सोच: इस शहर में कमी कभी हुनर की नहीं थी — जान-पहचान की थी।',
        'मुंबईतील पहिली नोकरी शोधणारे तरुण आणि भरती करणाऱ्या कंपन्या यांच्यातला पूल. नोकरी शोधणाऱ्यांसाठी नेहमीच मोफत. आम्ही तुमचं प्रोफाइल आणि रेझ्युमे बनवतो, कंपन्यांसमोर ठेवतो, मुलाखतीआधी तयार करतो, आणि नोकरी लागल्यावरही सोबत राहतो.<br><br>यामागची श्रद्धा: या शहरात कमतरता कधीच कौशल्याची नव्हती — ओळखीची होती.'
      ),
      do: { label: L('Read our story', 'हमारी कहानी पढ़ें', 'आमची गोष्ट वाचा'), fn: function () { call('showPage', 'about'); } },
      see: ['ab_who', 'j_free']
    },
    {
      id: 'ab_who', topic: 'about',
      q: L('Who runs Pehli Kamai?', 'पहली कमाई कौन चलाता है?', 'पहली कमाई कोण चालवतं?'),
      k: ['who runs', 'tiny miracles', 'ngo', 'organisation', 'behind', 'founder', 'trust', 'कौन चलाता', 'संस्था', 'कोण चालवतं'],
      a: L(
        'Pehli Kamai is an initiative by <b>Tiny Miracles</b> — a B-Corp certified social enterprise based in Mumbai and Amsterdam. Tiny Miracles has worked alongside communities across this city for over a decade, on health, education, savings and livelihoods.',
        'पहली कमाई <b>Tiny Miracles</b> की एक पहल है — मुंबई और एम्स्टर्डम स्थित एक B-Corp प्रमाणित सामाजिक उद्यम। Tiny Miracles एक दशक से ज़्यादा समय से इस शहर के समुदायों के साथ स्वास्थ्य, शिक्षा, बचत और आजीविका पर काम कर रहा है।',
        'पहली कमाई हा <b>Tiny Miracles</b> चा उपक्रम आहे — मुंबई आणि अ‍ॅमस्टरडॅममधील B-Corp प्रमाणित सामाजिक उपक्रम. Tiny Miracles दशकाहून अधिक काळ या शहरातील समुदायांसोबत आरोग्य, शिक्षण, बचत आणि उपजीविकेवर काम करत आहे.'
      ),
      do: { label: L('Read our story', 'हमारी कहानी पढ़ें', 'आमची गोष्ट वाचा'), fn: function () { call('showPage', 'about'); } },
      see: ['ab_where', 'ab_what']
    },
    {
      id: 'ab_where', topic: 'about',
      q: L('Which cities do you work in?', 'आप किन शहरों में काम करते हैं?', 'तुम्ही कोणत्या शहरांत काम करता?'),
      k: ['city', 'location', 'mumbai', 'pune', 'delhi', 'where', 'area', 'outside mumbai', 'शहर', 'मुंबई', 'जगह', 'ठिकाण'],
      a: L(
        'Mumbai, for now. That is deliberate — we work through communities we actually know, and we would rather do that properly in one city than thinly across many. If you are elsewhere and want us there, tell us; it helps us know where to go next.',
        'फ़िलहाल मुंबई। यह जान-बूझकर है — हम उन्हीं समुदायों के ज़रिए काम करते हैं जिन्हें हम सचमुच जानते हैं, और कई शहरों में हल्के-फुल्के होने से बेहतर है एक शहर में ठीक से करना। अगर आप कहीं और हैं और चाहते हैं कि हम वहाँ आएँ, तो बताइए; इससे हमें पता चलता है कि अगला क़दम कहाँ रखना है।',
        'सध्या मुंबई. हे जाणीवपूर्वक आहे — आम्ही ज्या समुदायांना खरोखर ओळखतो त्यांच्यामार्फतच काम करतो, आणि अनेक शहरांत वरवर पसरण्यापेक्षा एका शहरात नीट करणं बरं. तुम्ही दुसरीकडे असाल आणि आम्ही तिथे यावं असं वाटत असेल, तर सांगा; पुढचं पाऊल कुठे टाकायचं ते कळतं.'
      ),
      see: ['ab_partner']
    },
    {
      id: 'ab_partner', topic: 'about',
      q: L('I am an NGO or partner — how do we work together?', 'मैं एक NGO या साझेदार हूँ — हम साथ कैसे काम करें?', 'मी NGO किंवा भागीदार आहे — आपण एकत्र कसं काम करू?'),
      k: ['ngo', 'partner', 'collaborate', 'csr', 'donate', 'support', 'volunteer', 'साझेदार', 'सहयोग', 'भागीदार', 'दान'],
      a: L(
        'We would like to hear from you. Whether it is referring young people to us, hiring through us, CSR, or something we have not thought of — send a message with a line about who you are and we will come back to you.',
        'हमें आपसे सुनकर अच्छा लगेगा। चाहे युवाओं को हमारे पास भेजना हो, हमारे ज़रिए भर्ती करनी हो, CSR हो, या कुछ ऐसा जो हमने सोचा ही न हो — अपने बारे में एक लाइन के साथ संदेश भेजिए, हम जवाब देंगे।',
        'तुमच्याकडून ऐकायला आम्हाला आवडेल. तरुणांना आमच्याकडे पाठवणं असो, आमच्यामार्फत भरती असो, CSR असो, किंवा आम्ही विचारही केला नसेल असं काही — स्वतःबद्दल एका ओळीसह संदेश पाठवा, आम्ही उत्तर देऊ.'
      ),
      do: { label: L('Send a message', 'संदेश भेजें', 'संदेश पाठवा'), fn: function () { call('openCF'); } }
    },

    // ── support ───────────────────────────────────────────────
    {
      id: 's_contact', topic: 'human',
      q: L('How do I contact your team?', 'मैं आपकी टीम से कैसे संपर्क करूँ?', 'मी तुमच्या टीमशी संपर्क कसा साधू?'),
      k: ['contact', 'phone', 'call', 'email', 'whatsapp', 'talk', 'human', 'person', 'agent', 'baat karni', 'sampark', 'संपर्क', 'बात', 'फ़ोन', 'बोलणं', 'माणूस'],
      a: L(
        'Here is every way to reach us. WhatsApp is usually fastest.',
        'हम तक पहुँचने के सारे रास्ते नीचे हैं। व्हाट्सएप आमतौर पर सबसे तेज़ है।',
        'आमच्यापर्यंत पोहोचण्याचे सर्व मार्ग खाली आहेत. व्हॉट्सअ‍ॅप सहसा सर्वात जलद.'
      ),
      escalate: true
    },
    {
      id: 's_complaint', topic: 'human',
      q: L('I have a complaint', 'मुझे शिकायत करनी है', 'मला तक्रार करायची आहे'),
      k: ['complaint', 'grievance', 'unfair', 'wrong', 'problem', 'issue', 'shikayat', 'complain', 'report', 'शिकायत', 'तक्रार', 'समस्या', 'गलत', 'चूक'],
      a: L(
        'We take these seriously and we log every one. Use <b>Report a concern</b> below — a data or privacy question, or something that felt wrong with an employer, a candidate, or an introduction. You get a reference number, we acknowledge within <b>2 business days</b>, and we aim to resolve within <b>30 days</b>.<br><br>Our Grievance Officer is <b>Meghna</b> (' + EMAIL + '). <b>Reporting something never costs you access to the platform.</b>',
        'हम इन्हें गंभीरता से लेते हैं और हर शिकायत दर्ज करते हैं। नीचे <b>शिकायत दर्ज करें</b> इस्तेमाल कीजिए — डेटा या गोपनीयता का सवाल हो, या किसी कंपनी, उम्मीदवार या परिचय से जुड़ी कोई बात जो ग़लत लगी हो। आपको संदर्भ संख्या मिलती है, हम <b>2 कार्य-दिवस</b> में पावती देते हैं, और <b>30 दिनों</b> में हल करने का लक्ष्य रखते हैं।<br><br>हमारी शिकायत अधिकारी <b>मेघना</b> हैं (' + EMAIL + ')। <b>शिकायत करने से प्लेटफ़ॉर्म पर आपकी पहुँच कभी नहीं जाती।</b>',
        'आम्ही या गांभीर्याने घेतो आणि प्रत्येक तक्रार नोंदवतो. खाली <b>तक्रार नोंदवा</b> वापरा — डेटा किंवा गोपनीयतेचा प्रश्न असो, किंवा एखादी कंपनी, उमेदवार किंवा ओळख यांबाबत चुकीचं वाटलेलं काही असो. तुम्हाला संदर्भ क्रमांक मिळतो, आम्ही <b>2 कामकाजाच्या दिवसांत</b> पोच देतो, आणि <b>30 दिवसांत</b> निकाल लावण्याचं उद्दिष्ट ठेवतो.<br><br>आमच्या तक्रार अधिकारी <b>मेघना</b> आहेत (' + EMAIL + '). <b>तक्रार केल्याने प्लॅटफॉर्मवरचा तुमचा प्रवेश कधीच जात नाही.</b>'
      ),
      escalate: true
    }
  ];

  var BY_ID = {};
  FAQ.forEach(function (f) { BY_ID[f.id] = f; });

  // ── matching ─────────────────────────────────────────────────
  // Deliberately simple and transparent: a keyword hit is worth more
  // than a word that merely appears in the question text, and short
  // words are ignored so "a"/"is"/"मी" cannot carry a match. The
  // threshold matters more than the cleverness — under it we hand
  // over to a human rather than serve a near-miss answer.
  var STOP = ['the', 'a', 'an', 'is', 'are', 'do', 'does', 'i', 'my', 'me', 'to', 'of', 'for', 'and', 'in', 'on', 'can', 'how', 'what', 'you', 'your', 'it', 'that', 'this', 'be', 'will', 'with', 'have', 'get'];

  function norm(s) {
    return (s || '').toLowerCase()
      .replace(/[.,!?;:()"'\/‘’“”।]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokens(s) {
    return norm(s).split(' ').filter(function (w) {
      return w.length > 2 && STOP.indexOf(w) === -1;
    });
  }

  // Returns a raw score AND coverage — the share of the asker's own
  // content words the match actually accounts for. Score alone is not
  // enough: "what is the weather in Dubai" once scored a confident hit
  // on "What is Pehli Kamai?" purely on the words "what is". Coverage
  // catches that, because none of weather/dubai were explained.
  function score(query, faq) {
    var qn = norm(query);
    var qt = tokens(query);
    if (!qt.length) return { s: 0, cov: 0 };
    var s = 0, hit = {};

    // Whole-phrase keyword hit — strongest signal ("forgot password").
    (faq.k || []).forEach(function (kw) {
      var k = norm(kw);
      var kt = tokens(k);
      if (!kt.length) return; // a keyword made only of filler words matches everything
      if (qn.indexOf(k) === -1) return;
      s += kt.length > 1 ? 6 : 4;
      kt.forEach(function (w) { hit[w] = 1; });
    });

    // Individual words shared with the question text, in any language.
    var qWords = [];
    ['en', 'hi', 'mr'].forEach(function (lg) {
      qWords = qWords.concat(tokens(faq.q[lg]));
    });
    qt.forEach(function (w) {
      if (qWords.indexOf(w) !== -1) { s += 2; hit[w] = 1; }
      else if (qWords.some(function (x) { return x.length > 3 && (x.indexOf(w) === 0 || w.indexOf(x) === 0); })) { s += 1; hit[w] = 1; }
    });

    var covered = qt.filter(function (w) { return hit[w]; }).length;
    return { s: s, cov: covered / qt.length };
  }

  function search(query) {
    return FAQ.map(function (f) {
      var r = score(query, f);
      return { f: f, s: r.s, cov: r.cov };
    })
      .filter(function (h) { return h.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });
  }

  // ── DOM ──────────────────────────────────────────────────────
  var el = {};
  var open = false;

  function build() {
    var launch = document.createElement('button');
    launch.className = 'pkc-launch';
    launch.type = 'button';
    launch.setAttribute('aria-haspopup', 'dialog');
    launch.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
      '<span class="pkc-launch-label"></span><span class="pkc-dot" id="pkc-dot"></span>';

    var panel = document.createElement('div');
    panel.className = 'pkc-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.hidden = true;
    panel.innerHTML =
      '<div class="pkc-head">' +
        '<div class="pkc-head-txt">' +
          '<div class="pkc-head-name" id="pkc-name"></div>' +
          '<div class="pkc-head-sub" id="pkc-sub"></div>' +
        '</div>' +
        '<button class="pkc-head-btn" id="pkc-restart" type="button">⟲</button>' +
        '<button class="pkc-head-btn" id="pkc-close" type="button">✕</button>' +
      '</div>' +
      '<div class="pkc-log" id="pkc-log" role="log" aria-live="polite"></div>' +
      '<div class="pkc-foot">' +
        '<form class="pkc-form" id="pkc-form">' +
          '<textarea class="pkc-input" id="pkc-input" rows="1"></textarea>' +
          '<button class="pkc-send" id="pkc-send" type="submit">' +
            '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>' +
          '</button>' +
        '</form>' +
        '<div class="pkc-legal" id="pkc-legal"></div>' +
      '</div>';

    document.body.appendChild(launch);
    document.body.appendChild(panel);

    el.launch = launch;
    el.panel = panel;
    el.log = panel.querySelector('#pkc-log');
    el.input = panel.querySelector('#pkc-input');
    el.form = panel.querySelector('#pkc-form');
    el.dot = launch.querySelector('#pkc-dot');

    launch.addEventListener('click', openPanel);
    panel.querySelector('#pkc-close').addEventListener('click', closePanel);
    panel.querySelector('#pkc-restart').addEventListener('click', function () {
      el.log.innerHTML = '';
      greet();
    });

    el.form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit();
    });

    // Enter sends, Shift+Enter makes a new line — the convention
    // everyone already knows from WhatsApp.
    el.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
    });
    el.input.addEventListener('input', function () {
      el.input.style.height = 'auto';
      el.input.style.height = Math.min(el.input.scrollHeight, 96) + 'px';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) closePanel();
    });

    applyUI();
    liftForCookieBar();
  }

  // Language can change while the widget is closed; re-read on every
  // paint of the chrome rather than caching it at build time.
  function applyUI() {
    el.launch.querySelector('.pkc-launch-label').textContent = say(UI.launch);
    el.launch.setAttribute('aria-label', say(UI.launch));
    el.panel.setAttribute('aria-label', say(UI.name) + ' — ' + say(UI.sub));
    el.panel.querySelector('#pkc-name').textContent = say(UI.name);
    el.panel.querySelector('#pkc-sub').textContent = say(UI.sub);
    el.panel.querySelector('#pkc-close').setAttribute('aria-label', say(UI.close));
    el.panel.querySelector('#pkc-restart').setAttribute('aria-label', say(UI.restart));
    el.panel.querySelector('#pkc-send').setAttribute('aria-label', say(UI.send));
    el.input.placeholder = say(UI.placeholder);
    el.input.setAttribute('aria-label', say(UI.placeholder));
    el.panel.querySelector('#pkc-legal').textContent = say(UI.legal);
  }

  // The cookie bar is fixed to the bottom too. Rather than fight it on
  // z-index, sit above it and move out of its way while it is there.
  function liftForCookieBar() {
    var bar = document.getElementById('ck-bar');
    var apply = function () {
      var h = (bar && !bar.hidden) ? bar.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty('--pkc-lift', (h ? h + 8 : 0) + 'px');
    };
    apply();
    if (!bar) return;
    try {
      new MutationObserver(apply).observe(bar, { attributes: true, attributeFilter: ['hidden'] });
      new ResizeObserver(apply).observe(bar);
    } catch (e) {}
  }

  // ── rendering ────────────────────────────────────────────────
  function scrollDown() {
    requestAnimationFrame(function () { el.log.scrollTop = el.log.scrollHeight; });
  }

  function bubble(html, who) {
    var row = document.createElement('div');
    row.className = 'pkc-row' + (who === 'me' ? ' me' : '');
    var b = document.createElement('div');
    b.className = 'pkc-bub';
    b.innerHTML = html;
    row.appendChild(b);
    el.log.appendChild(row);
    scrollDown();
    return row;
  }

  function chips(items) {
    var wrap = document.createElement('div');
    wrap.className = 'pkc-chips';
    items.forEach(function (it) {
      var c = document.createElement('button');
      c.type = 'button';
      c.className = 'pkc-chip' + (it.ghost ? ' ghost' : '');
      c.textContent = it.text;
      c.addEventListener('click', function () {
        if (it.echo !== false) bubble(escapeHtml(it.text), 'me');
        wrap.remove();
        it.go();
      });
      wrap.appendChild(c);
    });
    el.log.appendChild(wrap);
    scrollDown();
    return wrap;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // A short pause before each reply. Instant answers read as a lookup
  // table; this reads as someone answering.
  function reply(fn) {
    var row = document.createElement('div');
    row.className = 'pkc-row';
    row.innerHTML = '<div class="pkc-bub pkc-typing"><i></i><i></i><i></i></div>';
    el.log.appendChild(row);
    scrollDown();
    setTimeout(function () { row.remove(); fn(); }, 420);
  }

  // ── flows ────────────────────────────────────────────────────
  function greet() {
    reply(function () {
      bubble(say(UI.greet));
      topicMenu();
    });
  }

  function topicMenu() {
    chips(TOPICS.map(function (t) {
      return {
        text: t.icon + '  ' + say(t.label),
        echo: false,
        go: function () {
          if (t.id === 'human') { bubble(escapeHtml(say(t.label)), 'me'); reply(escalation); return; }
          bubble(escapeHtml(say(t.label)), 'me');
          topicQuestions(t.id);
        }
      };
    }));
  }

  function topicQuestions(topicId) {
    var qs = FAQ.filter(function (f) { return f.topic === topicId; });
    reply(function () {
      bubble(say(UI.pickOne));
      var items = qs.map(function (f) {
        return { text: say(f.q), go: function () { answer(f.id, false); } };
      });
      items.push({ text: say(UI.backTopics), ghost: true, echo: false, go: function () { topicMenu(); } });
      chips(items);
    });
  }

  function answer(id, echoQuestion) {
    var f = BY_ID[id];
    if (!f) return;
    if (echoQuestion) bubble(escapeHtml(say(f.q)), 'me');
    track({ action: 'answer', id: id, lang: lang() });

    reply(function () {
      bubble(say(f.a));

      if (f.do) {
        var btn = document.createElement('div');
        btn.className = 'pkc-chips';
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pkc-chip';
        b.textContent = say(f.do.label) + '  →';
        b.addEventListener('click', function () {
          track({ action: 'deeplink', id: id });
          f.do.fn();
          closePanel();
        });
        btn.appendChild(b);
        el.log.appendChild(btn);
      }

      if (f.escalate) { escalation(); return; }

      // Related questions, then the honest exit: "no, talk to a person".
      var items = (f.see || []).filter(function (x) { return BY_ID[x]; }).map(function (x) {
        return { text: say(BY_ID[x].q), go: function () { answer(x, false); } };
      });
      items.push({ text: say(UI.no), ghost: true, go: function () { reply(escalation); } });
      items.push({ text: say(UI.backTopics), ghost: true, echo: false, go: function () { topicMenu(); } });
      chips(items);
    });
  }

  function escalation() {
    var card = document.createElement('div');
    card.className = 'pkc-esc';

    var waText = encodeURIComponent(
      lang() === 'hi' ? 'नमस्ते, मुझे पहली कमाई के बारे में मदद चाहिए।'
        : lang() === 'mr' ? 'नमस्कार, मला पहली कमाईबद्दल मदत हवी आहे.'
          : 'Hello, I need help with Pehli Kamai.'
    );

    card.innerHTML =
      '<div class="pkc-esc-h">' + escapeHtml(say(UI.escHead)) + '</div>' +
      '<a class="pkc-esc-l" target="_blank" rel="noopener" href="https://wa.me/' + WA_NUM + '?text=' + waText + '">' +
        '<span class="pkc-esc-ic">💬</span><span style="flex:1;color:inherit;font-weight:700">' +
        escapeHtml(say(UI.escWA)) + '<span>' + PHONE_1 + '</span></span></a>' +
      '<a class="pkc-esc-l" href="tel:+' + WA_NUM + '">' +
        '<span class="pkc-esc-ic">📞</span><span style="flex:1;color:inherit;font-weight:700">' +
        escapeHtml(say(UI.escCall)) + '<span>' + PHONE_1 + ' · ' + PHONE_2 + '</span></span></a>' +
      '<a class="pkc-esc-l" href="mailto:' + EMAIL + '">' +
        '<span class="pkc-esc-ic">✉️</span><span style="flex:1;color:inherit;font-weight:700">' +
        escapeHtml(say(UI.escMail)) + '<span>' + EMAIL + '</span></span></a>' +
      '<button class="pkc-esc-l" type="button" id="pkc-esc-form">' +
        '<span class="pkc-esc-ic">📝</span><span style="flex:1;color:inherit;font-weight:700">' +
        escapeHtml(say(UI.escForm)) + '<span>' + escapeHtml(say(UI.escFormSub)) + '</span></span></button>' +
      '<button class="pkc-esc-l" type="button" id="pkc-esc-griev">' +
        '<span class="pkc-esc-ic">⚖️</span><span style="flex:1;color:inherit;font-weight:700">' +
        escapeHtml(say(UI.escGriev)) + '<span>' + escapeHtml(say(UI.escGrievSub)) + '</span></span></button>' +
      '<div class="pkc-esc-note">' + escapeHtml(say(UI.escNote)) + '</div>';

    el.log.appendChild(card);
    track({ action: 'escalate', lang: lang() });

    card.querySelector('#pkc-esc-form').addEventListener('click', function () {
      track({ action: 'escalate_form' });
      closePanel();
      call('openCF');
    });
    card.querySelector('#pkc-esc-griev').addEventListener('click', function () {
      track({ action: 'escalate_grievance' });
      closePanel();
      call('showPage', 'report');
    });

    chips([{ text: say(UI.backTopics), ghost: true, echo: false, go: function () { topicMenu(); } }]);
    scrollDown();
  }

  function submit() {
    var q = el.input.value.trim();
    if (!q) return;
    el.input.value = '';
    el.input.style.height = 'auto';
    bubble(escapeHtml(q), 'me');
    track({ action: 'ask', q: q.slice(0, 120), lang: lang() });

    var hits = search(q);
    var top = hits[0];
    var short = tokens(q).length <= 2; // "profile", "salary" — a nudge, not a question

    // Confident: a clear winner, clear of the runner-up, and actually
    // about most of what they asked.
    if (top && top.s >= 6 && top.cov >= 0.34 && (!hits[1] || top.s - hits[1].s >= 2)) {
      answer(top.f.id, false);
      return;
    }

    // Plausible but ambiguous: offer the shortlist instead of picking
    // one for them. Guessing here is how a bot loses trust. A one- or
    // two-word query is always treated this way — there is not enough
    // in it to be confident, but plenty to offer a menu.
    if (top && (top.s >= 4 || (short && top.s >= 2))) {
      reply(function () {
        bubble(say(UI.guess));
        var items = hits.slice(0, 3).map(function (h) {
          return { text: say(h.f.q), go: function () { answer(h.f.id, false); } };
        });
        items.push({ text: say(UI.no), ghost: true, go: function () { reply(escalation); } });
        chips(items);
      });
      return;
    }

    // Nothing. Say so plainly and hand over.
    reply(function () {
      bubble(say(UI.noMatch));
      escalation();
    });
  }

  // ── open / close ─────────────────────────────────────────────
  function openPanel() {
    open = true;
    applyUI();
    el.panel.hidden = false;
    el.launch.hidden = true;
    if (el.dot) el.dot.remove();
    try { localStorage.setItem('pk_bot_seen', '1'); } catch (e) {}
    if (!el.log.childNodes.length) greet();
    track({ action: 'open', lang: lang() });
    // Not on phones: focusing the box pops the keyboard over the menu
    // before anyone has read it.
    if (window.matchMedia('(min-width:601px)').matches) el.input.focus();
  }

  function closePanel() {
    open = false;
    el.panel.hidden = true;
    el.launch.hidden = false;
    applyUI();
    el.launch.focus();
  }

  // ── boot ─────────────────────────────────────────────────────
  function init() {
    if (document.querySelector('.pkc-launch')) return;
    build();
    try {
      if (localStorage.getItem('pk_bot_seen') && el.dot) el.dot.remove();
    } catch (e) {}

    // Follow the site's language switch. setLang re-renders the page;
    // wrap it so the widget re-renders with it instead of going stale.
    if (typeof window.setLang === 'function' && !window.setLang.__pkcWrapped) {
      var orig = window.setLang;
      window.setLang = function (l) {
        var r = orig.apply(this, arguments);
        try {
          applyUI();
          if (open) { el.log.innerHTML = ''; greet(); }
        } catch (e) {}
        return r;
      };
      window.setLang.__pkcWrapped = true;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exposed so a link anywhere on the site can open the bot, e.g. the
  // Help page or a "still stuck?" line at the end of a form.
  window.pkOpenChat = function (faqId) {
    openPanel();
    if (faqId && BY_ID[faqId]) answer(faqId, true);
  };
})();
