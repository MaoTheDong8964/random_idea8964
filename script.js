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
const authorList = document.querySelector("[data-author-list]");
const authorMapCanvas = document.querySelector("[data-author-map]");
const mapFallback = document.querySelector("[data-map-fallback]");
let selectedAuthor = "曹植";
let mapState;

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
    content: "其形也，翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松。髣髴兮若轻云之蔽月，飘飖兮若流风之回雪。",
  },
  {
    title: "七发",
    author: "枚乘",
    dynasty: "西汉",
    genre: "赋",
    keywords: ["问答", "铺陈", "楚太子", "养生"],
    summary: "以七层铺陈推进劝谏，结构分明，适合做段落推进与主题卡片。",
    content: "楚太子有疾，而吴客往问之。客曰：将为太子奏方术，极声色之妙，穷游观之乐。",
  },
  {
    title: "古诗十九首",
    author: "无名氏",
    dynasty: "汉",
    genre: "诗",
    keywords: ["羁旅", "相思", "人生", "五言"],
    summary: "五言古诗代表，情感含蓄深远，适合做情绪线和关键词高亮。",
    content: "行行重行行，与君生别离。相去万余里，各在天一涯。思君令人老，岁月忽已晚。",
  },
  {
    title: "短歌行",
    author: "曹操",
    dynasty: "魏",
    genre: "诗",
    keywords: ["求贤", "人生", "慷慨", "宴饮"],
    summary: "以人生短暂引出求贤之意，适合做语气转折和典故提示。",
    content: "对酒当歌，人生几何。譬如朝露，去日苦多。青青子衿，悠悠我心。但为君故，沉吟至今。",
  },
  {
    title: "出师表",
    author: "诸葛亮",
    dynasty: "蜀汉",
    genre: "表",
    keywords: ["陈情", "劝勉", "北伐", "忠诚"],
    summary: "奏表名篇，情理兼备，适合做论证结构和历史背景联动。",
    content: "臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。受任于败军之际，奉命于危难之间。",
  },
  {
    title: "陈情表",
    author: "李密",
    dynasty: "西晋",
    genre: "表",
    keywords: ["孝亲", "陈情", "辞官", "身世"],
    summary: "以至情动人，层层陈述处境，适合做语气分析与段落逻辑。",
    content: "臣以险衅，夙遭闵凶。生孩六月，慈父见背；行年四岁，舅夺母志。祖母刘悯臣孤弱，躬亲抚养。",
  },
  {
    title: "与山巨源绝交书",
    author: "嵇康",
    dynasty: "魏晋",
    genre: "书",
    keywords: ["人格", "绝交", "清谈", "自由"],
    summary: "书信体中见人格锋芒，适合做观点拆解和人物关系图。",
    content: "吾每读尚子平、台孝威传，慨然慕之，想其为人。少加孤露，母兄见骄，不涉经学。",
  },
  {
    title: "报任少卿书",
    author: "司马迁",
    dynasty: "西汉",
    genre: "书",
    keywords: ["史记", "苦难", "发愤", "生命"],
    summary: "自述遭际与著述志向，适合做生命史、关键词与注释侧栏。",
    content: "人固有一死，或重于泰山，或轻于鸿毛，用之所趋异也。仆窃不逊，近自托于无能之辞。",
  },
  {
    title: "兰亭集序",
    author: "王羲之",
    dynasty: "东晋",
    genre: "序",
    keywords: ["雅集", "山水", "生命", "书法"],
    summary: "由宴集写到生命感怀，适合做场景复原、句段赏析和主题流转。",
    content: "永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。",
  },
  {
    title: "归去来兮辞序",
    author: "陶渊明",
    dynasty: "东晋",
    genre: "序",
    keywords: ["归隐", "田园", "自述", "出处"],
    summary: "交代归隐缘起，适合做作者选择、生活理想和文本背景卡片。",
    content: "余家贫，耕植不足以自给。幼稚盈室，瓶无储粟，生生所资，未见其术。",
  },
];

const googleBase = "https://www.google.com/search?q=";

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
  selectedAuthor = article.author;
  currentGenre.textContent = article.genre;
  currentTitle.textContent = article.title;
  currentNote.textContent = article.summary;
  promptInput.value = `围绕《${article.title}》做一个《文选》阅读页，作者是${article.author}，重点呈现${article.keywords.slice(0, 3).join("、")}。`;
  buildResult();
  renderDetail(article);
  renderLibrary(searchInput.value, article.title);
  renderAuthorList();
  updateAuthorMapHighlight();
}

function renderDetail(article) {
  detailPanel.innerHTML = `
    <span>${article.dynasty} · ${article.genre}</span>
    <h3>${article.title}</h3>
    <p>${article.author}。${article.summary}</p>
    <blockquote class="article-excerpt">${article.content}</blockquote>
    <div class="article-meta">
      ${article.keywords.map((keyword) => `<em>${keyword}</em>`).join("")}
    </div>
    <div class="article-actions">
      <a href="${buildExternalSearchUrl(article)}" target="_blank" rel="noopener">阅读全文 / 相关资料</a>
      <a class="secondary-action" href="${buildExternalSearchUrl(article, "赏析 注释")}" target="_blank" rel="noopener">查注释赏析</a>
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
      article.content,
      ...article.keywords,
    ].join(" ").toLowerCase();

    return !normalized || haystack.includes(normalized);
  });

  resultsContainer.innerHTML = filtered.length
    ? filtered.map((article) => `
      <article class="article-card ${article.title === selectedTitle ? "is-selected" : ""}">
        <small>${article.dynasty} · ${article.genre} · ${article.author}</small>
        <strong>${article.title}</strong>
        <p>${article.summary}</p>
        <blockquote class="article-excerpt">${highlightSnippet(article.content, normalized)}</blockquote>
        <span class="article-meta">
          ${article.keywords.slice(0, 4).map((keyword) => `<em>${keyword}</em>`).join("")}
        </span>
        <div class="article-actions">
          <button type="button" data-article="${article.title}">查看详情</button>
          <a href="${buildExternalSearchUrl(article)}" target="_blank" rel="noopener">阅读全文</a>
          <a class="secondary-action" href="${buildExternalSearchUrl(article, "相关研究")}" target="_blank" rel="noopener">相关内容</a>
        </div>
      </article>
    `).join("")
    : `<article class="article-card"><strong>本地库未收录</strong><p>这个版本不会假装已经拥有全库。可以直接用 Google 查「${query || "昭明文选"}」的原文、注释和相关内容。</p><div class="article-actions"><a href="${buildQuerySearchUrl(query || "昭明文选 原文")}" target="_blank" rel="noopener">Google 全网检索</a></div></article>`;

  resultsContainer.querySelectorAll("[data-article]").forEach((button) => {
    button.addEventListener("click", () => {
      const article = articles.find((item) => item.title === button.dataset.article);
      selectArticle(article);
    });
  });
}

function buildExternalSearchUrl(article, extra = "原文") {
  return buildQuerySearchUrl(`${article.title} ${article.author} 昭明文选 ${extra}`);
}

function buildQuerySearchUrl(query) {
  return `${googleBase}${encodeURIComponent(query)}`;
}

function highlightSnippet(content, query) {
  if (!query) {
    return content;
  }

  const index = content.toLowerCase().indexOf(query);
  if (index < 0) {
    return content;
  }

  const start = Math.max(0, index - 14);
  const end = Math.min(content.length, index + query.length + 22);
  return `${start > 0 ? "..." : ""}${content.slice(start, end)}${end < content.length ? "..." : ""}`;
}

function getAuthorStats() {
  return articles.reduce((stats, article) => {
    if (!stats[article.author]) {
      stats[article.author] = {
        author: article.author,
        dynasty: article.dynasty,
        count: 0,
        genres: new Set(),
        works: [],
      };
    }

    stats[article.author].count += 1;
    stats[article.author].genres.add(article.genre);
    stats[article.author].works.push(article.title);
    return stats;
  }, {});
}

function renderAuthorList() {
  const stats = Object.values(getAuthorStats()).sort((a, b) => b.count - a.count || a.author.localeCompare(b.author, "zh-CN"));
  authorList.innerHTML = stats.map((item) => `
    <button class="${item.author === selectedAuthor ? "is-highlighted" : ""}" type="button" data-author="${item.author}">
      <span>${item.author}</span>
      <small>${item.dynasty} · ${item.count} 篇 · ${Array.from(item.genres).join(" / ")}</small>
      <small>${item.works.join("、")}</small>
    </button>
  `).join("");

  authorList.querySelectorAll("[data-author]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAuthor = button.dataset.author;
      searchInput.value = selectedAuthor;
      renderLibrary(selectedAuthor);
      renderAuthorList();
      updateAuthorMapHighlight();
    });
  });
}

function runGoogleSearch() {
  const query = searchInput.value.trim() || currentTitle.textContent || "昭明文选";
  const fullQuery = `${query} 昭明文选 原文`;
  window.open(buildQuerySearchUrl(fullQuery), "_blank", "noopener");
}

function buildResult() {
  const prompt = promptInput.value.trim() || "一个《文选》阅读页面";
  const mode = activeMode.textContent;
  const density = Number(densityInput.value);
  const codeVibe = Number(codeVibeInput.value);
  const densityText = density > 3 ? "注释较密，适合认真研读" : "注释轻量，适合浏览入门";
  const codeText = codeVibe > 3 ? "输出更偏组件和数据结构" : "输出更偏阅读体验和版式";

  structureList.innerHTML = `
    <li>篇首：显示「${mode} · ${currentTitle.textContent}」和选篇说明</li>
    <li>正文：原文分段，重点句可展开注释、白话和典故</li>
    <li>侧栏：文体说明、作者信息、关键词、相关篇目推荐</li>
  `;

  interactionText.textContent = `当前是「${mode}」模式：${densityText}，${codeText}。这个 prompt 可以转成一个《文选》数字阅读器原型：${prompt}`;

  codeBlock.textContent = `const entry = {
  anthology: "文选",
  compiler: "萧统",
  genre: "${mode}",
  title: "${currentTitle.textContent}",
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

function initAuthorMap() {
  if (!window.THREE || !authorMapCanvas) {
    mapFallback.textContent = "3D 图谱需要加载 Three.js；若网络受限，可先使用右侧作者列表。";
    return;
  }

  const stats = Object.values(getAuthorStats());
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: authorMapCanvas,
    antialias: true,
    alpha: true,
  });
  const group = new THREE.Group();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const nodes = [];
  const colors = {
    "赋": 0xb83a2f,
    "诗": 0x2f7b67,
    "表": 0xc59b3f,
    "书": 0x2b9ca3,
    "序": 0x8f6b3e,
  };

  scene.add(group);
  scene.add(new THREE.AmbientLight(0xfff2df, 1.8));

  const light = new THREE.PointLight(0xffd28a, 2.4, 60);
  light.position.set(6, 8, 8);
  scene.add(light);
  camera.position.set(0, 0, 18);

  stats.forEach((item, index) => {
    const angle = (index / stats.length) * Math.PI * 2;
    const radius = 5.3 + (index % 3) * 0.72;
    const primaryGenre = Array.from(item.genres)[0];
    const size = 0.44 + item.count * 0.18;
    const geometry = new THREE.SphereGeometry(size, 32, 24);
    const material = new THREE.MeshStandardMaterial({
      color: colors[primaryGenre] || 0xb83a2f,
      emissive: colors[primaryGenre] || 0xb83a2f,
      emissiveIntensity: 0.16,
      roughness: 0.42,
      metalness: 0.08,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.cos(angle) * radius, Math.sin(index * 1.7) * 1.15, Math.sin(angle) * radius);
    mesh.userData.author = item.author;
    mesh.userData.baseScale = size;
    group.add(mesh);
    nodes.push(mesh);
  });

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(6.7, 0.01, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0xfff0d5, transparent: true, opacity: 0.28 })
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  function resize() {
    const rect = authorMapCanvas.parentElement.getBoundingClientRect();
    const width = Math.max(320, rect.width);
    const height = Math.max(320, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate() {
    group.rotation.y += 0.003;
    nodes.forEach((node) => {
      const isSelected = node.userData.author === selectedAuthor;
      const targetScale = isSelected ? 1.45 : 1;
      node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      node.material.emissiveIntensity = isSelected ? 0.55 : 0.16;
    });
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  authorMapCanvas.addEventListener("click", (event) => {
    const rect = authorMapCanvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(nodes)[0];
    if (hit) {
      selectedAuthor = hit.object.userData.author;
      searchInput.value = selectedAuthor;
      renderLibrary(selectedAuthor);
      renderAuthorList();
      updateAuthorMapHighlight();
    }
  });

  mapState = { nodes };
  mapFallback.hidden = true;
  resize();
  animate();
  window.addEventListener("resize", resize);
}

function updateAuthorMapHighlight() {
  if (!mapState) {
    return;
  }

  mapState.nodes.forEach((node) => {
    node.material.opacity = node.userData.author === selectedAuthor ? 1 : 0.78;
    node.material.transparent = true;
  });
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

document.querySelector("[data-google-search]").addEventListener("click", runGoogleSearch);

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
renderAuthorList();
buildResult();
initAuthorMap();
