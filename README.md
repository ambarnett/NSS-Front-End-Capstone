# Charlie's Checklist

With Charlie’s Checklist it will give a dog owner an easy way to keep track of training they have accomplished with their dog,
make notes for future reference and create a profile of each dog.

## About Charlie's Checklist

A goal I had with this app was to make something that would have most of it's operations and functions perform on a minimal amount of pages.
I was able to accomplish this with the help of ![Reactjs-popup](https://react-popup.elazizi.com/). I used Reactjs-popup to create pop-ups for the commands, tricks, and habits parts of the dogs profile page. 

## Demo 

![CharliesChecklist](src\components\images\CharliesChecklist.gif)

## Try it yourself

1. Clone the app
2. Copy and paste the blank database I have provided into a .json file
3. Run the database with `json-server database.json -p 8088 -w`
4. Create profiles for your dog (or cat, ferret, goldfish, pet moose), track, keep notes, and enjoy the app!

### Database
Just copy and paste everything below into a .json file
```
{
    "users":[],
    "dogs":[],
    "dogImages":[],
    "dogNotes":[],
    "knownHabits":[],
    "knownTricks":[],
    "knownCommands":[],
    "habits":[],
    "tricks":[],
    "commands":[]
}
```
