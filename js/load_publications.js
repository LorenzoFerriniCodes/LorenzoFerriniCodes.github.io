function loadPublications(year) {
    fetch(`https://github.com/LorenzoFerriniCodes/LorenzoFerriniCodes.github.io/tree/devel/pub/${year}.json`) // Adjust the path to your JSON files
        .then(response => response.json())
        .then(data => {
            const publicationsList = document.getElementById('publications');
            const publicationsYear = document.createElement('div');
            publicationsYear.className = 'publication-year';
            publicationsYear.innerHTML = `<h3>${year}</h3>`;
            publicationsList.appendChild(publicationsYear);

            data.publications.forEach(publication => {
                const publicationHtml = document.createElement('div');
                publicationHtml.className = 'publication';
                publicationHtml.innerHTML = `<em>${publication.title}</em>, ${publication.author}, ${publication.year}`;
                if (publication.hasOwnProperty("pub_link")){
                    publicationHtml.innerHTML += `, [<a href=${publication.pub_link}>pdf</a>]`
                }
                if (publication.hasOwnProperty("code_repo")){
                    publicationHtml.innerHTML += `, [<a href=${publication.code_repo}>code</a>]`
                }
                if (publication.hasOwnProperty("bibtex")){
                    publicationHtml.innerHTML += `, <button class="show-bibtex">Show BibTeX</button>`;
                    publicationHtml.innerHTML +=  `<pre class="bibtex" style="display:none;">${publication.bibtex}</pre>`;
                }
                publicationsList.appendChild(publicationHtml);
            });
        })
        .catch(error => {
            console.error(`Error loading publications: ${error}`);
        });
}

for (let year = new Date().getFullYear(); year > 2021;){
    loadPublications(year);
    year--;
}

function toggleBibtex(button, bibtexElement) {
    if (bibtexElement.style.display === 'none' || bibtexElement.style.display === '') {
        bibtexElement.style.display = 'block';
        button.textContent = 'Hide BibTeX';
    } else {
        bibtexElement.style.display = 'none';
        button.textContent = 'Show BibTeX';
    }
}

// Add event listeners to all "Show BibTeX" buttons
showBibtexButtons = document.querySelectorAll('.show-bibtex');
showBibtexButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('click')
        const bibtexElement = button.nextElementSibling;
        toggleBibtex(button, bibtexElement);
    });
});


