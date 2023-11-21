import json
import os

from alchemyClasses import db
from alchemyClasses.Usuario import Usuario
from CryptoUtils.CryptoUtils import validate, cipher, decipher
from flask import Flask, render_template, request, flash, session, g, redirect, url_for
from controllers.JsonController import json_controller
from model.model_pelicula import get_movie_by_id
from model.model_renta import rents_by_email
from model.model_usuario import get_user_by_email, get_user_by_name
from flask import Blueprint, render_template, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.register_blueprint(json_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://d:Developer123!@localhost:3306/ing_soft"
app.config.from_mapping(
    SECRET_KEY='dev',
)
CORS(app)
db.init_app(app)

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
@app.route('/registrar', methods=["POST"])
def registrar():
    email = request.json["email"]
    password = request.json["password"]
    permiso = request.json["permiso"]
    nombre = request.json["nombre"]
    print(email, password, permiso, nombre)

    if get_user_by_email(email) != []:
        return jsonify({"error": "El correo ingresado ya está en uso."}), 401
    else:
        usuario = Usuario(email = email, nombre = nombre, password = password, permiso = permiso) 
        db.session.add(usuario)
        db.session.commit()

        return jsonify({
            "nombre": usuario.nombre,
            "email": usuario.email,
            "password": usuario.password,
            "permiso": usuario.permiso
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
        "email": user.email,
        "password": user.password,
        "permiso": user.permiso
    })

@app.route('/index', methods=['GET', 'POST'])
def index():
    if session.get('user', None) is None:
        flash('Por favor primero inicie sesión.')
        return redirect(url_for('login'))
    return render_template('index.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    g.user = None
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
