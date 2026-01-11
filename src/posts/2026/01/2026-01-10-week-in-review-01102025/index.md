---
title: "Week In Review 01/10/2025"
date: 2026-01-10T15:52:35.116Z
tags: ["week in review"]
excerpt: "This weeks week in review."
---

## Personal

**TV** 
My wife and I have binge watched season 1 of Landman.  I have been enjoying the show and I hope continues to producing good shows.  


**Books** You won't see this section very often, as I don't read very frequently. However, I was browsing [reddit](https://reddit.com) and came across a quote from the book [As You Wish](https://www.amazon.com/As-You-Wish-Inconceivable-Princess/dp/1476764042) by Cary Elwes. [Cary Elwes](https://en.wikipedia.org/wiki/Cary_Elwes) played Westley in [The Princess Bride](https://en.wikipedia.org/wiki/The_Princess_Bride_(film)), one of my favorite movies. The quote was about Billy Crystal's part in the movie, and I knew I had to read the book. It was a super easy read and provided great insight into the behind-the-scenes stories of both Cary and the movie. I highly recommend it.  

![As you Wish](./as_you_wish.png)

**Life** My son went back to college yesterday and now it back to my wife and I being empty nesters.  


## Professional

Finally merged a very large PR that I've been working on since mid-September that reworks how the frontend of our app handles permissions. We started discussing this at our offsite in Albuquerque, NM. Previously, the frontend handled all the permissions/abilities that a user could do. This has now been reworked so that the permissions are stored and provided by our auth service. This allows us to provide the correct permissions in the UI and also with user tokens, which is important when these tokens are used for accessing our AI/MCP and limiting the data that is exposed to what the user has access to.

I've never had a PR that was so long-lived. It was challenging to keep up to date with master and ended up causing me some stress. After merging to master, our CI picked it up as a version build instead of running a new feature build. This ended up overwriting a build version, but everything worked out with some quick retagging and then running a new PR build that contained the new code. I deployed this to dev and stage on Thursday, and so far no one has noticed anything changed. Let's hope this continues when it gets to prod next week.  
