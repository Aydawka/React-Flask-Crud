from flask import Flask, request, abort, jsonify, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from sqlalchemy.sql import expression
from flask_migrate import Migrate
import os,sys
import random,json

app = Flask(__name__)


CORS(app)

@app.route('/')
def index():
	return redirect(url_for('get_todos'))


@app.route('/todos', methods=['POST'])
@cross_origin()
def create_todo():
	try:
		name = request.get_json()['name']
		completed = request.get_json()['completed']
		todo = Todo(name=name, completed=completed)
		todo.insert()
		todo.close()
	except:
		abort(422)
	return jsonify({'success': 'success'})




@app.route('/todos/<todo_id>', methods=['DELETE'])
@cross_origin()
def delete_todo(todo_id):
	try:
		todo = Todo.query.filter(Todo.id == todo_id).one_or_none()
		todo.delete()
		todo.close()
	except:
		abort(422)
	return jsonify({'success': 'success'})



@app.route('/todos', methods=['GET'])
def get_todos():
	try:
		todos = Todo.query.order_by('id').all()
		formatted_todos = [todo.format() for todo in todos]
	except:
		abort(422)
	return jsonify({'success': 'success', 'todos': formatted_todos})



@app.route('/todos/completed/<todo_id>', methods=["POST"])
def set_completed(todo_id):
	try:
		completed = request.get_json()['completed']
		todo = Todo.query.filter(Todo.id == todo_id).one_or_none()
		todo.completed = completed
		todo.update()
		todo.close()
	except:
		abort(422)
	return redirect(url_for('get_todos'))

@app.errorhandler(404)
def not_found(error):
	return jsonify({
		"success": False,
		"error": 404,
		"message": "Not found"
	}), 404

@app.errorhandler(422)
def unprocessable(error):
	return jsonify({
		"success": False,
		"error": 422,
		"message": "Unprocessable"
	}), 422

@app.errorhandler(405)
def method_not_allowed(error):
	return jsonify({
		"success": False,
		"error": 405,
		"message": "Method not allowed"
	}), 405


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/crud'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Todo(db.Model):
	__tablename__ = 'todos'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100))
	completed = db.Column(db.Boolean, default=False, nullable=False)

	def __init__(self, name, completed):
		self.name = name
		self.completed = completed

	def insert(self):
		db.session.add(self)
		db.session.commit()

	def update(self):
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def close(self):
		db.session.close()

	def rollback(self):
		db.session.rollback()

	def format(self):
		return {
			'id': self.id,
			'name': self.name,
			'completed': self.completed
		}


if __name__=='__main__':
	app.run(debug=True)