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

Runs the game in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npx cypress run`

This runs the small test suite that I wrote using cypress.

The tests are configured to test the final user experience in the browser\
so it currently visits "https://andy-mastermind.netlify.app/".

If you want to test your version locally change the test found in\
`'mastermind/cypress/integration/end_to_end_spec.js'`.

You have to use the URL of wherever you decide to run the project here:\
'cy.visit(`'https://andy-mastermind.netlify.app/'`);'.

After that feel free to run the test command in the root directory.

# My Development Process

When I read the challenge, I had no prior experience with the game so I had no associations of the classic colored pegs.
Instead I imagined someone trying to break into a vault with a 4 digit code, which brought me to the UI of the lock. The lock had
arrows on the top and bottom of each value that would allow the user to change the number. I liked this because it also meant that
the user couldn't just type in whatever they want with their guesses.

I knew that I was going to use React so the first thing I did was sketch out the structure of the component tree on a piece of paper. I didn't think this project was going to need Redux since the base game is pretty simple. Without Redux I had to be very careful about where each piece of state was stored since React can only pass state down from parent to child components. Once I was pretty sure the structure would work, I started coding.

My first goal was to build the base game with animations and sounds, then implement some other extra features once I had a working project. The component structure is listed below:

- Game
    - Vault
        - Combination
            - Combination Column
                - Up Arrow
                - NumberToDisplay
                - Down Arrow
        - OpenButton (Guess Button)
    - GuessTracker
    - Timer
    - History

There are a couple smaller components that are rendered in Game that haven't been broken up into Components (New Game Button, Toggle Game Mode Button). Building out the base game was pretty straightforward. I had to store the secret code, the current combination, and all the logic to check the codes against each other in the Vault component, which means I also had to pass setter methods as props all the way down to the Up and Down arrows. Game state such as loading, game (boolean to keep track of whether or not the game was over), guesses remaining, and history were all stored in Game. I initially had created a History component, which rendered an array of hints to the user, but I realized it was an unnecessary middle man. However, it would make the Game render section of the code base more readable.

# Extensions

## Animations and Sounds

The first feature I wanted to implement was animations and sounds. I had previously tried using an animation library designed for react, react-spring, with another project and failed so I thought this would be a good opportunity to conquer my past mistakes now that I have more experience... After 6 hours of trying to use the library, I decided to use a different animation library, framer-motion, which was easy and quick to implement. 

The hardest animation to implement was the numbers animating up if the up arrow was clicked as the new number animates up from below. Because an element is leaving the DOM it requires a special wrapper that was conveniently provided by the framer-motion.

I used a library called 'use-sound' that was made to implement sound effects in react. I had a lock in my room that made the exact sounds I needed in the game. I went online searching for those sounds, and it took me 10 minutes to realize that I was looking for something I already had. I put my filmmaking skills to use and recorded and mixed various interactions with my lock to produce many of the sounds you hear while playing the game.

The documentation for 'use-sound' mentioned that the best practice was to only play sounds when a user interacts with the app. Autoplaying audio can make it harder for people who use screen-readers to understand what is on the page. So I added a mute button and changed the initial state of the game to "muted." Please unmute the game to hear the sound effects!

## AI and New Game Button

After making the game according to the rules set in the coding challenge, I realized how hard the game was. I never even came close to beating the game. I looked up some strategies online and found that someone created an algorithm that would solve each code in worst case 5 guesses. I started to wonder about building an AI that could solve the code for you using this algorithm. I worried that the component structure might make it hard for an AI to make changes to the game state. Where would the AI logic live? In the Game component where it has access to all the important state variables? In it's own utility module? But then how would it interact with the game?

As an attempt to dip my toes in, I added a new game button, which would shuffle the current combination as a visual indicator that a new game has started. The new game button was located in the Game component, which then needed to modify each Combination Column. I accomplished this by passing down a "shuffle" state from Game all the way down to Combination Column, which would shuffle the combinations if and only if the "shuffle" state was true. Seeing how complicated this little feature became made me realize that having an AI live in the Game component would just make the code base incomprehensible. 

Another deterrent to building the AI was that the 5 guess algorithm only worked for the classic version of the game, which gave more information for each guess, which led me to the next extension of the game.

## Classic Mode

The classic version of the game had 6 colors max and would tell players how many of their colors were correct and how many of their colors were correct and in the right place. So I added a "mode" state to the Game component and changed the Submit Guess logic in the Vault component accordingly. 

I had to refactor some of the methods involved in guess submission, since the original version of my game only needed to know if there was 1 correct or 1 in place. Now each method returns the number of numbers that are correct and the number of numbers that are in place. 

This version of the game is much easier to beat!

## Timer

The timer was a little tricky to implement in React since state changes happen asynchronously. There's a setInterval function which updates state every second, but React state changes inside a setInterval function get kind of weird so I had to create references to each piece of state involved in the timer function with the useRef hook. Once I found this workaround, the rest became pretty easy to implement. 

## Tests with Cypress

Tests aren't really an extension in the sense that users don't interact with it, but I did end up learning a good bit about testing. I haven't written tests for any of my React projects so I felt this was a good opportunity to get some experience. I know about TDD, and I'll be honest - I wrote these tests last after already having developed the entire project. 

I started writing some small unit tests using the built in testing library that comes with create-react-app, but I figured it might be better to write end to end tests now that I've already finished the project. Then I looked into cypress, which is an open-source testing framework. I was able to write some tests after reading through the documentation and following their instructions. The tests were pretty basic though. Just enough to test what's been rendered to the screen and that the buttons all have the effect that they're supposed to have. 

I was not able to write more complex tests such as a test for when the user guesses a code that's completely wrong. That meant that my test would need to have access to the secret code and then purposely guess a completely wrong code. There was a way for the test to access the secret code, but I didn't know how to store the variable other than the normal `const secretCode = cy.react(...`, which was strongly discouraged in the documentation. At this point, I decided that I would write tests for what I could write tests for, then save the documentation for later.

# mastermind
