# AllTrails Restaurant Discovery Code Challenge API

A Rails API for exposing the Google Places API to the client.

## Running the project locally

- Install Ruby version 2.7.0 or later
- Follow [these steps](https://guides.rubyonrails.org/getting_startedhtml#creating-a-new-rails-project-installing-rails) to install Rails

The `places_api_key` ENV variable is required to run the project. This is set in encrypted credentials. Run the following command to edit the credentials file.

```
EDITOR="code --wait" bin/rails credentials:edit
```

Add the `places_api_key` to the file

```
places_api_key: 'your-google-api-key'
```

Run the following commands in the project directory to run the api on port 4000:

```
bundle install
rails s
```

## Routes

| Route                          | Params              | Description                                                                                                  |
| ------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| /api/restaurants/search?query= | `query`, `location` | Returns a list of restaurants that match the search query and location. A maximum of 20 results are returned |
