/**
 * Neeli — CloudSync Assistant
 * Local Project Version
 */

(function () {

  const css = `
    #cs-bot-fab{
      position:fixed;
      bottom:28px;
      right:28px;
      z-index:99999;
      width:62px;
      height:62px;
      border-radius:50%;
      background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);
      border:none;
      cursor:pointer;
      color:white;
      font-size:24px;
      box-shadow:0 8px 24px rgba(14,165,233,.4);
    }

    #cs-bot-window{
      position:fixed;
      bottom:100px;
      right:28px;
      width:360px;
      height:500px;
      background:#0f172a;
      border-radius:18px;
      overflow:hidden;
      display:none;
      flex-direction:column;
      z-index:99998;
      border:1px solid rgba(255,255,255,.08);
      box-shadow:0 24px 60px rgba(0,0,0,.5);
      font-family:Arial,sans-serif;
    }

    .cs-header{
      background:#111827;
      padding:16px;
      color:white;
      font-weight:bold;
      border-bottom:1px solid rgba(255,255,255,.08);
    }

    .cs-messages{
      flex:1;
      overflow-y:auto;
      padding:14px;
      display:flex;
      flex-direction:column;
      gap:10px;
      background:#0b1120;
    }

    .cs-msg{
      max-width:80%;
      padding:10px 14px;
      border-radius:12px;
      line-height:1.5;
      font-size:14px;
    }

    .cs-bot{
      background:#1e293b;
      color:white;
      align-self:flex-start;
    }

    .cs-user{
      background:#2563eb;
      color:white;
      align-self:flex-end;
    }

    .cs-footer{
      padding:12px;
      display:flex;
      gap:8px;
      border-top:1px solid rgba(255,255,255,.08);
      background:#111827;
    }

    .cs-input{
      flex:1;
      padding:10px;
      border:none;
      border-radius:10px;
      background:#1e293b;
      color:white;
      outline:none;
    }

    .cs-send{
      background:#2563eb;
      border:none;
      color:white;
      padding:10px 14px;
      border-radius:10px;
      cursor:pointer;
    }
  `;

  const style = document.createElement("style");

  style.textContent = css;

  document.head.appendChild(style);


  // FAB BUTTON

  const fab = document.createElement("button");

  fab.id = "cs-bot-fab";

  fab.innerHTML = "💬";

  document.body.appendChild(fab);


  // CHAT WINDOW

  const win = document.createElement("div");

  win.id = "cs-bot-window";

  win.innerHTML = `

    <div class="cs-header">
      Neeli • CloudSync Assistant
    </div>

    <div class="cs-messages" id="cs-msgs">

    </div>

    <div class="cs-footer">

      <input
        type="text"
        id="cs-input"
        class="cs-input"
        placeholder="Ask something..."
      />

      <button
        id="cs-send"
        class="cs-send"
      >
        Send
      </button>

    </div>

  `;

  document.body.appendChild(win);


  const msgs =
    document.getElementById("cs-msgs");

  const input =
    document.getElementById("cs-input");

  const sendBtn =
    document.getElementById("cs-send");


  // OPEN CLOSE

  let opened = false;

  fab.onclick = () => {

    opened = !opened;

    win.style.display =
      opened ? "flex" : "none";

    if(opened && msgs.innerHTML === ""){

      addBotMsg(
        "Hi 👋 I'm Neeli, your CloudSync assistant. Ask me anything about file uploads, login, dashboard or this project."
      );
    }
  };


  // ADD BOT MESSAGE

  function addBotMsg(text){

    const div = document.createElement("div");

    div.className = "cs-msg cs-bot";

    div.innerHTML = text;

    msgs.appendChild(div);

    msgs.scrollTop = msgs.scrollHeight;
  }


  // ADD USER MESSAGE

  function addUserMsg(text){

    const div = document.createElement("div");

    div.className = "cs-msg cs-user";

    div.innerHTML = text;

    msgs.appendChild(div);

    msgs.scrollTop = msgs.scrollHeight;
  }


  // LOCAL RESPONSES

  function getReply(text){

    text = text.toLowerCase();

    if(text.includes("upload")){

      return "To upload a file, open dashboard and click the Choose File button.";
    }

    if(text.includes("login")){

      return "Use your registered email and password in the login page.";
    }

    if(text.includes("register")){

      return "Go to Sign Up tab and create your account.";
    }

    if(text.includes("mongodb")){

      return "This project uses MongoDB to store users and uploaded file metadata.";
    }

    if(text.includes("backend")){

      return "The backend is built using Node.js and Express.js.";
    }

    if(text.includes("who built")){

      return "CloudSync is a full stack student project using HTML, CSS, JavaScript, Node.js and MongoDB.";
    }

    return "I can help with login, uploads, dashboard, backend and MongoDB related questions.";
  }


  // SEND MESSAGE

  function sendMessage(){

    const text = input.value.trim();

    if(!text) return;

    addUserMsg(text);

    input.value = "";

    setTimeout(() => {

      addBotMsg(
        getReply(text)
      );

    }, 600);
  }


  sendBtn.onclick = sendMessage;


  input.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

      sendMessage();
    }
  });

})();