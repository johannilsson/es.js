export PATH := node_modules/.bin:$(PATH)

all:
	browserify -t hbsfy app.js > dist/bundle.js
	uglifyjs dist/bundle.js --output dist/bundle.min.js
	
