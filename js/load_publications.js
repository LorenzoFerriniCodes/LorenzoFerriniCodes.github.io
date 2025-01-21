function loadPublications(year) {
    fetch(`https://lorenzoferrinicodes.github.io/pub/${year}.json`) // Adjust the path to your JSON files
        .then(response => response.json())
        .then(data => {
            const publicationsList = document.getElementById('publications');
            const publicationsDropdownList = document.getElementById('publications-dropdown-list');
            const publicationsYear = document.createElement('div');
            
            publicationsDropdownList.innerHTML += `<li><a href="#${year}">${year}</a></li>`;
            
            publicationsYear.className = 'publication-year';
            publicationsYear.innerHTML = `<h3 id="${year}" style="margin-top: 40px;">${year}</h3>`;
            publicationsList.appendChild(publicationsYear);

            data.publications.forEach((publication, index, array) => {
                const publicationHtml = document.createElement('div');
                publicationHtml.className = 'publication';

                // Highlight your name in the authors
                const highlightedAuthors = publication.author.replace(/Ferrini L\./g, '<u>Ferrini L.</u>');

                // Generate publication HTML
                publicationHtml.innerHTML = `
                    <em>${publication.title}</em>, ${highlightedAuthors}, ${publication.medium}, ${publication.year}
                `;

                if (publication.hasOwnProperty("pub_link")) {
                    publicationHtml.innerHTML += `, [<a href=${publication.pub_link}>pdf</a>]`;
                }
                if (publication.hasOwnProperty("code_repo")) {
                    publicationHtml.innerHTML += `, [<a href=${publication.code_repo}>code</a>]`;
                }

                // Add a lighter, shorter divider after each publication (except the last in the year)
                if (index < array.length - 1) {
                    publicationHtml.innerHTML += `
                        <hr style="margin: 10px 0; border: 0.5px solid #ddd; width: 50%;">
                    `;
                }

                publicationsList.appendChild(publicationHtml);
            });
        })
        .catch(error => {
            console.error(`Error loading publications: ${error}`);
        });
}

for (let year = new Date().getFullYear(); year > 2021;) {
    const currentYear = year;
    loadPublications(currentYear);
    year--;
}