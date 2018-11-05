class Team { // eslint-disable-line no-unused-lets
  constructor (newRank, newName, newVenue, newCity) {
    this.rank = newRank
    this.name = newName
    this.venue = newVenue
    this.city = newCity
    this.gameCount =0
    this.gamesWon =0
    this.gamesLost =0
    this.draws =0
    this.pointsFor =0
    this.pointsAgainst=0
    this.difference=0
    this.bP2=0
    this.bP1=0
    this.competitionPoints =0
  }
  getVenue () {
    return `${this.venue} ${this.city}`
  }
  standings(aGame){
    this.gameCount += 1
    let tries = 0
    let scoreAgainst = 0
    let scoreFor = 0
    if (aGame.isHomeTeam(this)){
      scoreFor = aGame.homeTeamScore
      tries = aGame.homeTeamTries
      scoreAgainst = aGame.awayTeamScore
    }
    else {
      scoreFor = aGame.awayTeamScore
      tries = aGame.awayTeamTries
      scoreAgainst = aGame.homeTeamScore
    }
    if(tries > 3){this.bP1 += 1}
    let diff = 0
    if(scoreFor > scoreAgainst){
      diff = (scoreFor - scoreAgainst)
      this.gamesWon += 1
      }
    else if(scoreFor === scoreAgainst){
        this.draws += 1
        }
    else if(scoreAgainst > scoreFor){
      diff = (scoreAgainst - scoreFor)
      this.gamesLost += 1
      if(diff < 8){
        this.bP2 += 1
      }
    }
    this.difference += diff
    this.pointsAgainst += scoreAgainst
    this.pointsFor += scoreFor
    }
    
    addPoints(){
      this.competitionPoints += (this.draws*2)
      this.competitionPoints += (this.gamesWon*4)
      this.competitionPoints += (this.bP1 + this.bP2)
    }
    get(){
      this.addPoints()
      return `${View.NEWLINE()}<i>Games:</i> ${this.gameCount} ${View.NEWLINE()}Won: ${this.gamesWon}${View.NEWLINE()}Draw: ${this.draws}${View.NEWLINE()}Lost: ${this.gamesLost}${View.NEWLINE()}<i>Points:</i>  ${View.NEWLINE()}For: ${this.pointsFor}${View.NEWLINE()}Against:${this.pointsAgainst}${View.NEWLINE()}Difference: ${this.difference}${View.NEWLINE()} <i>Compettion Points:</i> ${View.NEWLINE()}BP1: ${this.bP1} ${View.NEWLINE()}BP2: ${this.bP2} ${View.NEWLINE()}Points: ${this.competitionPoints}` 
    }
  toString () {
    return `${this.rank} ${this.name}`
  }
 }
 