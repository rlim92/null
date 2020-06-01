class Api::SessionsController < ApplicationController
  before_action :ensure_logged_in, only: [:show, :destroy]

  def create
    @user = User.includes(
      :friend_reqs,
      :friend_backs
    ).includes(
      direct_messages: :members
    ).includes(
      servers: :channels
    ).find_by_credentials(
      params[:user][:email], 
      params[:user][:password]
    )

    if @user
      login!(@user)
      render 'api/users/current_user'
    else
      render json: ['Wrong username/password'], status: 420
    end
  end

  def show
    if params[:sessionId].to_i == current_user.id
      @user = User.includes(
        :direct_messages,
        :friend_reqs,
        :friend_backs
      ).includes(
        direct_messages: :members
      ).includes(
        servers: :channels
      ).find_by(
        id: current_user.id
      )

      render 'api/users/current_user'
    else
      render json: ['You are not the current user!'], status: 420
    end
  end

  def destroy
    logout!
    render json: { message: 'Logged out!' }
  end
end