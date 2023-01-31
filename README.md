# chirper-frontend

![text_logo](https://user-images.githubusercontent.com/43970996/215510363-bd8c4dd4-3f14-4967-a716-fbd0caaf35cf.svg)

A (very) simple Twitter-like social media app I built to practice fullstack development.

- **Both the front-end (this repo) and the [back-end](https://github.com/IwaoM/chirper-backend) are needed to run the app.**
- Everything can run and data is stored locally (on the back-end's side).
- The entire app's interface is in French / l'intégralité de l'application a une interface en français.

## Front-end setup

- Clone the repository.
- Open a terminal in the root directory and run `npm install` to install required modules - this can take some time.
- Set up the back-end as well.
- Once everything is ready, run the client with `ng serve`.
- On your browser, go to [http://localhost:4200/](http://localhost:4200/).

## Features

- An account is required to log in. One can be created by clicking on the *S'inscrire* button. 
  - Everything will be stored in the back-end.
  - Once logged in, you can log out at any time.
- The timeline shows a list of chirps from most recent to oldest. If the back-end was correctly set up, you should see a collection of Lorem Ipsum chirps from dummy users. On the top, a text box allows you to post your own chirps with an optional image.
  - A chirp can be clicked on to open it in a dedicated page.
  - A chirp can be starred & unstarred and/or replied to with another chirp.
  - You can delete your own chirps.
- The profile page shows your profile info, the chirps you posted and those you starred.
  - You can open any user's profile page by clicking on their name or profile picture.
- The search page allows looking up chirps or users
  - Chirp search will return results based on the chirps' text
  - User search will check users' username & handle
- The settings page allows you to perform the following actions:
  - Edit your profile info & picture
  - Update your password
  - Change the app's theme (background color & accent color) - this is tied to the account
  - Delete your account
