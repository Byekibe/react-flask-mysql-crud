from flask import Flask, request
from config import connect_to_mysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Fetch all posts
@app.route("/api/posts")
def home():
    connection = connect_to_mysql()
    cursor = connection.cursor(buffered=True)
    # cursor.execute("SELECT * FROM posts")
    cursor.execute("SELECT posts.id, posts.title, posts.subtitle, posts.description, posts.image, posts.date, posts.uid, users.username, users.userImg FROM posts JOIN users ON posts.uid = users.id")
    posts = cursor.fetchall()

    connection.close()
    return {"posts": posts}

# Fetch a single post
@app.route("/api/posts/<int:post_id>")
def post(post_id):
    print(post_id)
    connection = connect_to_mysql()
    cursor = connection.cursor(buffered=True)
    q = "SELECT * FROM posts WHERE id = %s"
    vals = (post_id,)
    cursor.execute(q, vals)
    post= cursor.fetchall()
    connection.close()
    return {"post": post}

# add a post
@app.route("/api/add", methods=['GET', 'POST'])
def add():
    title = request.json['title']
    subTitle = request.json['subTitle']
    description = request.json['description']
    imageUrl = request.json['imageUrl']
    uid = request.json['uid']
    print(title, subTitle, description, imageUrl, uid)
    connection = connect_to_mysql()
    cursor = connection.cursor(buffered=True)
    q = "INSERT INTO posts(title, subtitle, description, image, uid) VALUES(%s, %s, %s, %s, %s)"
    vals = (title, subTitle, description, imageUrl, uid)
    cursor.execute(q, vals)
    connection.commit()
    connection.close()
    return {"msg": "Post added"}, 200

# Update a post
@app.route("/api/post/update/<int:id>", methods=["POST"])
def update(id):
    print(id)
    title = request.json['title']
    subTitle = request.json['subTitle']
    description = request.json['description']
    imageUrl = request.json['imageUrl']
    uid = request.json['uid']
    connection = connect_to_mysql()
    cursor = connection.cursor(buffered=True)
    q = "UPDATE posts SET title=%s, subtitle=%s, description=%s, image=%s, uid=%s WHERE id=%s"
    vals = (title, subTitle, description, imageUrl, uid, id)
    cursor.execute(q, vals)
    connection.commit()
    connection.close() 
    return {"msg": "Updated"} 

# Delete a post
@app.route("/api/post/<int:id>", methods=["POST"])
def delete(id):
    print(id)
    connection = connect_to_mysql()
    cursor = connection.cursor(buffered=True)
    q = "DELETE FROM posts WHERE id = %s"
    vals = (id,)
    cursor.execute(q, vals)
    connection.commit()
    connection.close()
    return {"msg": "Deleted"}


if __name__=="__main__":
    app.run(port=7000, debug=True)