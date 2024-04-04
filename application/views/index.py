import flask, application
from flask import render_template
from flask import flash

@application.app.route('/')
def show_index():
    return render_template('index.html')


@application.app.route('/show-user-profile/<username>/')
def show_user_profile(username):
    return flash("testing")
