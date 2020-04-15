# Olympics Dashboard
[Heroku App](https://olympics-dash.herokuapp.com/)
[Google Slides](https://docs.google.com/presentation/d/1BfHcjnQFo2-x0AgD8WOmCmHS4H0LbgmTFrgMlj3o-cc/edit?usp=sharing)


## Dashboard Rationale
This dashboard was developed to review the relevance of population & GDP to countries' performances at the Olympics.
In doing this, we decided to choose a "modern" subset of Olympic Games, ranging from 1960 to 2016 to align with our economic and demographic data. As there is a larger breadth of competing countries in this range and a better record of population and wealth statistics. The term “modern” can be better understood by our Parameters.

### Parameters:
•	Date range is from 1960 to 2016. This reflects the combined data from the World Bank and Olympic Data that overlapped for this project.

•	Country names and boundaries have changed in the last sixty years. As an example: if you are looking for the full Olympic history of a country that was renamed - like Russia - you will need to look for both the Soviet Union and Russia.

•	Not all countries have competed in both the Summer and Winter Olympics, and thus you may see some "blank" graphs due to non-participation.

•	Winter and Summer Olympics were held in the same year until 1992, until they split into separate four-year cycles. The next Winter Olympics was held in 1994.

## Homepage
### Introduction
The introduction includes the purpose of the dashboard as well as the parameters used, as stated above. In addition, we include an “Interesting Fact” related to the Olympic Games that can be updated by the dashboard publicists.
### World Map
The map is a choropleth map based on JavaScript, Leaflet and JSON; featuring a mouse-over feature that presents the medal counts for the hovered-on country based on the filter option selected above the map.
![map](Olympics/screenshots/america_map.png)

### Participating Countries by Game
The <i>Participating Countries by Game</i> graph provides a static representation of the number of countries that participated in each game presented in this study.

It is worth noting two things:
1)	The increase in participation over time 
2)	The vast difference in participation between the Winter Games vs. the Summer Games due to the varying number of events in each season. For example, the most recent Summer Olympics had 306 events, with a total of 918 medals and the most recent Winter Olympics had only 102 events, the first Winter Olympics to surpass 100 events.

![participants_game](Olympics/screenshots/participants_game.png)

## Data by Country Page
The <i>Data by Country </i>page provides the user information to interact with data related to a particular country and its performance in a particular year and game, whether Summer or Winter.

For example: when viewing Jamaica, their medalists will vary greatly from Summer vs Winter games.
![jamaica](Olympics/screenshots/jamaica_country.png)

Additionally, it provides charts of Olympian counts, % of medalists and event medalist over each Olympics Game (example: USA).
![usa_country1](Olympics/screenshots/usa_country1.png)
![usa_country1](Olympics/screenshots/usa_country2.png)
![usa_country1](Olympics/screenshots/usa_country3.png)

## Data by Game Page
The <i>Data by Game </i>page delves deeper into the analysis of performance in relation to GDP and population by reviewing all countries.

From here we can see some correlation in GDP to medal count:
![gdp](Olympics/screenshots/gdp.png)

But less of a correlation in population to medal count:
![population](Olympics/screenshots/population.png)

Additionally, the data charts provide a broad area of information in <i> Olympians by Country , % of Medalists by Country, </i> and <i> Event Medals by Country </i> – based on which filter is chosen for Olympics Game (example: Summer 2016 – Rio de Janeiro).
![games_charts](Olympics/screenshots/games_charts.png)

## Observations
What we observed in our visualizations is that there appeared to be a correlation between medal counts and GDP. Which would suggest that further analysis could be done on the statistical significance of this visible correlation.

However, we did not see an apparent correlation between medal counts and population. Which would deter us from further analysis.

## Postmortem

### If we had more time:

#### Wider data pull
We would like to have included a wider amount of data in relation to medal counts, even if keeping the same date window.
For example, the world-map has changed quite a bit since 1960, so there have been a number of countries with name changes, which means there are a number of countries that have been omitted from our data; with exception to Russia -- previously known as the Soviet Union. We found that the Soviet Union had so much data that we included it in our country data chart analysis. But if time permitted, we would have either merged data of obsolete country names or added as many obsolete country names to the data dropdowns as possible, instead of excluding them.

#### Distance from Games
We also would have liked to include visualizations comparing distance traveled to medal count. This idea was sparked when we were playing with our filters and saw there a clear increase in medals for Australia during the Sydney games. Unfortunately, we simply did not have enough time to build the logic or visualizations.

#### Statistical Analysis
We also see potential to further statistical analysis (e.g., regression models) on different characteristics and countries' performancs at the Olympics.

### What we would have done differently:
First, we would have connected the map directly to the flask app. Currently, the map reads from a json file that was created from the same dataframe that created the sqlite database that feeds the Flask. So, what this means, is if we were to update the dashboard with Tokyo 2021 data or any other data, both the flask and the json file would need to be updated. Which adds unneeded steps to dashboard updates (this really could also fall under – <i>If we had more time </i>).

And second, we would have liked to have planned a better data schema from the start, as we went through a number of iterations throughout the data structuring phase and on the fly during visualization creation as we realized we needed different data than what was available in our flask.