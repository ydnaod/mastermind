# How to play

## Hosted
I've hosted the project on netlify: https://andy-mastermind.netlify.app/ 

## Running it locally

1. Using your terminal, navigate to a directory where you want to clone the repo.
2. Run `'git clone https://github.com/ydnaod/mastermind.git'`.
3. Run `'cd mastermind'` to change into the correct directory.
3. Run `'npm install'`.
4. Run `'npm start'`.
5. This should run the game in your browser at 'http://localhost:3000/'.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npx cypress run`

This runs the small test suite that I wrote using cypress.\

The tests are configured to test the final user experience in the browser\
so it currently visits "https://andy-mastermind.netlify.app/".

If you want to test your version locally change the test found in\
`'mastermind/cypress/integration/end_to_end_spec.js'`.\

You have to use the URL of wherever you decide to run the project here:\
'cy.visit(`'https://andy-mastermind.netlify.app/'`);'.\

After that feel free to run the test command in the root directory.\

# My Development Process

When I read the challenge, I had no prior experience with the game at all so I had no associations of the classic colored pegs.\
Instead I imagined someone trying to break into a vault with a 4 digit code, which brought me to the UI of the lock. The lock had\
arrows on the top and bottom of each value that would allow the user to change the number. I liked this because it also meant that\
the user couldn't just type in whatever they want with their guesses.

I knew that I was going to use React so the first thing I did was sketch out the structure of the component treeon a piece of paper.\



### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# mastermind
