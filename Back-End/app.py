import json
import os
from hashlib import sha256
from alchemyClasses import db
from alchemyClasses.Usuario import Usuario
from CryptoUtils.CryptoUtils import validate, cipher, decipher
from flask import Flask, render_template, request, flash, session, g, redirect, url_for
from controllers.JsonController import json_controller
from model.model_pelicula import get_movie_by_id
from model.model_renta import rents_by_email
from model.model_usuario import get_user_by_email, get_user_by_name, get_user_by_id
from flask import Blueprint, render_template, jsonify
from flask_cors import CORS, cross_origin
from flask import request
from werkzeug.utils import secure_filename
from alchemyClasses.Torneo import Torneo
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from alchemyClasses.Registro import Registro
from flask import send_from_directory


app = Flask(__name__)
app.register_blueprint(json_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://d:Developer123!@localhost:3306/ing_soft"
app.config.from_mapping(
    SECRET_KEY='dev',
)
CORS(app)
db.init_app(app)

UPLOAD_FOLDER = './images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/images/<filename>')
def send_image(filename):
    return send_from_directory('images', filename)
import re

@app.route('/updateuser', methods=['PUT'])
def update_user():
    id = request.json['idUsuario']
    new_data = request.json['new_data']

    user = Usuario.query.filter_by(idUsuario=id).first()

    if 'nombre' in new_data:
        user.nombre = new_data['nombre']
    if 'email' in new_data:
        email = new_data['email']
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({"error": "Invalid email format"}), 400
        user.email = email
    if 'password' in new_data:
        user.password = new_data['password']

    db.session.commit()

    return jsonify({"success": "User updated successfully."}), 200

@app.route('/updateprofilepic', methods=['PUT'])
def update_profile_pic():
  idUsuario = request.form['idUsuario']
  imagen = request.files['imagen']

  if imagen and allowed_file(imagen.filename):
    filename = secure_filename(imagen.filename)
    imagen.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    user = Usuario.query.filter_by(idUsuario=idUsuario).first()
    user.profilePicture = filename
    db.session.commit()

    return jsonify({"success": "Imagen de perfil actualizada exitosamente."}), 200
  else:
    return jsonify({"error": "La imagen no es válida. Por favor, sube una imagen en formato jpg."}), 400

@cross_origin
@app.route('/torneos', methods=['POST'])
def register_tournament():
    nombre = request.form['nombre']
    juego = request.form['juego']
    consola = request.form['consola']
    numParticipantes = request.form['numParticipantes']
    fechaInicio = request.form['fechaInicio']
    fechaFin = request.form['fechaFin']
    imagen = request.files['imagen']
    print(imagen.filename)
    print(allowed_file(imagen.filename))
    if imagen and allowed_file(imagen.filename):
        filename = secure_filename(imagen.filename)
        imagen.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        torneo = Torneo(nombre=nombre, juego=juego, consola=consola, numParticipantes=numParticipantes, fechaInicio=fechaInicio, fechaFin=fechaFin, imagen=filename)
        db.session.add(torneo)
        db.session.commit()

        return jsonify({"success": "Torneo registrado exitosamente."}), 200
    else:
        return jsonify({"error": "La imagen no es válida. Por favor, sube una imagen en formato jpg."}), 400

@cross_origin
@app.route('/userdata', methods=['GET', 'POST'])
def get_user_data():
    idUsuario = request.args.get('idUsuario')
    user = Usuario.query.filter_by(idUsuario=idUsuario).first()
    print(user)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if request.method == 'POST':
        print('delete')
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": "User eliminado correctamente."}), 200
    
    return jsonify({
        "profilePicture": user.profilePicture,
    }), 200

@app.route('/registrartorneo', methods=['POST'])
def register():
    print(request.json)
    idUsuario = request.json['idUsuario']
    idTorneo = request.json['idTorneo']

    registro = Registro.query.filter_by(idUsuario=idUsuario, idTorneo=idTorneo).first()
    if registro:
        return jsonify({"error": "El usuario ya está registrado en este torneo"}), 400

    nuevo_registro = Registro(idUsuario=idUsuario, idTorneo=idTorneo)
    db.session.add(nuevo_registro)
    db.session.commit()

    return jsonify({"success": "Usuario registrado al torneo"}), 200

@cross_origin
@app.route('/usuarios', methods=['POST'])
def delete_user():
    idUsuario = request.args.get('idUsuario')
    user = Usuario.query.filter_by(idUsuario=idUsuario).first()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"success": "User eliminado correctamente."}), 200


@cross_origin
@app.route('/torneos', methods=['GET'])
def get_torneos():
    torneos = Torneo.query.all()
    return jsonify([torneo.serialize() for torneo in torneos])

@cross_origin
@app.route('/usuariosdel', methods=['POST'])
def delete_usuario():
    id = request.json['idUsuario']
    Usuario.query.filter_by(idUsuario=id).delete()
    db.session.commit()
    return jsonify({"success": "Torneo eliminado exitosamente."}), 200

@cross_origin
@app.route('/torneosdel', methods=['POST'])
def delete_torneo():
    id = request.json['id']
    print("id:",id)
    Torneo.query.filter_by(idTorneo=id).delete()
    db.session.commit()
    return jsonify({"success": "Torneo eliminado exitosamente."}), 200
@cross_origin
@app.route('/adminedit', methods=['PUT'])
def edit_admin():

    id = request.json['id']
    new_data = request.json['new_data']
    print(new_data)
    admin = Usuario.query.filter_by(idUsuario=id).first()
    
    for key, value in new_data.items():
        if key == 'password':
            admin.password = sha256(cipher(value)).hexdigest()
        else:
            setattr(admin, key, value)
    db.session.commit()

    return jsonify({"success": "Admin updated successfully."}), 200

@cross_origin
@app.route('/torneoedit', methods=['PUT'])
def update_torneo():
    id = request.json['id']
    new_data = request.json['new_data']
    torneo = Torneo.query.filter_by(idTorneo=id).first()
    fechaInicio = datetime.strptime(new_data['fechaInicio'], '%Y-%m-%d').strftime('%Y-%m-%d')
    fechaFin = datetime.strptime(new_data['fechaFin'], '%Y-%m-%d').strftime('%Y-%m-%d')

    torneo.nombre = new_data['nombre']
    torneo.juego = new_data['juego']
    torneo.consola = new_data['consola']
    torneo.numParticipantes = new_data['numParticipantes']
    torneo.fechaInicio = fechaInicio
    torneo.fechaFin = fechaFin
    torneo.imagen = new_data['imagen']
    db.session.commit()
    return jsonify({"success": "Torneo actualizado exitosamente."}), 200

@cross_origin
@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))


@cross_origin
@app.route("/@me")
def get_current_user():
    user_id = session.get("email", None)

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = get_user_by_email(user_id)[0]
    print(user)
    return jsonify({
        "email": user.email,
        "password": user.password
    }) 


@cross_origin
@app.route('/updatepassword', methods=['PUT'])
def update_password():
    data = request.get_json()
    id = data['idUsuario']
    password = data['currentPassword']
    nueva_password = data['newPassword']
    user = Usuario.query.filter_by(idUsuario=id).first()
    if not validate(password, user.password):
        return jsonify({"error": "Current password is incorrect"}), 400
    user.password = sha256(cipher(nueva_password)).hexdigest()
    db.session.commit()
    return jsonify({"success": "Password updated successfully."}), 200

@cross_origin
@app.route('/registrar', methods=["GET", "POST"])
def registrar():
    email = request.json["email"]
    password = request.json["password"]
    permiso = request.json["permiso"]
    nombre = request.json["nombre"]
    print(email, password, permiso, nombre)

    if get_user_by_email(email) != []:
        return jsonify({"error": "El correo ingresado ya está en uso."}), 401
    else:
        user = Usuario(email = email, nombre = nombre, password = password, permiso = permiso) 
        db.session.add(user)
        db.session.commit()

        return jsonify({
            "idUsuario": user.idUsuario,
            "nombre": user.nombre,
            "email": user.email,
            "password": user.password,
            "permiso": user.permiso,
            "profilePicture": user.profilePicture
        })

@cross_origin
@app.route('/login', methods=['GET', 'POST'])
def login():
    if session.get("user", None) is not None and request.method == 'GET':
        return redirect(url_for('index'))
    email = request.json["email"]
    password = request.json["password"]
    user_query = get_user_by_email(email)
    if not user_query:
        return jsonify({"error": "El correo ingresado no está registrado."}), 401 
    user = user_query[0]
    if not validate(password, user.password):
        return jsonify({"error": "Contraseña incorrecta."}), 402
    session.clear()
    session['user']= user.nombre
    session['email']= user.email
    session['permiso']= user.permiso
    session.modified = True
    return jsonify({
        "idUsuario": user.idUsuario,
        "nombre": user.nombre,
        "email": user.email,
        "password": user.password,
        "permiso": user.permiso,
        "profilePicture": user.profilePicture
    })

@app.route('/index', methods=['GET', 'POST'])
def index():
    if session.get('user', None) is None:
        flash('Por favor primero inicie sesión.')
        return redirect(url_for('login'))
    return render_template('index.html')

@cross_origin
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    g.user = None
    return redirect(url_for('login'))

@cross_origin
@app.route('/admins', methods=['GET'])
def get_admins():
    admins = Usuario.query.filter_by(permiso=1).all()
    return jsonify([admin.serialize() for admin in admins]), 200


@cross_origin
@app.route('/admins', methods=['POST', 'GET'])
def delete_admin():
    email = request.json['email'] 
    print(email)

    admin_query = get_user_by_email(email) 
    if admin_query:
        admin = admin_query[0]
        db.session.delete(admin)
        db.session.commit()
        return jsonify({'message': 'Admin deleted'}), 200
    else:
        return jsonify({'message': 'Admin not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
