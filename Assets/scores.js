function showScores(){

    var score=JSON.parse(localStorage.getItem('gameScores')) || [];

    score.forEach(function(data){
        var list = document.createElement('li');
        list.textContent = data.userName + '-' + data.userScore;

        var olEl =  document.getElementById('highscores');
        olEl.append(list)
    });
}

showScores();