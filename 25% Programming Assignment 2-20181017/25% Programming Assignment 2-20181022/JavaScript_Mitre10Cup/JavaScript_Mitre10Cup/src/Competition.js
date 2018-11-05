/* globals Team, Game, View */
class Competition { // eslint-disable-line no-unused-lets
  constructor (newSponsor, newYear) {
    this.sponsor = newSponsor
    this.year = newYear
    this.allMyChampionshipTeams = []
    this.allMyPremiershipTeams = []
    this.allMyTeams = []
    this.allMyGames = []
  }
  
  addTeam (newRank, newName, newHome, newCity) {
    let aNewTeam = new Team(newRank, newName, newHome, newCity)
    this.allMyTeams.push(aNewTeam)
    if (newRank <= 7) {
      this.allMyPremiershipTeams.push(aNewTeam)
    } else {
      this.allMyChampionshipTeams.push(aNewTeam)
    }
  }
  
  findTeamByRank (targetRank) {
    return this.allMyTeams.find((team) => { return team.rank === targetRank })
  }
  
  addGame (newWeek, newHomeTeamRank, newAwayTeamRank, newWhenString) { // newYear, newMonth, newDay, newMinute) {
    // let when = new Date(newYear, newMonth, newDay, newMinute)
    let when = new Date(newWhenString)
    let theHomeTeam = this.findTeamByRank(newHomeTeamRank)
    let theAwayTeam = this.findTeamByRank(newAwayTeamRank)
    let aNewGame = new Game(newWeek, theHomeTeam, theAwayTeam, when)
    this.allMyGames.push(aNewGame)
  }
  
  findGameByRank (homeRank, awayRank){
    //return this.allMyGames.find((game) => {return (game.homeTeamRank == homeRank)&&(game.awayTeamRank == awayRank)})
	let result = null
	for (let aGame of this.allMyGames){
		let atr = aGame.myAwayTeam.rank
		let htr = aGame.myHomeTeam.rank
		if ((atr == awayRank) && (htr == homeRank)){
			result = aGame
			return result
		}
	}	
  }
  setResult (homeTeamRank, homeTeamScore, homeTeamTries, awayTeamRank, awayTeamScore, awayTeamTries) { // newYear, newMonth, newDay, newMinute) {
    // let when = new Date(newYear, newMonth, newDay, newMinute)
    let aGame = this.findGameByRank(homeTeamRank, awayTeamRank)
    aGame.setResult(homeTeamScore,awayTeamScore)
    aGame.homeTeamTries = homeTeamTries
    aGame.awayTeamTries = awayTeamTries
    
    
    
    /*let when = new Date(newWhenString)
    let theHomeTeam = this.findTeamByRank(newHomeTeamRank)
    let theAwayTeam = this.findTeamByRank(newAwayTeamRank)
    let aNewGame = new Game(newWeek, theHomeTeam, theAwayTeam, when)
    this.allMyGames.push(aNewGame)
    */
  }
  
  getDivisions () {
    let result = `${View.NEWLINE()}TEAMS${View.NEWLINE()}Premiership Division${View.NEWLINE()}`
    for (let aTeam of this.allMyPremiershipTeams) {
      result += `${aTeam.rank} ${aTeam.name} ${View.NEWLINE()}`
    }
    result += 'Championship Division' + View.NEWLINE()
    for (let aTeam of this.allMyChampionshipTeams) {
      result += `${aTeam.rank} ${aTeam.name} ${View.NEWLINE()}`
    }
    return result
  }
  
  getGames () {
    let result = `${View.NEWLINE()}GAMES${View.NEWLINE()}`
    let week = 0
    for (let aGame of this.allMyGames) {
      if (aGame.week !== week) {
        week += 1
        result += `Week ${week}. ${aGame.getWhen()} - ${aGame.getSunday()}${View.NEWLINE()}`
      }
      result += aGame + View.NEWLINE()
    }
    return result
  }
  
  getCanterburyGames () {
    let result = `${View.NEWLINE()}CANTERBURY GAMES${View.NEWLINE()}`
    for (let aGame of this.allMyGames) {
      if (aGame.hasTeam('Canterbury')) {
        result += aGame.get() + View.NEWLINE()
      }
    }
    return result
  }

  getCrossOverGames () {
    let result = `${View.NEWLINE()}CROSS OVER GAMES${View.NEWLINE()}`
    for (let aGame of this.allMyGames) {
      if (aGame.isCrossOver()) {
        result += aGame.get() + View.NEWLINE()
      }
    }
    return result
  }
  
  ///NEW FUNCTIONS FROM ASSIGNMENT 2 FOR DISPLAYING THE STANDINGS
  
  getStandings(){
    let result = ""
    for(let aTeam of this.allMyTeams){
      this.setStandings(aTeam)
    }
    this.sortStandings(this.allMyPremiershipTeams)
	  result += `${View.NEWLINE()}STANDINGS ${View.NEWLINE()}${this.sponsor} PREMIERSHIP ${View.NEWLINE()}`
	  for(let aTeam of this.allMyPremiershipTeams){
      
      result += `${View.NEWLINE()}${aTeam.name}${aTeam.get()}${View.NEWLINE()}`
    }
    this.sortStandings(this.allMyChampionshipTeams)
    result +=`${View.NEWLINE()}${View.NEWLINE()}${this.sponsor} CHAMPIONSHIP ${View.NEWLINE()}`
    for(let aTeam of this.allMyChampionshipTeams){
      result += `${View.NEWLINE()}${aTeam.name}${View.NEWLINE()}${aTeam.get()}${View.NEWLINE()}`
    }
    return result
  }
  
  //let result = `${View.NEWLINE()}<b>${aTeam.name}:</b>`
  setStandings(aTeam){ 
    for(let aGame of this.allMyGames){
      if(aGame.hasTeam(aTeam.name)){
        aTeam.standings(aGame)
      }
    }
  }
  

  sortStandings(teamList){
    teamList.sort(function(a, b){return a.gamesWon - b.gamesWon})
    teamList.reverse()
  }
  
  
  getAll () {
    let result = this.getDivisions()
    result += this.getGames()
    result += this.getCanterburyGames()
    result += this.getCrossOverGames()
    result += this.getStandings()
    return result
  }
}
