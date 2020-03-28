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
Base = automap_base()
Base.prepare(disk_engine, reflect=True)
# open and close session in each of the routes. Delete code below (HY).
# session = Session(disk_engine) 

# Events wasn't working for me, so I commented it out for now (HY)
# Events = Base.classes.events
Olympians_Team_Final = Base.classes.olympians_team_final
Medals_Team_Total = Base.classes.medals_team_total

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/olympians_team/<NOC>")
def olympians_team(NOC):
    # HY added this - you have to open and close sessions in each route
    session = Session(disk_engine)
    
    results = session.query(Olympians_Team_Final.Year, Olympians_Team_Final.Season,\
                        Olympians_Team_Final.Team, Olympians_Team_Final.NOC, Olympians_Team_Final.No_olympians).filter(Olympians_Team_Final.NOC == NOC).all()

    # HY added this - you have to open and close sessions in each route
    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    olympians_team_data = []
    for result in results:
        combined = {}
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["Team"] = result[2]
        combined["NOC"] = result[3]
        combined["No_olympians"] = result[4]
        olympians_team_data.append(combined)
        
    print(olympians_team_data)
   
    return jsonify(olympians_team_data)



if __name__ == "__main__":
    app.run(debug=True)