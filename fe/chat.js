const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const selectedRoomName = 'room1'; // 사용자가 선택한 방의 이름 (동적으로 설정해야 함)

const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${selectedRoomName}/`);


// 서버로 메시지 전송
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.send(JSON.stringify({ message }));
        messageInput.value = '';
    }
});

// 서버로부터 메시지 수신
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    const message = data.message;
    const timestamp = data.timestamp;

    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `
        <p>${message}</p>
        <small>${timestamp}</small>
    `;

    chatMessages.appendChild(messageElement);

    // 스크롤을 아래로 이동
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
