const works = [
  { author: "曹植", dynasty: "魏", title: "洛神赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E6%B4%9B%E7%A5%9E%E8%B3%A6" },
  { author: "曹植", dynasty: "魏", title: "七哀诗", genre: "诗", url: "https://zh.wikisource.org/wiki/%E4%B8%83%E5%93%80%E8%A9%A9_(%E6%98%8E%E6%9C%88%E7%85%A7%E9%AB%98%E6%A8%93)" },
  { author: "曹植", dynasty: "魏", title: "赠白马王彪", genre: "诗", url: "https://zh.wikisource.org/wiki/%E8%B4%88%E7%99%BD%E9%A6%AC%E7%8E%8B%E5%BD%AA" },
  { author: "曹植", dynasty: "魏", title: "責躬詩", genre: "诗", url: "https://zh.wikisource.org/wiki/%E8%B2%AC%E8%BA%AC%E8%A9%A9" },
  { author: "曹植", dynasty: "魏", title: "應詔詩", genre: "诗", url: "https://zh.wikisource.org/wiki/%E6%87%89%E8%A9%94%E8%A9%A9" },
  { author: "曹操", dynasty: "魏", title: "短歌行", genre: "诗", url: "https://zh.wikisource.org/wiki/%E7%9F%AD%E6%AD%8C%E8%A1%8C_(%E5%B0%8D%E9%85%92%E7%95%B6%E6%AD%8C)" },
  { author: "曹操", dynasty: "魏", title: "蒿里行", genre: "诗", url: "https://zh.wikisource.org/wiki/%E8%92%BF%E9%87%8C%E8%A1%8C" },
  { author: "王粲", dynasty: "魏", title: "登楼赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E7%99%BB%E6%A8%93%E8%B3%A6" },
  { author: "王粲", dynasty: "魏", title: "七哀诗", genre: "诗", url: "https://zh.wikisource.org/wiki/%E4%B8%83%E5%93%80%E8%A9%A9_(%E8%A5%BF%E4%BA%AC%E4%BA%82%E7%84%A1%E8%B1%A1)" },
  { author: "潘岳", dynasty: "西晋", title: "悼亡诗", genre: "诗", url: "https://zh.wikisource.org/wiki/%E6%82%BC%E4%BA%A1%E8%A9%A9" },
  { author: "潘岳", dynasty: "西晋", title: "西征赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E8%A5%BF%E5%BE%81%E8%B3%A6" },
  { author: "陆机", dynasty: "西晋", title: "文赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E6%96%87%E8%B3%A6" },
  { author: "陆机", dynasty: "西晋", title: "赴洛道中作", genre: "诗", url: "https://zh.wikisource.org/wiki/%E8%B5%B4%E6%B4%9B%E9%81%93%E4%B8%AD%E4%BD%9C" },
  { author: "左思", dynasty: "西晋", title: "咏史诗", genre: "诗", url: "https://zh.wikisource.org/wiki/%E8%A9%A0%E5%8F%B2%E8%A9%A9" },
  { author: "左思", dynasty: "西晋", title: "三都赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E4%B8%89%E9%83%BD%E8%B3%A6" },
  { author: "陶渊明", dynasty: "东晋", title: "归去来兮辞", genre: "辞", url: "https://zh.wikisource.org/wiki/%E6%AD%B8%E5%8E%BB%E4%BE%86%E5%85%AE%E8%BE%AD" },
  { author: "陶渊明", dynasty: "东晋", title: "杂诗", genre: "诗", url: "https://zh.wikisource.org/wiki/%E9%9B%9C%E8%A9%A9_(%E4%BA%BA%E7%94%9F%E7%84%A1%E6%A0%B9%E8%92%82)" },
  { author: "谢灵运", dynasty: "刘宋", title: "登池上楼", genre: "诗", url: "https://zh.wikisource.org/wiki/%E7%99%BB%E6%B1%A0%E4%B8%8A%E6%A8%93" },
  { author: "谢灵运", dynasty: "刘宋", title: "入彭蠡湖口", genre: "诗", url: "https://zh.wikisource.org/wiki/%E5%85%A5%E5%BD%AD%E8%A0%A1%E6%B9%96%E5%8F%A3" },
  { author: "谢朓", dynasty: "南齐", title: "晚登三山还望京邑", genre: "诗", url: "https://zh.wikisource.org/wiki/%E6%99%9A%E7%99%BB%E4%B8%89%E5%B1%B1%E9%82%84%E6%9C%9B%E4%BA%AC%E9%82%91" },
  { author: "鲍照", dynasty: "刘宋", title: "拟行路难", genre: "诗", url: "https://zh.wikisource.org/wiki/%E6%93%AC%E8%A1%8C%E8%B7%AF%E9%9B%A3" },
  { author: "江淹", dynasty: "梁", title: "别赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E5%88%A5%E8%B3%A6" },
  { author: "江淹", dynasty: "梁", title: "恨赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E6%81%A8%E8%B3%A6" },
  { author: "枚乘", dynasty: "西汉", title: "七发", genre: "赋", url: "https://zh.wikisource.org/wiki/%E4%B8%83%E7%99%BC" },
  { author: "司马相如", dynasty: "西汉", title: "子虚赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E5%AD%90%E8%99%9B%E8%B3%A6" },
  { author: "司马相如", dynasty: "西汉", title: "上林赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E4%B8%8A%E6%9E%97%E8%B3%A6" },
  { author: "班固", dynasty: "东汉", title: "两都赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E5%85%A9%E9%83%BD%E8%B3%A6" },
  { author: "张衡", dynasty: "东汉", title: "二京赋", genre: "赋", url: "https://zh.wikisource.org/wiki/%E4%BA%8C%E4%BA%AC%E8%B3%A6" },
  { author: "嵇康", dynasty: "魏晋", title: "与山巨源绝交书", genre: "书", url: "https://zh.wikisource.org/wiki/%E8%88%87%E5%B1%B1%E5%B7%A8%E6%BA%90%E7%B5%95%E4%BA%A4%E6%9B%B8" },
  { author: "李密", dynasty: "西晋", title: "陈情表", genre: "表", url: "https://zh.wikisource.org/wiki/%E9%99%B3%E6%83%85%E8%A1%A8" },
  { author: "诸葛亮", dynasty: "蜀汉", title: "出师表", genre: "表", url: "https://zh.wikisource.org/wiki/%E5%87%BA%E5%B8%AB%E8%A1%A8" },
  { author: "王羲之", dynasty: "东晋", title: "兰亭集序", genre: "序", url: "https://zh.wikisource.org/wiki/%E8%98%AD%E4%BA%AD%E9%9B%86%E5%BA%8F" }
];

const palette = {
  "西汉": 0xe2b84f,
  "东汉": 0xd14a36,
  "魏": 0x5bc0a1,
  "蜀汉": 0x8fc15d,
  "西晋": 0x4db7c6,
  "东晋": 0xc78a5a,
  "魏晋": 0xbfa0ff,
  "刘宋": 0x72a1ff,
  "南齐": 0xf08a75,
  "梁": 0xf0d36b
};

const grouped = Object.values(works.reduce((map, work) => {
  if (!map[work.author]) {
    map[work.author] = { author: work.author, dynasty: work.dynasty, works: [] };
  }
  map[work.author].works.push(work);
  return map;
}, {}));

let selectedAuthor = "曹植";
let scene;
let camera;
let renderer;
let authorGroup;
let raycaster;
let pointer;
let nodes = [];
let labels = [];
let visibleAuthors = grouped;
let rotationVelocity = 0.0028;

const canvas = document.querySelector("#author-map");
const fallback = document.querySelector("[data-fallback]");
const labelLayer = document.querySelector("[data-label-layer]");
const flatMap = document.querySelector("[data-flat-map]");
const detail = document.querySelector("[data-detail]");
const activeAuthor = document.querySelector("[data-active-author]");
const workList = document.querySelector("[data-work-list]");
const search = document.querySelector("[data-search]");
const searchResults = document.querySelector("[data-search-results]");
const openFirstButton = document.querySelector("[data-open-first]");
let currentMatches = works;
let currentOpenUrl = works[0].url;

document.querySelector("[data-author-count]").textContent = grouped.length;
document.querySelector("[data-work-count]").textContent = works.length;
renderFlatMap(grouped);

function init() {
  if (!window.THREE) {
    showFallback("3D 引擎没有加载成功。请确认网络可访问 Three.js CDN。");
    return;
  }

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  authorGroup = new THREE.Group();
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  scene.add(authorGroup);
  scene.add(new THREE.AmbientLight(0xfff2d8, 1.4));

  const light = new THREE.PointLight(0xffd38a, 3, 90);
  light.position.set(8, 10, 9);
  scene.add(light);
  camera.position.set(0, 1.4, 20);

  buildNodes(grouped);
  addRings();
  bindControls();
  resize();
  selectAuthor(selectedAuthor);
  animate();

  window.addEventListener("resize", resize);
}

function buildNodes(authors) {
  visibleAuthors = authors;
  authorGroup.clear();
  labelLayer.innerHTML = "";
  labels = [];
  nodes = [];
  renderFlatMap(visibleAuthors);

  authors.forEach((item, index) => {
    const angle = (index / authors.length) * Math.PI * 2;
    const band = index % 4;
    const radius = 4.6 + band * 1.45;
    const size = 0.38 + Math.sqrt(item.works.length) * 0.24;
    const geometry = new THREE.SphereGeometry(size, 36, 24);
    const color = palette[item.dynasty] || 0xe2b84f;
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.18,
      roughness: 0.35,
      metalness: 0.1
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.cos(angle) * radius, Math.sin(index * 1.37) * 2.2, Math.sin(angle) * radius);
    mesh.userData = item;
    authorGroup.add(mesh);
    nodes.push(mesh);

    const label = document.createElement("span");
    label.className = "map-label";
    label.textContent = item.author;
    labelLayer.appendChild(label);
    labels.push({ label, mesh });
  });
}

function renderFlatMap(authors) {
  flatMap.innerHTML = "";
  authors.forEach((item, index) => {
    const angle = (index / authors.length) * Math.PI * 2;
    const radius = 27 + (index % 4) * 7;
    const x = 56 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius * 0.72;
    const node = document.createElement("span");
    node.className = "flat-node";
    node.textContent = item.author;
    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    node.style.width = `${42 + item.works.length * 8}px`;
    node.style.height = `${42 + item.works.length * 8}px`;
    node.style.opacity = item.author === selectedAuthor ? "1" : "0.72";
    flatMap.appendChild(node);
  });
}

function addRings() {
  [4.6, 6.05, 7.5, 8.95].forEach((radius) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.01, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0xf8eed9, transparent: true, opacity: 0.14 })
    );
    ring.rotation.x = Math.PI / 2;
    authorGroup.add(ring);
  });
}

function bindControls() {
  let dragging = false;
  let lastX = 0;

  canvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    lastX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientX - lastX;
    authorGroup.rotation.y += delta * 0.006;
    lastX = event.clientX;
  });

  canvas.addEventListener("pointerup", () => {
    dragging = false;
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    camera.position.z = Math.min(30, Math.max(10, camera.position.z + event.deltaY * 0.01));
  }, { passive: false });

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(nodes)[0];
    if (hit) {
      selectAuthor(hit.object.userData.author);
    }
  });

  search.addEventListener("input", applySearch);

  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && currentOpenUrl) {
      event.preventDefault();
      window.location.href = currentOpenUrl;
    }
  });

  openFirstButton.addEventListener("click", () => {
    if (currentOpenUrl) {
      window.location.href = currentOpenUrl;
    }
  });

  document.querySelector("[data-reset]").addEventListener("click", () => {
    search.value = "";
    applySearch();
    selectAuthor("曹植");
  });
}

function matchWorks(query = "") {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return works.filter((work) => work.author === selectedAuthor);
  }
  return works.filter((work) => `${work.author} ${work.dynasty} ${work.title} ${work.genre}`.toLowerCase().includes(normalized));
}

function applySearch() {
  const query = search.value.trim();
  const matches = matchWorks(query);
  const authorSet = new Set(matches.map((work) => work.author));
  const filtered = query ? grouped.filter((author) => authorSet.has(author.author)) : grouped;

  buildNodes(filtered.length ? filtered : grouped);
  addRings();
  renderSearchResults(query, matches);

  if (matches[0]) {
    selectAuthor(matches[0].author);
  }
}

function renderSearchResults(query = "", matches = matchWorks(query)) {
  currentMatches = matches;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query + " 昭明文选 原文")}`;
  currentOpenUrl = matches[0] ? matches[0].url : googleUrl;

  searchResults.innerHTML = matches.slice(0, 8).map((work) => `
    <a class="search-result" href="${work.url}">
      <span>《${work.title}》</span>
      <small>${work.author} · ${work.dynasty} · ${work.genre}</small>
    </a>
  `).join("") || `
    <a class="search-result" href="${googleUrl}">
      <span>没有本地结果，去 Google 查</span>
      <small>外部搜索</small>
    </a>
  `;
}

function selectAuthor(author) {
  selectedAuthor = author;
  const item = grouped.find((entry) => entry.author === author) || grouped[0];
  activeAuthor.textContent = item.author;
  detail.innerHTML = `
    <span>${item.dynasty} · ${item.works.length} 篇</span>
    <h2>${item.author}</h2>
    <p>${item.works.map((work) => `《${work.title}》`).join("、")}</p>
  `;
  workList.innerHTML = item.works.map((work) => `
    <a class="work-item" href="${work.url}">
      <span>${work.title}</span>
      <small>${work.genre}</small>
    </a>
  `).join("");
  renderFlatMap(visibleAuthors);
  if (!search.value.trim()) {
    renderSearchResults("");
  }
}

function resize() {
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  authorGroup.rotation.y += rotationVelocity;
  nodes.forEach((node) => {
    const target = node.userData.author === selectedAuthor ? 1.65 : 1;
    node.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
    node.material.emissiveIntensity = node.userData.author === selectedAuthor ? 0.62 : 0.18;
  });
  renderer.render(scene, camera);
  updateLabels();
  requestAnimationFrame(animate);
}

function updateLabels() {
  labels.forEach(({ label, mesh }) => {
    const vector = mesh.position.clone();
    authorGroup.localToWorld(vector);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (-vector.y * 0.5 + 0.5) * canvas.clientHeight;
    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    label.style.opacity = vector.z < 1 ? "1" : "0";
    label.style.color = mesh.userData.author === selectedAuthor ? "#a54231" : "rgba(49, 34, 20, 0.86)";
  });
}

function showFallback(message) {
  fallback.hidden = false;
  fallback.textContent = message;
}

init();
