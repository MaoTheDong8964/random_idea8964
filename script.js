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
  promptInput.value = prompts[Math.floor(Math.random() * prompts.length)];
  buildResult();
});

document.querySelector("[data-generate]").addEventListener("click", buildResult);
promptInput.addEventListener("input", buildResult);
densityInput.addEventListener("input", buildResult);
codeVibeInput.addEventListener("input", buildResult);

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
buildResult();
