const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const repositoryContainer = document.getElementById('repositoryContainer');

searchButton.addEventListener('click', searchRepositories);

function searchRepositories() {
  const searchTerm = searchInput.value;

  // Clear previous results
  repositoryContainer.innerHTML = '';

  // Make API request to GitHub
  fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const repositories = data.items;

      repositories.forEach(repository => {
        const repositoryElement = createRepositoryElement(repository);
        repositoryContainer.appendChild(repositoryElement);
      });
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

function createRepositoryElement(repository) {
  const { name, description, html_url, stargazers_count, language } = repository;

  const repositoryElement = document.createElement('div');
  repositoryElement.classList.add('repository');

  const titleElement = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = html_url;
  titleLink.textContent = name;
  titleElement.appendChild(titleLink);
  repositoryElement.appendChild(titleElement);

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    repositoryElement.appendChild(descriptionElement);
  }

  const starsElement = document.createElement('p');
  starsElement.textContent = `Stars: ${stargazers_count}`;
  repositoryElement.appendChild(starsElement);

  if (language) {
    const languageElement = document.createElement('p');
    languageElement.textContent = `Language: ${language}`;
    repositoryElement.appendChild(languageElement);
  }

  return repositoryElement;
}
