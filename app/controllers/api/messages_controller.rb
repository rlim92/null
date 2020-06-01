class Api::MessagesController < ApplicationController
    before_action :ensure_logged_in

    def index
        @messages = DirectMessage.includes(:messages).find(params[:direct_message_id].to_i).messages
        if @messages
            render :index
        else
            render json: @messages.errors.full_messages, status: 420
        end
    end

end