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

from flask import Flask, jsonify, render_template
app = Flask(__name__)


disk_engine = create_engine('sqlite:///olympic_events.sqlite')
Base = automap_base()
Base.prepare(disk_engine, reflect=True)

Events = Base.classes.events
Events_Final = Base.classes.events_final

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/events_final_country/")
def events_final_country():

    session = Session(disk_engine)

    sel = [
        Events_Final.Year,
        Events_Final.Season,
        Events_Final.City,
        Events_Final.Game_Label,
        Events_Final.NOC,
        Events_Final.Country,
        Events_Final.GDP,
        Events_Final.Population,
        Events_Final.No_olympians,
        Events_Final.Bronze_athlete,
        Events_Final.Gold_athlete,
        Events_Final.Silver_athlete,
        Events_Final.Total_Medals_athlete,
        Events_Final.Bronze_team,
        Events_Final.Gold_team,
        Events_Final.Silver_team,
        Events_Final.Total_Medals_team
        ]

    results = session.query(*sel).all()

    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    events_final_data = []
    for result in results:
        combined = {}
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["City"] = result[2]
        combined["Game_Label"] = result[3]
        combined["NOC"] = result[4]
        combined["Country"] = result[5]
        combined["GDP"] = result[6]
        combined["Population"] = result[7]
        combined["No_olympians"] = result[8]
        combined["Bronze_athlete"] = result[9]
        combined["Gold_athlete"] = result[10]
        combined["Silver_athlete"] = result[11]
        combined["Total_Medals_athlete"] = result[12]
        combined["Bronze_team"] = result[13]
        combined["Gold_team"] = result[14]
        combined["Silver_team"] = result[15]
        combined["Total_Medals_team"] = result[16]

        events_final_data.append(combined)
   
    return jsonify(events_final_data)


@app.route("/events_final_country/<NOC>")
def events_final_country_noc(NOC):

    session = Session(disk_engine)

    sel = [
        Events_Final.Year,
        Events_Final.Season,
        Events_Final.City,
        Events_Final.Game_Label,
        Events_Final.NOC,
        Events_Final.Country,
        Events_Final.GDP,
        Events_Final.Population,
        Events_Final.No_olympians,
        Events_Final.Bronze_athlete,
        Events_Final.Gold_athlete,
        Events_Final.Silver_athlete,
        Events_Final.Total_Medals_athlete,
        Events_Final.Bronze_team,
        Events_Final.Gold_team,
        Events_Final.Silver_team,
        Events_Final.Total_Medals_team
        ]

    results = session.query(*sel).filter(Events_Final.NOC == NOC).all()

    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    events_final_data = []
    for result in results:
        combined = {}
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["City"] = result[2]
        combined["Game_Label"] = result[3]
        combined["NOC"] = result[4]
        combined["Country"] = result[5]
        combined["GDP"] = result[6]
        combined["Population"] = result[7]
        combined["No_olympians"] = result[8]
        combined["Bronze_athlete"] = result[9]
        combined["Gold_athlete"] = result[10]
        combined["Silver_athlete"] = result[11]
        combined["Total_Medals_athlete"] = result[12]
        combined["Bronze_team"] = result[13]
        combined["Gold_team"] = result[14]
        combined["Silver_team"] = result[15]
        combined["Total_Medals_team"] = result[16]

        events_final_data.append(combined)
        
    return jsonify(events_final_data)


@app.route("/events_final_games/<Game_Label>")
def events_final_games(Game_Label):

    session = Session(disk_engine)

    sel = [
        Events_Final.Year,
        Events_Final.Season,
        Events_Final.City,
        Events_Final.Game_Label,
        Events_Final.NOC,
        Events_Final.Country,
        Events_Final.GDP,
        Events_Final.Population,
        Events_Final.No_olympians,
        Events_Final.Bronze_athlete,
        Events_Final.Gold_athlete,
        Events_Final.Silver_athlete,
        Events_Final.Total_Medals_athlete,
        Events_Final.Bronze_team,
        Events_Final.Gold_team,
        Events_Final.Silver_team,
        Events_Final.Total_Medals_team
        ]

    results = session.query(*sel).filter(Events_Final.Game_Label.like(f"%{Game_Label}%")).all()

    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    events_final_data = []
    for result in results:
        combined = {}
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["City"] = result[2]
        combined["Game_Label"] = result[3]
        combined["NOC"] = result[4]
        combined["Country"] = result[5]
        combined["GDP"] = result[6]
        combined["Population"] = result[7]
        combined["No_olympians"] = result[8]
        combined["Bronze_athlete"] = result[9]
        combined["Gold_athlete"] = result[10]
        combined["Silver_athlete"] = result[11]
        combined["Total_Medals_athlete"] = result[12]
        combined["Bronze_team"] = result[13]
        combined["Gold_team"] = result[14]
        combined["Silver_team"] = result[15]
        combined["Total_Medals_team"] = result[16]

        events_final_data.append(combined)
   
    return jsonify(events_final_data)


@app.route("/NOC_Country_list/")
def NOC_Country_list():

    session = Session(disk_engine)

    sel = [
        Events_Final.Country,
        Events_Final.NOC
        ]

    results = session.query(*sel).group_by(*sel).order_by(Events_Final.Country).all()

    # print(results)
    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    NOC_country_list = []
    for result in results:
        combined = {}
        combined["Country"] = result[0]
        combined["NOC"] = result[1]
        
        NOC_country_list.append(combined)
   
    return jsonify(NOC_country_list)

if __name__ == "__main__":
    app.run(debug=True)

