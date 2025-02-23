"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users' , methods = ['GET'])
def get_all_users():

    all_users = User.query.all()

    info_user = [user.serialize() for user in all_users]

    return jsonify(info_user), 200

@api.route('/singup' , methods = ['POST'])
def singup_user():

    request_new_user = request.get_json()

    user = User.query.filter_by(email = request_new_user['email'] , password = request_new_user['password']).first()

    if "email" not in request_new_user or "password" not in request_new_user:
         return jsonify({"msg": "Tienes que introducir email y password para poder registrarte"}), 400
    
    elif user is not None:
        return jsonify({"msg": "Ya existe el usuario que deseas crear"}), 400
    
    new_user = User(email = request_new_user["email"], password = request_new_user["password"], is_active = True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"},new_user.serialize()), 200

@api.route('/login', methods = ['POST'])
def login():

    request_login = request.get_json()

    user = User.query.filter_by(email = request_login['email'] , password = request_login['password']).first()

    if user is None:
        return jsonify({"msg": "El email o el password no coinciden"}), 400
    
    
    access_token = create_access_token(identity=str(user.id_user))
    return jsonify({ "token": access_token, "id_user": user.id_user })

# Protect a route with jwt_required, which will kick out requests without a valid JWT
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id_user, "email": user.email }), 200

