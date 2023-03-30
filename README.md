# Products Grid

This is an ecommerce site, where you can buy all sorts of stuff. The homepage should display a list of products for people to browse.

## Features

x - products are displayed in a grid.
x - give the user an option to sort the products in ascending order. Can sort by "title", "price" or "rating". The products list should be reloaded when a new sorting option is chosen.
x - each product has :
x - a "thumbnail" field. We should display the thumbnail to give the customer an impression of what they're buying.
x - a "title" field. So as the customer would know what the product is.
x - a "price" field. This should be formatted as dollars like `$1,351`.
x - a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed.
x - the product grid should automatically load more items as you scroll down.
x - display an animated "loading..." message while the user waits for the data to load.
x - to improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time. But they still should not be displayed until the user has scrolled to the bottom of the product grid.
x - when the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".

### Ads features

x - after every 20 products we need to insert an advertisement from one of our sponsors. Use the same markup as the advertisement in the header shown in `src/App.js`, but make sure the `?r` query param is randomly generated each time an ad is displayed.
x - Ads should be randomly selected, but a user must never see the same ad twice in a row.

## Products API

- The basic query looks like this: `http://localhost:8000/products`
- The response format is JSON.
- To paginate results use the `_page` parameter, eg: `/products?_page=5&_limit=15` (returns 15 results starting from the 10th page).
- To sort results use the `_sort` parameter, eg: `/products?_sort=price`. Valid sort values are `price`, `title` and `rating`.

### How do I start the app?

Start with
1 `npm install` to install the dependencies
2 run the server `npm run server`
3 `npm start` to run the app
