class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.html {render :controller => "registrations", :action => :new}
      format.js {render :template => "errors.js.erb", :locals => {:error => "access_denied"} }
    end
  end
  
  rescue_from ActiveRecord::RecordNotFound do |exception|
    respond_to do|format|
      format.html {redirect_to root_path}
      format.js {render :template => "errors.js.erb", :locals => {:error => "record not found."} }
    end
  end
  
  
end
