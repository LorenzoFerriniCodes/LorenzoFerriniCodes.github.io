function loadPublications(year) {
    fetch(`https://lorenzoferrinicodes.github.io/pub/${year}.json`) // Adjust the path to your JSON files
        .then(response => response.json())
        .then(data => {
            const publicationsList = document.getElementById('publications');
            const publicationsDropdownList = document.getElementById('publications-dropdown-list');
            const publicationsYear = document.createElement('div');
            
            publicationsDropdownList.innerHTML += `<li><a href="#">${year}</a></li>`;
            
            publicationsYear.className = 'publication-year';
            publicationsYear.innerHTML = `<h3>${year}</h3>`;
            publicationsList.appendChild(publicationsYear);

            data.publications.forEach(publication => {
                const publicationHtml = document.createElement('div');
                publicationHtml.className = 'publication';
                publicationHtml.innerHTML = `<em>${publication.title}</em>, ${publication.author}, ${publication.medium}, ${publication.year}`;
                if (publication.hasOwnProperty("pub_link")){
                    publicationHtml.innerHTML += `, [<a href=${publication.pub_link}>pdf</a>]`
                }
                if (publication.hasOwnProperty("code_repo")){
                    publicationHtml.innerHTML += `, [<a href=${publication.code_repo}>code</a>]`
                }
                publicationsList.appendChild(publicationHtml);
            });
        })
        .catch(error => {
            console.error(`Error loading publications: ${error}`);
        });
}

for (let year = new Date().getFullYear(); year > 2021;){
    const currentYear = year;
    loadPublications(currentYear);
    year--;
}


