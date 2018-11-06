from team import Team
from game import Game
import datetime

class Competition(object):
    def __init__(self, new_sponsor, new_year):
        self.sponsor = new_sponsor
        self.year = new_year
        self.all_premiership_teams = []
        self.all_championship_teams = []
        self.all_games = []
        self.all_teams = []
        self.teamCount = 0  # used to separate Premiership and Championship teams by rank

    def add_team(self, new_rank, new_name, new_venue, new_city):
        self.teamCount += 1
        a_new_team = Team(new_rank, new_name, new_venue, new_city)
        self.all_teams.append(a_new_team)
        if self.teamCount <= 7:
            self.all_premiership_teams.append(a_new_team)
        else:
            self.all_championship_teams.append(a_new_team)

    def get_team_by_rank(self, target_rank):
        return self.all_teams[target_rank]

    def add_game(self, new_round, new_home_team_rank, new_away_team_rank, new_when_is8601string):
        import dateutil.parser
        when = dateutil.parser.parse(new_when_is8601string)
        home_team = self.get_team_by_rank(new_home_team_rank - 1)
        away_team = self.get_team_by_rank(new_away_team_rank - 1)
        a_new_game = Game(new_round, home_team, away_team, when)
        self.all_games.append(a_new_game)

    def get_divisions(self):
        result = '\nTEAMS\nPremiership Division\n'
        for team in self.all_premiership_teams:
            result += f'\t{team.rank} {team.name}\n'
        result += 'Championship Division\n'
        for team in self.all_championship_teams:
            result += f'\t{team.rank} {team.name}\n'
        return result

    def get_games(self):
        result = '\nGAMES\n'
        week = 0
        for a_game in self.all_games:
            if a_game.week != week:
                week += 1
                pretty_first_game_date = a_game.when.strftime('%A %d %B')
                sunday_date = a_game.when + datetime.timedelta(6-a_game.when.weekday())
                pretty_sunday_date = sunday_date.strftime('%A %d %B')
                result += f'Week {week}. {pretty_first_game_date} - {pretty_sunday_date}\n'
            result += str(a_game) + '\n'
        return result

    def get_canterbury_games(self):
        result = 'CANTERBURY GAMES\n'
        for a_game in self.all_games:
            if a_game.has_team('Canterbury'):
                result += a_game.get() + '\n'
        return result

    def get_cross_over_games(self):
        result = '\nCROSS OVER GAMES\n'
        for a_game in self.all_games:
            if a_game.is_crossover():
                result += a_game.get() + '\n'
        return result

    def __str__(self):
        result = self.get_divisions()
        result += self.get_games()
        result += self.get_canterbury_games()
        result += self.get_cross_over_games()
        result += self.get_standings()
        return result

    def get(self):
        result = []
        for g in self.all_games:
            result.append( g.when.isformat(), g.home_team.rank,  g.away_team.rank)

    def find_game_by_rank(self, home_team_rank, away_team_rank):
        for a_game in self.all_games:
            htr = a_game.home_team.rank
            atr = a_game.away_team.rank
            if (htr == home_team_rank) & (atr == away_team_rank):
                return a_game


    def set_result(self,home_team_rank, home_team_score, home_team_tries, away_team_rank, away_team_score, away_team_tries):
        a_game = self.find_game_by_rank(home_team_rank, away_team_rank)
        a_game.set_results(home_team_score, away_team_score)
        a_game.home_team_tries = home_team_tries
        a_game.away_team_tries = away_team_tries


    def get_standings(self):
        result = ""
        for a_team in self.all_teams:
            self.set_standings(a_team)
        self.sort_standings(self.all_premiership_teams)#######
        result += f'\n Standings \n {self.sponsor} Premiership \n'
        for a_team in self.all_premiership_teams:
            result += f'\n{a_team.name} {a_team.get()}\n'#####
        self.sort_standings(self.all_championship_teams)
        result += f'\n\n {self.sponsor} CHAMPIONSHIP \n'
        for a_team in self.all_championship_teams:
            result += f'\n{a_team.name}\n {a_team.get()}\n'
        return result

    def sort_standings(self, team_list):
        team_list.sort(key=lambda team : team.games_won, reverse=True)




    def set_standings(self,a_team):
        for a_game in self.all_games:
            if a_game.has_team(a_team.name):
                a_team.standings(a_game)#########






