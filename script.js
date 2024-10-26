document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('content').value;
        const name = document.getElementById('name').value;
        if (content && name) {
            posts.push({ content, name });
            localStorage.setItem('posts', JSON.stringify(posts));
            document.getElementById('content').value = '';
            document.getElementById('name').value = '';
            displayPosts(posts);
        }
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('query').value.toLowerCase();
        const filteredPosts = posts.filter(post => post.content.toLowerCase().includes(query));
        displayPosts(filteredPosts);
    });

    function displayPosts(postsToDisplay) {
        resultsDiv.innerHTML = '';
        postsToDisplay.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `<p>${post.content} - By ${post.name}</p>`;
            resultsDiv.appendChild(postDiv);
        });
    }

    // Display all posts initially
    displayPosts(posts);
});
