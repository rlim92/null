Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :create]
    resources :servers, only: [] do 
      resources :channels, only: [:index]
    end
    resources :channels, only: [:show]

    get 'session/:sessionId', action: :show, controller: 'sessions'
  end

  root to: 'static_pages#root'

  mount ActionCable.server, at: '/cable'
end
