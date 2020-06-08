class Api::UsersController < ApplicationController
    before_action :ensure_logged_in, only: [:index]

    def index
    end

    def create
        @user = User.new(user_params)

        if (params[:user][:avatar])
            @user.avatar.attach(io: params[:user][:avatar], filename: "avatar" + @user.email)
        end

        if @user.save
            @user.servers << Server.first
            Server.first.channels.where(('is_private = false')).each do |ch|
                ch.members << @user
            end
            dm = DirectMessage.create
            dm.members << User.first
            dm.members << @user
            dm.messages.create(text: "Welcome to riscord!", author_id: User.first.id)

            if @user 
                login!(@user)
                render :current_user
            end
        else

            render json: @user.errors.full_messages, status: 420
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :username, :password)
    end
end