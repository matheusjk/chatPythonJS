from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit


app2 = Flask(__name__)
app2.config['SECRET_KEY'] = 'pythonFlaskSocketIO'
app2.config['DEBUG'] = True

user = []

socketio = SocketIO(app2)

@app2.route('/')
def index():
    return render_template('index.html')

@app2.route('/originate')
def originate():
    socketio.emit('servidor original', 'algo do servidor')
    return '<h1>Enviado!</h1>'

@socketio.on('messagem do usuario', namespace='/messages')
def mensagem_recebida_do_usuario(message):
    print("USUARIO MENSAGEM: {}".format(message))
    emit('from flask', message.upper(), brodcast=True)

@socketio.on('username', namespace='/private')
def recebido_usuario(username):
    user.append({username: request.id})
    print(user)


if __name__ == '__main__':
    socketio.run(app2, debug=True, port=59000, host="192.168.0.13")