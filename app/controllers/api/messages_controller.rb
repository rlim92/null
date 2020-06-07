class Api::MessagesController < ApplicationController
    before_action :ensure_logged_in

    def index
        @dm = DirectMessage.includes(:messages, :members).find(params[:direct_message_id].to_i)
        @members = User.with_attached_avatar.where(id: @dm.member_ids)
        if @dm && @members
            render :index
        else
            render json: @dm.errors.full_messages, status: 420
        end
    end

end