window.onload = function(){
  console.log("Window loaded");
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  request.open("GET", url);
    request.onload = function(){
      console.log("GOT HERE!");
      if(request.status === 200) {
        var jsonString = request.responseText;
        var countries = JSON.parse(jsonString);
        populateSelect(countries);
      }
    }
}


function populateSelect(countries){
  console.log("IM POPULATING!")
  var select = document.getElementById('country-list');
  select.onchange = handleSelect;
  for(country of countries){
    option = document.createElement("option")
    option.innerText = country.name;
    option.value = country.name;
    select.appendChild(option);
  }
}

function handleSelect(event){
  console.log(event);
  //work out which option has been selected
  //display country details
}

function main(){


  var selectClick = document.getElementById('country-list')
  selectClick.onchange = function(){
    var selectedOption = selectClick.options[selectClick.selectedIndex].value
    console.log(selectedOption)
    findCountry(selectedOption, countries)
  }

    request.send(null);
    console.log(request);
}

function selectHandle(){

}

function findCountry(name, countries){
  for(country of countries){
    if(name === country.name){
      outerDiv = document.getElementById('display-box');
      div = document.createElement('div')
      div.innerText = "Name: " + country.name + " Capital: " + country.capital + " Population: " + country.population;
      outerDiv.appendChild(div)
      localStorage.setItem('selected_countries', JSON.stringify(country))
    }
  }
}

