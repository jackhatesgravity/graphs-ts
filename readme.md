# graphs-ts
## Overview
Mostly TBC, but trying to learn TypeScript by translating some of my Python programs written around core data structures.

## Progress
By this commit I've translated all of the class functionality from the Python version of this program into TypeScript. What I want to do next is add in the search algorithms, then start building an API to get some practice in that.

That is, I want to be able to run some kind of server with an API that allows me to make graphs using some CLI interface or similar. Not sure exactly the shape of that yet. By doing that, I hope to gain a bit of experience building backend services using a project I find genuinely interesting. Further, I can then build on this to create a front end that might allow me to make maps, solve flow network problems, shortest-path, etc. There's a lot of ways this can branch out.

Starting small.

## Notes
Okay, so I've been getting some weirdness with the undefined return types that I need to come up with a better way of dealing with. It's not breaking anything yet, but it feels against the spirit of TypeScript.

Broader problem, I think I've fucked how my stack and queue are working, but that said, most of the functionality is now done.