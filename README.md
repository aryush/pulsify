This is a React based project. It uses the spotify API to fetch the name of the artist and display artist's top tracks .

## Issues

Since the new modications with the Spotify API endpoints, one needs to specify an Authorization Header as part of every request. This uses the access token generated using the node server. But there is one problem with that. It has some expiration limit, so you have to 'Obtain new token' and copy paste the access token again and the code with work just fine.
