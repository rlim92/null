Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :create] do
      resources :direct_messages, only: [:index]
    end
    resources :servers, only: [] do 
      resources :channels, only: [:index]
    end
    resources :channels, only: [:show]
    resources :direct_messages, only: [] do 
      resources :messages, only: [:index]
    end

    get 'session/:sessionId', action: :show, controller: 'sessions'
  end

  root to: 'static_pages#root'

  mount ActionCable.server, at: '/cable'
end
