import os

class Config:
    SECRET_KEY = "mindguard-secret-key"

    SQLALCHEMY_DATABASE_URI = "sqlite:///mindguard.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False