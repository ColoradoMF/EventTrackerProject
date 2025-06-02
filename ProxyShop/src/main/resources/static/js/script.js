console.log('script.js loaded');

window.addEventListener('load', function(e) {
	console.log('DOM created');
	init();
});

function init() {
	loadStores();

	document.addStoreForm.addStoreButton.addEventListener('click', function(event) {
		event.preventDefault();
		let newStore = {
			name: addStoreForm.name.value,
			description: addStoreForm.description.value,
			logoImageUrl: addStoreForm.logoImageUrl.value,
		};
		addStore(newStore);
	});
	document.getElementById("showAddStoreBtn").addEventListener("click", function(e) {
	  e.preventDefault();
	  document.getElementById("addStoreFormDiv").style.display = "block";
	  this.style.display = "none"; // hide the “Add New Store” button while the form is open
	});
	
	document.getElementById("cancelStoreBtn").addEventListener("click", function(e) {
	    e.preventDefault();
	    hideForm();
	  });

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
			}
		}
	};
	xhr.send();
}

function displayStores(storeList) {
	let tbody = document.getElementById("storeTableBody");
	if (!Array.isArray(storeList)) {
		return;
	}

	// clear out any previous rows
	tbody.innerHTML = "";

	for (let store of storeList) {
		//Create a <tr> and attach to <tbody>
		let tr = document.createElement('tr');
		tr.storeId = store.id;
		tbody.appendChild(tr);

		//store logo in table column
		let tdLogo = document.createElement('td');
		let img = document.createElement('img');
		img.onerror = () => { 
			img.src = 'https://cloudfront.codeproject.com/testing/1002904/test-url-redirects-httpwebrequest.jpg'; 
			};
		img.src = store.logoImageUrl || 
			'https://cloudfront.codeproject.com/testing/1002904/test-url-redirects-httpwebrequest.jpg';
		img.alt = 'Logo image for ' + store.name;
		img.classList.add('storeThumbnail')

		tdLogo.appendChild(img);
		tdLogo.addEventListener('click', function(e) {
			e.preventDefault();
			console.log(e.target.parentElement.storeId)
			getStoreDetails(store.id);
		});
		tr.appendChild(tdLogo);

		//name of store in table column 
		let tdName = document.createElement("td");
		tdName.textContent = store.name;
		tdName.addEventListener("click", function(e) {
			e.preventDefault();
			getStoreDetails(store.id);
		});
		tr.appendChild(tdName);

		//remove & edit buttons in table for each store
		let tdActions = document.createElement('td');
		let button = document.createElement('button');
		button.name = "Delete";
		button.textContent = "Remove";
		button.addEventListener('click', function(evt) {
			evt.preventDefault();
			deleteStore(store.id);
		});
		tdActions.appendChild(button);
		tdActions.appendChild(document.createTextNode('  '));

		let editBtn = document.createElement("button");
		editBtn.name = "Update";
		editBtn.textContent = "Edit";
		editBtn.addEventListener("click", function(event) {
			event.preventDefault();
			openEditForm(store.id);
		})
		tdActions.appendChild(editBtn);

		tr.appendChild(tdActions);
	}
}


function showStoreTable() {
	let listDiv = document.getElementById('storeListDiv');
	let detailsDiv = document.getElementById('storeDetailDiv');
	let newStoreDiv = document.getElementById('addStoreFormDiv');
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

function addStore(store) {
	let url = 'api/stores';
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	// use XHR to POST to api/stores
	// send will be different, go back one page in the material
	// send JSON version of that object to xhr.send
	// set
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 201) {
				let createdStore = JSON.parse(xhr.responseText);
				loadStores();
				hideForm();
			} else {
				displayError('Could not create store');
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	let storeJson = JSON.stringify(store); // Convert JS object to JSON string

	// Pass JSON as request body
	xhr.send(storeJson);
}

function deleteStore(storeId) {
	let url = 'api/stores/' + storeId;
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', url);
	// use XHR to DELETE to api/stores with storeId
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 204) {
				loadStores();
			} else {
				displayError('Could not delete store');
			}
		}
	};
	xhr.send();
}


function hideForm() {
	addStoreForm.name.value = "";
	addStoreForm.description.value = "";
	addStoreForm.logoImageUrl.value = "";
	
	document.getElementById('addStoreFormDiv').style.display   = 'none';
	document.getElementById('showAddStoreBtn').style.display = 'inline-block';
	}

