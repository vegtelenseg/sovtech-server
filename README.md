# Steps To Run

> yarn && PORT=4000 yarn start

# Improvements

1. Add dataloader for the backend to allow batching and caching
2. Instead of manual pagination, implement Relay-style pagination (NodeInterface)

> Manual pagination had to be done this way, since currently, type-graphql does not have an official support for pagination
>
> See:
>
> https://github.com/MichalLytek/type-graphql/issues/142#issuecomment-432700679

4. Add Mocha and/or Chai in the Backend to test the API
5. Add more typings for Request and Responses to and from the API
6. Add Error Middleware for Backend
7. Add Security Middleware for Backend
8. Add Logger Middleware for Backend
