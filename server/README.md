# Restaurant Discovery API

A Rails API for exposing the Google Places API to the client.

## Running the project locally

### Requirements

- Install Ruby version 2.7.0 or later
- Follow [these steps](https://guides.rubyonrails.org/getting_startedhtml#creating-a-new-rails-project-installing-rails) to install Rails

### ENV variables

You will need to set a master key in `config/master.key` in order to access the required ENV variables. Please reach out to me if you need me to send you the master key.

If you need to modify or add credentials, Run the following command to edit the credentials file:

```
EDITOR="code --wait" bin/rails credentials:edit
```

Run the following commands in the project directory to run the API on port 4000:

```
bundle install
rails s
```

## Routes

| Route                   | Params              | Description                                                                                                  |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| /api/restaurants/search | `query`, `location` | Returns a list of restaurants that match the search query and location. A maximum of 20 results are returned |
