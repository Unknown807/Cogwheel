# Cogwheel-Cognitive-Calculator

## Description

An electron simple cognitive calculator program based roughly on the KLM-GOMS cognitive model https://en.wikipedia.org/wiki/Keystroke-level_model. It allows you to calculate how long it would take an expert user with no errors to complete a series of tasks, allowing you to flexibly specify how long each task takes, how much the user would have to memorise and how many times the task is to be repeated.

## Attributions

<div>Release icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## Dependencies

For more information look in package.json

- Bootstrap - ^5.0.1
- Bootstrap-icons - ^1.5.0
- Popper.js - ^1.16.1
- JQuery - ^3.6.0
- Codemirror - ^5.61.1
- Electron - ^12.0.9
- Electron-forge - ^6.0.0-beta.33 (dev dependency)

## How It Works

When you open the program you will be greeted with an empty editor. You can then start typing immediatley and easily do quick saves in between all you need is a filename and everything will be stored in the program directory.

![](/imgs/img1.PNG)

The image above shows an example for calculating how long it would take to log into an example website. The total time taken and total memory load is calculated real time as you type, so you can be sure what is causing what to change.

![](/imgs/img3.PNG)

If you don't like light mode, there are five other themes/modes to choose from the settings page above (bottom of the page). The settings page also lets you change default timings for tasks so typing out something like (100 milliseconds) doesn't become tedious.

![](/imgs/img2.PNG)

Here is an example of one of the other themes, dark mode.

![](/imgs/img4.PNG)

For more information, look at the help page in the program.
