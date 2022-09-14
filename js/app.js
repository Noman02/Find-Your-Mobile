const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = '';
    // display only 10 phones 
    const showAllButton = document.getElementById("show-all");
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAllButton.classList.remove("d-none")
    }
    else {
        showAllButton.classList.add("d-none")
    }
    // display no phone 
    const noPhoneFound = document.getElementById("no-phone-found");
    if (phones.length === 0) {
        noPhoneFound.classList.remove("d-none")
    }
    else {
        noPhoneFound.classList.add("d-none")
    }

    // display all phone 
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement("div")
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">A smartphone is a portable computer device that combines mobile telephone and computing functions into one unit.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
    </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    // stop spinner or loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = '';
}

document.getElementById("btn-search").addEventListener("click", function () {
    processSearch(10)
})

// search field enter key event handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10)
    }
});

// start spinner or loader 
const toggleSpinner = (isLoading) => {
    const spinnerSection = document.getElementById("loader");
    if (isLoading) {
        spinnerSection.classList.remove("d-none");
    }
    else {
        spinnerSection.classList.add("d-none")
    }
}

document.getElementById("all-show-btn").addEventListener("click", function () {
    processSearch();
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json()
    displayPhoneDetails(data.data)
    console.log(data)
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById("phoneDetailModalLabel");
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML = `
    <p>Release Data:${phone.releaseDate ? phone.releaseDate : 'releaseData not/a'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'storage not found'}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'bluetooth not/a'}</p>

    `
}

loadPhones('apple')
