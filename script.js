const S = {
  step:1,
  topic:"",
  target:"",
  method:"",
  aiMsg:"",
  featuresChecked:[false,false,false],
  userWrite:"",
  submissions:[]
};

const TOPICS = [
  "MBTI 성격검사",
  "인공지능(AI)",
  "모바일 게임",
  "반려동물",
  "K-팝",
  "웹툰",
  "지구온난화",
  "스마트폰 소통"
];

const TARGETS = [
  "또래 친구",
  "어린 동생",
  "부모님",
  "이 주제를 모르는 사람"
];

const METHODS = [
  "정의",
  "예시",
  "비교와 대조",
  "인과",
  "분류와 구분"
];

const STEP_LABELS = [
  "주제 선택",
  "독자 설정",
  "특징 확인",
  "서론 작성",
  "모둠 공유"
];

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899"
];

function saveData(){
  try{
    localStorage.setItem("introApp", JSON.stringify(S));
  }catch(e){}
}

function loadData(){
  try{
    const data = localStorage.getItem("introApp");

    if(data){
      Object.assign(S, JSON.parse(data));
    }
  }catch(e){}
}

function go(step){
  S.step = step;
  saveData();
  renderBar();
  render();
}

function renderBar(){

  const sbar = document.getElementById("sbar");

  sbar.innerHTML = "";

  STEP_LABELS.forEach((label,i)=>{

    const active = S.step === i+1;

    const item = document.createElement("div");
    item.className = "sw";

    item.innerHTML = `
      <div class="sd"
      style="background:${active ? COLORS[i] : '#d1d5db'}">
      ${i+1}
      </div>

      <div class="slb"
      style="color:${active ? '#111827' : '#9ca3af'}">
      ${label}
      </div>
    `;

    item.addEventListener("click",()=>{
      go(i+1);
    });

    sbar.appendChild(item);

  });

}

function render(){

  const el = document.getElementById("main");

  if(S.step === 1) render1(el);
  if(S.step === 2) render2(el);
  if(S.step === 3) render3(el);
  if(S.step === 4) render4(el);
  if(S.step === 5) render5(el);

}

function render1(el){

  el.innerHTML = `
  <div class="card">
    <div class="sh">
      <div class="sn" style="background:${COLORS[0]}">1</div>

      <div>
        <div class="stitle">설명할 주제 선택하기</div>
        <div class="sdesc">설명문 서론에 사용할 주제를 골라봅시다.</div>
      </div>
    </div>

    <div class="grid-2" id="topicGrid"></div>

    <button class="btn btn-p" id="nextBtn" style="display:none">
      다음 단계 ➔
    </button>
  </div>
  `;

  const grid = document.getElementById("topicGrid");

  TOPICS.forEach(topic=>{

    const btn = document.createElement("div");

    btn.className =
      `g-btn ${S.topic===topic ? 'sel' : ''}`;

    btn.textContent = topic;

    btn.addEventListener("click",()=>{

      S.topic = topic;

      saveData();
      render();

    });

    grid.appendChild(btn);

  });

  if(S.topic){

    const nextBtn = document.getElementById("nextBtn");

    nextBtn.style.display = "block";

    nextBtn.addEventListener("click",()=>{
      go(2);
    });

  }

}

function render2(el){

  el.innerHTML = `
  <div class="card">

    <div class="sh">
      <div class="sn" style="background:${COLORS[1]}">2</div>

      <div>
        <div class="stitle">독자 설정하기</div>
      </div>
    </div>

    <div class="grid-2" id="targetGrid"></div>

    <div id="targetBox"></div>

  </div>
  `;

  const grid = document.getElementById("targetGrid");

  TARGETS.forEach(target=>{

    const btn = document.createElement("div");

    btn.className =
      `g-btn ${S.target===target ? 'sel' : ''}`;

    btn.textContent = target;

    btn.addEventListener("click",()=>{

      S.target = target;

      if(target === "어린 동생"){
        S.aiMsg =
        "어려운 말보다 쉬운 예시를 활용해보세요.";
      }else{
        S.aiMsg =
        "독자의 관심을 끌 수 있는 시작이 좋아요.";
      }

      saveData();
      render();

    });

    grid.appendChild(btn);

  });

  if(S.target){

    const box = document.getElementById("targetBox");

    box.innerHTML = `
      <div class="ai-box">
        <div class="ai-h">🤖 메이트 AI</div>
        <div class="ai-m">${S.aiMsg}</div>
      </div>

      <button class="btn btn-p" id="go3">
        다음 단계 ➔
      </button>
    `;

    document.getElementById("go3")
    .addEventListener("click",()=>{
      go(3);
    });

  }

}

function render3(el){

  el.innerHTML = `
  <div class="card">

    <div class="sh">
      <div class="sn" style="background:${COLORS[2]}">3</div>

      <div>
        <div class="stitle">서론 요소 확인</div>
      </div>
    </div>

    <div id="checks"></div>

    <button class="btn btn-p" id="go4" style="display:none">
      다음 단계 ➔
    </button>

  </div>
  `;

  const items = [
    "화제를 자연스럽게 제시했나요?",
    "설명 대상을 소개했나요?",
    "설명 방법을 예고했나요?"
  ];

  const checks = document.getElementById("checks");

  items.forEach((txt,i)=>{

    const wrap = document.createElement("label");

    wrap.style.display = "flex";
    wrap.style.gap = "10px";
    wrap.style.marginBottom = "12px";

    wrap.innerHTML = `
      <input type="checkbox"
      ${S.featuresChecked[i] ? "checked" : ""}>
      <span>${txt}</span>
    `;

    const input = wrap.querySelector("input");

    input.addEventListener("change",(e)=>{

      S.featuresChecked[i] = e.target.checked;

      saveData();

      render3(el);

    });

    checks.appendChild(wrap);

  });

  if(S.featuresChecked.every(v=>v)){

    const go4 = document.getElementById("go4");

    go4.style.display = "block";

    go4.addEventListener("click",()=>{
      go(4);
    });

  }

}

function render4(el){

  el.innerHTML = `
  <div class="card">

    <div class="sh">
      <div class="sn" style="background:${COLORS[3]}">4</div>

      <div>
        <div class="stitle">설명문 작성하기</div>
      </div>
    </div>

    <div class="grid-2" id="methodGrid"></div>

    <div id="writeArea"></div>

  </div>
  `;

  const grid = document.getElementById("methodGrid");

  METHODS.forEach(method=>{

    const btn = document.createElement("div");

    btn.className =
      `g-btn ${S.method===method ? 'sel' : ''}`;

    btn.textContent = method;

    btn.addEventListener("click",()=>{

      S.method = method;

      S.aiMsg =
      `${method} 방법으로 서론을 써보세요.`;

      saveData();
      render();

    });

    grid.appendChild(btn);

  });

  if(S.method){

    const area = document.getElementById("writeArea");

    area.innerHTML = `
      <div class="ai-box">
        <div class="ai-h">🤖 메이트 AI</div>
        <div class="ai-m">${S.aiMsg}</div>
      </div>

      <textarea
      id="userText"
      rows="6"
      placeholder="설명문 서론을 작성하세요.">${S.userWrite}</textarea>

      <div id="feedback"></div>

      <button class="btn btn-p" id="submitBtn">
        제출하기
      </button>
    `;

    const textarea =
      document.getElementById("userText");

    textarea.addEventListener("input",(e)=>{

      S.userWrite = e.target.value;

      saveData();

      analyze(e.target.value);

    });

    document.getElementById("submitBtn")
    .addEventListener("click",submitText);

  }

}

function analyze(text){

  const fb = document.getElementById("feedback");

  if(!fb) return;

  const list = [];

  if(text.length > 20){
    list.push("✅ 충분한 분량입니다.");
  }

  if(text.includes(S.topic)){
    list.push("✅ 주제가 드러납니다.");
  }

  fb.innerHTML = list.map(v=>`
    <div class="fb">${v}</div>
  `).join("");

}

function submitText(){

  const text =
  document.getElementById("userText")
  .value
  .trim();

  if(!text){

    alert("글을 입력하세요.");
    return;

  }

  S.submissions.push({
    text:text,
    stickers:0
  });

  saveData();

  go(5);

}

function render5(el){

  el.innerHTML = `
  <div class="card">

    <div class="sh">
      <div class="sn" style="background:${COLORS[4]}">5</div>

      <div>
        <div class="stitle">모둠 공유</div>
      </div>
    </div>

    <div id="submissionList"></div>

    <button class="btn btn-p" id="resetBtn">
      새 활동 시작
    </button>

  </div>
  `;

  const list =
  document.getElementById("submissionList");

  S.submissions.forEach((item,i)=>{

    const box = document.createElement("div");

    box.className = "card";

    const textDiv = document.createElement("div");

    textDiv.textContent = item.text;

    const btn = document.createElement("button");

    btn.className = "btn btn-s";

    btn.textContent =
    `👍 스티커 ${item.stickers}`;

    btn.addEventListener("click",()=>{

      S.submissions[i].stickers++;

      saveData();
      render();

    });

    box.appendChild(textDiv);
    box.appendChild(btn);

    list.appendChild(box);

  });

  document.getElementById("resetBtn")
  .addEventListener("click",()=>{

    localStorage.removeItem("introApp");
    location.reload();

  });

}

window.addEventListener("DOMContentLoaded",()=>{

  loadData();

  renderBar();

  render();

});