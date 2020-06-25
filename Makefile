install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
 npx jest