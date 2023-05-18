
## Description

Available endpoints: 

/top-stories - Returns the top 10 stories ranked by the score in the last 15 minutes.

/past-stories - Returns previously displayed top-stories.

/comments/:id - Returns 10 comments on a given story sorted by a total number of child comments.

## Running the app

```bash
# To start the application
$ npm run docker:start
$ npm run docker:start:dev

# To stop the application
$ Ctrl C
$ npm run docker:stop

# Running tests
$ npm run docker:test
```
