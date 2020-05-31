Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :servers, only: [] do 
      resources :channels, only: [:index]
    end

    get 'session/:sessionId', action: :show, controller: 'sessions'
  end

  root to: 'static_pages#root'
end
