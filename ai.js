document.addEventListener("DOMContentLoaded", () => {
  // ==== DOM Elements ====
  const chatContainer = document.getElementById("ai-chatbot");
  const chatHeader = chatContainer.querySelector(".chat-header");
  const chatBody = chatContainer.querySelector(".chat-body");
  const chatInput = chatContainer.querySelector(".chat-input");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const chatToggle = chatContainer.querySelector(".chat-toggle");

  // ==== Toggle chat open/minimized ====
  function toggleChat() {
    chatContainer.classList.toggle("minimized");
    const isMinimized = chatContainer.classList.contains("minimized");
    chatBody.style.display = isMinimized ? "none" : "block";
    chatInput.style.display = isMinimized ? "none" : "flex";
  }

  if (chatHeader) chatHeader.addEventListener("click", toggleChat);
  if (chatToggle) chatToggle.addEventListener("click", toggleChat);

  // ==== Append messages helper ====
  function appendMessage(sender, html) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.innerHTML = html;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // ==== Send message function ====
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user-message", `<b>You:</b> ${message}`);
    userInput.value = "";

    try {
      const response = await fetch("https://webservice-chat.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      appendMessage("bot-message", `<b>Harsh:</b> ${data.reply}`);
    } catch (err) {
      appendMessage(
        "bot-message",
        `<b>Harsh:</b> Sorry for the inconvenience, our agent is not available. 
         You can still contact me on 
         <a href='https://wa.me/917009349232' target='_blank' 
            style='text-decoration: underline; color:white; display:inline-flex; align-items:center;'>
            WhatsApp 
            <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' 
                 alt='WhatsApp' style='width:20px; height:20px; margin-left:5px;'>
         </a>`
      );
      console.error("Chatbot error:", err);
    }
  }

  // ==== Event listeners ====
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
