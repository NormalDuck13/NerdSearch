document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const loginForm = document.getElementById('loginForm');
    const createAccountButton = document.getElementById('createAccountButton');
    const postForm = document.getElementById('postForm');
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');

    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let currentAccount = JSON.parse(localStorage.getItem('currentAccount')) || null;
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (currentAccount) {
        postForm.classList.remove('hidden');
    }

    loginButton.addEventListener('click', () => {
        loginFormContainer.classList.toggle('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('loginName').value;
        const password = document.getElementById('loginPassword').value;
        const account = accounts.find(acc => acc.name === name && acc.password === password);
        if (account) {
            currentAccount = account;
            localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
            postForm.classList.remove('hidden');
            loginFormContainer.classList.add('hidden');
            alert('Logged in successfully!');
        } else {
            alert('Incorrect name or password.');
        }
    });

    createAccountButton.addEventListener('click', () => {
        const name = document.getElementById('loginName').value;
        const password = document.getElementById('loginPassword').value;
        if (accounts.find(acc => acc.name === name)) {
            alert('Account name already exists.');
        } else {
            const newAccount = { name, password };
            accounts.push(newAccount);
            localStorage.setItem('accounts', JSON.stringify(accounts));
            alert('Account created successfully! You can now log in.');
        }
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('content').value;
        if (content && currentAccount) {
            posts.push({ content, name: currentAccount.name });
            localStorage.setItem('posts', JSON.stringify(posts));
            document.getElementById('content').value = '';
            displayPosts(posts);
        }
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('query').value.toLowerCase();
        const queryWords = query.split(' ');
        const filteredPosts = posts.map(post => {
            const postWords = post.content.toLowerCase().split(' ');
            const matchCount = queryWords.reduce((count, word) => count + (postWords.includes(word) ? 1 : 0), 0);
            return { ...post, matchCount };
        }).sort((a, b) => b.matchCount - a.matchCount);
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

    displayPosts(posts);
});
