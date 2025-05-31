console.log('script.js loaded');

window.addEventListener('load', function(e) {
	console.log('DOM created');
	init();

});

function init() {
	loadStores();

}

function loadStores() {
	//XHR stuff here from getFilm in filmFunctions.js in videoStoreREST
	let url = 'api/stores';
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {


				let stores = JSON.parse(xhr.responseText);
				displayStores(stores);
				//console.log(stores);
			}
			else {
				//		
			}
		}
	};
	xhr.send();
}

function displayStores(storeList) {
	//DOM stuff here
	let tbody = document.getElementById("storeTableBody");
	if (!Array.isArray(storeList)) {
		return;
	}
	tbody.innerHTML = "";

	for (let store of storeList) {
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		let td = document.createElement('td');
		let img = document.createElement('img');
		img.src = store.logoImageUrl;
		img.alt = 'Image of ' + store.name;
		img.classList.add('storeThumbnail')

		td.textContent = store.name;
		tr.appendChild(td);
		td.appendChild(img);

		td = document.createElement('td');
  		td.textContent = store.location;
		tr.appendChild(td);

		tr.storeId = store.id;
		tr.addEventListener('click', function(e) {
			console.log(e.target.parentElement.storeId)
			getStoreDetails(e.target.parentElement.storeId);
		});
	}

}

function getStoreDetails(storeId) {
	console.log('Store ID: ' + storeId);

}

function showStoreTable() {
	let listDiv = document.getElementById('storeListDiv');
	let detailsDiv = document.getElementById('storeDetailDiv');
	let newStoreDiv = document.getElementById('newStoreFormDiv');
	
function showStoreDetails() {
	
}	
	 
}