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
        });
    }

    changeState(chatbox) {
        this.state = !this.state;

        if(this.state) {
            chatbox.style.display = "flex";
            document.body.style.backgroundColor = "rgba(99, 99, 99, 0.3)";
        } else {
            chatbox.style.display = "none";
            document.body.style.backgroundColor = "white";
        }
    } 


    onSendButton(chatbox) {
        let textField = chatbox.querySelector('input');
        let userText = textField.value;
        if(userText === "") {
            return;
        }
        $('.chatBot__msgBox').append('<div class="msg__item msg__item--user"><h4>' + userText + '</h4></div>');

        $.get("/get", { msg: userText }).done(function(botMessage) {
            $('.chatBot__msgBox').append('<div class="msg__item msg__item--bot"><i class="fas fa-comment"></i><h4>' + botMessage + '</h4></div>');
        });
        textField.value = "";
        $(".chatBot__msgBox").stop().animate({ scrollTop: $(".chatBot__msgBox")[0].scrollHeight}, 1000);
    }
}
const chatbox = new Chatbox();
chatbox.display();


