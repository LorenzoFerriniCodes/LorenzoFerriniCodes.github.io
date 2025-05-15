document.addEventListener('DOMContentLoaded', () => {
    async function loadAllPublications(startYear, endYear) {
        const publicationsList = document.getElementById('publications');
        const publicationsDropdownList = document.getElementById('publications-dropdown-list');

        for (let year = startYear; year >= endYear; year--) {
            try {
                const response = await fetch(`https://lorenzoferrinicodes.github.io/pub/${year}.json`);
                const data = await response.json();

                publicationsDropdownList.innerHTML += `<li><a href="#${year}">${year}</a></li>`;

                const publicationsYear = document.createElement('div');
                publicationsYear.className = 'publication-year';
                publicationsYear.innerHTML = `<h3 id="${year}" style="margin-top: 40px;">${year}</h3>`;
                publicationsList.appendChild(publicationsYear);

                data.publications.sort((a, b) => a.title.localeCompare(b.title));

                data.publications.forEach((publication, index, array) => {
                    const publicationHtml = document.createElement('div');
                    publicationHtml.className = 'publication';

                    const highlightedAuthors = publication.author.replace(/Ferrini L\./g, '<u>Ferrini L.</u>');

                    publicationHtml.innerHTML = `
                        <em>${publication.title}</em>, ${highlightedAuthors}, ${publication.medium}, ${publication.year}
                    `;

                    if (publication.pub_link) {
                        publicationHtml.innerHTML += `, [<a href=${publication.pub_link}>pdf</a>]`;
                    }
                    if (publication.code_repo) {
                        publicationHtml.innerHTML += `, [<a href=${publication.code_repo}>code</a>]`;
                    }

                    if (index < array.length - 1) {
                        publicationHtml.innerHTML += `
                            <hr style="margin: 10px 0; border: 0.5px solid #ddd; width: 50%;">
                        `;
                    }

                    publicationsList.appendChild(publicationHtml);
                });

            } catch (error) {
                console.error(`Error loading publications for ${year}: ${error}`);
            }
        }
    }

    loadAllPublications(new Date().getFullYear(), 2022);
});