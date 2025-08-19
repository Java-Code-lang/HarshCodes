document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("user-input");
  const chatBody = document.getElementById("chat-body");
  const sendButton = document.getElementById("send-btn"); // Ensure this matches your button ID

  // Send message on button click or Enter key press
  sendButton.addEventListener("click", sendMessage);
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    // Display user message
    appendMessage(userMessage, "user");
    inputField.value = "";

    // Show loading message
    const loadingMsg = appendMessage("⏳ Typing...", "bot");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      // Update loading message with bot response
      loadingMsg.textContent = data.response || "🤖 Sorry, I didn’t get that.";

    } catch (error) {
      console.error(error);
      loadingMsg.textContent = "⚠️ Failed to connect to AI server.";
    } finally {
      inputField.focus(); // Optional: focus input after sending
    }
  }

  function appendMessage(message, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-message" : "bot-message";
    msgDiv.textContent = message;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom
    return msgDiv;
  }
});
