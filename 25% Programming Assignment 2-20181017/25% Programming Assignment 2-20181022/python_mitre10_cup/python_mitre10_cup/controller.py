from competition import Competition
import json


def setup():
    a_competition = Competition('Mitre 10 Cup', 2018)
    competition_data = json.loads(open('json.txt').read())
    all_teams = competition_data['teams']
    for team in all_teams:
        a_competition.add_team(team['rank'], team['name'], team['venue'], team['city'])
    all_games = competition_data['games']
    for game in all_games:
        a_competition.add_game(game['week'], game['homeTeamRank'], game['awayTeamRank'], game['dateTime'])
    getResults(the_2018_competition)
    return a_competition

def getResults(self, a_competition):
    results_data = json.loads(open('BETTERresultsJSON.txt').read())
    all_results = results_data['results']
    for result in all_results:
        a_competition.setResult(result['homeTeamRank'],result['homeTeamScore'], result['homeTeamTries'], result['awayTeamRank'], result['awayTeamScore'], result['awayTeamTries'])

if __name__ == '__main__':
    the_2018_competition = setup()
    print(the_2018_competition)






