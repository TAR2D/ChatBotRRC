class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatBot__Button'),
            chatBox: document.querySelector('.chatBot__Box'),
            sendButton: document.querySelector('.chatBot__footer--send'),
            closeButton: document.querySelector('.chatBot__header--close')
        }
        this.state = false;
        this.messages = [];
    }

    display() {
        const{openButton, chatBox, sendButton, closeButton} = this.args;

        openButton.addEventListener('click', () => this.changeState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        closeButton.addEventListener('click', () => this.changeState(chatBox))
        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({key}) => {
            if(key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    changeState(chatbox) {
        this.state = !this.state;

        if(this.state) {
            chatbox.style.display = "none";
        } else {
            chatbox.style.display = "flex";
        }
    } 

    onSendButton(chatbox) {
        let textField = chatbox.querySelector('input');
        let text = textField.value;
        if(text === "") {
            return;
        }

        let msg = {name:'User', message: text}
        this.messages.push(msg);

        // 'http://127.0.0.1:5000/predict'
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({message: text}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 ={ name: 'rrcBot', message: r.answer};
            this.message.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';

        }).catch((error) => {
            // console.error('Error:', error);
            this.updateChatText(chatbox);
            textField.value = '';
        });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item,){
            if(item.name === 'rrcBot') {
                html += '<div class="msg__item msg__item--bot"><i class="fas fa-comment"></i><h4>' + item.message + '</h4></div>'
            }
            else {
                html += '<div class="msg__item msg__item--user"><h4>' + item.message + '</h4></div>'
            }
        });
        const chatmessage = chatbox.querySelector('.chatBot__msgBox');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
