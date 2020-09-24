@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Headers',
						'Content-Type,Authorization,true')
	response.headers.add('Access-Control-Allow-Methods',
						'GET,PUT,POST,DELETE,OPTIONS')
	return response
