class RestaurantsController < ApplicationController
  def search
    if params[:query]
      @response = RestClient.get "https://maps.googleapis.com/maps/api/place/textsearch/json?query=#{params[:query]}&key=#{Rails.application.credentials.places_api_key}&type=restaurant",
                                 { content_type: :json, accept: :json, "user-key": ENV["API_KEY"] }
      @results = JSON.parse(@response.body)["results"]

      render status: :ok, json: @results
    else
      render status: :bad_request
    end
  end
end
