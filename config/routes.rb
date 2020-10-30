Rails.application.routes.draw do
  devise_for :users

  root 'products#index'
  
  resources :products, only: [:show, :new, :edit, :destroy, :create, :index] do
    collection do
      get :search
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
    end
    resource :purchases do
      member do
        get  "buy"
        post "pay"
      end
    end
  end

  resources :users, only:[:show, :edit, :index, :update]

  resources :cards, only: [:new, :create, :show, :destroy] do
  end
  
  resources :categories do
    collection do
      get :search
    end
  end
end