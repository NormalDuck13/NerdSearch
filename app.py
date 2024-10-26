from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, content TEXT, name TEXT)''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM posts')
    posts = c.fetchall()
    conn.close()
    return render_template('index.html', posts=posts)

@app.route('/post', methods=['POST'])
def post():
    content = request.form['content']
    name = request.form['name']
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('INSERT INTO posts (content, name) VALUES (?, ?)', (content, name))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM posts WHERE content LIKE ?', ('%' + query + '%',))
    posts = c.fetchall()
    conn.close()
    return render_template('index.html', posts=posts)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)

