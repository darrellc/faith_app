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
    puts @user.inspect
    respond_to do |format|
      format.js {render :template => @view_path + "js/show.js.erb", :locals => {:u => @user} }
      format.html {redirect_to root_path}
    end    
  end
  
  def set_view_path
    @view_path = "account/user/"
  end  

end
