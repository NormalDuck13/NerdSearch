document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const resultsDiv = document.getElementById('results');

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (postForm) {
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
    }

    if (window.location.pathname.includes('search.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query').toLowerCase();
        const filteredPosts = posts.filter(post => post.content.toLowerCase().includes(query));
        displayPosts(filteredPosts);
    }

    function displayPosts(postsToDisplay) {
        resultsDiv.innerHTML = '';
        postsToDisplay.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `<p>${post.content}</p><p><strong>${post.name}</strong></p>`;
            resultsDiv.appendChild(postDiv);
        });
    }
});

