class Api::DirectMessagesController < ApplicationController
    before_action :ensure_logged_in

    def index
        @user = User.includes(direct_messages: :members).find(params[:user_id].to_i)
        @direct_messages = @user.direct_messages
        member_ids = @user.direct_messages.map {|dm| dm.member_ids }.flatten.uniq
        @members = User.with_attached_avatar.where(id: member_ids)
        
        if @direct_messages
            render :index
        else
            render json: @direct_messages.errors.full_messages, status: 420
        end
    end

end