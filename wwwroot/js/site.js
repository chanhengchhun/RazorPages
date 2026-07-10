// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var sendButton = document.getElementById("send");
var messageInput = document.getElementById("messageInput");
var newMessageDiv = document.getElementById("newMessage");

if (sendButton && messageInput && newMessageDiv) {
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/MessageHub")
        .build();

    connection.on("ReceiveNewMessage", function (message) {
        let paragraph = document.createElement("p");
        paragraph.innerText = message;
        newMessageDiv.appendChild(paragraph);
    });

    connection.start().catch(function (err) {
        return console.error(err.toString());
    });

    sendButton.addEventListener("click", function (event) {
        let message = messageInput.value;
        if (message) {
            connection.invoke("PostMessage", message).catch(function (err) {
                return console.error(err.toString());
            });
            messageInput.value = "";
        }
        event.preventDefault();
    });
}