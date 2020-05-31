class Api::ChannelsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @server = Server.includes(:channels).find(params[:server_id].to_i)

        if @server
            render :index
        else
            render json: @server.errors.full_messages, status: 420
        end
    end

end