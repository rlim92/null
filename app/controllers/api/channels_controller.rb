class Api::ChannelsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @server = Server.includes(channels: :members).includes(channels: :messages).find(params[:server_id].to_i)

        if @server
            render :index
        else
            render json: @server.errors.full_messages, status: 420
        end
    end

    def show
        @channel = Channel.includes(:members, :messages).find(params[:id].to_i)
        if @channel
            render :show
        else
            render json: @channel.errors.full_messages, status: 420
        end
    end

end