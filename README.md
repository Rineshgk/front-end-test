# Virgin Atlantic ~ Hotel Search Results (Front-end)
## Rules
You must write the application in [Preact](https://preactjs.com/) and [TypeScript](https://www.typescriptlang.org/). Both are set up and ready to use inside this project.

In addition you should adhere to the following conditions:

1) The code must be your own work. If you have a strong case to use a small code snippet of someone else's e.g. a
boilerplate function, it must be clearly commented and attributed to the original author
1) You must include any unit tests you think are appropriate - Jest and Enzyme are set up already
1) Give consideration to performance and accessibility. Lighthouse scores are high - please keep them that way
1) Code must be clear, concise and human readable. Simplicity is often key
1) We do not want to see how well you can use a UI framework. This is a test and we want to see what you can create

## What it should do
Build the 'search results page' which connects to our holiday search API to display a list of holidays for a given location and departure date. Select what data items (example listed below) you think should be included on the page.

Add the ability to filter the results further by:

1) Price per person
1) Hotel facilities 
1) Star rating

The call to the API is proxied for you via Parcel in the `.proxyrc` file and the request is being made on the `/results` route already.

Typings for the request body and response are provided in `src/types/booking.ts` file.

The endpoint will return data relating to the holiday packages available. The key properties you should be interested in are in the typings.  Please note, our endpoint will return much more data, but you are free to ignore this!

## Supplying your code
Please **create and commit your code into a public Github repository** and supply the link to the recruiter for review.

Thanks for your time, we look forward to hearing from you!

## Running the app

`npm run start` to start serving the application. We are using [ParcelJS](https://parceljs.org/) to bundle to refer to their documentation for more details.

`npm run test` to run the unit tests. We have provided some passing tests already.


## Filter Implementation

#### Considerations
- Web worker for filter heavy operations
- Avoid unnecessary re-rendering for search results on filter change
- Customized AND and OR operation using object indices
- Unit testing and Accessibility
- index based data management
- Not used any third party boilerplate or hooks

#### Files

- lib/filter/*
- components/filter/*
- components/result/*
- carousel.component
- checkbox.component
- rating.component

#### Unit Test
All spec files are in the same root

Functionality of filter operations are tested in filter.spec.ts which covers 
- Load data
- Adding group
- OR operation
- AND operation
- Filtered result
- Reset

Mapping of data to filter covered in filter-data-formatter.helper.spec.ts which covers rating, price per person and facility mapping

### Web Worker

Filter operations are running in worker. 
Registration of worker done in results.route.ts

### Bit based show/hide
To avoid re-rendering of filtered search results, code use bit wise index operation to show and hide. This improves the rendering and UI interaction

### Carousel
Created an Simple Preact carousel


### TODO
- Cache can be done at group level. To create a key for the cache, selectedIndexByBit is maintained now at group and groupList.

- Move worker js to separate file, if more operations. Now maintained at route level

- Create a library for filter operations

