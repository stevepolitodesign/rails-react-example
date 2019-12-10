# Rails React Example

An example application build with Rails and React

### Questions

The `updateTodoItem` method in `app/javascript/packs/components/TodoApp.jsx` manually assigns the `title`, `complete` and `updated_at` values to the `todoItem` as seen below:

```
...
todoItems[todoItemIndex].title = title
todoItems[todoItemIndex].complete = complete
todoItems[todoItemIndex].updated_at = updated_at
```

However, I tried assigning the `todoItem` object to `todoItems[todoItemIndex]` without any luck.

```
todoItems[todoItemIndex] = {...todoItem}
```

## Local Build

```
bundle install
rails db:create
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

-   [ ] Write feature tests
-   [ ] Style
-   [ ] Highlight invalid field elements
-   [ ] Consider using `axios` for better compatibility in `app/javascript/packs/components/TodoApp.jsx`
