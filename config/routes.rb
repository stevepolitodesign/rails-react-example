Rails.application.routes.draw do
  resources :posts
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :todo_items
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
