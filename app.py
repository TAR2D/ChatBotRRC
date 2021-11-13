from flask import Flask, render_template, request, jsonify

from hello2 import chatbot_response

app = Flask(__name__)

@app.get("/")
def index_get():
	return  render_template("home.html")

@app.post("/predict")
def predict():
	text = request.get_json().get("message")
	# TODOO : check if text is valid
	response = chatbot_response(text)
	message = {"answer": response}
	return jsonify(message)

if __name__ == "__main__":
	app.run(debug=True)