let token = localStorage.getItem("token");
const messageContainer = document.getElementById("messageContainer");

async function clearChat() {
  try {
    const chat = await axios.get("http://localhost:3001/users/clear", {
      headers: { Authorization: token },
    });

    if (chat) {
      getMessage();
      window.location.reload();
      alert("messages deleted");
      localStorage.removeItem("messages");
    }
  } catch (err) {
    console.log("error while deleting", err);
  }
}

async function sendMessage(event) {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();

  if (message !== "") {
    const message = document.getElementById("messageInput").value;
    const data = {
      message: message,
    };
    const chat = await axios.post("http://localhost:3001/users/message", data, {
      headers: { Authorization: token },
    });
    if (chat.status == 200) {
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = "message outgoing-message";
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
    messageInput.value = "";
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}

document.addEventListener("DOMContentLoaded", getMessage());

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function getMessage() {
  const loadButton = document.createElement("button");
  loadButton.textContent = "Load Older Messages";
  loadButton.className = "btn-sm btn-primary";
  loadButton.addEventListener("click", loadOlderMessages);

  messageContainer.prepend(loadButton);

  function loadOlderMessages() {
    alert("Loading older messages...");
  }

  try {
    const limit = 10;
    const lsMessages = JSON.parse(localStorage.getItem("messages"));
    let Lastmsgid = 0;
    if (lsMessages) {
      Lastmsgid = lsMessages[lsMessages.length - 1].id;
    }

    const responseChat = await axios.get(
      `http://localhost:3001/users/viewmessage?lastid=${Lastmsgid}`,
      {
        headers: { Authorization: token },
      }
    );
    if (lsMessages) {
      allmsg = [...lsMessages, ...responseChat.data.msg];
    } else {
      allmsg = [...responseChat.data.msg];
    }
    if (limit < allmsg.length) {
      allmsg = allmsg.splice(allmsg.length - limit);
    }
    addMessageToLs(allmsg);
    showmessageLS();
  } catch {
    (err) => {
      console.log("error");
      alert(err);
    };
  }
}

function addMessageToLs(data) {
  localStorage.setItem("messages", JSON.stringify(data));
}

function showmessageLS() {
  let lsMessages = JSON.parse(localStorage.getItem("messages"));
  for (const msg of lsMessages) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message outgoing-message";
    messageDiv.textContent = msg.messages;
    messageContainer.appendChild(messageDiv);
    messageInput.value = "";
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}
