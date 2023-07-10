# from flask import Flask, render_template, jsonify, request, redirect, send_from_directory, url_for, flash
from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# Se crea la app
app = Flask(__name__)

# Se guarda en el SO la existencia de la carpeta, se le info a la app
# CARPETA = os.path.join('uploads')
# app.config['CARPETA'] = CARPETA

# Permite el acceso del FrontEnd a las rutas de la app
CORS(app)

# Configuración a la base de datos                     //User - Pass - Local Host - Nombre BD
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:@127.0.0.1:3307/proyecto2'
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
    
    # Definir e iniciar el constructor
    def __init__(self, titular, autor, fecha, copete, cuerpo, imagen):
        self.titular = titular
        self.autor   = autor
        self.fecha   = fecha
        self.copete  = copete
        self.cuerpo  = cuerpo
        self.imagen  = imagen



# código para cear las tablas
with app.app_context():
    db.create_all()

# Se crea la clase que permite acceder a los métodos de conversión de datos
class NoticiaSchema(ma.Schema): # Se puede poner cualquier nombre no solo "ProductoSchema"
    # ProductoSchema -- Hereda del objeto Marshmallow una herramienta que se llama Schema
    class Meta:
        fields = ("id", "titular", "autor", "fecha", "copete", "cuerpo", "imagen")


# Se crean 2 objetos que se usan cuando se quiere convertir un JSON o un listado de JSON
noticia_schema = NoticiaSchema()   # singular - un solo JSON
noticias_schema = NoticiaSchema(many=True)  # plural - listado de JSON


# ENDPOINT ó ruta
@app.route("/noticias", methods=['GET'])
def getAll_noticias():
    # Se consulta toda la info de la tabla producto
    all_noticias = Noticia.query.all()
    
    return noticias_schema.jsonify(all_noticias)


# Esta ruta crea un nuevo registro en la tabla
@app.route("/noticias", methods=['POST'])
def create_noticia():
    
#     Ejemplo de entrada de datos
#     {
#       "imagen": "https://picsum.photos/200/300?grayscale",
#       "nombre": "MICROONDAS",
#       "precio": 50000,
#       "stock": 10
#      }

    titular = request.json['titular']
    autor = request.json['autor']
    fecha = request.json['fecha']
    copete = request.json['copete']
    cuerpo = request.json['cuerpo']
    imagen = request.json['imagen']



    #-------------------------------- foto = request.files['fileFoto']---------------------------
    
    # Persistencia en BD con SQLAlchemy
    # ----------------------new_producto = Producto(nombre, precio, stock, foto) -------------------# Almacena
    new_noticia = Noticia(titular, autor, fecha, copete, cuerpo, imagen) # Almacena
    db.session.add(new_noticia) # Agrega
    db.session.commit()# Guarda
    
    return noticia_schema.jsonify(new_noticia)

    

# Este Endpoint muestra el producto por id
@app.route('/noticias/<id>',methods=['GET'])
def getOne_noticia(id):
    # Consulta por id a la clase Producto a través de una query
    noticia=Noticia.query.get(id)
    
    # Retorna el JSON de un objeto que recibió como parámetro y lo convierte
    return noticia_schema.jsonify(noticia)  

# Controlador para borrar
@app.route('/noticias/<id>',methods=['DELETE'])
def delete_noticia(id):
    # Consultar por id, a la clase Producto.
    #  Se hace una consulta (query) para obtener (get) un registro por id
    noticia=Noticia.query.get(id)
    
    # A partir de db y la sesión establecida con la base de datos borrar 
    # el producto.
    # Se guardan lo cambios con commit
    db.session.delete(noticia)
    db.session.commit()
    return redirect('/noticias')


# Controlador para MODIFICAR
@app.route('/noticias/<id>' ,methods=['PUT'])
def update_noticia(id):
    # Consultar por id, a la clase Producto.
    #  Se hace una consulta (query) para obtener (get) un registro por id
    noticia = Noticia.query.get(id)

    #  Recibir los datos a modificar
    titular = request.json['titular']
    autor   = request.json['autor']
    fecha   = request.json['fecha']
    copete  = request.json['copete']
    cuerpo  = request.json['cuerpo']
    imagen  = request.json['imagen']


    # Del objeto resultante de la consulta modificar los valores  
    noticia.titular = titular
    noticia.autor   = autor
    noticia.fecha   = fecha
    noticia.copeta  = copete
    noticia.cuerpo  = cuerpo
    noticia.imagen=imagen
    #  Guardar los cambios
    db.session.commit()
    # Para ello, usar el objeto producto_schema para que convierta con                     
    return noticia_schema.jsonify(noticia)

# Mostrar la foto
# @app.route('/uploads/<fileFoto>')
# def uploads(fileFoto):
#     return send_from_directory(app.config['CARPETA'], fileFoto)


# Bloque principal del programa
if __name__== "__main__":
    app.run(debug=True)