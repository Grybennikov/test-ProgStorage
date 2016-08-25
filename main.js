var members = _decodeFromLS(localStorage.members);
var winners = _decodeFromLS(localStorage.winners);
renderMembers();
renderWinners();
clickSaveBtn();
clickOnNewWinnerBtn();

function _decodeFromLS(string) {
    var decode = string || JSON.stringify([]);
    return JSON.parse(decode);
};

function _encodeToLS(object) {
    var encode = object || [];
    return JSON.stringify(object);
};

function _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function getWinner(length) {
    var random = _getRandomInt(0, length);
    return random;
};

function _saveMember(data) {
    members.push(data);
    localStorage.members = _encodeToLS(members);
};

function _isValid(data) {
    for (i in data) {
        if (data[i].length == 0) return false;
    }
    return true;
};

function clickSaveBtn() {
    var btn = document.getElementById("save");

    save.onclick = function() {
        var data = {
            name: document.getElementById("name").value,
            surname: document.getElementById('surname').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        };

        if (_isValid(data)) {
            _saveMember(data);
        }
        console.log("realod");
        setTimeout(function() {
            window.location.reload();
        }, 100);
        return false;
    };
};

function _renderOneMember(data) {
    var table = document.getElementById('table');
    var tr = document.createElement("tr");
    console.log(data);
    var textTd = {
        name: document.createTextNode(data.name),
        surname: document.createTextNode(data.surname),
        phone: document.createTextNode(data.phone),
        email: document.createTextNode(data.email)

    };
    var td = {
        name: document.createElement("td"),
        surname: document.createElement("td"),
        phone: document.createElement("td"),
        email: document.createElement("td")
    };

    td.name.appendChild(textTd.name);
    td.surname.appendChild(textTd.surname);
    td.phone.appendChild(textTd.phone);
    td.email.appendChild(textTd.email);

    tr.appendChild(td.name);
    tr.appendChild(td.surname);
    tr.appendChild(td.phone);
    tr.appendChild(td.email);
    table.appendChild(tr);
};


function renderMembers() {
    for (i in members) {
        _renderOneMember(members[i]);
    }
};

function clickOnNewWinnerBtn() {
    var btn = document.getElementById("new-winner");
    btn.onclick = function() {
        getNewWinner();
        window.location.reload();
        return false;
    };
};

function getNewWinner() {
    var num = getWinner(members.length);
    if (typeof members[num] != 'undefined') {
    	winners.push(members[num].name);
        localStorage.winners = _encodeToLS(winners);
    } else {
    	alert("No one members :(");
    }
};

function renderWinners() {
	var list = document.getElementById('winners-list');
	for(i in winners){
		var name = document.createTextNode(winners[i]);
		var li = document.createElement('li');
		li.appendChild(name);
		list.appendChild(li);
	}
};
