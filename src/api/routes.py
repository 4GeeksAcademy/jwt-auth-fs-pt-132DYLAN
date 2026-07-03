"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])

def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
    
        return jsonify({"msg": "Debes enviar email y contraseña"}),400
    
    existe = User.query.filter_by(email=email).first()

    if existe:
        return jsonify({"msg":"El usario ua existe"}),400
    
    nuevo_usario = User (email=email, password=password, is_active=True)

    db.session.add (nuevo_usario)
    db.session.commit ()
    return jsonify({"msg": "Usario creado correctamente"}),201


@api.route('/login', methods=['POST'])

def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    usario =User.query.filter_by(email=email).first()

    if usario is None or usario.password != password :
    
        return jsonify({"msg": "Email o contrasela incorrectos"}),401
    
    token = create_access_token(identity=str(usario.id))
    
   
    return jsonify({"token": token,"user":usario.serialize()}),200

@api.route('/private', methods = ['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    usario = db.session.get (User, int(user_id))
    return jsonify({"msg": "Acesso autorizado", "user": usario.serialize()}),200