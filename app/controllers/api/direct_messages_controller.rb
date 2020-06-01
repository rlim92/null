class Api::DirectMessagesController < ApplicationController
    before_action :ensure_logged_in

    def index
        @user = User.includes(direct_messages: :members).find(params[:user_id].to_i)
        if @user
            render :index
        else
            render json: @user.errors.full_messages, status: 420
        end
    end

end