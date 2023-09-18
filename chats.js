let token = localStorage.getItem("token");
async function sendMessage(event) {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();

  if (message !== "") {
    const message = document.getElementById("messageInput").value;
    // const user_id=document.querySelector('#user-id');
    const data = {
      message: message,
    };
    const chat = await axios.post("http://localhost:3001/users/message", data, {
      headers: { Authorization: token },
    });
    console.log(chat);
    if (chat.status == 200) {
    }

    const messageContainer = document.getElementById("messageContainer");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message outgoing-message";
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
    messageInput.value = "";
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}
document.addEventListener("DOMContentLoaded", getMessage());
async function getMessage() {
  const responseChat = await axios.get(
    "http://localhost:3001/users/viewmessage",
    {
      headers: { Authorization: token },
    }
  );

  for (const msg of responseChat.data.data) {
    const messageContainer = document.getElementById("messageContainer");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message outgoing-message";
    messageDiv.textContent = msg.messages;
    messageContainer.appendChild(messageDiv);
    messageInput.value = "";
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}