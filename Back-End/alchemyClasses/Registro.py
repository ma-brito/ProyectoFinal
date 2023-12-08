from alchemyClasses import db
from sqlalchemy import Column, Integer, ForeignKey

class Registro(db.Model):
    __tablename__ = 'registro'
    idUsuario = Column(Integer, ForeignKey('usuarios.idUsuario'), primary_key=True)
    idTorneo = Column(Integer, ForeignKey('torneos.idTorneo'), primary_key=True)