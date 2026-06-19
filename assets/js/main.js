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
      'في هندسة الحاسوب تخرّجت فيه الأول على دفعتي. نُشرت أعمالي في NAACL وEMNLP ومؤتمر الويب (WWW) وWISE.',
    "btn.cv": "تحميل السيرة الذاتية",
    "btn.contact": "تواصل معي",

    "stat.msc": "معدل الماجستير · جامعة قطر",
    "stat.bsc": "معدل البكالوريوس · الأول على الدفعة",
    "stat.pubs": "أبحاث ومسودات أولية",
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
    "news.t3": "<b>MemeLens</b>، معيار متعدد اللغات والوسائط للميمات، صدر كمسودة أولية (قيد المراجعة لمؤتمر ACL 2026).",
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
    "proj.llamalens": "نموذج لغوي متعدد اللغات متخصص مع مجموعات بيانات تعليمية بالعربية والإنجليزية والهندية لتحليل الأخبار ووسائل التواصل.",
    "proj.memelens": "معيار ونماذج رؤية ولغة متعددة اللغات والوسائط لفهم الميمات.",
    "proj.memeintel": "اكتشاف قابل للتفسير للميمات الدعائية والمسيئة، صدر مع مجموعة بيانات MemeXplain.",
    "proj.propxplain": "اكتشاف الدعاية القابل للتفسير باستخدام النماذج اللغوية الكبيرة، صدر مع مجموعة بيانات PropXplain.",
    "proj.memereason": "شيفرة منهج التعلّم المعزّز (GRPO) وسلسلة التفكير للاكتشاف القابل للتفسير للميمات.",
    "proj.llmebench": "مساهم في إطار QCRI لتقييم النماذج اللغوية الكبيرة عبر مهام ولغات متعددة.",

    "contact.title": "تواصل",
    "contact.intro":
      "أسرع وسيلة للتواصل معي هي البريد الإلكتروني. يسعدني التعاون البحثي، خصوصاً في معالجة اللغات متعددة الوسائط وتقنيات اللغة العربية.",
    "contact.email": "البريد الإلكتروني",
    "contact.location": "📍 الدوحة، قطر · معهد قطر لبحوث الحوسبة (QCRI)"
  };

  // Keys left out of a dictionary (the name, "BibTeX", institution names, location)
  // fall back to the English markup automatically.
  const FR = {
    "nav.about": "À propos",
    "nav.news": "Actualités",
    "nav.publications": "Publications",
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "hero.eyebrow": "Assistant de recherche · QCRI",
    "hero.lead1": "Je suis assistant de recherche au <a href=\"https://www.hbku.edu.qa/en/qcri\" target=\"_blank\" rel=\"noopener\">Qatar Computing Research Institute (QCRI)</a>, où je travaille sur le traitement automatique du langage et les modèles multimodaux. Une grande partie de mes recherches porte sur la façon dont les modèles peuvent lire et raisonner sur les mèmes, et sur la détection de contenus nuisibles tels que les discours haineux et la propagande, avec un accent particulier sur l'arabe.",
    "hero.lead2": "Récemment, j'utilise l'apprentissage par renforcement (GRPO) et des méthodes de chaîne de pensée pour aider les modèles de langage et de vision-langage à mieux raisonner et à expliquer leurs décisions. J'ai terminé mon master en informatique à l'Université du Qatar début 2026, après une licence en génie informatique où j'ai été major de ma promotion. Mes travaux ont été présentés à NAACL, EMNLP, The Web Conference et WISE.",
    "btn.cv": "Télécharger le CV",
    "btn.contact": "Me contacter",
    "stat.msc": "Moyenne master · Université du Qatar",
    "stat.bsc": "Moyenne licence · Major de promotion",
    "stat.pubs": "Articles et preprints",
    "stat.venues": "Où paraissent mes travaux",
    "research.title": "Mes domaines de recherche",
    "research.c1.t": "TAL multimodal",
    "research.c1.d": "Des modèles vision-langage qui lisent les mèmes et raisonnent à leur sujet, y compris les contenus haineux et propagandistes dans plusieurs langues.",
    "research.c2.t": "Modération de contenu",
    "research.c2.d": "Détecter les contenus nuisibles et propagandistes d'une manière qui explique le raisonnement, et pas seulement l'étiquette.",
    "research.c3.t": "Technologies de la langue arabe",
    "research.c3.d": "Jeux de données, bancs d'essai et modèles multilingues qui améliorent le TAL pour l'arabe et d'autres langues peu dotées.",
    "research.c4.t": "RL pour les LLM",
    "research.c4.d": "Utiliser GRPO et la supervision par chaîne de pensée pour post-entraîner les modèles à un raisonnement et une explicabilité accrus.",
    "news.title": "Actualités",
    "news.d1": "juin 2026",
    "news.t1": "Nouveau preprint sur l'apprentissage par renforcement avec supervision par chaîne de pensée pour une détection explicable des mèmes (<a href=\"https://arxiv.org/abs/2606.15307\" target=\"_blank\" rel=\"noopener\">arXiv</a>).",
    "news.d2": "2026",
    "news.t2": "J'ai reçu le 3e prix du meilleur poster à la MenaML Winter School (KAUST) pour les travaux de ma thèse.",
    "news.d3": "2026",
    "news.t3": "<b>MemeLens</b>, un banc d'essai multilingue et multimodal pour les mèmes, publié en preprint (en cours d'évaluation pour ACL 2026).",
    "news.d4": "2026",
    "news.t4": "J'ai présenté des travaux sur les modèles de raisonnement pour la détection de mèmes haineux à The Web Conference (WWW 2026).",
    "news.d5": "janv. 2026",
    "news.t5": "J'ai obtenu mon master en informatique à l'Université du Qatar avec une moyenne de 4,0.",
    "news.d6": "2025",
    "news.t6": "Deux articles acceptés à EMNLP 2025 : <b>MemeIntel</b> (conférence principale) et <b>PropXplain</b> (Findings).",
    "publications.title": "Publications",
    "publications.intro": "Une sélection d'articles ci-dessous. La liste complète et à jour se trouve sur mon profil <a href=\"https://scholar.google.com/citations?user=h5tFJ7MAAAAJ&hl=en\" target=\"_blank\" rel=\"noopener\">Google&nbsp;Scholar</a>.",
    "pub.memelens": "Un banc d'essai et des modèles multilingues et multimodaux pour comprendre les mèmes.",
    "pub.thinking": "Les modèles de raisonnement (« pensée ») aident-ils vraiment à détecter les mèmes haineux ?",
    "pub.rlcot": "GRPO avec supervision par chaîne de pensée pour une détection multimodale explicable.",
    "pub.critisense": "Un outil pour la littératie numérique critique et la résilience face à la désinformation.",
    "pub.llamalens": "Un LLM multilingue ajusté par instructions pour analyser l'actualité et les contenus des réseaux sociaux.",
    "pub.memeintel": "Détection multimodale explicable, avec un jeu de données d'instructions dédié.",
    "pub.propxplain": "Utiliser les LLM pour rendre explicable la détection de propagande.",
    "pub.everyday": "Réponse à des questions visuelles orales ancrées culturellement.",
    "pub.judicial": "Les LLM pour la prédiction des décisions judiciaires en arabe.",
    "pub.native": "Mon article le plus cité : inciter dans sa langue maternelle aide-t-il ?",
    "pub.lung": "Apprentissage automatique pour détecter le niveau de cancer du poumon à partir de données de mode de vie.",
    "exp.title": "Expérience",
    "exp.r1": "Assistant de recherche",
    "exp.d1": "janv. 2025 – aujourd'hui",
    "exp.b1": "Travail sur le projet de parole Fanar pour entraîner de grands LLM de parole multilingues, avec des articles à EMNLP 2025 et WWW 2026 et d'autres en cours d'évaluation. J'ai aussi contribué à EduLLM (questions-réponses et tests).",
    "exp.r2": "Stagiaire de recherche",
    "exp.d2": "mai 2024 – janv. 2025",
    "exp.b2": "Premier auteur d'articles à WISE 2024 et NAACL 2025. 2e place au concours de programmation du QCRI 2024.",
    "exp.r3": "Stagiaire ingénieur logiciel",
    "exp.d3": "juil. 2022 – sept. 2022",
    "exp.b3": "Développement d'une application interne de sécurité pour le signalement d'incidents et la communication d'équipe.",
    "edu.title": "Formation",
    "edu.r1": "Master en informatique",
    "edu.d1": "2024 – 2026",
    "edu.o1": "Université du Qatar · Moyenne 4,0/4,0",
    "edu.r2": "Licence en génie informatique",
    "edu.d2": "2019 – 2023",
    "edu.o2": "Al-Ahliyya Amman University · Moyenne 3,99/4,0, major de promotion",
    "awards.title": "Distinctions",
    "awards.a1": "<b>3e meilleur poster</b> — MenaML Winter School, KAUST (2026)",
    "awards.a2": "<b>2e prix du poster de recherche</b> — QCRI (2024)",
    "awards.a3": "<b>2e place</b> — Concours de programmation QCRI (2024)",
    "awards.a4": "<b>Major de promotion (1er)</b> — Génie informatique, Al-Ahliyya Amman University (2023)",
    "projects.title": "Projets et ressources ouvertes",
    "projects.intro": "Jeux de données, modèles et systèmes que j'ai publiés avec mes recherches. La plupart sont publics sur GitHub et Hugging&nbsp;Face.",
    "proj.llamalens": "LLM multilingue spécialisé avec des jeux de données d'instructions en arabe, anglais et hindi pour analyser l'actualité et les réseaux sociaux.",
    "proj.memelens": "Banc d'essai et modèles vision-langage multilingues et multimodaux pour comprendre les mèmes.",
    "proj.memeintel": "Détection explicable des mèmes propagandistes et haineux, publiée avec le jeu de données MemeXplain.",
    "proj.propxplain": "Détection explicable de la propagande avec des LLM, publiée avec le jeu de données PropXplain.",
    "proj.memereason": "Code de l'approche par apprentissage par renforcement (GRPO) et chaîne de pensée pour une détection explicable des mèmes.",
    "proj.llmebench": "Contributeur au cadre d'évaluation du QCRI pour tester les LLM sur de nombreuses tâches et langues.",
    "contact.title": "Contact",
    "contact.intro": "Le moyen le plus rapide de me joindre est par e-mail. Je suis ouvert aux collaborations de recherche, en particulier autour du TAL multimodal et des technologies de la langue arabe.",
    "contact.email": "E-mail"
  };

  const DE = {
    "nav.about": "Über mich",
    "nav.news": "Neuigkeiten",
    "nav.publications": "Publikationen",
    "nav.experience": "Erfahrung",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",
    "hero.eyebrow": "Wissenschaftlicher Mitarbeiter · QCRI",
    "hero.lead1": "Ich bin wissenschaftlicher Mitarbeiter am <a href=\"https://www.hbku.edu.qa/en/qcri\" target=\"_blank\" rel=\"noopener\">Qatar Computing Research Institute (QCRI)</a>, wo ich an natürlicher Sprachverarbeitung und multimodalen Modellen arbeite. Ein Großteil meiner Forschung beschäftigt sich damit, wie Modelle Memes lesen und über sie schlussfolgern können und wie sich schädliche Inhalte wie Hassrede und Propaganda erkennen lassen, mit besonderem Fokus auf Arabisch.",
    "hero.lead2": "In letzter Zeit nutze ich bestärkendes Lernen (GRPO) und Chain-of-Thought-Methoden, um Sprach- und Vision-Sprach-Modellen zu besserem Schlussfolgern und zum Erklären ihrer Entscheidungen zu verhelfen. Anfang 2026 habe ich meinen Master in Informatik an der Qatar University abgeschlossen, nach einem Bachelor in Computertechnik, den ich als Jahrgangsbester absolvierte. Meine Arbeiten wurden bei NAACL, EMNLP, The Web Conference und WISE vorgestellt.",
    "btn.cv": "Lebenslauf herunterladen",
    "btn.contact": "Kontakt aufnehmen",
    "stat.msc": "Master-Note · Qatar University",
    "stat.bsc": "Bachelor-Note · Jahrgangsbester",
    "stat.pubs": "Artikel & Preprints",
    "stat.venues": "Wo meine Arbeiten erscheinen",
    "research.title": "Woran ich arbeite",
    "research.c1.t": "Multimodales NLP",
    "research.c1.d": "Vision-Sprach-Modelle, die Memes lesen und über sie schlussfolgern – einschließlich hetzerischer und propagandistischer Inhalte in mehreren Sprachen.",
    "research.c2.t": "Inhaltsmoderation",
    "research.c2.d": "Schädliche und propagandistische Inhalte so erkennen, dass nicht nur das Label, sondern auch die Begründung erklärt wird.",
    "research.c3.t": "Arabische Sprachtechnologie",
    "research.c3.d": "Datensätze, Benchmarks und mehrsprachige Modelle, die NLP für Arabisch und andere ressourcenarme Sprachen verbessern.",
    "research.c4.t": "RL für LLMs",
    "research.c4.d": "GRPO und Chain-of-Thought-Supervision nutzen, um Modelle für stärkeres Schlussfolgern und mehr Erklärbarkeit nachzutrainieren.",
    "news.title": "Neuigkeiten",
    "news.d1": "Juni 2026",
    "news.t1": "Neuer Preprint zu bestärkendem Lernen mit Chain-of-Thought-Supervision für erklärbare Meme-Erkennung (<a href=\"https://arxiv.org/abs/2606.15307\" target=\"_blank\" rel=\"noopener\">arXiv</a>).",
    "news.d2": "2026",
    "news.t2": "Ich erhielt den 3. Best-Poster-Award an der MenaML Winter School (KAUST) für meine Masterarbeit.",
    "news.d3": "2026",
    "news.t3": "<b>MemeLens</b>, ein mehrsprachiger, multimodaler Meme-Benchmark, als Preprint veröffentlicht (in Begutachtung für ACL 2026).",
    "news.d4": "2026",
    "news.t4": "Ich habe Arbeiten zu Reasoning-Modellen für die Erkennung hetzerischer Memes auf The Web Conference (WWW 2026) vorgestellt.",
    "news.d5": "Jan. 2026",
    "news.t5": "Ich habe meinen Master in Informatik an der Qatar University mit einer Note von 4,0 abgeschlossen.",
    "news.d6": "2025",
    "news.t6": "Zwei Artikel bei EMNLP 2025 angenommen: <b>MemeIntel</b> (Hauptkonferenz) und <b>PropXplain</b> (Findings).",
    "publications.title": "Publikationen",
    "publications.intro": "Ausgewählte Artikel unten. Die vollständige, aktuelle Liste findet sich in meinem <a href=\"https://scholar.google.com/citations?user=h5tFJ7MAAAAJ&hl=en\" target=\"_blank\" rel=\"noopener\">Google&nbsp;Scholar</a>-Profil.",
    "pub.memelens": "Ein mehrsprachiger, multimodaler Benchmark und Modelle zum Verständnis von Memes.",
    "pub.thinking": "Helfen Reasoning-Modelle („Denken“) tatsächlich bei der Erkennung hetzerischer Memes?",
    "pub.rlcot": "GRPO mit Chain-of-Thought-Supervision für erklärbare multimodale Erkennung.",
    "pub.critisense": "Ein Werkzeug für kritische digitale Kompetenz und Widerstandsfähigkeit gegen Desinformation.",
    "pub.llamalens": "Ein instruction-tuned mehrsprachiges LLM zur Analyse von Nachrichten und Social-Media-Inhalten.",
    "pub.memeintel": "Erklärbare multimodale Erkennung mit einem eigenen Instruktionsdatensatz.",
    "pub.propxplain": "LLMs nutzen, um die Propaganda-Erkennung erklärbar zu machen.",
    "pub.everyday": "Kulturell verankerte gesprochene visuelle Fragebeantwortung.",
    "pub.judicial": "LLMs zur Vorhersage arabischer Gerichtsurteile.",
    "pub.native": "Mein meistzitierter Artikel: Hilft das Prompten in der Muttersprache?",
    "pub.lung": "Maschinelles Lernen zur Erkennung des Lungenkrebs-Stadiums aus Lebensstil-Daten.",
    "exp.title": "Erfahrung",
    "exp.r1": "Wissenschaftlicher Mitarbeiter",
    "exp.d1": "Jan. 2025 – heute",
    "exp.b1": "Arbeit am Sprachprojekt Fanar zum Training großer mehrsprachiger Sprach-LLMs, mit Artikeln bei EMNLP 2025 und WWW 2026 sowie weiteren in Begutachtung. Außerdem Mitarbeit an EduLLM (Frage-Antwort und Tests).",
    "exp.r2": "Forschungspraktikant",
    "exp.d2": "Mai 2024 – Jan. 2025",
    "exp.b2": "Erstautor von Artikeln bei WISE 2024 und NAACL 2025. 2. Platz beim QCRI-Programmierwettbewerb 2024.",
    "exp.r3": "Praktikant Softwareentwicklung",
    "exp.d3": "Juli 2022 – Sep. 2022",
    "exp.b3": "Entwicklung einer internen Sicherheits-App für Vorfallsmeldungen und Teamkommunikation.",
    "edu.title": "Ausbildung",
    "edu.r1": "Master in Informatik",
    "edu.d1": "2024 – 2026",
    "edu.o1": "Qatar University · Note 4,0/4,0",
    "edu.r2": "Bachelor in Computertechnik",
    "edu.d2": "2019 – 2023",
    "edu.o2": "Al-Ahliyya Amman University · Note 3,99/4,0, Jahrgangsbester",
    "awards.title": "Auszeichnungen",
    "awards.a1": "<b>3. bestes Poster</b> — MenaML Winter School, KAUST (2026)",
    "awards.a2": "<b>2. Platz Forschungsposter</b> — QCRI (2024)",
    "awards.a3": "<b>2. Platz</b> — QCRI-Programmierwettbewerb (2024)",
    "awards.a4": "<b>Jahrgangsbester (1.)</b> — Computertechnik, Al-Ahliyya Amman University (2023)",
    "projects.title": "Projekte & offene Ressourcen",
    "projects.intro": "Datensätze, Modelle und Systeme, die ich mit meiner Forschung veröffentlicht habe. Die meisten sind öffentlich auf GitHub und Hugging&nbsp;Face.",
    "proj.llamalens": "Spezialisiertes mehrsprachiges LLM mit Instruktionsdatensätzen in Arabisch, Englisch und Hindi zur Analyse von Nachrichten und sozialen Medien.",
    "proj.memelens": "Mehrsprachiger, multimodaler Benchmark und Vision-Sprach-Modelle zum Verständnis von Memes.",
    "proj.memeintel": "Erklärbare Erkennung propagandistischer und hetzerischer Memes, veröffentlicht mit dem MemeXplain-Datensatz.",
    "proj.propxplain": "Erklärbare Propaganda-Erkennung mit LLMs, veröffentlicht mit dem PropXplain-Datensatz.",
    "proj.memereason": "Code für den Ansatz aus bestärkendem Lernen (GRPO) und Chain-of-Thought zur erklärbaren Meme-Erkennung.",
    "proj.llmebench": "Mitwirkender am Framework des QCRI zur Bewertung von LLMs über viele Aufgaben und Sprachen hinweg.",
    "contact.title": "Kontakt",
    "contact.intro": "Am schnellsten erreichen Sie mich per E-Mail. Ich bin offen für Forschungskooperationen, insbesondere rund um multimodales NLP und arabische Sprachtechnologie.",
    "contact.email": "E-Mail"
  };

  const NL = {
    "nav.about": "Over mij",
    "nav.news": "Nieuws",
    "nav.publications": "Publicaties",
    "nav.experience": "Ervaring",
    "nav.projects": "Projecten",
    "nav.contact": "Contact",
    "hero.eyebrow": "Onderzoeksassistent · QCRI",
    "hero.lead1": "Ik ben onderzoeksassistent bij het <a href=\"https://www.hbku.edu.qa/en/qcri\" target=\"_blank\" rel=\"noopener\">Qatar Computing Research Institute (QCRI)</a>, waar ik werk aan natuurlijke taalverwerking en multimodale modellen. Een groot deel van mijn onderzoek richt zich op hoe modellen memes kunnen lezen en erover kunnen redeneren, en op het detecteren van schadelijke inhoud zoals haatzaaiende taal en propaganda, met bijzondere aandacht voor het Arabisch.",
    "hero.lead2": "De laatste tijd gebruik ik reinforcement learning (GRPO) en chain-of-thought-methoden om taal- en vision-taalmodellen beter te laten redeneren en hun beslissingen te laten uitleggen. Ik heb mijn master in Computing aan Qatar University begin 2026 afgerond, na een bachelor in computertechniek waarvoor ik als beste van mijn jaar afstudeerde. Mijn werk is gepresenteerd op NAACL, EMNLP, The Web Conference en WISE.",
    "btn.cv": "Cv downloaden",
    "btn.contact": "Neem contact op",
    "stat.msc": "Mastercijfer · Qatar University",
    "stat.bsc": "Bachelorcijfer · Beste van het jaar",
    "stat.pubs": "Artikelen & preprints",
    "stat.venues": "Waar mijn werk verschijnt",
    "research.title": "Waar ik aan werk",
    "research.c1.t": "Multimodale NLP",
    "research.c1.d": "Vision-taalmodellen die memes lezen en erover redeneren, inclusief haatdragende en propagandistische inhoud in meerdere talen.",
    "research.c2.t": "Contentmoderatie",
    "research.c2.d": "Schadelijke en propagandistische inhoud detecteren op een manier die de redenering uitlegt, niet alleen het label.",
    "research.c3.t": "Arabische taaltechnologie",
    "research.c3.d": "Datasets, benchmarks en meertalige modellen die NLP beter laten werken voor het Arabisch en andere talen met weinig bronnen.",
    "research.c4.t": "RL voor LLM's",
    "research.c4.d": "GRPO en chain-of-thought-supervisie gebruiken om modellen na te trainen voor sterker redeneren en meer verklaarbaarheid.",
    "news.title": "Nieuws",
    "news.d1": "jun 2026",
    "news.t1": "Nieuwe preprint over reinforcement learning met chain-of-thought-supervisie voor verklaarbare meme-detectie (<a href=\"https://arxiv.org/abs/2606.15307\" target=\"_blank\" rel=\"noopener\">arXiv</a>).",
    "news.d2": "2026",
    "news.t2": "Ik ontving de 3e Best Poster Award op de MenaML Winter School (KAUST) voor mijn scriptieonderzoek.",
    "news.d3": "2026",
    "news.t3": "<b>MemeLens</b>, een meertalige, multimodale meme-benchmark, uitgebracht als preprint (in beoordeling voor ACL 2026).",
    "news.d4": "2026",
    "news.t4": "Ik presenteerde werk over redeneermodellen voor de detectie van haatdragende memes op The Web Conference (WWW 2026).",
    "news.d5": "jan 2026",
    "news.t5": "Ik heb mijn master in Computing aan Qatar University afgerond met een cijfer van 4,0.",
    "news.d6": "2025",
    "news.t6": "Twee artikelen geaccepteerd op EMNLP 2025: <b>MemeIntel</b> (hoofdspoor) en <b>PropXplain</b> (Findings).",
    "publications.title": "Publicaties",
    "publications.intro": "Een selectie van artikelen hieronder. De volledige, actuele lijst staat op mijn <a href=\"https://scholar.google.com/citations?user=h5tFJ7MAAAAJ&hl=en\" target=\"_blank\" rel=\"noopener\">Google&nbsp;Scholar</a>-profiel.",
    "pub.memelens": "Een meertalige, multimodale benchmark en modellen om memes te begrijpen.",
    "pub.thinking": "Helpen redeneermodellen (denkende modellen) echt bij het detecteren van haatdragende memes?",
    "pub.rlcot": "GRPO met chain-of-thought-supervisie voor verklaarbare multimodale detectie.",
    "pub.critisense": "Een hulpmiddel voor kritische digitale geletterdheid en weerbaarheid tegen desinformatie.",
    "pub.llamalens": "Een instruction-tuned meertalig LLM voor het analyseren van nieuws en socialemedia-inhoud.",
    "pub.memeintel": "Verklaarbare multimodale detectie, met een speciale instructiedataset.",
    "pub.propxplain": "LLM's gebruiken om propagandadetectie verklaarbaar te maken.",
    "pub.everyday": "Cultureel gefundeerde gesproken visuele vraagbeantwoording.",
    "pub.judicial": "LLM's voor het voorspellen van Arabische rechterlijke uitspraken.",
    "pub.native": "Mijn meest geciteerde artikel: helpt prompten in je moedertaal?",
    "pub.lung": "Machine learning om het longkankerniveau te bepalen op basis van leefstijlgegevens.",
    "exp.title": "Ervaring",
    "exp.r1": "Onderzoeksassistent",
    "exp.d1": "jan 2025 – heden",
    "exp.b1": "Werk aan het Fanar-spraakproject voor het trainen van grote meertalige spraak-LLM's, met artikelen op EMNLP 2025 en WWW 2026 en meer in beoordeling. Ook bijgedragen aan EduLLM (vraag-antwoord en testen).",
    "exp.r2": "Onderzoeksstagiair",
    "exp.d2": "mei 2024 – jan 2025",
    "exp.b2": "Eerste auteur van artikelen op WISE 2024 en NAACL 2025. 2e plaats in de QCRI-programmeerwedstrijd 2024.",
    "exp.r3": "Stagiair software-engineer",
    "exp.d3": "jul 2022 – sep 2022",
    "exp.b3": "Een interne veiligheidsapp gebouwd voor incidentmeldingen en teamcommunicatie.",
    "edu.title": "Opleiding",
    "edu.r1": "Master in Computing",
    "edu.d1": "2024 – 2026",
    "edu.o1": "Qatar University · Cijfer 4,0/4,0",
    "edu.r2": "Bachelor in computertechniek",
    "edu.d2": "2019 – 2023",
    "edu.o2": "Al-Ahliyya Amman University · Cijfer 3,99/4,0, beste van het jaar",
    "awards.title": "Onderscheidingen",
    "awards.a1": "<b>3e beste poster</b> — MenaML Winter School, KAUST (2026)",
    "awards.a2": "<b>2e plaats onderzoeksposter</b> — QCRI (2024)",
    "awards.a3": "<b>2e plaats</b> — QCRI-programmeerwedstrijd (2024)",
    "awards.a4": "<b>Beste afgestudeerde (1e)</b> — Computertechniek, Al-Ahliyya Amman University (2023)",
    "projects.title": "Projecten & open bronnen",
    "projects.intro": "Datasets, modellen en systemen die ik met mijn onderzoek heb gepubliceerd. De meeste zijn openbaar op GitHub en Hugging&nbsp;Face.",
    "proj.llamalens": "Gespecialiseerd meertalig LLM met instructiedatasets in het Arabisch, Engels en Hindi voor het analyseren van nieuws en sociale media.",
    "proj.memelens": "Meertalige, multimodale benchmark en vision-taalmodellen om memes te begrijpen.",
    "proj.memeintel": "Verklaarbare detectie van propagandistische en haatdragende memes, uitgebracht met de MemeXplain-dataset.",
    "proj.propxplain": "Verklaarbare propagandadetectie met LLM's, uitgebracht met de PropXplain-dataset.",
    "proj.memereason": "Code voor de aanpak met reinforcement learning (GRPO) en chain-of-thought voor verklaarbare meme-detectie.",
    "proj.llmebench": "Bijdrager aan het framework van QCRI voor het evalueren van LLM's over veel taken en talen.",
    "contact.title": "Contact",
    "contact.intro": "Het snelst bereik je me via e-mail. Ik sta open voor onderzoekssamenwerkingen, vooral rond multimodale NLP en Arabische taaltechnologie.",
    "contact.email": "E-mail"
  };

  const I18N = { ar: AR, fr: FR, de: DE, nl: NL };
  const SUPPORTED = ["en", "ar", "fr", "de", "nl"];

  const nodes = document.querySelectorAll("[data-i18n]");
  const originals = new Map();
  nodes.forEach((el) => originals.set(el, el.innerHTML));

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";
    const dict = I18N[lang]; // undefined for English (uses the original markup)
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    nodes.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = dict && dict[key] != null ? dict[key] : originals.get(el);
    });
    const sel = document.getElementById("langSelect");
    if (sel) sel.value = lang;
    localStorage.setItem(KEY, lang);
  }

  apply(localStorage.getItem(KEY) || "en");

  const sel = document.getElementById("langSelect");
  if (sel) sel.addEventListener("change", () => apply(sel.value));
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
