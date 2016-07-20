Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

var state = {
  countries: [],
  regions: []
}

window.onload = function(){
  console.log("Window loaded")
  setCountries();
  main();
}

function setCountries(){
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  var countries = {}
  request.onload = function(){
    if(request.status === 200) {
      var jsonString = request.responseText;
      state.countries = JSON.parse(jsonString)
      setRegions();
      renderAllCountriesSelect();
      renderRegionsSelect();
      console.log("Data loaded!")
    }
  }
  request.send( null );
}

function renderAllCountriesSelect(id){
  var select = document.getElementById('country-list')
  for(country of state.countries){
    option = document.createElement("option")
    option.innerText = country.name
    option.value = country.name
    select.appendChild(option)
  }
}

function renderRegionsSelect(){
  var select = document.getElementById('region-select')
  select.innerHTML = "";
  for(region of state.regions){
    option = document.createElement("option")
    option.innerText = region.name
    option.value = region.name
    select.appendChild(option)
  }
}

function setRegions(){
  regionInfo = {};
  for(country of state.countries){
    if(!regionInfo[country.region]){
      regionInfo[country.region] = {name: country.region, subregions: []}
      regionInfo[country.region].subregions.push(country.subregion)
    }
  }

  for(country of state.countries){
    regionInfo[country.region].subregions.push(country.subregion)
  }

  for(region in regionInfo){
    distinctRegions = regionInfo[region].subregions.unique();
    regionInfo[region].subregions = distinctRegions;
    state.regions.push(regionInfo[region])
  }
  var index = state.regions.length -1
  state.regions.splice(index, 1)

}

function main(){
  var selectClick = document.getElementById('country-list')
  selectClick.onchange = displayCountry;

  var regionChange = document.getElementById('region-select')
  regionChange.onchange = regionMenuHandle;


  // var saveCountryBtn = document.getElementById('save-country')
  // saveCountryBtn.onclick = function(){
  //   saveCountry;
  // }

  var cleaLocalBtn = document.getElementById('clear-saved-data')
  cleaLocalBtn.onclick = clearLocalStoage;
}

function regionMenuHandle(){
  if(document.getElementById('country-select')){
    var country = findCountryByName(document.getElementById('country-select').value);
    renderCountry(country);
    document.getElementById('country-select').id = 'region-select'
    renderRegionsSelect();
    return
  }
  if(document.getElementById('subRegion-Select')){
    changeToCountries();
  }
  if(document.getElementById('region-select')){
    changeToSubRegions();
  }
}

function findCountryByName(name){
  for(country of state.countries){
    if(country.name === name){
      return country;
    }
  }
}

function changeToCountries(){
  document.getElementById('subRegion-Select').id = "country-select"
  var select = document.getElementById('country-select')
  var selectedSubRegion = document.getElementById('country-select').value;
  select.innerHTML = ""
  for(country of state.countries){
    if(country.subregion === selectedSubRegion){
      option = document.createElement("option")
      option.innerText = country.name
      option.value = country.name
      select.appendChild(option)
    }
  }
}

function changeToSubRegions(){
  document.getElementById('region-select').id = "subRegion-Select"
  var select = document.getElementById('subRegion-Select')
  var selectedRegion = document.getElementById('subRegion-Select').value;

  for(region of state.regions){
    if(region.name === selectedRegion){
      select.innerHTML = "";
      for(subRegion of region.subregions){
        console.log(subRegion)
        option = document.createElement("option")
        option.innerText = subRegion
        option.value = subRegion
        select.appendChild(option)
      }
    }
  }
}

function displayCountry(){
  var selectClick = document.getElementById('country-list')
  var selectedOption = selectClick.options[selectClick.selectedIndex].value
  country = findCountry(selectedOption, state.countries)
  renderCountry(country);
}

function renderCountry(country){
  var neigboors = findNeighbours(country);
  outerDiv = document.getElementById('display-box');
  outerDiv.innerHTML = "";

  //break down into divs and ps so i can pull country name from it
  div = document.createElement('div');
  div.id = "country-box";

  row = document.createElement('row');
  col12 = document.createElement('div');
  col12.className = "col-12";

  h3 = document.createElement('h3');
  h3.id = "country-name";
  h3.innerText = country.name;

  //creates first row of box with title
  col12.appendChild(h3);
  row.appendChild(col12);
  div.appendChild(row)

  //create next row with 2 x col-6
  row = document.createElement('row')
  col6 = document.createElement('div')
  col6.className = "col-6";
  h6 = document.createElement('h6');
  h6.id = "country-stats";
  h6.innerText = "Captial City";

  col6.appendChild(h6)
  row.appendChild(col6)

  col6 = document.createElement('div')
  col6.className = "col-6";
  h6 = document.createElement('h6');
  h6.id = "country-stats";
  h6.innerText = "Population";
  col6.appendChild(h6)
  row.appendChild(col6)

  div.appendChild(row)

  //create next row with 2 x col-6 for stats
  row = document.createElement('row')
  col6 = document.createElement('div')
  col6.className = "col-6";
  h6 = document.createElement('h6');
  h6.id = "country-stats";
  h6.innerText = country.capital;

  col6.appendChild(h6)
  row.appendChild(col6)

  col6 = document.createElement('div')
  col6.className = "col-6";
  h6 = document.createElement('h6');
  h6.id = "country-stats";
  h6.innerText = country.population;
  col6.appendChild(h6)
  row.appendChild(col6)

  div.appendChild(row)
  if(neighboors.length > 0){
    hr = document.createElement('hr')
    div.appendChild(hr)
    ul = document.createElement("ul");
    for(neighboor of neighboors){
      li = document.createElement('li')
      console.log(neighboor.name)
      li.value = neighboor.name
      li.innerText = neighboor.name
      ul.appendChild(li)
    }
    div.appendChild(ul)
  }

  // p = document.createElement('p')
  // p.innerText = " Capital: " + country.capital + " Population: " + country.population;
  // div.appendChild(h3)
  // div.appendChild(p)

  // if(neighboors.length > 0){
  //   renderNeighboors(neighboors);
  // }
  btn = document.createElement('button')
  btn.type = 'button'
  btn.id = 'save-country'
  btn.innerText = "Save Country"
  div.appendChild(btn)
  outerDiv.appendChild(div)

  btn.onclick = function(){
  saveCountry(country);
  }
}

function renderNeighboors(neighboors){
  outerDiv = document.getElementById('display-box');
  div = document.createElement('div')
  p = document.createElement('p')
  p.innerText = "Borders: "
  div.appendChild(p)
  outerDiv.appendChild(div)

  for(neighboor of neighboors){
    div = document.createElement('div')
    p = document.createElement('p')
    p.innerText = neighboor.name
    div.appendChild(p)
    outerDiv.appendChild(div)
  }
}

function findNeighbours(selectedCountry){
  neighboors = []
    for(neighboor of selectedCountry.borders){
      for(country of state.countries){
        if(country.alpha3Code === neighboor){
          neighboors.push(country);
        }
      }
    }
    return neighboors;
}

function findCountry(name, countries){
  for(country of countries){
    if(name === country.name){
      return country
    }
  }
}

function countriesOfSubRegion(selectedCountry){
  result = []
  for(country of state.countries){
    if(selectedCountry === country.name){
      result.push(country);
    }
  }
  console.log(result)
  return result;
}

function clearLocalStoage(){
  localStorage.removeItem('selected_countries')
}

function saveCountry(country){
  console.log("IM in")
  console.log(country)
  localStorage.setItem('selected_countries', JSON.stringify(country))
}


