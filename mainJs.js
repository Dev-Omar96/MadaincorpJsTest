
var rows = 10;
var category = ["category1", "category2", "category3"];
var noOfRows = document.getElementById('noOfRowsInput');
noOfRows.value = rows;


// JavaScript to add a fade-in animation to cards
document.addEventListener('DOMContentLoaded', function () {
    var cards = document.querySelectorAll('.card');

    cards.forEach(function (card, index) {
        setTimeout(function () {
            card.style.opacity = 1;
        }, index * 500); // Adjust the delay for a staggered effect
    });
});

document.getElementById('allItemsBtn').classList.add('active');

fetchData(rows, category);

// Add an event listener to handle changes and ensure the value stays positive
noOfRows.addEventListener('input', function () {
    // Ensure the value is not negative
    if (parseFloat(noOfRows.value) <= 0) {
        noOfRows.value = rows;
    }
    else {
        rows = +noOfRows.value;
    }
});


function filterData() {
    fetchData(rows, category);
}

function resetFilter() {
    rows = 10;
    category = ["category1", "category2", "category3"];
    fetchData(rows, category);
    setFilterCategory('all');
    document.getElementById('allItemsBtn').classList.add('active');
}


async function fetchData(rows, category) {
    const categoryString = encodeURIComponent(JSON.stringify(category));
    const apiUrl = `https://filltext.com/?rows=${rows}&fname={firstName}&lname={lastName}&category=${categoryString}&pretty=true`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        bindDataToHTML(data);

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}


function bindDataToHTML(data) {
    var container = document.body;
    clearHtmlPreviousData('card');
    data.forEach(function (item) {
        var card = document.createElement("div");
        card.className = "card";

        var heading = document.createElement("h3");
        heading.textContent = item.fname + " " + item.lname;

        var categoryParagraph = document.createElement("p");
        categoryParagraph.innerHTML = "<strong>Category:</strong> " + item.category;

        card.appendChild(heading);
        card.appendChild(categoryParagraph);

        container.appendChild(card);
    });
}

function clearHtmlPreviousData(className) {
    try {
        // Get all elements with the specified class name
        const elementsToRemove = document.getElementsByClassName(className);

        // Remove each element
        while (elementsToRemove.length > 0) {
            elementsToRemove[0].remove();
        }
    }
    catch {

    }

}


function setFilterCategory(categoryItem) {

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add 'active' class to the clicked button
    event.target.classList.add('active');


    if (categoryItem === 'all') {
        category = ["category1", "category2", "category3"]
    }
    else {
        category = [categoryItem];
    }


}

