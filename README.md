# repo-list-app

## Install dependencies
- Run `yarn` or `npm install`

## How to run
- For iOS: Run `react-native run-ios` or `npx react-native run-ios`
- For Android: Run `react-native run-android` or `npx react-native run-android`

## Run tests
- Run `yarn test` or `npm run test`

## How to use app
1. Type in any random email and password to enable Login button then press Login button.
2. Type in search bar to search for Github repositories. Repositories list resulting from the search request will be displayed. Each list item displays repository's name and stargazer count.
3. Press item from the list to display its Details Screen which displays its name, stargazer count, description and a button which opens the repo link in the browser when pressed.

## To Do
- Handling of rate limit
  - Number of search request to Github's API is maximum 10 per minute. Once reached, API will return an error saying that maximum number of requests has been reached.
  - Problem: No handling yet in app once limit has been reached.
  - Possible solution: check first from '/rate_limit' endpoint the remaining number of requests allowed and disable requests if already reached limit (calling '/rate_limit' does not incur an API hit). Also, notify user that request rate limit has been reached and search/next page request will be disabled (ex. snackbar). Once allowed remaining number of requests has refreshed, enable sending of request again and notify user that search / next page request is enabled again.
