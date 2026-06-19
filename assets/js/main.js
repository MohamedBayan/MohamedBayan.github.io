// ---------- Theme toggle (persisted) ----------
(function () {
  const root = document.documentElement;
  const KEY = "mbk-theme";
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(KEY, next);
    });
  }
})();

// ---------- Bilingual EN / AR (persisted, RTL-aware) ----------
(function () {
  const root = document.documentElement;
  const KEY = "mbk-lang";

  // English is the default markup in index.html; only Arabic is stored here.
  const AR = {
    "nav.about": "نبذة",
    "nav.news": "المستجدات",
    "nav.publications": "المنشورات",
    "nav.experience": "الخبرة",
    "nav.projects": "المشاريع",
    "nav.contact": "تواصل",

    "hero.eyebrow": "مساعد باحث · معهد قطر لبحوث الحوسبة",
    "hero.h1": "محمد بيان قميناسي",
    "hero.lead1":
      'أعمل مساعد باحث في <a href="https://www.hbku.edu.qa/en/qcri" target="_blank" rel="noopener">معهد قطر لبحوث الحوسبة (QCRI)</a>، ' +
      'حيث أركّز على معالجة اللغات الطبيعية والنماذج متعددة الوسائط. ينصبّ معظم بحثي على كيفية قراءة النماذج ' +
      'للميمات والاستدلال عليها، وعلى اكتشاف المحتوى الضار مثل خطاب الكراهية والدعاية، مع تركيز خاص على اللغة العربية.',
    "hero.lead2":
      'في الآونة الأخيرة أستخدم التعلّم المعزّز (GRPO) وأساليب سلسلة التفكير لمساعدة النماذج اللغوية ونماذج الرؤية ' +
      'واللغة على الاستدلال بشكل أفضل وتفسير قراراتها. أنهيت ماجستير الحوسبة في جامعة قطر مطلع 2026، بعد بكالوريوس ' +
      'في هندسة الحاسوب تخرّجت فيه الأول على دفعتي. نُشرت أعمالي في NAACL وEMNLP وACL ومؤتمر الويب.',
    "btn.cv": "تحميل السيرة الذاتية",
    "btn.contact": "تواصل معي",

    "stat.msc": "معدل الماجستير · جامعة قطر",
    "stat.bsc": "معدل البكالوريوس · الأول على الدفعة",
    "stat.pubs": "بحث علمي محكّم",
    "stat.venues": "أماكن نشر أعمالي",

    "research.title": "مجالات عملي",
    "research.c1.t": "معالجة اللغات متعددة الوسائط",
    "research.c1.d": "نماذج رؤية ولغة تقرأ الميمات وتستدل عليها، بما في ذلك المحتوى المسيء والدعائي بعدة لغات.",
    "research.c2.t": "الإشراف على المحتوى",
    "research.c2.d": "اكتشاف المحتوى الضار والدعائي بطريقة تشرح المنطق، لا التصنيف فقط.",
    "research.c3.t": "تقنيات اللغة العربية",
    "research.c3.d": "بيانات ومعايير ونماذج متعددة اللغات تحسّن أداء معالجة العربية واللغات محدودة الموارد.",
    "research.c4.t": "التعلّم المعزّز للنماذج اللغوية",
    "research.c4.d": "استخدام GRPO والإشراف بسلسلة التفكير لتدريب النماذج على استدلال أقوى وقابلية أكبر للتفسير.",

    "news.title": "المستجدات",
    "news.d1": "يونيو 2026",
    "news.t1":
      'مسودّة بحثية جديدة حول التعلّم المعزّز مع الإشراف بسلسلة التفكير لاكتشاف الميمات القابل للتفسير ' +
      '(<a href="https://arxiv.org/abs/2606.15307" target="_blank" rel="noopener">arXiv</a>).',
    "news.d2": "2026",
    "news.t2": "حصلت على جائزة أفضل ملصق بحثي (المركز الثالث) في مدرسة MenaML الشتوية بجامعة KAUST عن بحث رسالتي.",
    "news.d3": "2026",
    "news.t3": "قُبل بحث <b>MemeLens</b> في Findings of ACL 2026.",
    "news.d4": "2026",
    "news.t4": "قدّمت عملاً حول نماذج الاستدلال لاكتشاف الميمات المسيئة في مؤتمر الويب (WWW 2026).",
    "news.d5": "يناير 2026",
    "news.t5": "أنهيت ماجستير الحوسبة في جامعة قطر بمعدل 4.0.",
    "news.d6": "2025",
    "news.t6": "قُبل بحثان في EMNLP 2025: <b>MemeIntel</b> (المسار الرئيسي) و<b>PropXplain</b> (ضمن Findings).",

    "publications.title": "المنشورات",
    "publications.intro":
      'مجموعة مختارة من الأبحاث أدناه. القائمة الكاملة والمحدّثة على ملفي في ' +
      '<a href="https://scholar.google.com/citations?user=h5tFJ7MAAAAJ&hl=en" target="_blank" rel="noopener">Google&nbsp;Scholar</a>.',
    "pub.memelens": "معيار ونماذج متعددة اللغات والوسائط لفهم الميمات.",
    "pub.thinking": "هل تساعد نماذج الاستدلال («التفكير») فعلاً في اكتشاف الميمات المسيئة؟",
    "pub.rlcot": "‏GRPO مع الإشراف بسلسلة التفكير للاكتشاف القابل للتفسير متعدد الوسائط.",
    "pub.critisense": "أداة للثقافة الرقمية النقدية ومقاومة التضليل.",
    "pub.llamalens": "نموذج لغوي متعدد اللغات مضبوط بالتعليمات لتحليل الأخبار ووسائل التواصل.",
    "pub.memeintel": "اكتشاف متعدد الوسائط قابل للتفسير، مع مجموعة بيانات تعليمية مخصصة.",
    "pub.propxplain": "استخدام النماذج اللغوية الكبيرة لجعل اكتشاف الدعاية قابلاً للتفسير.",
    "pub.everyday": "الإجابة عن الأسئلة المرئية المنطوقة ذات الجذور الثقافية.",
    "pub.judicial": "النماذج اللغوية الكبيرة للتنبؤ بالأحكام القضائية العربية.",
    "pub.native": "بحثي الأكثر اقتباساً: هل يساعد التلقين بلغتك الأم؟",
    "pub.lung": "تعلّم الآلة لاكتشاف مستويات سرطان الرئة من بيانات نمط الحياة.",

    "cite": "المرجع",

    "exp.title": "الخبرة",
    "exp.r1": "مساعد باحث",
    "exp.d1": "يناير 2025 – الآن",
    "exp.o1": "معهد قطر لبحوث الحوسبة (QCRI)",
    "exp.b1":
      "العمل على مشروع فَنار للكلام لتدريب نماذج كلام كبيرة متعددة اللغات، مع أبحاث في EMNLP 2025 وWWW 2026 " +
      "وأخرى قيد المراجعة. ساهمت أيضاً في EduLLM في الإجابة عن الأسئلة والاختبار.",
    "exp.r2": "متدرّب باحث",
    "exp.d2": "مايو 2024 – يناير 2025",
    "exp.o2": "معهد قطر لبحوث الحوسبة (QCRI)",
    "exp.b2": "أبحاث كمؤلف أول في WISE 2024 وNAACL 2025. المركز الثاني في مسابقة QCRI للبرمجة 2024.",
    "exp.r3": "متدرّب مهندس برمجيات",
    "exp.d3": "يوليو 2022 – سبتمبر 2022",
    "exp.o3": "شركة قطر لإضافات الوقود (QAFAC)",
    "exp.b3": "بناء تطبيق داخلي للسلامة للإبلاغ عن الحوادث والتواصل بين الفِرق.",

    "edu.title": "التعليم",
    "edu.r1": "ماجستير في الحوسبة",
    "edu.d1": "2024 – 2026",
    "edu.o1": "جامعة قطر · معدل 4.0/4.0",
    "edu.r2": "بكالوريوس في هندسة الحاسوب",
    "edu.d2": "2019 – 2023",
    "edu.o2": "جامعة عمّان الأهلية · معدل 3.99/4.0، الأول على الدفعة",

    "awards.title": "الجوائز",
    "awards.a1": "<b>أفضل ملصق – المركز الثالث</b> — مدرسة MenaML الشتوية، KAUST (2026)",
    "awards.a2": "<b>أفضل ملصق بحثي – المركز الثاني</b> — QCRI (2024)",
    "awards.a3": "<b>المركز الثاني</b> — مسابقة QCRI للبرمجة (2024)",
    "awards.a4": "<b>الأول على الدفعة</b> — هندسة الحاسوب، جامعة عمّان الأهلية (2023)",

    "projects.title": "المشاريع والموارد المفتوحة",
    "projects.intro":
      "بيانات ونماذج وأنظمة أصدرتها مع أبحاثي. معظمها متاح للعموم على GitHub وHugging&nbsp;Face.",
    "proj.arhate": "مجموعات بيانات لخطاب الكراهية بالعربية وموارد ميمات متعددة الوسائط لأبحاث الإشراف على المحتوى بالعربية.",
    "proj.memeagent": "وكيل رؤية ولغة مزوّد بالأدوات ومدرّب بـ GRPO يستدل على الميمات ويستدعي أدوات خارجية لاكتشاف المحتوى الضار.",
    "proj.grpo": "نظام تعلّم معزّز يجمع GRPO مع الإشراف بسلسلة التفكير للاكتشاف القابل للتفسير للميمات المسيئة والدعائية.",
    "proj.llamalens": "نموذج لغوي متعدد اللغات متخصص مع مجموعات بيانات تعليمية بالعربية والإنجليزية والهندية لتحليل الأخبار ووسائل التواصل.",
    "proj.memeintel": "تحليل ميمات متعدد الوسائط قابل للتفسير: مجموعات بيانات تعليمية، ونموذج MemeLens-VLM، ومعيار متعدد اللغات.",
    "proj.llmebench": "مساهم في إطار QCRI لتقييم النماذج اللغوية الكبيرة عبر مهام ولغات متعددة.",

    "contact.title": "تواصل",
    "contact.intro":
      "أسرع وسيلة للتواصل معي هي البريد الإلكتروني. يسعدني التعاون البحثي، خصوصاً في معالجة اللغات متعددة الوسائط وتقنيات اللغة العربية.",
    "contact.email": "البريد الإلكتروني",
    "contact.location": "📍 الدوحة، قطر · معهد قطر لبحوث الحوسبة (QCRI)"
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const originals = new Map();
  nodes.forEach((el) => originals.set(el, el.innerHTML));

  function apply(lang) {
    const ar = lang === "ar";
    root.lang = ar ? "ar" : "en";
    root.dir = ar ? "rtl" : "ltr";
    nodes.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = ar && AR[key] != null ? AR[key] : originals.get(el);
    });
    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = ar ? "EN" : "ع";
    localStorage.setItem(KEY, lang);
  }

  apply(localStorage.getItem(KEY) || "en");

  const btn = document.getElementById("langToggle");
  if (btn) btn.addEventListener("click", () => apply(root.lang === "ar" ? "en" : "ar"));
})();

// ---------- BibTeX toggle ----------
(function () {
  document.querySelectorAll(".cite-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pub = btn.closest(".pub");
      const pre = pub && pub.querySelector(".bibtex");
      if (pre) pre.classList.toggle("open");
    });
  });
})();

// ---------- Mobile nav ----------
(function () {
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  if (!burger || !links) return;
  burger.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
})();

// ---------- Footer year ----------
(function () {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
