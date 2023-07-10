from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:@127.0.0.1:3307/proyecto2'
# app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://zorrobsas:c4d04c0d02026@zorrobsas.mysql.pythonanywhere-services.com/zorrobsas$noticdc'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)

ma = Marshmallow(app)

class Noticia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titular = db.Column(db.String(150))
    autor   = db.Column(db.String(40))
    fecha   = db.Column(db.Date())
    copete  = db.Column(db.String(240))
    cuerpo  = db.Column(db.Text())
    imagen  = db.Column(db.String(400))
    
    def __init__(self, titular, autor, fecha, copete, cuerpo, imagen):
        self.titular = titular
        self.autor   = autor
        self.fecha   = fecha
        self.copete  = copete
        self.cuerpo  = cuerpo
        self.imagen  = imagen

with app.app_context():
    db.create_all()

class NoticiaSchema(ma.Schema): 
    
    class Meta:
        fields = ("id", "titular", "autor", "fecha", "copete", "cuerpo", "imagen")

noticia_schema = NoticiaSchema()
noticias_schema = NoticiaSchema(many=True)


# ENDPOINT ó ruta
@app.route("/noticias", methods=['GET'])
def getAll_noticias():
    
    all_noticias = Noticia.query.all()
    
    return noticias_schema.jsonify(all_noticias)

@app.route("/noticias", methods=['POST'])
def create_noticia():

    titular = request.json['titular']
    autor = request.json['autor']
    fecha = request.json['fecha']
    copete = request.json['copete']
    cuerpo = request.json['cuerpo']
    imagen = request.json['imagen']

    new_noticia = Noticia(titular, autor, fecha, copete, cuerpo, imagen)
    db.session.add(new_noticia)
    db.session.commit()
    
    return noticia_schema.jsonify(new_noticia)

@app.route('/noticias/<id>',methods=['GET'])
def getOne_noticia(id):
    
    noticia=Noticia.query.get(id)
    
    return noticia_schema.jsonify(noticia)  

# Controlador para borrar
@app.route('/noticias/<id>',methods=['DELETE'])
def delete_noticia(id):
    
    noticia=Noticia.query.get(id)
    
    db.session.delete(noticia)
    db.session.commit()
    return redirect('/noticias')

@app.route('/noticias/<id>' ,methods=['PUT'])
def update_noticia(id):
    
    noticia = Noticia.query.get(id)

    
    titular = request.json['titular']
    autor   = request.json['autor']
    fecha   = request.json['fecha']
    copete  = request.json['copete']
    cuerpo  = request.json['cuerpo']
    imagen  = request.json['imagen']

    noticia.titular = titular
    noticia.autor   = autor
    noticia.fecha   = fecha
    noticia.copeta  = copete
    noticia.cuerpo  = cuerpo
    noticia.imagen=imagen
    
    db.session.commit()
    return noticia_schema.jsonify(noticia)

if __name__== "__main__":
    app.run(debug=True)