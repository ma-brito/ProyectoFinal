from alchemyClasses import db
from sqlalchemy import Column, Integer, String
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

class Usuario(db.Model):

    __tablename__ = 'usuarios'
    idUsuario = Column(Integer, primary_key=True)
    nombre = Column(String(200))
    email = Column(String(500), unique=True)
    password = Column(String(64))
    permiso = Column(Integer)

    def __init__(self, nombre, email, password,permiso):
        self.nombre = nombre
        self.email = email
        self.password = sha256(cipher(password)).hexdigest()
        self.permiso = permiso

    def __str__(self):
        return f'idUsuario: {self.idUsuario}\nnombre: {self.nombre}\ncorreo: {self.email}'