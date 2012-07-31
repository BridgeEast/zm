class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate_user!
  layout :render_by_login_session
  

  def render_by_login_session
    is_a?(Devise::SessionsController) ? "login" : "application"
  end
  
end
