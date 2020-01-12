# Rails React Example

An example application build with Rails and React

## Local Build

```
bundle install
yarn install
rails db:create
rails db:seed
rails s
```

## Tests

```
rspec
```

## Specs

```
rspec f -d
```

## To Do

-   [ ] Add ability to filter `complete` items
-   [ ] Only load the `<Spinner/>` if content is loading, not if `this.state.todoItems.length === 0`, since it's possible a user could have no items.
    -   Add a `loading` key into `state`
-   [ ] Write feature tests
-   [ ] Highlight invalid field elements
-   [ ] Consider using `axios` for better compatibility in `app/javascript/packs/components/TodoApp.jsx`
