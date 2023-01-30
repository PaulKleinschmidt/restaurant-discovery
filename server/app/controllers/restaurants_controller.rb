class RestaurantsController < ApplicationController
  GOOGLE_API_BASE_URL = "https://maps.googleapis.com/maps/api/place"

  def search
    if params[:query]
      @response = RestClient.get "#{GOOGLE_API_BASE_URL}/textsearch/json?query=#{params[:query]}&key=#{Rails.application.credentials.places_api_key}&type=restaurant",
                                 { content_type: :json, accept: :json}

      @results = JSON.parse(@response.body)["results"]

      @results.each do |restaurant|
        next if restaurant["photos"].blank?

        photo_reference = restaurant["photos"].first["photo_reference"]
        image = RestClient.get "#{GOOGLE_API_BASE_URL}/photo?maxheight=72&photo_reference=#{photo_reference}&key=#{Rails.application.credentials.places_api_key}",
                               { content_type: :json, accept: :json }
        restaurant["image"] = Base64.encode64(image)
      end

      render status: :ok, json: @results
    else
      render status: :bad_request
    end
  end
end
