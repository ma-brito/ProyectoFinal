from alchemyClasses import db
from sqlalchemy import Column, Integer, String, Date

class Torneo(db.Model):

    __tablename__ = 'torneos'
    idTorneo = Column(Integer, primary_key=True)
    nombre = Column(String(200))
    juego = Column(String(200))
    consola = Column(String(200))
    numParticipantes = Column(Integer)
    fechaInicio = Column(Date)
    fechaFin = Column(Date)
    imagen = Column(String(500))

    def __init__(self, nombre, juego, consola, numParticipantes, fechaInicio, fechaFin, imagen):
        self.nombre = nombre
        self.juego = juego
        self.consola = consola
        self.numParticipantes = numParticipantes
        self.fechaInicio = fechaInicio
        self.fechaFin = fechaFin
        self.imagen = imagen

    def __str__(self):
        return f'idTorneo: {self.idTorneo}\nnombre: {self.nombre}\njuego: {self.juego}\nconsola: {self.consola}\nnumParticipantes: {self.numParticipantes}\nfechaInicio: {self.fechaInicio}\nfechaFin: {self.fechaFin}\nimagen: {self.imagen}'
    
    def serialize(self):
        return {
            'id': self.idTorneo,
            'nombre': self.nombre,
            'juego': self.juego,
            'consola': self.consola,
            'numParticipantes': self.numParticipantes,
            'fechaInicio': self.fechaInicio,
            'fechaFin': self.fechaFin,
            'imagen': self.imagen
        }
