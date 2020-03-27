#import dependencies
import warnings
warnings.filterwarnings('ignore')
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from flask import Flask, jsonify, render_template
app = Flask(__name__)


disk_engine = create_engine('sqlite:///olympic_events.sqlite')
conn = disk_engine.connect()
session = Session(disk_engine)

Olympians_Team_Final=pd.read_sql("SELECT * FROM olympians_team_final", conn)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/olympians_team/<NOC>")
def olympians_team(NOC):

    sel = [Olympians_Team_Final.Year, 
            Olympians_Team_Final.Season,
            Olympians_Team_Final.Team, 
            Olympians_Team_Final.NOC, 
            Olympians_Team_Final.No_olympians
            ]

    results = session.query(*sel).filter(Olympians_Team_Final.NOC == NOC).all()

    # Create a dictionary entry for each row of Combined dataframe
    combined = {}
    for result in results:
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["Team"] = result[2]
        combined["NOC"] = result[3]
        combined["No_olympians"] = result[4]
        
    print(combined)
   
    return jsonify(combined)



if __name__ == "__main__":
    app.run(debug=True)