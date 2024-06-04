from dataclasses import dataclass
from services import DBService

import datetime as dt


db = DBService.db

@dataclass
class Trail(db.Model):
    __tablename__ = 'trail'

    id: int = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name: str = db.Column(db.Text, nullable=False)
    n_trees: int = db.Column(db.Integer, nullable=False)
    distance: float = db.Column(db.Numeric, nullable=False)
    active: bool = db.Column(db.Boolean, nullable=False)
    photo: str = db.Column(db.Text, nullable=True)
    created_at: dt.datetime = db.Column(db.DateTime)
