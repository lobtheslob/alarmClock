from datetime import datetime
from flask import Flask, render_template, url_for, request, redirect, flash

app = Flask(__name__)
bookmarks = []



@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html', title="Title page")
							

@app.errorhandler(404)
def page_not_found(e):
	return render_template('404.html'), 404
	
	
@app.errorhandler(500)
def page_not_found(e):
	return render_template('500.html'), 500
	
	
if __name__ == '__main__':
	app.run(debug=True)

