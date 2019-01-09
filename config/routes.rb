Rails.application.routes.draw do
  root to: 'food_menu#top'
  get 'food_menu/index'
  post 'food_menu/search', to: 'food_menu#search'
  get 'food_menu/show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
