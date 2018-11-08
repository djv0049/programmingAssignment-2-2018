class Game(object):
    def __init__(self, new_week, the_home_team, the_away_team, new_date):
        self.week = new_week
        self.when = new_date
        self.home_team = the_home_team
        self.away_team = the_away_team
        if the_home_team:
            self.venue = the_home_team.get_venue()

        else:  # is this needed if NOT adding the semis and finals?
            self.venue = ''

    def __str__(self):
        date = self.when.strftime('%A %d')
        date = date.ljust(15)
        date += self.when.strftime('%I.%M%p')
        result = f'\t{date}\t{self.home_team} v {self.away_team}'
        result = result.ljust(60)
        result += self.venue
        return result

    def get(self):
        date = self.when.strftime('%A %d %B')
        date = date.ljust(25)
        date += self.when.strftime('%I.%M%p')
        result = f'\t{date}\t{self.home_team} v {self.away_team}'
        result = result.ljust(70)
        result += self.venue
        return result

    def has_team(self, target_team_name):
        return self.home_team.name == target_team_name or self.away_team.name == target_team_name

    def is_crossover(self):
        home_division = (self.home_team.rank - 1) // 7
        away_division = (self.away_team.rank - 1 ) // 7
        is_different_division = home_division != away_division
        return is_different_division
