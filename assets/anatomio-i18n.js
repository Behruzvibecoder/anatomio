(() => {
  const textTranslations = {
    "Перейти к содержанию": { en: "Skip to content", uz: "Asosiy kontentga o‘tish" },
    "ЯЗЫК САЙТА: РУССКИЙ": { en: "SITE LANGUAGE: ENGLISH", uz: "SAYT TILI: O‘ZBEKCHA" },
    "Начать": { en: "Start", uz: "Boshlash" },
    "Изучайте анатомию человека — просто, наглядно, шаг за шагом!": {
      en: "Learn human anatomy — clearly, visually, step by step!",
      uz: "Inson anatomiyasini sodda, ko‘rgazmali va bosqichma-bosqich o‘rganing!"
    },
    "У меня уже есть аккаунт": { en: "I already have an account", uz: "Menda akkaunt bor" },
    "Кости и скелет": { en: "Bones and skeleton", uz: "Suyaklar va skelet" },
    "Мышцы": { en: "Muscles", uz: "Mushaklar" },
    "Сердце": { en: "Heart", uz: "Yurak" },
    "Внутренние органы": { en: "Internal organs", uz: "Ichki a’zolar" },
    "Мозг": { en: "Brain", uz: "Miya" },
    "Нервная система": { en: "Nervous system", uz: "Asab tizimi" },
    "Дыхание": { en: "Breathing", uz: "Nafas olish" },
    "Пищеварение": { en: "Digestion", uz: "Ovqat hazm qilish" },
    "Суставы": { en: "Joints", uz: "Bo‘g‘imlar" },
    "Кровообращение": { en: "Circulation", uz: "Qon aylanishi" },
    "Понятно. Наглядно. По делу.": { en: "Clear. Visual. To the point.", uz: "Tushunarli. Ko‘rgazmali. Mazmunli." },
    "Разбирайтесь в костях, мышцах и органах с короткими объяснениями. Переходите от отдельных частей тела к тому, как целые системы работают вместе.": {
      en: "Explore bones, muscles, and organs through short explanations. Move from individual body parts to the way whole systems work together.",
      uz: "Suyaklar, mushaklar va a’zolarni qisqa tushuntirishlar orqali o‘rganing. Tana qismlaridan butun tizimlarning o‘zaro ishlashigacha bosqichma-bosqich boring."
    },
    "Связи, которые важно понять": { en: "Connections worth understanding", uz: "Tushunish muhim bo‘lgan bog‘liqliklar" },
    "Изучайте строение тела по системам и функциям: что за что отвечает, как органы связаны между собой и как устроен организм человека.": {
      en: "Learn how the body is organized by systems and functions: what each part does, how organs connect, and how the human body works.",
      uz: "Tana tuzilishini tizimlar va vazifalar bo‘yicha o‘rganing: har bir qism nima uchun xizmat qiladi, a’zolar qanday bog‘langan va inson organizmi qanday ishlaydi."
    },
    "Запоминайте через практику": { en: "Remember through practice", uz: "Amaliyot orqali eslab qoling" },
    "Короткие занятия и регулярное повторение помогают закреплять новые понятия. Возвращайтесь к сложным темам, пока они не станут ясными.": {
      en: "Short sessions and regular review help new concepts stick. Return to challenging topics until they become clear.",
      uz: "Qisqa mashg‘ulotlar va muntazam takrorlash yangi tushunchalarni mustahkamlaydi. Murakkab mavzularni tushunarli bo‘lguncha qayta ko‘rib chiqing."
    },
    "Ваш темп и маршрут": { en: "Your pace, your path", uz: "O‘z sur’atingiz, o‘z yo‘lingiz" },
    "Выбирайте интересующие темы — от скелета и мышц до внутренних органов. Учитесь в своём ритме и постепенно складывайте целостную картину.": {
      en: "Choose the topics that interest you, from the skeleton and muscles to internal organs. Learn at your own pace and build a complete picture over time.",
      uz: "Skelet va mushaklardan tortib ichki a’zolargacha o‘zingizga qiziq mavzularni tanlang. O‘z sur’atingizda o‘rganib, asta-sekin yaxlit tasavvur hosil qiling."
    },
    "Разбирайтесь в анатомии в своём темпе": { en: "Explore anatomy at your own pace", uz: "Anatomiyani o‘z sur’atingizda o‘rganing" },
    "Тематические уроки": { en: "Topic-based lessons", uz: "Mavzuli darslar" },
    "Подача материала": { en: "How it is taught", uz: "Materialni taqdim etish" },
    "Короткие уроки": { en: "Short lessons", uz: "Qisqa darslar" },
    "Повторение и проверка": { en: "Review and check", uz: "Takrorlash va tekshirish" },
    "Закрепляйте знания": { en: "Reinforce what you learn", uz: "Bilimingizni mustahkamlang" },
    "Повторением": { en: "Through review", uz: "Takrorlash orqali" },
    "ПРАКТИКА": { en: "PRACTICE", uz: "AMALIYOT" },
    "Выбрать тему": { en: "Choose a topic", uz: "Mavzu tanlash" },
    "Проверьте, что запомнили": { en: "See what you remember", uz: "Nimalarni eslab qolganingizni tekshiring" },
    "Проверьте знания по основным темам анатомии: костям, мышцам, органам и системам организма. Возвращайтесь к материалам и повторяйте сложные понятия в удобном темпе.": {
      en: "Check your knowledge of key anatomy topics: bones, muscles, organs, and body systems. Revisit the material and review challenging concepts at a pace that works for you.",
      uz: "Anatomiyaning asosiy mavzulari — suyaklar, mushaklar, a’zolar va tana tizimlari bo‘yicha bilimingizni tekshiring. Materiallarga qaytib, murakkab tushunchalarni o‘zingizga qulay sur’atda takrorlang."
    },
    "Понимайте, как устроено тело человека": { en: "Understand how the human body works", uz: "Inson tanasi qanday ishlashini tushuning" },
    "Начать обучение": { en: "Start learning", uz: "O‘rganishni boshlash" },
    "Темы анатомии": { en: "Anatomy topics", uz: "Anatomiya mavzulari" },
    "Сердце и сосуды": { en: "Heart and blood vessels", uz: "Yurak va qon tomirlari" },
    "Как учиться": { en: "How to learn", uz: "Qanday o‘rganish" },
    "Наглядные объяснения": { en: "Visual explanations", uz: "Ko‘rgazmali tushuntirishlar" },
    "Повторение материала": { en: "Reviewing material", uz: "Materialni takrorlash" },
    "Проверка знаний": { en: "Knowledge checks", uz: "Bilimni tekshirish" },
    "Материалы": { en: "Study resources", uz: "O‘quv materiallari" },
    "Основы анатомии": { en: "Anatomy basics", uz: "Anatomiya asoslari" },
    "Самопроверка": { en: "Self-check", uz: "O‘z-o‘zini tekshirish" },
    "О Anatomio": { en: "About Anatomio", uz: "Anatomio haqida" },
    "Главная": { en: "Home", uz: "Bosh sahifa" },
    "Подход к обучению": { en: "Our learning approach", uz: "O‘rganish yondashuvi" },
    "Учитесь в своём ритме": { en: "Learn at your own pace", uz: "O‘z sur’atingizda o‘rganing" },
    "Учебные темы": { en: "Study topics", uz: "O‘quv mavzulari" },
    "Демо-версия": { en: "Demo version", uz: "Demo versiya" },
    "Создать аккаунт": { en: "Create an account", uz: "Akkaunt yaratish" },
    "Войти": { en: "Log in", uz: "Kirish" },
    "Форма не отправляет данные": { en: "The form does not send data", uz: "Forma ma’lumot yubormaydi" },
    "На главную": { en: "Home", uz: "Bosh sahifa" },
    "Начать занятия": { en: "Start studying", uz: "Darslarni boshlash" },
    "Язык сайта:": { en: "Site language:", uz: "Sayt tili:" },
    "Создайте аккаунт": { en: "Create an account", uz: "Akkaunt yarating" },
    "Начните разбирать анатомию с основ.": { en: "Start exploring anatomy with the basics.", uz: "Anatomiyani asoslardan o‘rganishni boshlang." },
    "Как вас зовут?": { en: "What is your name?", uz: "Ismingiz nima?" },
    "Ваше имя": { en: "Your name", uz: "Ismingiz" },
    "Электронная почта": { en: "Email address", uz: "Elektron pochta" },
    "Пароль": { en: "Password", uz: "Parol" },
    "Не менее 6 символов": { en: "At least 6 characters", uz: "Kamida 6 ta belgi" },
    "Демо-форма: данные никуда не отправляются.": { en: "Demo form: your data is not sent anywhere.", uz: "Demo forma: ma’lumotlaringiz hech qayerga yuborilmaydi." },
    "Уже зарегистрированы?": { en: "Already registered?", uz: "Ro‘yxatdan o‘tganmisiz?" },
    "Ещё нет аккаунта?": { en: "New to Anatomio?", uz: "Anatomio’da hali akkauntingiz yo‘qmi?" },
    "С возвращением!": { en: "Welcome back!", uz: "Xush kelibsiz!" },
    "Войдите, чтобы продолжить занятия.": { en: "Log in to continue learning.", uz: "O‘rganishni davom ettirish uchun tizimga kiring." },
    "Язык сайта": { en: "Site language", uz: "Sayt tili" },
    "Anatomio — на главную": { en: "Anatomio — home", uz: "Anatomio — bosh sahifa" },
    "Изучайте анатомию с Anatomio": { en: "Learn anatomy with Anatomio", uz: "Anatomio bilan anatomiyani o‘rganing" },
    "Анимированная иллюстрация к изучению анатомии": { en: "Animated anatomy learning illustration", uz: "Anatomiyani o‘rganishga oid animatsion tasvir" },
    "Популярные темы анатомии": { en: "Popular anatomy topics", uz: "Ommabop anatomiya mavzulari" },
    "Предыдущие курсы": { en: "Previous topics", uz: "Oldingi mavzular" },
    "Следующие курсы": { en: "Next topics", uz: "Keyingi mavzular" },
    "Почему Anatomio помогает изучать анатомию": { en: "Why Anatomio makes anatomy easier to learn", uz: "Anatomio anatomiyani o‘rganishni qanday yengillashtiradi" },
    "Учитесь анатомии в удобном ритме": { en: "Learn anatomy at a comfortable pace", uz: "Anatomiyani o‘zingizga qulay sur’atda o‘rganing" },
    "Формат обучения": { en: "Learning format", uz: "O‘rganish formati" },
    "Перейти к коротким урокам": { en: "Go to short lessons", uz: "Qisqa darslarga o‘tish" },
    "Перейти к проверке знаний": { en: "Go to the knowledge check", uz: "Bilimni tekshirishga o‘tish" },
    "Глубже в анатомию": { en: "Go deeper into anatomy", uz: "Anatomiyani chuqurroq o‘rganing" },
    "Anatomio — практика анатомии": { en: "Anatomio — anatomy practice", uz: "Anatomio — anatomiya amaliyoti" },
    "Проверка знаний по анатомии": { en: "Anatomy knowledge check", uz: "Anatomiya bo‘yicha bilimni tekshirish" },
    "Начните изучать анатомию с Anatomio": { en: "Start learning anatomy with Anatomio", uz: "Anatomio bilan anatomiyani o‘rganishni boshlang" },
    "Языки сайта": { en: "Site languages", uz: "Sayt tillari" },
    "Закрыть": { en: "Close", uz: "Yopish" },
    "Anatomio — Learn, Practice, Master": { en: "Anatomio", uz: "Anatomio" },
    "Тематические уроки": { en: "Topic-based lessons", uz: "Mavzuli darslar" },
    "Повторение и проверка": { en: "Review and check", uz: "Takrorlash va tekshirish" }
  };

  const locales = {
    ru: {
      title: "Anatomio — изучайте анатомию наглядно",
      description: "Изучайте анатомию человека с Anatomio: понятные объяснения, наглядные темы и короткие занятия.",
      headerLabel: "ЯЗЫК САЙТА: РУССКИЙ"
    },
    en: {
      title: "Anatomio — learn anatomy visually",
      description: "Learn human anatomy with Anatomio: clear explanations, visual topics, and short lessons.",
      headerLabel: "SITE LANGUAGE: ENGLISH"
    },
    uz: {
      title: "Anatomio — anatomiyani ko‘rgazmali o‘rganing",
      description: "Anatomio bilan inson anatomiyasini o‘rganing: sodda tushuntirishlar, ko‘rgazmali mavzular va qisqa darslar.",
      headerLabel: "SAYT TILI: O‘ZBEKCHA"
    }
  };

  const runtimeCopy = {
    ru: {
      createAccount: "Создайте аккаунт", login: "Войти", welcomeBack: "С возвращением!",
      registerIntro: "Начните разбирать анатомию с основ.", loginIntro: "Войдите, чтобы продолжить занятия.",
      alreadyRegistered: "Уже зарегистрированы?", noAccount: "Ещё нет аккаунта?",
      selectedTopic: "Выбрана тема", demoLogin: "Демо: авторизация не подключена.",
      demoRegister: name => `Демо: аккаунт не создавался${name ? `, ${name}` : ""}.`
    },
    en: {
      createAccount: "Create an account", login: "Log in", welcomeBack: "Welcome back!",
      registerIntro: "Start exploring anatomy with the basics.", loginIntro: "Log in to continue learning.",
      alreadyRegistered: "Already registered?", noAccount: "New to Anatomio?",
      selectedTopic: "Selected topic", demoLogin: "Demo: sign-in is not connected.",
      demoRegister: name => `Demo: no account was created${name ? `, ${name}` : ""}.`
    },
    uz: {
      createAccount: "Akkaunt yaratish", login: "Kirish", welcomeBack: "Xush kelibsiz!",
      registerIntro: "Anatomiyani asoslardan o‘rganishni boshlang.", loginIntro: "O‘rganishni davom ettirish uchun tizimga kiring.",
      alreadyRegistered: "Ro‘yxatdan o‘tganmisiz?", noAccount: "Anatomio’da hali akkauntingiz yo‘qmi?",
      selectedTopic: "Tanlangan mavzu", demoLogin: "Demo: tizimga kirish hali ulanmagan.",
      demoRegister: name => `Demo: akkaunt yaratilmadi${name ? `, ${name}` : ""}.`
    }
  };

  const courseNames = {
    ru: ["Кости и скелет", "Мышцы", "Сердце", "Внутренние органы", "Мозг", "Нервная система", "Дыхание", "Пищеварение", "Суставы", "Кровообращение"],
    en: ["Bones and skeleton", "Muscles", "Heart", "Internal organs", "Brain", "Nervous system", "Breathing", "Digestion", "Joints", "Circulation"],
    uz: ["Suyaklar va skelet", "Mushaklar", "Yurak", "Ichki a’zolar", "Miya", "Asab tizimi", "Nafas olish", "Ovqat hazm qilish", "Bo‘g‘imlar", "Qon aylanishi"]
  };

  let currentLanguage = "ru";
  try {
    const saved = localStorage.getItem("anatomio-language");
    if (Object.hasOwn(locales, saved)) currentLanguage = saved;
  } catch (_) {}

  const originalTextNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.nodeValue.trim() || node.parentElement?.closest("script, style")) continue;
    const match = node.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
    originalTextNodes.push({ node, before: match[1], key: match[2], after: match[3] });
  }

  const originalAttributes = [];
  document.querySelectorAll("[aria-label], [placeholder], [title], [alt]").forEach(element => {
    ["aria-label", "placeholder", "title", "alt"].forEach(attribute => {
      if (element.hasAttribute(attribute)) originalAttributes.push({ element, attribute, key: element.getAttribute(attribute) });
    });
  });

  function setLanguage(language) {
    if (!Object.hasOwn(locales, language)) return currentLanguage;
    currentLanguage = language;
    const locale = locales[language];
    originalTextNodes.forEach(({ node, before, key, after }) => {
      if (node.isConnected) node.nodeValue = `${before}${textTranslations[key]?.[language] || key}${after}`;
    });
    originalAttributes.forEach(({ element, attribute, key }) => {
      if (element.isConnected) element.setAttribute(attribute, textTranslations[key]?.[language] || key);
    });
    document.documentElement.lang = language;
    document.title = locale.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = locale.description;
    const headerLabel = document.getElementById("siteLanguageLabel");
    if (headerLabel) headerLabel.textContent = locale.headerLabel;
    document.querySelectorAll(".course-item").forEach((item, index) => {
      const name = courseNames[language][index];
      if (name) {
        item.dataset.course = name;
        item.setAttribute("aria-label", name);
      }
    });
    document.querySelectorAll("#siteLanguageMenu [data-site-language]").forEach(option => {
      option.setAttribute("aria-selected", String(option.dataset.siteLanguage === language));
    });
    document.querySelectorAll(".language-links [data-site-language]").forEach(link => {
      if (link.dataset.siteLanguage === language) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    try { localStorage.setItem("anatomio-language", language); } catch (_) {}
    window.dispatchEvent(new CustomEvent("anatomio-language-change", { detail: { language } }));
    return language;
  }

  window.AnatomioI18n = {
    setLanguage,
    getLanguage: () => currentLanguage,
    getRuntime: () => runtimeCopy[currentLanguage]
  };

  setLanguage(currentLanguage);
})();
