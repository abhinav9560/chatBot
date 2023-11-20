var ul = document.getElementById("chat-list");
window.addEventListener("load", (event) => {
    ul.scrollTop = ul.scrollHeight;
});

var button = document.getElementById('send-btn');
button.onclick = function () {
    button.innerText = "";
    button.disabled = true;
    var i = document.createElement("i");
    i.setAttribute("class", "fa fa-spinner fa-spin");
    button.appendChild(i)
    var text = document.getElementById('input-msg').value;

    var li = document.createElement("li");
    var div = document.createElement("div");
    div.setAttribute("class", "role")

    var h = document.createElement("h4");
    h.setAttribute("class", "msg-box")
    h.innerText = "user";

    div.appendChild(h);
    var p = document.createElement("p");
    p.setAttribute("class", "msg");
    p.innerText = text;
    
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);

    ul.scrollTop = ul.scrollHeight;

    document.getElementById('input-msg').value = ""
    sendMsg(text)
};
const sendMsg = async (text) => {
    let res = await await axios.post('/chatbot/sendMsg', { msg: text });
    button.removeChild(button.children[0]);
    button.innerText = "Send";
    button.disabled = false;

    var li = document.createElement("li");
    var div = document.createElement("div");
    div.setAttribute("class", "role")

    var h = document.createElement("h4");
    h.setAttribute("class", "msg-box")
    h.innerText = "assistant";

    div.appendChild(h);
    var p = document.createElement("p");
    p.setAttribute("class", "msg");
    p.innerText = res.data;
    
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);

    ul.scrollTop = ul.scrollHeight;
}

