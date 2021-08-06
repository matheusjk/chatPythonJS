from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send, join_room, leave_room


app = Flask(__name__)
io = SocketIO(app)

mensagens = []


@app.route("/")
def home():
    return render_template("chat.html")

@io.on('sendMessage')
def send_message_handler(msg):
    # print(msg)
    mensagens.append(msg)
    print("MENSAGENS: {}".format(mensagens))
    emit('getMessage', msg, broadcast=True)

@io.on('message')
def message_handler(msg):
    send(mensagens)

# @io.on('conect')
# def message_connect(msg):
#     print(msg)

if __name__ == "__main__":
    io.run(app, debug=True, port=59000, host="192.168.0.13")