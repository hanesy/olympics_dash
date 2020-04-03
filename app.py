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

@app.route("/countries")
def countries():

    return render_template("countries.html")

@app.route("/games")
def games():

    return render_template("games.html")

@app.route("/data")
def data():

    return render_template("data.html")

@app.route("/events_final_country/")
def events_final_country():

    session = Session(disk_engine)

    sel = [
        Events_Final.Year,
        Events_Final.Season,
        Events_Final.City,
        Events_Final.Game_Label,
        Events_Final.Chart_Label,
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
        combined["Chart_Label"] = result[4]
        combined["NOC"] = result[5]
        combined["Country"] = result[6]
        combined["GDP"] = result[7]
        combined["Population"] = result[8]
        combined["No_olympians"] = result[9]
        combined["Bronze_athlete"] = result[10]
        combined["Gold_athlete"] = result[11]
        combined["Silver_athlete"] = result[12]
        combined["Total_Medals_athlete"] = result[13]
        combined["Bronze_team"] = result[14]
        combined["Gold_team"] = result[15]
        combined["Silver_team"] = result[16]
        combined["Total_Medals_team"] = result[17]

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
        Events_Final.Chart_Label,
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

    results = session.query(*sel).filter(Events_Final.NOC == NOC).order_by(Events_Final.Country).all()

    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    events_final_data = []
    for result in results:
        combined = {}
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["City"] = result[2]
        combined["Game_Label"] = result[3]
        combined["Chart_Label"] = result[4]
        combined["NOC"] = result[5]
        combined["Country"] = result[6]
        combined["GDP"] = result[7]
        combined["Population"] = result[8]
        combined["No_olympians"] = result[9]
        combined["Bronze_athlete"] = result[10]
        combined["Gold_athlete"] = result[11]
        combined["Silver_athlete"] = result[12]
        combined["Total_Medals_athlete"] = result[13]
        combined["Bronze_team"] = result[14]
        combined["Gold_team"] = result[15]
        combined["Silver_team"] = result[16]
        combined["Total_Medals_team"] = result[17]

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
        Events_Final.Chart_Label,
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

    results = session.query(*sel).filter(Events_Final.Game_Label == Game_Label).order_by(Events_Final.Country).all()

    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    events_final_data = []
    for result in results:
        combined = {}
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["City"] = result[2]
        combined["Game_Label"] = result[3]
        combined["Chart_Label"] = result[4]
        combined["NOC"] = result[5]
        combined["Country"] = result[6]
        combined["GDP"] = result[7]
        combined["Population"] = result[8]
        combined["No_olympians"] = result[9]
        combined["Bronze_athlete"] = result[10]
        combined["Gold_athlete"] = result[11]
        combined["Silver_athlete"] = result[12]
        combined["Total_Medals_athlete"] = result[13]
        combined["Bronze_team"] = result[14]
        combined["Gold_team"] = result[15]
        combined["Silver_team"] = result[16]
        combined["Total_Medals_team"] = result[17]

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

    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    NOC_country_list = []
    for result in results:
        combined = {}
        combined["Country"] = result[0]
        combined["NOC"] = result[1]
        
        NOC_country_list.append(combined)
   
    return jsonify(NOC_country_list)

@app.route("/countries_per_event/")
def countries_per_event():

    session = Session(disk_engine)

    sel = [
        Events_Final.Year,
        Events_Final.Season,
        Events_Final.City,
        Events_Final.Game_Label,
        Events_Final.Chart_Label,
        func.count(Events_Final.NOC)
        ]

    results = session.query(*sel).group_by(*sel[0:5]).order_by(Events_Final.Country).all()

    session.close ()

    # Create a dictionary entry for each row of Combined dataframe
    events_final_data = []
    for result in results:
        combined = {}
        combined["Year"] = result[0]
        combined["Season"] = result[1]
        combined["City"] = result[2]
        combined["Game_Label"] = result[3]
        combined["Chart_Label"] = result[4]
        combined["Total_Countries"] = result[5]

        events_final_data.append(combined)
   
    return jsonify(events_final_data)

if __name__ == "__main__":
    app.run(debug=True)

