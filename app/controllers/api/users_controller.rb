class Api::UsersController < ApplicationController
    before_action :ensure_logged_in

    def index
        if params[:dm_ids]
            @dms = DirectMessage.includes(:members).find(params[:dm_ids])
            if @dms
                render :index
            else
                render json: @dms.errors.full_messages, status: 420
            end
        end
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :current_user
        else
            render json: @user.errors.full_messages, status: 420
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :username, :password)
    end
end