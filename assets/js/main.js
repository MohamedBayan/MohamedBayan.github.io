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

  // Arabic translations. English is the default markup in index.html, so we only
  // store Arabic here. Keys map to [data-i18n] attributes in the HTML.
  const AR = {
    "nav.about": "نبذة عني",
    "nav.research": "الاهتمامات البحثية",
    "nav.publications": "المنشورات",
    "nav.projects": "المشاريع",
    "nav.contact": "تواصل",

    "hero.eyebrow": "مساعد باحث · معالجة اللغات الطبيعية والذكاء الاصطناعي متعدد الوسائط",
    "hero.h1": "محمد بيان قميناسي",
    "hero.lead1":
      'أعمل مساعد باحث في معالجة اللغات الطبيعية والذكاء الاصطناعي متعدد الوسائط في ' +
      '<a href="https://www.hbku.edu.qa/en/qcri" target="_blank" rel="noopener">معهد قطر لبحوث الحوسبة (QCRI)</a>. ' +
      'يركّز عملي على الفهم اللغوي متعدد الوسائط، ومكافحة التضليل الرقمي، وتقنيات اللغة العربية، ' +
      'والتعلّم المعزّز لتدريب النماذج اللغوية الكبيرة.',
    "hero.lead2":
      'أكملت مؤخرًا درجة الماجستير في الحوسبة من جامعة قطر (المعدل 4.0/4.0)، وأحمل بكالوريوس في ' +
      'هندسة الحاسوب (المعدل 3.99/4.0، الأول على الدفعة). نُشرت أبحاثي في مؤتمرات رائدة من فئة ACL ' +
      'تشمل NAACL وEMNLP وACL وWWW.',
    "btn.cv": "تحميل السيرة الذاتية",
    "btn.contact": "تواصل معي",

    "stat.msc": "معدل الماجستير · جامعة قطر",
    "stat.bsc": "معدل البكالوريوس · الأول على الدفعة",
    "stat.pubs": "بحث علمي محكّم",
    "stat.venues": "مؤتمرات النشر",

    "research.title": "الاهتمامات البحثية",
    "research.intro":
      "أبني وأدرس نماذج تفهم اللغة والصورة معًا، مع التركيز على مشكلات ذات أثر اجتماعي — " +
      "التضليل، والمحتوى المسيء، والتقنية العادلة للعربية واللغات الأخرى محدودة الموارد.",
    "research.c1.t": "معالجة اللغات متعددة الوسائط",
    "research.c1.d": "نماذج الرؤية واللغة للميمات، واكتشاف المحتوى المسيء، وتحليل الدعاية عبر اللغات والوسائط.",
    "research.c2.t": "الإشراف على المحتوى ومكافحة التضليل",
    "research.c2.d": "اكتشاف قابل للتفسير للمحتوى المسيء والدعائي لدعم بيئة رقمية أكثر أمانًا وموثوقية.",
    "research.c3.t": "تقنيات اللغة العربية",
    "research.c3.d": "بيانات ومعايير ونماذج لغوية كبيرة متعددة اللغات تطوّر معالجة العربية واللغات محدودة الموارد.",
    "research.c4.t": "التعلّم المعزّز لتدريب النماذج اللغوية",
    "research.c4.d": "التعلّم المعزّز (GRPO) مع الإشراف بسلسلة التفكير من أجل الاستدلال والاكتشاف القابل للتفسير متعدد الوسائط.",

    "publications.title": "منشورات مختارة",
    "publications.intro":
      'مجموعة مختارة من الأعمال المحكّمة والمسودات الأولية. للاطلاع على القائمة الكاملة والأحدث، ' +
      'يرجى زيارة ملفي على <a href="https://scholar.google.com/citations?user=h5tFJ7MAAAAJ&hl=en" target="_blank" rel="noopener">Google&nbsp;Scholar</a>.',
    "pub.memelens": "معيار ونماذج متعددة اللغات لفهم الميمات.",
    "pub.llamalens": "نموذج لغوي كبير متعدد اللغات مضبوط بالتعليمات لتحليل الأخبار ووسائل التواصل.",
    "pub.memeintel": "اكتشاف متعدد الوسائط قابل للتفسير مع مجموعة بيانات تعليمية مخصصة.",
    "pub.propxplain": "اكتشاف الدعاية القابل للتفسير المعتمد على النماذج اللغوية الكبيرة.",
    "pub.thinking": "نماذج الاستدلال («التفكير») لاكتشاف الميمات المسيئة.",
    "pub.rlcot": "‏GRPO مع سلسلة التفكير للاكتشاف القابل للتفسير متعدد الوسائط.",
    "pub.critisense": "أدوات للثقافة الرقمية النقدية ومقاومة التضليل.",
    "pub.everyday": "الإجابة عن الأسئلة المرئية المنطوقة ذات الجذور الثقافية.",
    "pub.native": "العمل الأكثر اقتباسًا · دراسة مقارنة للتلقين باللغة الأم مقابل غير الأم.",
    "pub.judicial": "النماذج اللغوية الكبيرة للتنبؤ بالأحكام القضائية العربية.",
    "pub.lung": "تعلّم الآلة لاكتشاف مستويات سرطان الرئة من بيانات نمط الحياة.",

    "projects.title": "المشاريع والموارد المفتوحة",
    "projects.intro":
      "بيانات ونماذج وأنظمة مفتوحة صدرت مع أبحاثي. معظم الموارد متاحة للعموم على GitHub وHugging&nbsp;Face.",
    "proj.arhate": "مجموعات بيانات لخطاب الكراهية بالعربية وموارد ميمات متعددة الوسائط لأبحاث الإشراف على المحتوى بالعربية.",
    "proj.memeagent": "وكيل رؤية ولغة مزوّد بالأدوات ومدرّب باستخدام GRPO للاستدلال حول الميمات واستدعاء أدوات خارجية للاكتشاف.",
    "proj.grpo": "نظام تعلّم معزّز يستخدم GRPO مع الإشراف بسلسلة التفكير لاكتشاف قابل للتفسير للميمات المسيئة والدعائية.",
    "proj.llamalens": "نموذج لغوي كبير متعدد اللغات متخصص ومجموعات بيانات تعليمية (العربية، الإنجليزية، الهندية) لتحليل محتوى الأخبار ووسائل التواصل.",
    "proj.memeintel": "تحليل ميمات متعدد الوسائط قابل للتفسير — مجموعات بيانات تعليمية، ونموذج MemeLens-VLM، ومعيار متعدد اللغات.",
    "proj.llmebench": "مساهم في إطار QCRI المرن لتقييم النماذج اللغوية الكبيرة عبر مهام ولغات متعددة.",

    "contact.title": "تواصل",
    "contact.intro":
      "يسعدني دائمًا مناقشة معالجة اللغات الطبيعية متعددة الوسائط، وتقنيات اللغة العربية، والتعاون البحثي. " +
      "أفضل وسيلة للتواصل معي هي البريد الإلكتروني.",
    "contact.email": "البريد الإلكتروني",
    "contact.location": "📍 الدوحة، قطر · معهد قطر لبحوث الحوسبة (QCRI)",

    "footer.note": "بُني بلغات HTML وCSS وJavaScript · منشور على GitHub Pages"
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
