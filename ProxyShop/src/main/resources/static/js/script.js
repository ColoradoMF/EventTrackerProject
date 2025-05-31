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
			e.preventDefault();
			console.log(e.target.parentElement.storeId)
			getStoreDetails(store.id);
			// construct JS object from form input values from film entity ().

		});
	}

}

function showStoreTable() {
	let listDiv = document.getElementById('storeListDiv');
	let detailsDiv = document.getElementById('storeDetailDiv');
	let newStoreDiv = document.getElementById('newStoreFormDiv');
	
}
	
function getStoreDetails(storeId) {
	let url = 'api/stores/' + storeId;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === xhr.DONE) {
					if (xhr.status === 200) {
						let store = JSON.parse(xhr.responseText);
						displayStoreDetails(store);
					} else if (xhr.status === 404) {
						console.error('Store not found, ID = ' + storeId);
						displayError('Store not found');
					} else {
						console.error('Error retreiving store ' + storeId + ": " + xhr.status);
					}
				}
			};
			xhr.send();
}

function displayStoreDetails(store) {
	let detailDiv = document.getElementById('storeDetailDiv');
	detailDiv.innerHTML = "";
	
	let h2 = document.createElement('h2');
	h2.textContent = store.name;
	detailDiv.appendChild(h2);
	
	let pDescription = document.createElement('p');
	pDescription.textContent = 'Description: ' + store.description;
	detailDiv.appendChild(pDescription);
	
	let pLogoImageUrl = document.createElement('p');
	pLogoImageUrl.textContent = 'Logo Image URL: ' + store.logoImageUrl;
	detailDiv.appendChild(pLogoImageUrl);
	
}