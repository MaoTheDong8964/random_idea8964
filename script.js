const promptInput = document.querySelector("[data-prompt]");
const activeMode = document.querySelector("[data-active-mode]");
const densityInput = document.querySelector("[data-density]");
const codeVibeInput = document.querySelector("[data-code-vibe]");
const structureList = document.querySelector("[data-structure]");
const interactionText = document.querySelector("[data-interaction]");
const codeBlock = document.querySelector("[data-code]");
const clock = document.querySelector("[data-clock]");
const currentGenre = document.querySelector("[data-current-genre]");
const currentTitle = document.querySelector("[data-current-title]");
const currentNote = document.querySelector("[data-current-note]");
const searchInput = document.querySelector("[data-search]");
const resultsContainer = document.querySelector("[data-results]");
const detailPanel = document.querySelector("[data-detail]");

const classics = {
  "赋": {
    title: "洛神赋",
    note: "以铺陈、想象和辞采见长，适合做“逐段赏析 + 意象地图 + 注释侧栏”的阅读界面。",
    bodyClass: "",
  },
  "诗": {
    title: "古诗十九首",
    note: "情感含蓄，语词凝练，适合做“关键词高亮 + 情绪线 + 白话对读”的诗歌界面。",
    bodyClass: "mode-poetry",
  },
  "表": {
    title: "出师表",
    note: "以陈情、劝勉和结构推进见长，适合做“语气分析 + 段落论证 + 历史背景”的阅读页。",
    bodyClass: "mode-memorial",
  },
  "书": {
    title: "与山巨源绝交书",
    note: "书信体带有强烈人格和立场，适合做“观点拆解 + 语气标注 + 关系图谱”。",
    bodyClass: "mode-poetry",
  },
  "序": {
    title: "兰亭集序",
    note: "序文连接场景、情感与文学生成，适合做“场景还原 + 句段赏析 + 主题流转”。",
    bodyClass: "",
  },
};

const prompts = [
  "围绕《洛神赋》做一个沉浸式阅读页，重点是意象、铺陈和注释联动。",
  "给《古诗十九首》做一个诗歌阅读器，突出情绪线、关键词和白话解释。",
  "为《出师表》做一个结构化阅读页，展示段落论证、历史背景和语气变化。",
];

const articles = [
  {
    title: "洛神赋",
    author: "曹植",
    dynasty: "魏",
    genre: "赋",
    keywords: ["神女", "辞采", "铺陈", "意象"],
    summary: "写人神相遇与怅别，辞采华美，适合做意象地图与逐段赏析。",
  },
  {
    title: "七发",
    author: "枚乘",
    dynasty: "西汉",
    genre: "赋",
    keywords: ["问答", "铺陈", "楚太子", "养生"],
    summary: "以七层铺陈推进劝谏，结构分明，适合做段落推进与主题卡片。",
  },
  {
    title: "古诗十九首",
    author: "无名氏",
    dynasty: "汉",
    genre: "诗",
    keywords: ["羁旅", "相思", "人生", "五言"],
    summary: "五言古诗代表，情感含蓄深远，适合做情绪线和关键词高亮。",
  },
  {
    title: "短歌行",
    author: "曹操",
    dynasty: "魏",
    genre: "诗",
    keywords: ["求贤", "人生", "慷慨", "宴饮"],
    summary: "以人生短暂引出求贤之意，适合做语气转折和典故提示。",
  },
  {
    title: "出师表",
    author: "诸葛亮",
    dynasty: "蜀汉",
    genre: "表",
    keywords: ["陈情", "劝勉", "北伐", "忠诚"],
    summary: "奏表名篇，情理兼备，适合做论证结构和历史背景联动。",
  },
  {
    title: "陈情表",
    author: "李密",
    dynasty: "西晋",
    genre: "表",
    keywords: ["孝亲", "陈情", "辞官", "身世"],
    summary: "以至情动人，层层陈述处境，适合做语气分析与段落逻辑。",
  },
  {
    title: "与山巨源绝交书",
    author: "嵇康",
    dynasty: "魏晋",
    genre: "书",
    keywords: ["人格", "绝交", "清谈", "自由"],
    summary: "书信体中见人格锋芒，适合做观点拆解和人物关系图。",
  },
  {
    title: "报任少卿书",
    author: "司马迁",
    dynasty: "西汉",
    genre: "书",
    keywords: ["史记", "苦难", "发愤", "生命"],
    summary: "自述遭际与著述志向，适合做生命史、关键词与注释侧栏。",
  },
  {
    title: "兰亭集序",
    author: "王羲之",
    dynasty: "东晋",
    genre: "序",
    keywords: ["雅集", "山水", "生命", "书法"],
    summary: "由宴集写到生命感怀，适合做场景复原、句段赏析和主题流转。",
  },
  {
    title: "归去来兮辞序",
    author: "陶渊明",
    dynasty: "东晋",
    genre: "序",
    keywords: ["归隐", "田园", "自述", "出处"],
    summary: "交代归隐缘起，适合做作者选择、生活理想和文本背景卡片。",
  },
];

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function setMode(mode) {
  const item = classics[mode];
  activeMode.textContent = mode;
  currentGenre.textContent = mode;
  currentTitle.textContent = item.title;
  currentNote.textContent = item.note;

  document.body.classList.remove("mode-poetry", "mode-memorial");
  if (item.bodyClass) {
    document.body.classList.add(item.bodyClass);
  }

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });
}

function selectArticle(article) {
  setMode(article.genre);
  currentGenre.textContent = article.genre;
  currentTitle.textContent = article.title;
  currentNote.textContent = article.summary;
  promptInput.value = `围绕《${article.title}》做一个《文选》阅读页，作者是${article.author}，重点呈现${article.keywords.slice(0, 3).join("、")}。`;
  buildResult();
  renderDetail(article);
  renderLibrary(searchInput.value, article.title);
}

function renderDetail(article) {
  detailPanel.innerHTML = `
    <span>${article.dynasty} · ${article.genre}</span>
    <h3>${article.title}</h3>
    <p>${article.author}。${article.summary}</p>
    <div class="article-meta">
      ${article.keywords.map((keyword) => `<em>${keyword}</em>`).join("")}
    </div>
  `;
}

function renderLibrary(query = "", selectedTitle = currentTitle.textContent) {
  const normalized = query.trim().toLowerCase();
  const filtered = articles.filter((article) => {
    const haystack = [
      article.title,
      article.author,
      article.dynasty,
      article.genre,
      article.summary,
      ...article.keywords,
    ].join(" ").toLowerCase();

    return !normalized || haystack.includes(normalized);
  });

  resultsContainer.innerHTML = filtered.length
    ? filtered.map((article) => `
      <button class="article-card ${article.title === selectedTitle ? "is-selected" : ""}" type="button" data-article="${article.title}">
        <small>${article.dynasty} · ${article.genre} · ${article.author}</small>
        <strong>${article.title}</strong>
        <p>${article.summary}</p>
        <span class="article-meta">
          ${article.keywords.slice(0, 4).map((keyword) => `<em>${keyword}</em>`).join("")}
        </span>
      </button>
    `).join("")
    : `<article class="article-card"><strong>未找到篇目</strong><p>可以试试搜索“赋”“诗”“曹植”“陈情”“序”。</p></article>`;

  resultsContainer.querySelectorAll("[data-article]").forEach((button) => {
    button.addEventListener("click", () => {
      const article = articles.find((item) => item.title === button.dataset.article);
      selectArticle(article);
    });
  });
}

function buildResult() {
  const prompt = promptInput.value.trim() || "一个《文选》阅读页面";
  const mode = activeMode.textContent;
  const density = Number(densityInput.value);
  const codeVibe = Number(codeVibeInput.value);
  const densityText = density > 3 ? "注释较密，适合认真研读" : "注释轻量，适合浏览入门";
  const codeText = codeVibe > 3 ? "输出更偏组件和数据结构" : "输出更偏阅读体验和版式";

  structureList.innerHTML = `
    <li>篇首：显示「${mode} · ${classics[mode].title}」和选篇说明</li>
    <li>正文：原文分段，重点句可展开注释、白话和典故</li>
    <li>侧栏：文体说明、作者信息、关键词、相关篇目推荐</li>
  `;

  interactionText.textContent = `当前是「${mode}」模式：${densityText}，${codeText}。这个 prompt 可以转成一个《文选》数字阅读器原型：${prompt}`;

  codeBlock.textContent = `const entry = {
  anthology: "文选",
  compiler: "萧统",
  genre: "${mode}",
  title: "${classics[mode].title}",
  annotationDensity: ${density}
};

export default function WenXuanReader() {
  return (
    <ReaderLayout entry={entry} codeVibe={${codeVibe}}>
      <OriginalText />
      <AnnotationPanel />
      <GenreMap />
    </ReaderLayout>
  );
}`;
}

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
    buildResult();
  });
});

document.querySelectorAll("[data-chip]").forEach((button) => {
  button.addEventListener("click", () => {
    promptInput.value = `${promptInput.value.trim()} ${button.dataset.chip}`.trim();
    buildResult();
  });
});

document.querySelectorAll("[data-template]").forEach((button) => {
  button.addEventListener("click", () => {
    promptInput.value = button.dataset.template;
    document.querySelector("#generator").scrollIntoView({ behavior: "smooth" });
    buildResult();
  });
});

document.querySelector("[data-quick-fill]").addEventListener("click", () => {
  const article = articles[Math.floor(Math.random() * articles.length)];
  selectArticle(article);
});

document.querySelector("[data-generate]").addEventListener("click", buildResult);
promptInput.addEventListener("input", buildResult);
densityInput.addEventListener("input", buildResult);
codeVibeInput.addEventListener("input", buildResult);

searchInput.addEventListener("input", () => renderLibrary(searchInput.value));

document.querySelector("[data-clear-search]").addEventListener("click", () => {
  searchInput.value = "";
  renderLibrary();
  searchInput.focus();
});

document.querySelectorAll("[data-search-chip]").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.searchChip;
    renderLibrary(searchInput.value);
  });
});

document.querySelector("[data-copy]").addEventListener("click", async (event) => {
  try {
    await navigator.clipboard.writeText(codeBlock.textContent);
    event.currentTarget.textContent = "已复制";
  } catch {
    event.currentTarget.textContent = "手动复制";
  }

  window.setTimeout(() => {
    event.currentTarget.textContent = "复制";
  }, 1200);
});

updateClock();
window.setInterval(updateClock, 30000);
renderLibrary();
renderDetail(articles[0]);
buildResult();
