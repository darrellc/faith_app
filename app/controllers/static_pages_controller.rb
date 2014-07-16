class StaticPagesController < ApplicationController
  def home    
    if user_signed_in?      
      @organization = current_user.organization
    end   
  end
end
