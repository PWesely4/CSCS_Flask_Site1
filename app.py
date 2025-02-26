from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/physics")
def physics():
    return render_template("physics.html")

@app.route("/chemistry")
def chemistry():
    return render_template("chemistry.html")

@app.route("/biology")
def biology():
    return render_template("biology.html")

if __name__ == "__main__":
    app.run(debug=True)
