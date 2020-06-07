class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?


    def logged_in?
        !!current_user
    end

    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def ensure_logged_in
        unless logged_in?
            render json: ['Must be logged in for that'], status: 420
        end
    end

    def login!(user)
        @current_user = user
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        @current_user = nil
        session[:session_token] = nil
    end
end
