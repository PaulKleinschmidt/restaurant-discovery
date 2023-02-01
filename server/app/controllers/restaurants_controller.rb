class RestaurantsController < ApplicationController
  def search
    if params[:query]
      @response = RestClient.get "#{GOOGLE_API_BASE_URL}/textsearch/json?query=#{params[:query]}&location=#{params[:location]}
                                  &key=#{API_KEY}&type=restaurant".strip,
                                 { content_type: :json, accept: :json }

      @results = JSON.parse(@response.body)["results"]

      @results_with_images = add_images_to_restaurants(@results)

      render status: :ok, json: @results_with_images
    else
      render status: :bad_request
    end
  end
end

private

API_KEY = Rails.application.credentials.places_api_key
GOOGLE_API_BASE_URL = "https://maps.googleapis.com/maps/api/place".freeze

def add_images_to_restaurants(restaurants)
  restaurants.each do |restaurant|
    next if restaurant["photos"].blank?

    photo_reference = restaurant["photos"].first["photo_reference"]
    image = RestClient.get "#{GOOGLE_API_BASE_URL}/photo?maxheight=72
                            &photo_reference=#{photo_reference}&key=#{API_KEY}".strip,
                           { content_type: :json, accept: :json }

    restaurant["image"] = Base64.encode64(image)
  end
end
