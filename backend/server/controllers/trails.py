from flask import Blueprint, jsonify

from models import Trail

trails_controller = Blueprint('trails', __name__)


@trails_controller.route('/', methods=['GET'])
def get_all_trails():
    trails = Trail.query.all()
    return jsonify(trails), 200
