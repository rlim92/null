class Api::DirectMessagesController < ApplicationController
    before_action :ensure_logged_in

    def index
        @direct_messages = User.with_attached_avatar.includes(direct_messages: :members).find(params[:user_id].to_i).direct_messages
        if @direct_messages
            render :index
        else
            render json: @direct_messages.errors.full_messages, status: 420
        end
    end

end