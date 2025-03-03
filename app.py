from flask import Flask, render_template

#instantiate the flask application
app = Flask(__name__, static_folder="static")


#set up routes for all pages
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


#starts app with debug set to True
if __name__ == "__main__": 
    app.run(debug=True)
