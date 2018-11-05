class Results { // eslint-disable-line no-unused-lets
  constructor (newWeek, newDateTime, newHomeTeamRank, newAwayTeamRank, newHomeTeamScore, newAwayTeamScore,newHomeTeamTries, newAwayTeamTries) {
    this.week = newWeek
    this.dateTime = newDateTime
    this.homeTeamRank = newHomeTeamRank
    this.awayTeamRank = newAwayTeamRank
    this.homeTeamScore = newHomeTeamScore
    this.awayTeamScore = newAwayTeamScore
    this.homeTeamTries = newHomeTeamTries
    this.awayTeamTries = newAwayTeamTries
  }
  getScores () {
    return `${this.homeTeamScore} ${this.awayTeamScore}`
  }
  toString () {
    return `Result for ${this.homeTeamRank} and ${this.awayTeamRank}`
  }
 }
 