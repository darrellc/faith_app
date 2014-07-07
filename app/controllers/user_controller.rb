class UserController < ApplicationController
  before_filter :set_view_path
  load_and_authorize_resource
  
  def destroy    
    puts "USERCONTROLLER#DESTROY"
    begin
      @user.destroy
      respond_to do |format|
        format.js {render :template => @view_path + "js/destroy.js.erb", :locals => {:success => true, :u => @user} }
        format.html {render root_path}
      end      
    rescue
      respond_to do |format|
        format.js {render :template => @view_path + "js/destroy.js.erb", :locals => {:success => false} }
      end
    end
    
  end
  
  def show
    puts "USERCONTROLLER#SHOW"
    puts params
    if params[:mode].nil?
      mode = ""
    else
      mode = params[:mode]
    end
    respond_to do |format|
      format.js {render :template => @view_path + "js/show.js.erb", :locals => {:u => @user, :mode => params[:mode] } }
      format.html {redirect_to root_path}
    end    
  end
  
  def update
    puts "USERCONTROLLER#UPDATE"
    puts params
    userParams = params[:user]
    puts userParams
    
    begin
      @user.update_attributes :first_name => userParams[:first_name], :last_name => userParams[:last_name], :role => userParams
      respond_to do |format|
        format.js {render :template => @view_path + "js/update.js.erb", :locals => {:u => @user, :success => true, :msg => "User was updated" } }
        format.html {redirect_to root_path}
      end
    rescue
      respond_to do |format|
        format.js {render :template => @view_path + "js/update.js.erb", :locals => {:u => @user, :success => false, :msg => "User was not updated" } }
        format.html {redirect_to root_path}
      end
    end   
    
  end
  
  
  def set_view_path
    @view_path = "account/user/"
  end  

end
