Rails.application.routes.draw do
  scope "/api" do
    resources :restaurants do
      collection do
        get "search"
      end
    end
  end
end
