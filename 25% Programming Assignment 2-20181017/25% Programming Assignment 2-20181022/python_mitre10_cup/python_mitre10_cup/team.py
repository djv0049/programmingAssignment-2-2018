class Team(object):
    def __init__(self, new_rank, new_name, new_venue, new_city):
        self.rank = new_rank
        self.name = new_name
        self.venue = new_venue
        self.city = new_city
        self.game_count = 0
        self.games_won = 0
        self.games_lost = 0
        self.games_drawn = 0
        self.points_for = 0
        self.points_against = 0
        self.difference = 0
        self.bonus_one = 0
        self.bonus_two = 0
        self.competition_points = 0


    def __str__(self):
        return self.name

    def get_venue(self):
        return self.venue.ljust(35) + self.city

    def standings(self, a_game):
        self.game_count += 1
        tries = 0
        score_against = 0
        score_for = 0
        if a_game.is_home_team(self):  ########
            score_for = a_game.home_team_score
            score_against = a_game.away_team_score
            tries = a_game.home_team_tries
        elif  a_game.away_team.name == self.name:
            score_for = a_game.away_team_score
            score_against = a_game.home_team_score
            tries = a_game.away_team_tries
        if tries > 3:
            self.bonus_one += 1
        diff = 0
        if score_for > score_against:
            diff = score_for -score_against
            self.games_won += 1
        elif score_for < score_against:
            diff = score_against - score_for
            self.games_lost += 1
            if diff <8:
                self.bonus_two += 1
        elif score_for == score_against:
            self.games_drawn += 1

        self.difference = diff
        self.points_against += score_against
        self.points_for += score_for

    def add_points(self):
        self.competition_points += self.games_drawn*2
        self.competition_points += self.games_won*4
        self.competition_points += self.bonus_one+self.bonus_two

    def get(self):
        result = ''
        self.add_points()
        result += f'\nGames: {self.game_count}\n Won: {self.games_won}\n Lost: {self.games_lost}\n Draws: {self.games_drawn}'
        result += f'\nScore:\nFor: {self.points_for}\nAgainst: {self.points_against}\nDifference: {self.difference}'
        result += f'\nCompetition Points:\nBP1: {self.bonus_one}\n BP2: {self.bonus_two}\nPoints: {self.competition_points}'
        return result
