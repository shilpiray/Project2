import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///./data.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

Internet_User = Base.classes.internet_user
Time_spent = Base.classes.time_spent
social_media = Base.classes.social_media


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of sample names."""
    # Use Pandas to perform the sql query
    stmt = db.session.query(Internet_User.Entity).distinct()   
    stmt = [item for sublist in stmt for item in sublist]
    return jsonify(stmt)

    

@app.route("/country/<sample>")
def sample_metadata(sample):
    """Return the MetaData for a given sample."""
    sel = [
        Internet_User.Entity,Internet_User.Code,
      Internet_User.Year,Internet_User.users]

    results = db.session.query(*sel).filter(Internet_User.Entity == sample).all()

    # Create a dictionary entry for each row of metadata information
    sample_metadata = []
    dict_year = []
    dict_number = []
    for i,j,k,l in results:
        dict_year.append(k)
        dict_number.append(l)
    sample_metadata.append(dict_year)
    sample_metadata.append(dict_number)

    return jsonify(sample_metadata)

@app.route("/time")
def sample_time():
    sel = [
        Time_spent.Entity,Time_spent.time]

    results = db.session.query(*sel).order_by(Time_spent.Entity.desc()).all()

    data = []
    for i ,j  in results:
        dict= {}
        dict["country"] = i
        dict["time"] = j
        data.append(dict)

    return jsonify(data)

@app.route("/social")
def social():
    """Return the MetaData for a given sample."""
    sel = [
        social_media.Entity,social_media.active_user,
      social_media.Year]

    results = db.session.query(*sel).all()

    # Create a dictionary entry for each row of metadata information
    sample_metadata = []
    for i,j,k in results:
        dict = {}
        dict["Year"] = k
        dict["social_site"] = i
        dict["active_user"] = j
        sample_metadata.append(dict)  

    return jsonify(sample_metadata)   

if __name__ == '__main__':
    app.run(debug=True)

