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

	document
		.getElementById("cancelEditBtn")
		.addEventListener("click", function(e) {
			e.preventDefault();
			hideEditForm();
		});

	document
		.getElementById("updateStoreButton")
		.addEventListener("click", function(event) {
			event.preventDefault();
			// gather updated values from the fields:
			const updatedStore = {
				id: parseInt(editStoreForm.editStoreId.value, 10),
				name: editStoreForm.name.value,
				description: editStoreForm.description.value,
				logoImageUrl: editStoreForm.logoImageUrl.value,
			};
			updateStore(updatedStore);
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

	document.getElementById('addStoreFormDiv').style.display = 'none';
	document.getElementById('showAddStoreBtn').style.display = 'inline-block';
}

function openEditForm(storeId) {
	const url = 'api/stores/' + storeId;
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				const store = JSON.parse(xhr.responseText);
				populateEditForm(store);
			} else {
				console.error('Could not load store for edit, ID=' + storeId);
			}
		}
	};
	xhr.send();
}


function populateEditForm(store) {
	// Hide the store details
	document.getElementById('storeDetailDiv').style.display = 'none';
	
	// Show the editFormDiv, hide the “Add New Store” button:
	document.getElementById('editStoreFormDiv').style.display = 'block';
	document.getElementById('showAddStoreBtn').style.display = 'none';

	// Fill in each field:
	editStoreForm.editStoreId.value = store.id;            // hidden ID
	editStoreForm.name.value = store.name;
	editStoreForm.description.value = store.description;
	editStoreForm.logoImageUrl.value = store.logoImageUrl;

	// Clear out the “Add New Store” form if open:
	addStoreForm.name.value = '';
	addStoreForm.description.value = '';
	addStoreForm.logoImageUrl.value = '';
	
}

	// “Cancel” helper to hide the edit form and re-show “Add New Store”:
function hideEditForm() {
	// 1) Reset fields
	editStoreForm.editStoreId.value = '';
	editStoreForm.name.value = '';
	editStoreForm.description.value = '';
	editStoreForm.logoImageUrl.value = '';

	// 2) Hide the edit‐form container, re‐show “Add New Store” button:
	document.getElementById('editStoreFormDiv').style.display = 'none';
	document.getElementById('showAddStoreBtn').style.display = 'inline-block';
	
	document.getElementById('storeDetailDiv').style.display = 'block';
}

function updateStore(store) {
	const url = 'api/stores/' + store.id;
	const xhr = new XMLHttpRequest();
	xhr.open('PUT', url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				// Success → reload table, hide edit form
				loadStores();
				hideEditForm();
			} else if (xhr.status === 404) {
				displayError('Store not found (could not update)');
			} else {
				displayError('Could not update store (HTTP ' + xhr.status + ')');
			}
		}
	};
	xhr.send(JSON.stringify(store));
}