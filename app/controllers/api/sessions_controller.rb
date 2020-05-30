class Api::SessionsController < ApplicationController
  before_action :ensure_logged_in, only: :destroy

  def create
    @user = User.eager_load(
      :servers,
      :direct_messages,
      :friend_reqs,
      :friend_backs
    ).eager_load(direct_messages: :members)
      .find_by_credentials(
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

  def destroy
    logout!
    render json: { message: 'Logged out!' }
  end
end